"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_dashboard_VisitDashboardBreadcrum_jsx"],{

/***/ "./resources/js/components/dashboard/VisitDashboardBreadcrum.jsx":
/*!***********************************************************************!*\
  !*** ./resources/js/components/dashboard/VisitDashboardBreadcrum.jsx ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");




var VisitDashboardBreadcrum = function VisitDashboardBreadcrum(_ref) {
  var history = _ref.history,
    classes = _ref.classes;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
      return {
        company: state.orgs.company
      };
    }),
    company = _useSelector.company;
  var visit = function visit() {
    history.push("/dashboard");
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
    onClick: visit,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(classes, '_active')
  }, "Home");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.withRouter)(VisitDashboardBreadcrum));

/***/ })

}]);