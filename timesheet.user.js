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
  };

  const baseURL =
    "https://jira.nd0.pl/rest/timesheet-gadget/1.0/timesheet.json?isGadget=true&baseUrl=https%3A%2F%2Fjira.nd0.pl&gadgetTitle=&startDate=&targetUser=&targetGroup=&collapseFieldGroups=false&excludeTargetGroup=&numOfWeeks=1&reportingDay=&projectOrFilter=&projectid=&filterid=&projectRoleId=&commentfirstword=&weekends=true&showDetails=true&sumSubTasks=false&showEmptyRows=false&groupByField=&moreFields=&offset=-1&page=1&monthView=false&sum=&sortBy=&sortDir=ASC&_=";
  const now = new Date();

  let controller;

  const linkStyles = async () => {
    const myCss = GM_getResourceText("styles");
    const styleTag = document.createElement("style");
    styleTag.textContent = myCss;

    document.body.prepend(styleTag);
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

  const renderLayout = ({ layoutEl, html }) => {
    layoutEl.innerHTML = `
  <div class="layout layout-a">
    <div class="my-gadget gadget color1" style="position:relative">
      ${html}
    </div>
  </div>
  `;

    const cells = layoutEl.querySelectorAll(SELECTORS.cellWithValue);
    const rowFooterCells = layoutEl.querySelectorAll(SELECTORS.footerCell);
    const summaryCells = layoutEl.querySelectorAll(SELECTORS.summaryCells);

    handleMainCells(cells);
    handleBoldCells([...rowFooterCells, ...summaryCells]);
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
    const { html } = await fetchData();

    const dashboardContentEl = document.getElementById(IDS.dashboardContent);
    let layoutEl = document.getElementById(IDS.layout);

    if (layoutEl !== null) return renderLayout({ layoutEl, html });

    layoutEl = document.createElement("div");
    layoutEl.id = IDS.layout;
    renderLayout({ layoutEl, html });

    dashboardContentEl.appendChild(layoutEl);
  };

  const generateBtn = () => {
    const formatterBtn = document.createElement("button");
    formatterBtn.textContent = "Formatuj czas";
    formatterBtn.style =
      "position:fixed;bottom:0;left:0;width:188px;height:100px;cursor:pointer;font-size:26px;";
    document.body.appendChild(formatterBtn);

    formatterBtn.addEventListener("click", renderContent);
  };

  const init = () => {
    linkStyles();
    generateBtn();
  };

  init();
})();
