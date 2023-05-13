// ==UserScript==
// @name         Jira Time Sheet Formatter
// @namespace    https://github.com/lukasz-brzozko/jira-timesheet-formatter
// @version      0.2
// @description  Format time into hours and minutes
// @author       Łukasz Brzózko
// @match        https://jira.nd0.pl/*
// @exclude      https://jira.nd0.pl/plugins/servlet/*
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
  const DEAFULT_BASE_URL = `https://jira.nd0.pl/rest/timesheet-gadget/1.0/timesheet.json?isGadget=true&baseUrl=https%3A%2F%2Fjira.nd0.pl&gadgetTitle=&startDate=&targetUser=&targetGroup=&collapseFieldGroups=false&excludeTargetGroup=&numOfWeeks=1&reportingDay=&projectOrFilter=&projectid=&filterid=&projectRoleId=&commentfirstword=&weekends=true&showDetails=true&sumSubTasks=false&showEmptyRows=false&groupByField=&moreFields=&offset=${WEEK_OFFSET}&page=1&monthView=false&sum=&sortBy=&sortDir=ASC&_=`;
  const JIRA_CUSTOM_URL = "JIRA_CUSTOM_URL";

  const MESSAGES = {
    containerFound: "Znaleziono kontener.",
    btnText: "Formatuj czasy",
    remainingTimeTitle: "Remaining time:",
    error: {
      default: "Wystąpił błąd. Spróbuj ponownie później.",
      wrongUrl: "Wystąpił błąd. Sprawdź poprawność podanego adresu URL.",
      containerNotFound: "Nie znaleziono kontenera. Skrypt został wstrzymany.",
    },
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
    settingsBtn: "settings-btn",
    myGadget: "my-gadget",
    toast: "toast",
    toastMessage: "toast-message",
    myModal: "my-modal",
    modalOverlay: "modal-overlay",
    modalCancelBtn: "modal-cancel-btn",
    modalConfirmBtn: "modal-confirm-btn",
    modalInputUrl: "modal-input-url",
  };

  const STATE = {
    loading: "loading",
    visible: "visible",
    complete: "complete",
    notComplete: "not-complete",
  };

  let controller;
  let formatterBtnEl;
  let layoutEl;
  let toastEl;
  let toastMessageEl;
  let dashboardContentEl;
  let settingsBtnEl;
  let myModalEl;
  let modalInputUrlEl;

  const linkStyles = async () => {
    const myCss = GM_getResourceText("styles");
    const styleTag = document.createElement("style");
    styleTag.textContent = myCss;

    document.body.prepend(styleTag);
  };

  const generateFetchUrl = () => {
    let baseUrl = DEAFULT_BASE_URL;
    const customUrl = localStorage.getItem(JIRA_CUSTOM_URL) ?? "";
    const trimmedUrl = customUrl.trim();

    if (trimmedUrl) {
      const lastParamIndex = trimmedUrl.lastIndexOf("=") + 1;
      const urlWithoutTimestamp = trimmedUrl.substring(0, lastParamIndex);

      baseUrl = urlWithoutTimestamp;
    }

    const now = new Date();
    const fetchUrl = `${baseUrl}${now.getTime()}`;

    return fetchUrl;
  };

  const toggleLoading = (force = undefined) => {
    formatterBtnEl?.classList.toggle(STATE.loading, force);
    layoutEl?.classList.toggle(STATE.loading, force);
  };

  const padNumber = (number, length = 1) =>
    number.toString().padStart(length, "0");

  const isBetween = (number, min, max) => {
    return number >= min && number < max;
  };

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
    remainingTimeRow.firstElementChild.textContent =
      MESSAGES.remainingTimeTitle;

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
      const response = await fetch(generateFetchUrl(), { signal });

      if (isBetween(response.status, 400, 500))
        return { error: MESSAGES.error.wrongUrl };

      if (!isBetween(response.status, 200, 300))
        return { error: MESSAGES.error.default };

      const { html: htmlData } = await response.json();

      html = htmlData;
    } catch (err) {
      error = err;
    }

    return { html, error };
  };

  const handleError = (error) => {
    toggleLoading(false);
    toastMessageEl.textContent = error;
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

  const toggleModal = (force = undefined) => {
    myModalEl.classList.toggle(STATE.visible, force);
  };

  const openModal = () => {
    const customUrl = localStorage.getItem(JIRA_CUSTOM_URL) ?? "";
    modalInputUrlEl.value = customUrl;

    toggleModal(true);
  };

  const hideModal = () => {
    toggleModal(false);
  };

  const handleConfirmModal = () => {
    localStorage.setItem(JIRA_CUSTOM_URL, modalInputUrlEl.value);

    hideModal();

    formatterBtnEl.click();
  };

  const generateUiElements = () => {
    const toastWrapper = document.createElement("div");
    const modal = document.createElement("div");
    const btnsWrapper = document.createElement("div");
    const formatterBtn = document.createElement("button");
    const settingsBtn = document.createElement("button");

    const fragment = new DocumentFragment();

    btnsWrapper.className = "btn-wrapper";

    settingsBtn.id = IDS.settingsBtn;
    settingsBtn.className = "btn btn--outline btn--small";
    settingsBtn.innerHTML = `
    <span class="btn-text">
      <svg class="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" tabindex="-1" title="Settings"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>
    </span>`;

    formatterBtn.id = IDS.formatterBtn;
    formatterBtn.className = "btn format-btn";
    formatterBtn.innerHTML = `
  <span class="btn-text">${MESSAGES.btnText}</span>
  <div class="spinner">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>`;

    modal.id = IDS.myModal;
    modal.className = "my-modal active";
    modal.innerHTML = `
    <div class="modal-overlay" id="modal-overlay"></div>
    <div class="modal-wrapper">
      <h2 class="modal-title">Skonfigurowana tabela</h2>
      <div class="modal-content-container">
        <p class="modal-desc">Podaj adres URL skonfigurowanej tabeli gadgetu Jira Time Sheet. Pozostaw puste aby skorzystać z domyślnej konfiguracji.</p>
        <div class="modal-form-wrapper">
          <label class="modal-label">API URL</label>
          <div class="modal-input-wrapper">
            <input class="modal-input" id="modal-input-url" value>
          </div>
        </div>
      </div>
      <div class="modal-btn-wrapper">
        <button class="btn btn--light" id="${IDS.modalCancelBtn}">Anuluj</button>
        <button class="btn" id="${IDS.modalConfirmBtn}">Zapisz</button>
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
    <div class="toast-message" id="${IDS.toastMessage}">${MESSAGES.error.default}</div>
  </div>`;

    btnsWrapper.appendChild(settingsBtn);
    btnsWrapper.appendChild(formatterBtn);
    fragment.appendChild(btnsWrapper);
    fragment.appendChild(toastWrapper);
    fragment.appendChild(modal);
    document.body.appendChild(fragment);

    formatterBtnEl = document.getElementById(IDS.formatterBtn);
    settingsBtnEl = document.getElementById(IDS.settingsBtn);
    toastEl = document.getElementById(IDS.toast);
    myModalEl = document.getElementById(IDS.myModal);
    toastMessageEl = toastEl.querySelector(`#${IDS.toastMessage}`);
    modalInputUrlEl = myModalEl.querySelector(`#${IDS.modalInputUrl}`);

    const modalOverlayEl = myModalEl.querySelector(`#${IDS.modalOverlay}`);
    const modalCancelBtnEl = myModalEl.querySelector(`#${IDS.modalCancelBtn}`);
    const modalConfirmBtnEl = myModalEl.querySelector(
      `#${IDS.modalConfirmBtn}`
    );

    formatterBtn.addEventListener("click", renderContent);
    settingsBtnEl.addEventListener("click", openModal);
    modalOverlayEl.addEventListener("click", hideModal);
    modalCancelBtnEl.addEventListener("click", hideModal);
    modalConfirmBtnEl.addEventListener("click", handleConfirmModal);
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
            reject({ error: MESSAGES.error.containerNotFound });
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
