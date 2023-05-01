// ==UserScript==
// @name         Jira Time Sheet Formatter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira.nd0.pl/secure/Dashboard.jspa
// @resource styles    https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/styles.css
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nd0.pl
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";

  const myCss = GM_getResourceText("styles");
  const styles = document.createElement("style");
  styles.textContent = myCss;

  document.body.prepend(styles);

  const SELECTORS = {
    dashboardContent: "#dashboard-content",
  };

  const baseURL =
    "https://jira.nd0.pl/rest/timesheet-gadget/1.0/timesheet.json?isGadget=true&baseUrl=https%3A%2F%2Fjira.nd0.pl&gadgetTitle=&startDate=&targetUser=&targetGroup=&collapseFieldGroups=false&excludeTargetGroup=&numOfWeeks=1&reportingDay=&projectOrFilter=&projectid=&filterid=&projectRoleId=&commentfirstword=&weekends=true&showDetails=true&sumSubTasks=false&showEmptyRows=false&groupByField=&moreFields=&offset=-1&page=1&monthView=false&sum=&sortBy=&sortDir=ASC&_=";
  const now = new Date();

  let controller;

  const fetchData = async () => {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    const response = await fetch(`${baseURL}${now.getTime()}`, { signal });
    const { html } = await response.json();
    // console.log(html);

    const dashboardContentEl = document.querySelector(
      SELECTORS.dashboardContent
    );

    const layoutEl = document.createElement("div");
    layoutEl.innerHTML = `
    <div class="layout layout-a">
      <div class="my-gadget gadget color1" style="position:relative">
        ${html}
      </div>
    </div>
    `;

    dashboardContentEl.appendChild(layoutEl);
  };

  const generateBtn = () => {
    const formatterBtn = document.createElement("button");
    formatterBtn.textContent = "Formatuj czas";
    formatterBtn.style =
      "position:fixed;bottom:0;left:0;width:188px;height:100px;cursor:pointer;font-size:26px;";
    document.body.appendChild(formatterBtn);

    formatterBtn.addEventListener("click", fetchData);
  };

  generateBtn();
})();
