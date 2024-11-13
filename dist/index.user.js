function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// ==UserScript==
// @name         Jira Time Sheet Formatter
// @namespace    https://github.com/lukasz-brzozko/jira-timesheet-formatter
// @version      2024-11-13
// @description  Format time into hours and minutes
// @author       Łukasz Brzózko
// @match        https://jira.nd0.pl/*
// @exclude      https://jira.nd0.pl/plugins/servlet/*
// @resource styles    https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/src/styles.css
// @icon         https://jira.nd0.pl/s/a3v501/940003/1dlckms/_/images/fav-jsw.png
// @updateURL    https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/dist/index.meta.js
// @downloadURL  https://raw.githubusercontent.com/lukasz-brzozko/jira-timesheet-formatter/main/dist/index.user.js
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  "use strict";

  var WORK_DAY_SHIFT_HOURS = 7.5;
  var DEAFULT_BASE_URL = "https://jira.nd0.pl/rest/timesheet-gadget/1.0/timesheet.json?isGadget=true&baseUrl=https%3A%2F%2Fjira.nd0.pl&gadgetTitle=&startDate=&targetUser=&targetGroup=&collapseFieldGroups=false&excludeTargetGroup=&numOfWeeks=1&reportingDay=&projectOrFilter=&projectid=&filterid=&projectRoleId=&commentfirstword=&weekends=false&showDetails=true&sumSubTasks=false&showEmptyRows=false&groupByField=&moreFields=&offset=0&page=1&monthView=false&sum=&sortBy=&sortDir=ASC&_=";
  var JIRA_CUSTOM_URL = "JIRA_CUSTOM_URL";
  var JIRA_WEEK_OFFSET = "JIRA_WEEK_OFFSET";
  var DRAFT_SCHEDULE = "DRAFT_SCHEDULE";
  var MESSAGES = {
    containerFound: "Znaleziono kontener.",
    btnText: "Formatuj czasy",
    remainingTimeTitle: "Remaining time:",
    modal: {
      title: "Skonfigurowana tabela",
      desc: "Podaj API URL skonfigurowanej tabeli gadgetu Jira Time Sheet. Pozostaw puste, aby skorzystać z domyślnej konfiguracji.",
      label: "API URL",
      offsetLabel: "OFFSET",
      cancelBtn: "Anuluj",
      confirmBtn: "Zapisz",
      timeCalcLabel: "Wprowadź czas który chcesz przeliczyć",
      buttonTimeCalculation: "Policz"
    },
    error: {
      "default": "Wystąpił błąd. Spróbuj ponownie później.",
      wrongUrl: "Wystąpił błąd. Sprawdź poprawność podanego adresu API URL.",
      containerNotFound: "Nie znaleziono kontenera. Skrypt został wstrzymany.",
      modal: {
        inputUrl: "Podano nieprawidłowy URL. Adres powinien być zgodny ze schematem: https://jira.nd0.pl/rest/timesheet-gadget/1.0/timesheet.json?{parametry}={trzynaście cyfr}"
      }
    }
  };
  var SELECTORS = {
    cellWithValue: "td.nav.border.workedDay",
    rowFooter: ".rowFooter",
    footerCell: ".rowFooter .workedDay > b",
    summaryCells: "tbody > tr > td:last-child > b",
    tableBody: "#issuetable > tbody",
    boldCell: "td > b",
    modalInput: ".modal-input",
    modalFormWrapper: ".modal-form-wrapper"
  };
  var IDS = {
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
    modalFormWrapper: "modal-form-wrapper",
    modalFormOffsetWrapper: "modal-form-offset-wrapper",
    modalInputUrl: "modal-input-url",
    modalInputOffset: "modal-input-offset",
    modalInputErrorWrapper: "modal-input-error-wrapper",
    modalInputTimeCalc: "modal-input-time-calc",
    modalCalcTimeBtn: "modal-calc-time-btn",
    modalResultTimeCalc: "modal-result-time-calc"
  };
  var STATE = {
    loading: "loading",
    visible: "visible",
    complete: "complete",
    notComplete: "not-complete",
    focus: "focus",
    filled: "filled",
    disabled: "disabled"
  };
  var controller;
  var formatterBtnEl;
  var layoutEl;
  var toastEl;
  var toastMessageEl;
  var dashboardContentEl;
  var settingsBtnEl;
  var myModalEl;
  var modalCancelBtnEl;
  var modalConfirmBtnEl;
  var modalCalcTimeBtnEl;
  var modalFormWrapperEl;
  var modalInputUrlEl;
  var modalInputOffsetEl;
  var modalInputTimeCalcEl;
  var modalResultTimeCalcEl;
  var modalInputErrorWrapperEl;
  var modalInputsEls = [];
  var linkStyles = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var myCss, styleTag;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            myCss = GM_getResourceText("styles");
            styleTag = document.createElement("style");
            styleTag.textContent = myCss;
            document.body.prepend(styleTag);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function linkStyles() {
      return _ref.apply(this, arguments);
    };
  }();
  var generateFetchUrl = function generateFetchUrl() {
    var _localStorage$getItem;
    var baseUrl = DEAFULT_BASE_URL;
    var customUrl = (_localStorage$getItem = localStorage.getItem(JIRA_CUSTOM_URL)) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : "";
    var trimmedUrl = customUrl.trim();
    if (trimmedUrl) {
      var lastParamIndex = trimmedUrl.lastIndexOf("=") + 1;
      var urlWithoutTimestamp = trimmedUrl.substring(0, lastParamIndex);
      baseUrl = urlWithoutTimestamp;
    }
    var now = new Date();
    var fetchUrl = "".concat(baseUrl).concat(now.getTime());
    var customWeekOffset = localStorage.getItem(JIRA_WEEK_OFFSET);
    var parsedCustomWeekOffset = parseInt(customWeekOffset, 10);
    if (isNaN(parsedCustomWeekOffset)) return fetchUrl;
    var url = new URL(fetchUrl);
    var urlParams = new URLSearchParams(url.search);
    urlParams.set("offset", customWeekOffset);
    url.search = urlParams.toString();
    return url;
  };
  var toggleLoading = function toggleLoading() {
    var _formatterBtnEl, _layoutEl;
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    (_formatterBtnEl = formatterBtnEl) === null || _formatterBtnEl === void 0 || _formatterBtnEl.classList.toggle(STATE.loading, force);
    (_layoutEl = layoutEl) === null || _layoutEl === void 0 || _layoutEl.classList.toggle(STATE.loading, force);
  };
  var padNumber = function padNumber(number) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return number.toString().padStart(length, "0");
  };
  var isBetween = function isBetween(number, min, max) {
    return number >= min && number < max;
  };
  var formatValue = function formatValue(_ref2) {
    var cell = _ref2.cell,
      cellContent = _ref2.cellContent;
    var cellNumber = cellContent.slice(0, -1);
    var separatorIndex = cellNumber.indexOf(".");
    var hours = separatorIndex !== -1 ? cellNumber.slice(0, separatorIndex) : cellNumber;
    var fraction = separatorIndex !== -1 ? "0.".concat(cellNumber.slice(separatorIndex + 1)) : 0;
    var minutes = Math.round(parseFloat(fraction) * 60);
    var padHours = padNumber(hours, 1);
    var padMinutes = padNumber(minutes, 2);
    cell.textContent = "".concat(padHours, "h ").concat(padMinutes, "m");
  };
  var handleMainCells = function handleMainCells(cellsArr) {
    cellsArr.forEach(function (cell) {
      var _cell$childNodes = _slicedToArray(cell.childNodes, 1),
        firstChild = _cell$childNodes[0];
      var cellContent = firstChild.textContent.trim();
      if (!cellContent) return;
      formatValue({
        cell: cell,
        cellContent: cellContent
      });
    });
  };
  var handleBoldCells = function handleBoldCells(cellsArr) {
    cellsArr.forEach(function (cell) {
      var cellContent = cell.textContent.trim();
      if (!cellContent) return;
      formatValue({
        cell: cell,
        cellContent: cellContent
      });
    });
  };
  var calculateRemainingTime = function calculateRemainingTime(cell) {
    var cellContent = cell.textContent.trim();
    if (!cellContent) return;
    var cellValue = parseFloat(cellContent);
    var remainingTime = WORK_DAY_SHIFT_HOURS - cellValue;
    cell.textContent = "".concat(remainingTime, "h");
    var cellParent = cell.parentElement.classList.add(remainingTime > 0 ? STATE.notComplete : STATE.complete);
  };
  var generateRemainingTimeRow = function generateRemainingTimeRow(row) {
    if (row === null) return null;
    var remainingTimeRow = row.cloneNode(true);
    remainingTimeRow.classList.add("remaining-time");
    var boldCells = remainingTimeRow.querySelectorAll(SELECTORS.boldCell);
    boldCells[boldCells.length - 1].textContent = "";
    remainingTimeRow.firstElementChild.textContent = MESSAGES.remainingTimeTitle;
    boldCells.forEach(calculateRemainingTime);
    return remainingTimeRow;
  };
  var calculateCellValues = function calculateCellValues(_ref3) {
    var layoutEl = _ref3.layoutEl;
    var tableBody = layoutEl.querySelector(SELECTORS.tableBody);
    var rowFooter = tableBody.querySelector(SELECTORS.rowFooter);
    var remainingTimeRow = generateRemainingTimeRow(rowFooter);
    if (remainingTimeRow !== null) {
      tableBody.appendChild(remainingTimeRow);
    }
    var cells = tableBody.querySelectorAll(SELECTORS.cellWithValue);
    var rowFooterCells = tableBody.querySelectorAll(SELECTORS.footerCell);
    var summaryCells = tableBody.querySelectorAll(SELECTORS.summaryCells);
    handleMainCells(cells);
    handleBoldCells([].concat(_toConsumableArray(rowFooterCells), _toConsumableArray(summaryCells)));
    toggleLoading(false);
  };
  var renderLayout = function renderLayout(_ref4) {
    var layoutEl = _ref4.layoutEl,
      html = _ref4.html;
    var myGadgetEl = layoutEl.querySelector("#".concat(IDS.myGadget));
    myGadgetEl.innerHTML = html;
    calculateCellValues({
      layoutEl: layoutEl
    });
  };
  var renderInitialLayout = function renderInitialLayout(_ref5) {
    var layoutEl = _ref5.layoutEl,
      html = _ref5.html;
    layoutEl.innerHTML = "\n  <div class=\"layout layout-a\">\n    <div class=\"my-gadget gadget color1\" id=\"".concat(IDS.myGadget, "\">\n      ").concat(html, "\n    </div>\n  </div>\n\n  <div aria-hidden=\"true\" class=\"backdrop\">\n    <span class=\"backdrop-container\" role=\"progressbar\" style=\"width: 40px; height: 40px;\">\n      <svg class=\"backdrop-svg\" viewBox=\"22 22 44 44\">\n        <circle class=\"backdrop-circle\" cx=\"44\" cy=\"44\" r=\"20.2\" fill=\"none\" stroke-width=\"3.6\"></circle>\n      </svg>\n    </span>\n  </div>\n");
    calculateCellValues({
      layoutEl: layoutEl
    });
  };
  var fetchData = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _controller;
      var _controller2, signal, html, error, response, _yield$response$json, htmlData;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            (_controller = controller) === null || _controller === void 0 || _controller.abort();
            controller = new AbortController();
            _controller2 = controller, signal = _controller2.signal;
            _context2.prev = 3;
            _context2.next = 6;
            return fetch(generateFetchUrl(), {
              signal: signal
            });
          case 6:
            response = _context2.sent;
            if (!isBetween(response.status, 400, 500)) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", {
              error: MESSAGES.error.wrongUrl
            });
          case 9:
            if (isBetween(response.status, 200, 300)) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", {
              error: MESSAGES.error["default"]
            });
          case 11:
            _context2.next = 13;
            return response.json();
          case 13:
            _yield$response$json = _context2.sent;
            htmlData = _yield$response$json.html;
            html = htmlData;
            _context2.next = 21;
            break;
          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](3);
            error = _context2.t0;
          case 21:
            return _context2.abrupt("return", {
              html: html,
              error: error
            });
          case 22:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 18]]);
    }));
    return function fetchData() {
      return _ref6.apply(this, arguments);
    };
  }();
  var handleError = function handleError(error) {
    toggleLoading(false);
    toastMessageEl.textContent = error;
    void toastEl.offsetWidth; // Force reflow
    toastEl.classList.add(STATE.visible);
    console.clear();
    console.error(error);
  };
  var renderContent = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _yield$fetchData, html, error;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            layoutEl = document.getElementById(IDS.layout);
            toggleLoading(true);
            toastEl.classList.remove(STATE.visible);
            _context3.next = 5;
            return fetchData();
          case 5:
            _yield$fetchData = _context3.sent;
            html = _yield$fetchData.html;
            error = _yield$fetchData.error;
            if (!error) {
              _context3.next = 10;
              break;
            }
            return _context3.abrupt("return", handleError(error));
          case 10:
            if (!(layoutEl !== null)) {
              _context3.next = 12;
              break;
            }
            return _context3.abrupt("return", renderLayout({
              layoutEl: layoutEl,
              html: html
            }));
          case 12:
            layoutEl = document.createElement("div");
            layoutEl.id = IDS.layout;
            renderInitialLayout({
              layoutEl: layoutEl,
              html: html
            });
            dashboardContentEl.appendChild(layoutEl);
          case 16:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function renderContent() {
      return _ref7.apply(this, arguments);
    };
  }();
  var toggleModalFormWrapperFilledState = function toggleModalFormWrapperFilledState(input) {
    var isInputEmpty = input.value === "";
    var inputWrapper = input.closest(SELECTORS.modalFormWrapper);
    inputWrapper.classList.toggle(STATE.filled, !isInputEmpty);
  };
  var setInputCustomUrl = function setInputCustomUrl() {
    var _localStorage$getItem2;
    var customUrl = (_localStorage$getItem2 = localStorage.getItem(JIRA_CUSTOM_URL)) !== null && _localStorage$getItem2 !== void 0 ? _localStorage$getItem2 : "";
    modalInputUrlEl.value = customUrl;
  };
  var setInputCustomWeekOffset = function setInputCustomWeekOffset() {
    var _localStorage$getItem3;
    var customWeekOffset = (_localStorage$getItem3 = localStorage.getItem(JIRA_WEEK_OFFSET)) !== null && _localStorage$getItem3 !== void 0 ? _localStorage$getItem3 : "";
    modalInputOffsetEl.value = customWeekOffset;
  };
  var handleModalTransitionEnd = function handleModalTransitionEnd(e) {
    setInputCustomUrl();
    setInputCustomWeekOffset();
    modalInputsEls.forEach(function (input) {
      return toggleModalFormWrapperFilledState(input);
    });
    myModalEl.removeEventListener("transitionend", handleModalTransitionEnd);
  };
  var toggleModal = function toggleModal() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    myModalEl.classList.toggle(STATE.visible, force);
  };
  var openModal = function openModal() {
    setInputCustomUrl();
    setInputCustomWeekOffset();
    modalInputsEls.forEach(function (input) {
      return toggleModalFormWrapperFilledState(input);
    });
    toggleModal(true);
  };
  var closeModal = function closeModal() {
    toggleModal(false);
  };
  var handleCancelModal = function handleCancelModal() {
    myModalEl.addEventListener("transitionend", handleModalTransitionEnd);
    closeModal();
    toggleModalError(false);
  };
  var toggleModalError = function toggleModalError(force) {
    modalInputErrorWrapperEl.classList.toggle(STATE.visible, force);
    modalConfirmBtnEl.toggleAttribute(STATE.disabled, force);
  };
  var validateInputUrl = function validateInputUrl() {
    var regExp = new RegExp(/^https:\/\/jira\.nd0\.pl\/rest\/timesheet-gadget\/1\.0\/timesheet\.json\?.*=\d{13}$/);
    var isInputEmpty = modalInputUrlEl.value === "";
    var isValueValid = modalInputUrlEl.value.match(regExp);
    var isInputValid = !(!isInputEmpty && !isValueValid);
    return isInputValid;
  };
  var handleConfirmModal = function handleConfirmModal() {
    var isUrlInputValid = validateInputUrl();
    if (!isUrlInputValid) return toggleModalError(true);
    localStorage.setItem(JIRA_WEEK_OFFSET, modalInputOffsetEl.value.trim());
    localStorage.setItem(JIRA_CUSTOM_URL, modalInputUrlEl.value.trim());
    closeModal();
    formatterBtnEl.click();
  };
  var handleInputFocus = function handleInputFocus(e) {
    var inputWrapper = e.target.closest(SELECTORS.modalFormWrapper);
    inputWrapper.classList.add(STATE.focus);
  };
  var handleInputBlur = function handleInputBlur(e) {
    var target = e.target;
    var isInputValid = target.checkValidity();
    if (!isInputValid) target.value = "";
    var inputWrapper = target.closest(SELECTORS.modalFormWrapper);
    inputWrapper.classList.remove(STATE.focus);
  };
  var handleInputChange = function handleInputChange(e) {
    var target = e.target;
    var isInputEmpty = target.value === "";
    var inputWrapper = target.closest(SELECTORS.modalFormWrapper);
    inputWrapper.classList.toggle(STATE.filled, !isInputEmpty);
  };
  var handleInput = function handleInput() {
    if (!modalInputErrorWrapperEl.classList.contains(STATE.visible)) return;
    toggleModalError(false);
  };
  var generateBtnsWrapper = function generateBtnsWrapper() {
    var btnsWrapper = document.createElement("div");
    btnsWrapper.className = "btn-wrapper";
    return btnsWrapper;
  };
  var generateSettingsBtn = function generateSettingsBtn() {
    var settingsBtn = document.createElement("button");
    settingsBtn.id = IDS.settingsBtn;
    settingsBtn.className = "btn btn--outline btn--small";
    settingsBtn.innerHTML = "\n      <span class=\"btn-text\">\n        <svg class=\"icon\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" tabindex=\"-1\" title=\"Settings\"><path d=\"M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z\"></path></svg>\n      </span>";
    return settingsBtn;
  };
  var generateFormatterBtn = function generateFormatterBtn() {
    var formatterBtn = document.createElement("button");
    formatterBtn.id = IDS.formatterBtn;
    formatterBtn.className = "btn format-btn";
    formatterBtn.innerHTML = "\n      <span class=\"btn-text\">".concat(MESSAGES.btnText, "</span>\n      <div class=\"spinner\">\n        <div class=\"lds-ripple\">\n          <div></div>\n          <div></div>\n        </div>\n      </div>");
    return formatterBtn;
  };
  var generateTodaySchedule = function generateTodaySchedule() {
    var emptyValues = [null, "null"];
    var draftScheduleString = localStorage.getItem(DRAFT_SCHEDULE);
    var draftScheduleStringToParse = emptyValues.includes(draftScheduleString) ? '"0h 00m \\"zadanie 1\\"\\n0h 00m \\"zadanie 2\\""' : draftScheduleString;
    var draftSchedule = JSON.parse(draftScheduleStringToParse);
    return draftSchedule || "";
  };
  var generateModal = function generateModal() {
    var _localStorage$getItem4, _localStorage$getItem5;
    var modal = document.createElement("div");
    modal.id = IDS.myModal;
    modal.className = "my-modal active";
    modal.innerHTML = "\n      <div class=\"modal-overlay\" id=\"modal-overlay\"></div>\n      <div class=\"modal-wrapper\">\n        <h2 class=\"modal-title\">".concat(MESSAGES.modal.title, "</h2>\n        <div class=\"modal-content-container\">\n          <p class=\"modal-desc\">").concat(MESSAGES.modal.desc, "</p>\n          <div class=\"modal-form-wrapper ").concat(((_localStorage$getItem4 = localStorage.getItem(JIRA_CUSTOM_URL)) !== null && _localStorage$getItem4 !== void 0 ? _localStorage$getItem4 : "") && STATE.filled, "\" id=\"").concat(IDS.modalFormWrapper, "\">\n            <label class=\"modal-label\">").concat(MESSAGES.modal.label, "</label>\n            <div class=\"modal-input-wrapper\">\n              <input class=\"modal-input\" id=\"modal-input-url\" value>\n            </div>\n            <div class=\"modal-input-error-wrapper\" id=\"").concat(IDS.modalInputErrorWrapper, "\">\n              <p class=\"modal-input-error\">").concat(MESSAGES.error.modal.inputUrl, "</p>\n            </div>\n          </div>\n          <div class=\"modal-form-wrapper ").concat(((_localStorage$getItem5 = localStorage.getItem(JIRA_WEEK_OFFSET)) !== null && _localStorage$getItem5 !== void 0 ? _localStorage$getItem5 : "") && STATE.filled, "\" id=\"").concat(IDS.modalFormOffsetWrapper, "\">\n            <label class=\"modal-label\">").concat(MESSAGES.modal.offsetLabel, "</label>\n            <div class=\"modal-input-wrapper\">\n              <input type=\"number\" class=\"modal-input\" id=\"modal-input-offset\" value>\n            </div>\n            <div class=\"modal-input-error-wrapper\">\n              <p class=\"modal-input-error\"></p>\n            </div>\n          </div>\n          <div class=\"modal-form-wrapper\" id=\"").concat(IDS.modalFormWrapper, "\">\n            <label class=\"modal-label\">").concat(MESSAGES.modal.timeCalcLabel, "</label>\n            <div class=\"modal-input-wrapper\">\n              <textarea rows=\"5\" class=\"modal-input\" id=\"").concat(IDS.modalInputTimeCalc, "\" style=\"height: 60px;\" placeholder=\"\">").concat(generateTodaySchedule(), "</textarea>\n            </div>\n            <div id=\"").concat(IDS.modalResultTimeCalc, "\" style=\"padding-top: 20px; padding-bottom: 10px;\"/>\n           </div>\n        </div>\n        <div class=\"modal-btn-wrapper\" style=\"justify-content: space-between;\">\n         <div>\n    <button class=\"btn btn--light\" id=\"").concat(IDS.modalCalcTimeBtn, "\">").concat(MESSAGES.modal.buttonTimeCalculation, "</button>\n         </div>\n         <div>\n    <button class=\"btn btn--light\" id=\"").concat(IDS.modalCancelBtn, "\">").concat(MESSAGES.modal.cancelBtn, "</button>\n          <button class=\"btn\" id=\"").concat(IDS.modalConfirmBtn, "\">").concat(MESSAGES.modal.confirmBtn, "</button>\n         </div>\n        </div>\n      </div>");
    return modal;
  };
  var generateToast = function generateToast() {
    var toastWrapper = document.createElement("div");
    toastWrapper.innerHTML = "\n    <div id=\"toast\" class=\"toast error\" role=\"alert\">\n      <div class=\"toast-icon-container\">\n        <svg\n          class=\"toast-icon toast-icon--error\"\n          focusable=\"false\"\n          aria-hidden=\"true\"\n          viewBox=\"0 0 24 24\"\n        >\n          <path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"></path>\n        </svg>\n      </div>\n      <div class=\"toast-message\" id=\"".concat(IDS.toastMessage, "\">").concat(MESSAGES.error["default"], "</div>\n    </div>");
    return toastWrapper;
  };
  var parseAndCalculate = function parseAndCalculate() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var valueToStore = input ? JSON.stringify(input) : null;
    localStorage.setItem(DRAFT_SCHEDULE, valueToStore);
    // Regex patterns
    var regexHour = /(\d+(\.\d+)?)(?=\s?h)/g;
    var regexMinute = /(\d+(\.\d+)?)(?=\s?m?\b(?!d|w))/g;
    var regexMD = /(\d+(\.\d+)?)(?=\s?md\b)/gi;
    var regexWeekend = /(\d+(\.\d+)?)(?=\s?w\b)/gi;
    var regexTicket = /(ORB2BPOO|ORPP|B2BM|CEB2B|BPFOO|CRMO)-\d+/g;
    var regexQuote = /"(.*?)"/g;
    var totalMinutes = 0;
    var parsedLines = input.split(/\n/).map(function (line) {
      var lineWithoutQuotes = line.replace(regexQuote, '""'); // Remove quoted text for calculation
      var hours = 0,
        minutes = 0,
        mds = 0,
        weekends = 0;

      // Convert JIRA tickets to <a> tags in the original line
      line = line.replace(regexTicket, function (match) {
        return "<a href=\"https://jira.nd0.pl/browse/".concat(match, "\" target=\"_blank\">").concat(match, "</a>");
      });

      // Parse hours, minutes, MDs, and weekends from the unquoted portion
      (lineWithoutQuotes.match(regexHour) || []).forEach(function (hour) {
        hours += parseFloat(hour);
      });
      (lineWithoutQuotes.match(regexMinute) || []).forEach(function (minute) {
        minutes += parseFloat(minute);
      });
      (lineWithoutQuotes.match(regexMD) || []).forEach(function (md) {
        mds += parseFloat(md) * 8;
      });
      (lineWithoutQuotes.match(regexWeekend) || []).forEach(function (weekend) {
        weekends += parseFloat(weekend) * 5 * 8;
      });

      // Convert total time for this line to minutes and add to total
      totalMinutes += hours * 60 + minutes + mds * 60 + weekends * 60;

      // Return the processed line with "<br />" for newlines
      return line + "<br />";
    });

    // Convert total minutes to hours and minutes for final output
    var finalHours = Math.floor(totalMinutes / 60);
    var finalMinutes = totalMinutes % 60;

    // Create final output with a separator and the total time
    var result = parsedLines.join("") + "____________________<br />\n<strong>".concat(finalHours, "h ").concat(padNumber(finalMinutes, 2), "m</strong>");
    return result;
  };
  var calculateTime = function calculateTime() {
    var _modalInputTimeCalcEl = modalInputTimeCalcEl,
      value = _modalInputTimeCalcEl.value;
    var result = parseAndCalculate(value);
    modalResultTimeCalcEl.innerHTML = result;
  };
  var generateUiElements = function generateUiElements() {
    var fragment = new DocumentFragment();
    var btnsWrapper = generateBtnsWrapper();
    var settingsBtn = generateSettingsBtn();
    var formatterBtn = generateFormatterBtn();
    var toastWrapper = generateToast();
    var modal = generateModal();
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
    toastMessageEl = toastEl.querySelector("#".concat(IDS.toastMessage));
    modalInputsEls = myModalEl.querySelectorAll(SELECTORS.modalInput);
    modalFormWrapperEl = myModalEl.querySelector("#".concat(IDS.modalFormWrapper));
    modalInputErrorWrapperEl = myModalEl.querySelector("#".concat(IDS.modalInputErrorWrapper));
    modalCancelBtnEl = myModalEl.querySelector("#".concat(IDS.modalCancelBtn));
    modalConfirmBtnEl = myModalEl.querySelector("#".concat(IDS.modalConfirmBtn));
    modalCalcTimeBtnEl = myModalEl.querySelector("#".concat(IDS.modalCalcTimeBtn));
    modalResultTimeCalcEl = myModalEl.querySelector("#".concat(IDS.modalResultTimeCalc));
    var modalOverlayEl = myModalEl.querySelector("#".concat(IDS.modalOverlay));
    var _modalInputsEls = modalInputsEls;
    var _modalInputsEls2 = _slicedToArray(_modalInputsEls, 3);
    modalInputUrlEl = _modalInputsEls2[0];
    modalInputOffsetEl = _modalInputsEls2[1];
    modalInputTimeCalcEl = _modalInputsEls2[2];
    formatterBtn.addEventListener("click", renderContent);
    settingsBtnEl.addEventListener("click", openModal);
    modalOverlayEl.addEventListener("click", handleCancelModal);
    modalCalcTimeBtnEl.addEventListener("click", calculateTime);
    modalCancelBtnEl.addEventListener("click", handleCancelModal);
    modalConfirmBtnEl.addEventListener("click", handleConfirmModal);
    modalInputUrlEl.addEventListener("input", handleInput);
    modalInputsEls.forEach(function (input) {
      input.addEventListener("focus", handleInputFocus);
      input.addEventListener("blur", handleInputBlur);
      input.addEventListener("change", handleInputChange);
    });
  };
  var lookForAppContainer = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var DOMElements;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new Promise(function (resolve, reject) {
              var maxAttempts = 50;
              var attempt = 0;
              var setIntervalId = setInterval(function () {
                dashboardContentEl = document.getElementById(IDS.dashboardContent);
                if (dashboardContentEl) {
                  clearInterval(setIntervalId);
                  window.console.info("%c ".concat(MESSAGES.containerFound), "background: #B7E1CD; color: #000; font-size: 20px");
                  resolve({
                    container: dashboardContentEl
                  });
                } else {
                  if (attempt >= maxAttempts) {
                    clearInterval(setIntervalId);
                    reject({
                      error: MESSAGES.error.containerNotFound
                    });
                  } else {
                    attempt++;
                  }
                }
              }, 300);
            });
          case 2:
            DOMElements = _context4.sent;
            return _context4.abrupt("return", DOMElements);
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function lookForAppContainer() {
      return _ref8.apply(this, arguments);
    };
  }();
  var handleContainerNotFound = function handleContainerNotFound() {
    window.console.error("%c ".concat(MESSAGES.error), "background: red; color: #fff; font-size: 20px");
  };
  var init = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var _yield$lookForAppCont, error, container;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return lookForAppContainer();
          case 3:
            _yield$lookForAppCont = _context5.sent;
            error = _yield$lookForAppCont.error;
            container = _yield$lookForAppCont.container;
            _context5.next = 11;
            break;
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", handleContainerNotFound());
          case 11:
            linkStyles();
            generateUiElements();
          case 13:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 8]]);
    }));
    return function init() {
      return _ref9.apply(this, arguments);
    };
  }();
  init();
})();