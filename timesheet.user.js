// ==UserScript==
// @name         Jira Time Sheet Formatter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira.nd0.pl/secure/Dashboard.jspa
// @resource styles    https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/styles.css
// @icon         https://jira.nd0.pl/s/a3v501/940003/1dlckms/_/images/fav-jsw.png
// @updateURL    https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/timesheet.meta.js
// @downloadURL  https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/timesheet.user.js
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";

  const SELECTORS = {
    cellWithValue: "td.nav.border.workedDay",
    footerCell: ".rowFooter .workedDay > b",
    summaryCells: "tbody > tr > td:last-child > b",
  };

  const IDS = {
    dashboardContent: "dashboard-content",
    layout: "my-layout",
    formatterBtn: "formatter-btn",
    myGadget: "my-gadget",
  };

  const STATE = {
    loading: "loading",
  };

  const baseURL =
    "https://jira.nd0.pl/rest/timesheet-gadget/1.0/timesheet.json?isGadget=true&baseUrl=https%3A%2F%2Fjira.nd0.pl&gadgetTitle=&startDate=&targetUser=&targetGroup=&collapseFieldGroups=false&excludeTargetGroup=&numOfWeeks=1&reportingDay=&projectOrFilter=&projectid=&filterid=&projectRoleId=&commentfirstword=&weekends=true&showDetails=true&sumSubTasks=false&showEmptyRows=false&groupByField=&moreFields=&offset=-1&page=1&monthView=false&sum=&sortBy=&sortDir=ASC&_=";
  const now = new Date();

  let controller;
  let formatterBtnEl;
  let layoutEl;

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

  const formatValue = ({ cell, cellContent }) => {
    const cellNumber = cellContent.slice(0, -1);
    const separatorIndex = cellNumber.indexOf(".");
    const hours =
      separatorIndex !== -1 ? cellNumber.slice(0, separatorIndex) : cellNumber;

    const fraction =
      separatorIndex !== -1 ? `0.${cellNumber.slice(separatorIndex + 1)}` : 0;
    const minutes = Math.round(parseFloat(fraction) * 60);
    const padMinutes = minutes.toString().padStart(2, "0");

    cell.textContent = `${hours}h ${padMinutes}m`;
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

  const calculateCellValues = ({ layoutEl }) => {
    const cells = layoutEl.querySelectorAll(SELECTORS.cellWithValue);
    const rowFooterCells = layoutEl.querySelectorAll(SELECTORS.footerCell);
    const summaryCells = layoutEl.querySelectorAll(SELECTORS.summaryCells);

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
<div class="layout layout-a" >
  <div class="my-gadget gadget color1" id="${IDS.myGadget}" style="position:relative">
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

    const response = await fetch(`${baseURL}${now.getTime()}`, { signal });
    const { html } = await response.json();

    return { html };
  };

  const renderContent = async () => {
    layoutEl = document.getElementById(IDS.layout);
    const dashboardContentEl = document.getElementById(IDS.dashboardContent);

    toggleLoading(true);

    const { html } = await fetchData();

    if (layoutEl !== null) return renderLayout({ layoutEl, html });

    layoutEl = document.createElement("div");
    layoutEl.id = IDS.layout;
    renderInitialLayout({ layoutEl, html });

    dashboardContentEl.appendChild(layoutEl);
  };

  const generateBtn = () => {
    const formatterBtn = document.createElement("button");
    formatterBtn.id = IDS.formatterBtn;
    formatterBtn.className = "btn";
    formatterBtn.innerHTML = `
      <span class="btn-text">Formatuj czas</span>
      <div class="spinner">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>`;
    document.body.appendChild(formatterBtn);

    formatterBtnEl = document.getElementById(IDS.formatterBtn);

    formatterBtn.addEventListener("click", renderContent);
  };

  const init = () => {
    linkStyles();
    generateBtn();
  };

  init();
})();
