"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_lanscape_LanscapeDetailsPanel_AssetsTabs_jsx"],{

/***/ "./resources/js/components/lanscape/LanscapeDetailsPanel/AssetsTabs.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/components/lanscape/LanscapeDetailsPanel/AssetsTabs.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material_Tab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Tab */ "./node_modules/@mui/material/Tab/Tab.js");
/* harmony import */ var _mui_lab_TabContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/lab/TabContext */ "./node_modules/@mui/lab/TabContext/TabContext.js");
/* harmony import */ var _mui_lab_TabList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/lab/TabList */ "./node_modules/@mui/lab/TabList/TabList.js");
/* harmony import */ var _mui_lab_TabPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/lab/TabPanel */ "./node_modules/@mui/lab/TabPanel/TabPanel.js");
/* harmony import */ var _constants_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants/layout */ "./resources/js/constants/layout.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








var RelatedRecords = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.lazy(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_components_lanscape_LanscapeDetailsPanel_RelatedRecords_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./RelatedRecords */ "./resources/js/components/lanscape/LanscapeDetailsPanel/RelatedRecords.jsx"));
});
var AssetsTabs = function AssetsTabs() {
  var AVAILABEL_MODULES = [_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_HARDWARE, _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_SOFTWARE, _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_CLOUDSERVICES, _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_DATASETS, _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_PROCESSES, _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_INFORMATION_SYSTEMS];
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState("\"".concat(AVAILABEL_MODULES[0], "\"")),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
      return {
        record: state.lanscape.record
      };
    }),
    record = _useSelector.record;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    _.pull(AVAILABEL_MODULES, record.module_id).filter(Boolean);
    setValue("\"".concat(AVAILABEL_MODULES[0], "\""));
  }, [record]);
  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      width: '100%',
      typography: 'body1'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabContext__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: value
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      borderBottom: 1,
      borderColor: 'divider'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabList__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onChange: handleChange,
    "aria-label": "Assets Tabs"
  }, record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_HARDWARE && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Hardware",
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_HARDWARE, "\"")
  }), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_SOFTWARE && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Software",
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_SOFTWARE, "\"")
  }), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_CLOUDSERVICES && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Cloud services",
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_CLOUDSERVICES, "\"")
  }), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_DATASETS && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Data sets",
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_DATASETS, "\"")
  }), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_PROCESSES && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Processes",
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_PROCESSES, "\"")
  }), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_INFORMATION_SYSTEMS && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Information systems",
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_INFORMATION_SYSTEMS, "\"")
  }))), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_HARDWARE && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_HARDWARE, "\"")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RelatedRecords, {
    module_id: _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_HARDWARE,
    question_id: null
  }))), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_SOFTWARE && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_SOFTWARE, "\"")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RelatedRecords, {
    module_id: _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_SOFTWARE,
    question_id: 5
  }))), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_CLOUDSERVICES && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_CLOUDSERVICES, "\"")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RelatedRecords, {
    module_id: _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_CLOUDSERVICES,
    question_id: null
  }))), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_DATASETS && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_DATASETS, "\"")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RelatedRecords, {
    module_id: _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_DATASETS,
    question_id: 7
  }))), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_PROCESSES && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_PROCESSES, "\"")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RelatedRecords, {
    module_id: _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_PROCESSES,
    question_id: null
  }))), record.module_id != _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_INFORMATION_SYSTEMS && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_TabPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    value: "\"".concat(_constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_INFORMATION_SYSTEMS, "\"")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RelatedRecords, {
    module_id: _constants_layout__WEBPACK_IMPORTED_MODULE_1__.MODULE_INFORMATION_SYSTEMS,
    question_id: 6
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssetsTabs);

/***/ })

}]);