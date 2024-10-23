"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_PrivateFullScreenRoute_js"],{

/***/ "./resources/js/PrivateFullScreenRoute.js":
/*!************************************************!*\
  !*** ./resources/js/PrivateFullScreenRoute.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var lodash_isempty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash.isempty */ "./node_modules/lodash.isempty/index.js");
/* harmony import */ var lodash_isempty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isempty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./resources/js/utils/index.js");
var _excluded = ["component", "path", "user", "users", "token", "company", "leftnav"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







// utils

var PrivateFullScreenRoute = function PrivateFullScreenRoute(_ref, state) {
  var Component = _ref.component,
    path = _ref.path,
    user = _ref.user,
    users = _ref.users,
    token = _ref.token,
    company = _ref.company,
    leftnav = _ref.leftnav,
    rest = _objectWithoutProperties(_ref, _excluded);
  // new layout
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
      return {
        layoutColor: state.leftnav.layoutColor,
        layoutWidth: state.leftnav.layoutWidth,
        leftSideBarTheme: state.leftnav.leftSideBarTheme,
        leftSideBarType: state.leftnav.leftSideBarType
      };
    }),
    layoutColor = _useSelector.layoutColor,
    leftSideBarTheme = _useSelector.leftSideBarTheme,
    leftSideBarType = _useSelector.leftSideBarType,
    layoutWidth = _useSelector.layoutWidth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMenuOpened = _useState2[0],
    setIsMenuOpened = _useState2[1];

  /*
   * layout defaults
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.changeBodyAttribute)('data-layout', 'vertical');
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.changeBodyAttribute)('data-layout-color', layoutColor);
  }, [layoutColor]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.changeBodyAttribute)('data-layout-mode', layoutWidth);
  }, [layoutWidth]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.changeBodyAttribute)('data-leftbar-theme', leftSideBarTheme);
  }, [leftSideBarTheme]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_utils__WEBPACK_IMPORTED_MODULE_4__.changeBodyAttribute)('data-leftbar-compact-mode', leftSideBarType);
  }, [leftSideBarType]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Route, _extends({
    path: path
  }, rest, {
    render: function render(props) {
      return !lodash_isempty__WEBPACK_IMPORTED_MODULE_3___default()(user) && !lodash_isempty__WEBPACK_IMPORTED_MODULE_3___default()(company) ? company.company.required_mfa && !user.mfa_enabled ?
      /*#__PURE__*/
      //TODO: needs to check here wheter company is selected or not
      react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Redirect, {
        to: {
          pathname: "/select-organization",
          state: {
            prevLocation: path,
            error: "You need to enable mfa!"
          }
        }
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component, _extends({}, props, {
        user: user,
        token: token,
        leftnav: leftnav,
        company: company,
        users: users
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationContainer, null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Redirect, {
        to: {
          pathname: "/login",
          state: {
            prevLocation: path,
            error: "You need to login first!"
          }
        }
      });
    }
  }));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user.activeUser,
    token: state.token.activeToken,
    company: state.orgs.company,
    leftnav: state.leftnav,
    users: state.orgs.company_users
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.withRouter)((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps)(PrivateFullScreenRoute)));

/***/ })

}]);