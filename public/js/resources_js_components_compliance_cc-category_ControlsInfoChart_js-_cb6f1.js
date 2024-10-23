"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_compliance_cc-category_ControlsInfoChart_js-_cb6f1"],{

/***/ "./resources/js/components/compliance/cc-category/ControlsInfoChart.js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/compliance/cc-category/ControlsInfoChart.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-apexcharts */ "./node_modules/react-apexcharts/dist/react-apexcharts.min.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var controlChartColor = ['#313178', '#4e4e94', '#7474b0', '#a1a1ce', '#cfcfe8'];
var lanscapeChartcolor = ['#491173', '#5b2881', '#6d408f', '#7f589d', '#9170ab'];
var thirdpartyChartcolor = ['#295e4a', '#317158', '#398467', '#419776', '#49aa85'];
var threatTrendsChartcolor = ['#b9203f', '#c03652', '#c74c65', '#ce6278', '#d5798b'];
var orgsModuleChartcolor = ['#086278', '#207185', '#398193', '#5291a0', '#6aa0ae'];
var ControlsInfoChart = function ControlsInfoChart(_ref) {
  var series = _ref.series,
    type = _ref.type;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      colors: ['#313178', '#4e4e94', '#7474b0', '#a1a1ce', '#cfcfe8'],
      labels: ['Implemented', 'Partially Implemented', 'Not Implemented', 'Excluded', 'Not Applicable']
    }),
    _useState2 = _slicedToArray(_useState, 2),
    options = _useState2[0],
    setOptinos = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (type == 'lanscape') {
      setOptinos(_objectSpread(_objectSpread({}, options), {}, {
        colors: lanscapeChartcolor
      }));
    } else if (type == 'third-parties') {
      setOptinos(_objectSpread(_objectSpread({}, options), {}, {
        colors: thirdpartyChartcolor
      }));
    } else if (type == 'threattrend') {
      setOptinos(_objectSpread(_objectSpread({}, options), {}, {
        colors: threatTrendsChartcolor
      }));
    } else if (type == 'orgsmodule') {
      setOptinos(_objectSpread(_objectSpread({}, options), {}, {
        colors: orgsModuleChartcolor
      }));
    } else {
      setOptinos(_objectSpread(_objectSpread({}, options), {}, {
        colors: controlChartColor
      }));
    }
  }, [type]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_apexcharts__WEBPACK_IMPORTED_MODULE_1__["default"], {
    options: options,
    series: series,
    type: "donut"
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ControlsInfoChart);

/***/ })

}]);