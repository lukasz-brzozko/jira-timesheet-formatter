// ==UserScript==
// @name         Jira Time Sheet Formatter
// @namespace    https://github.com/lukasz-brzozko/jira-timesheet-formatter
// @version      0.1
// @description  Format time into hours and minutes
// @author       Łukasz Brzózko
// @match        https://jira.nd0.pl/*
// @exclude        https://jira.nd0.pl/plugins/servlet/*
// @resource styles    https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/styles.css
// @icon         https://jira.nd0.pl/s/a3v501/940003/1dlckms/_/images/fav-jsw.png
// @updateURL    https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/timesheet.meta.js
// @downloadURL  https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/timesheet.user.js
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";

  const WEEK_OFFSET = 0;
  const WORK_DAY_SHIFT_HOURS = 7.5;

  const MESSAGES = {
    containerFound: "Znaleziono kontener.",
    containerNotFound: "Nie znaleziono kontenera. Skrypt został wstrzymany.",
    error: "Wystąpił błąd. Spróbuj ponownie później.",
    btnText: "Formatuj czasy",
  };

  const SELECTORS = {
    cellWithValue: "td.nav.border.workedDay",
    rowFooter: ".rowFooter",
    footerCell: ".rowFooter .workedDay > b",
    summaryCells: "tbody > tr > td:last-child > b",
    tableBody: "#issuetable > tbody",
    boldCell: "td > b",
  };

  const IDS = {
    dashboardContent: "dashboard-content",
    layout: "my-layout",
    formatterBtn: "formatter-btn",
    myGadget: "my-gadget",
    toast: "toast",
  };

  const STATE = {
    loading: "loading",
    visible: "visible",
    complete: "complete",
    notComplete: "not-complete",
  };

  const baseURL = `https://jira.nd0.pl/rest/timesheet-gadget/1.0/timesheet.json?isGadget=true&baseUrl=https%3A%2F%2Fjira.nd0.pl&gadgetTitle=&startDate=&targetUser=&targetGroup=&collapseFieldGroups=false&excludeTargetGroup=&numOfWeeks=1&reportingDay=&projectOrFilter=&projectid=&filterid=&projectRoleId=&commentfirstword=&weekends=true&showDetails=true&sumSubTasks=false&showEmptyRows=false&groupByField=&moreFields=&offset=${WEEK_OFFSET}&page=1&monthView=false&sum=&sortBy=&sortDir=ASC&_=`;
  const now = new Date();

  let controller;
  let formatterBtnEl;
  let layoutEl;
  let toastEl;
  let dashboardContentEl;

  const linkStyles = async () => {
    const myCss = GM_getResourceText("styles");
    const styleTag = document.createElement("style");
    styleTag.textContent = myCss;

    document.body.prepend(styleTag);
  };

  const toggleLoading = (force = undefined) => {
    formatterBtnEl?.classList.toggle(STATE.loading, force);
    layoutEl?.classList.toggle(STATE.loading, force);
  };

  const padNumber = (number, length = 1) =>
    number.toString().padStart(length, "0");

  const formatValue = ({ cell, cellContent }) => {
    const cellNumber = cellContent.slice(0, -1);
    const separatorIndex = cellNumber.indexOf(".");
    const hours =
      separatorIndex !== -1 ? cellNumber.slice(0, separatorIndex) : cellNumber;

    const fraction =
      separatorIndex !== -1 ? `0.${cellNumber.slice(separatorIndex + 1)}` : 0;
    const minutes = Math.round(parseFloat(fraction) * 60);
    const padHours = padNumber(hours, 1);
    const padMinutes = padNumber(minutes, 2);

    cell.textContent = `${padHours}h ${padMinutes}m`;
  };

  const handleMainCells = (cellsArr) => {
    cellsArr.forEach((cell) => {
      const [firstChild] = cell.childNodes;
      const cellContent = firstChild.textContent.trim();
      if (!cellContent) return;

      formatValue({ cell, cellContent });
    });
  };

  const handleBoldCells = (cellsArr) => {
    cellsArr.forEach((cell) => {
      const cellContent = cell.textContent.trim();
      if (!cellContent) return;

      formatValue({ cell, cellContent });
    });
  };

  const calculateRemainingTime = (cell) => {
    const cellContent = cell.textContent.trim();
    if (!cellContent) return;

    const cellValue = parseFloat(cellContent);
    const remainingTime = WORK_DAY_SHIFT_HOURS - cellValue;

    cell.textContent = `${remainingTime}h`;
    const cellParent = cell.parentElement.classList.add(
      remainingTime > 0 ? STATE.notComplete : STATE.complete
    );
  };

  const generateRemainingTimeRow = (row) => {
    if (row === null) return null;

    const remainingTimeRow = row.cloneNode(true);
    remainingTimeRow.classList.add("remaining-time");

    const boldCells = remainingTimeRow.querySelectorAll(SELECTORS.boldCell);

    boldCells[boldCells.length - 1].textContent = "";
    remainingTimeRow.firstElementChild.textContent = "Remaining time:";

    boldCells.forEach(calculateRemainingTime);

    return remainingTimeRow;
  };

  const calculateCellValues = ({ layoutEl }) => {
    const tableBody = layoutEl.querySelector(SELECTORS.tableBody);
    const rowFooter = tableBody.querySelector(SELECTORS.rowFooter);

    const remainingTimeRow = generateRemainingTimeRow(rowFooter);
    if (remainingTimeRow !== null) {
      tableBody.appendChild(remainingTimeRow);
    }

    const cells = tableBody.querySelectorAll(SELECTORS.cellWithValue);
    const rowFooterCells = tableBody.querySelectorAll(SELECTORS.footerCell);
    const summaryCells = tableBody.querySelectorAll(SELECTORS.summaryCells);

    handleMainCells(cells);
    handleBoldCells([...rowFooterCells, ...summaryCells]);
    toggleLoading(false);
  };

  const renderLayout = ({ layoutEl, html }) => {
    const myGadgetEl = layoutEl.querySelector(`#${IDS.myGadget}`);

    myGadgetEl.innerHTML = html;

    calculateCellValues({ layoutEl });
  };

  const renderInitialLayout = ({ layoutEl, html }) => {
    layoutEl.innerHTML = `
  <div class="layout layout-a">
    <div class="my-gadget gadget color1" id="${IDS.myGadget}">
      ${html}
    </div>
  </div>

  <div aria-hidden="true" class="backdrop">
    <span class="backdrop-container" role="progressbar" style="width: 40px; height: 40px;">
      <svg class="backdrop-svg" viewBox="22 22 44 44">
        <circle class="backdrop-circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
      </svg>
    </span>
  </div>
`;

    calculateCellValues({ layoutEl });
  };

  const fetchData = async () => {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    let html;
    let error;

    try {
      //TODO remove
      const storagedHtml = localStorage.getItem("html");

      if (storagedHtml) return { html: storagedHtml, error };
      //TODO end

      const response = await fetch(`${baseURL}${now.getTime()}`, { signal });
      const { html: htmlData } = await response.json();

      html = htmlData;

      //TODO remove
      localStorage.setItem("html", html);
      //TODO end
    } catch (err) {
      error = err;
    }

    return { html, error };
  };

  const handleError = (error) => {
    toggleLoading(false);
    void toastEl.offsetWidth; // Force reflow
    toastEl.classList.add(STATE.visible);

    console.clear();
    console.error(error);
  };

  const renderContent = async () => {
    layoutEl = document.getElementById(IDS.layout);

    toggleLoading(true);
    toastEl.classList.remove(STATE.visible);

    const { html, error } = await fetchData();

    if (error) return handleError(error);
    if (layoutEl !== null) return renderLayout({ layoutEl, html });

    layoutEl = document.createElement("div");
    layoutEl.id = IDS.layout;

    renderInitialLayout({ layoutEl, html });

    dashboardContentEl.appendChild(layoutEl);
  };

  const generateUiElements = () => {
    const formatterBtn = document.createElement("button");
    const toastWrapper = document.createElement("div");

    formatterBtn.id = IDS.formatterBtn;
    formatterBtn.className = "btn";
    formatterBtn.innerHTML = `
  <span class="btn-text">${MESSAGES.btnText}</span>
  <div class="spinner">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>`;

    toastWrapper.innerHTML = `
  <div id="toast" class="toast error" role="alert">
    <div class="toast-icon-container">
      <svg
        class="toast-icon toast-icon--error"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      </svg>
    </div>
    <div class="toast-message">${MESSAGES.error}</div>
  </div>`;

    document.body.appendChild(formatterBtn);
    document.body.appendChild(toastWrapper);

    formatterBtnEl = document.getElementById(IDS.formatterBtn);
    toastEl = document.getElementById(IDS.toast);

    formatterBtn.addEventListener("click", renderContent);
  };

  const lookForAppContainer = async () => {
    const DOMElements = await new Promise((resolve, reject) => {
      const maxAttempts = 50;
      let attempt = 0;

      const setIntervalId = setInterval(() => {
        dashboardContentEl = document.getElementById(IDS.dashboardContent);
        if (dashboardContentEl) {
          clearInterval(setIntervalId);
          window.console.info(
            `%c ${MESSAGES.containerFound}`,
            "background: #B7E1CD; color: #000; font-size: 20px"
          );
          resolve({ container: dashboardContentEl });
        } else {
          if (attempt >= maxAttempts) {
            clearInterval(setIntervalId);
            reject({ error: MESSAGES.containerNotFound });
          } else {
            attempt++;
          }
        }
      }, 300);
    });

    return DOMElements;
  };

  const handleContainerNotFound = () => {
    window.console.error(
      `%c ${MESSAGES.error}`,
      "background: red; color: #fff; font-size: 20px"
    );
  };

  const init = async () => {
    try {
      const { error, container } = await lookForAppContainer();
    } catch (err) {
      return handleContainerNotFound();
    }

    linkStyles();
    generateUiElements();
  };

  init();
})();
