"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_layouts_RightSidebar_js"],{

/***/ "./resources/js/layouts/RightSidebar.js":
/*!**********************************************!*\
  !*** ./resources/js/layouts/RightSidebar.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var simplebar_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! simplebar-react */ "./node_modules/simplebar-react/dist/simplebar-react.esm.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./resources/js/actions/index.js");
// @flow



 // actions

 // type RightSideBarProps = {
//     hideRightSidebar?: () => void,
//     title?: string,
//     children?: any,
// };

var RightSideBar = function RightSideBar(props) {
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var rightBarNodeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  RightSideBar.defaultProps = {
    title: 'Settings'
  };
  var title = props.title;
  var component = props.children || null;

  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
    return {
      showRightSidebar: state.leftnav.showRightSidebar
    };
  }),
      showRightSidebar = _useSelector.showRightSidebar;
  /**
   * Handles the close
   */


  var handleClose = function handleClose(e) {
    e.preventDefault();
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_3__.hideRightSidebar)());
  };
  /**
   * Handle the click anywhere in doc
   */


  var handleOtherClick = function handleOtherClick(e) {// if (showRightSidebar) {
    //     if (rightBarNodeRef && rightBarNodeRef.current && rightBarNodeRef.current.contains(e.target)) return;
    //     // else hide the right sidebar
    //     else dispatch(hideRightSidebar());
    // }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    document.addEventListener('mousedown', handleOtherClick, false);
    return function () {
      document.removeEventListener('mousedown', handleOtherClick, false);
    };
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "end-bar",
    ref: rightBarNodeRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "rightbar-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Link, {
    to: "#",
    className: "end-bar-toggle float-end",
    onClick: handleClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "dripicons-cross noti-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h5", {
    className: "m-0"
  }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(simplebar_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    style: {
      maxHeight: '100%',
      zIndex: 10000
    },
    timeout: 500,
    scrollbarMaxSize: 320
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "rightbar-content h-100"
  }, component))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "rightbar-overlay"
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RightSideBar);

/***/ })

}]);