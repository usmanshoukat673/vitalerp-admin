"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_onboarding_Suppliers_VerifySuppliers_jsx"],{

/***/ "./resources/js/components/onboarding/Suppliers/AddBuildSupplier.jsx":
/*!***************************************************************************!*\
  !*** ./resources/js/components/onboarding/Suppliers/AddBuildSupplier.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }






var AddBuildSupplier = function AddBuildSupplier(_ref) {
  var build_id = _ref.build_id,
    added = _ref.added,
    standard_id = _ref.standard_id;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    errors = _useState2[0],
    setErrors = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    name = _useState6[0],
    setName = _useState6[1];
  var handleNameChange = function handleNameChange(event) {
    setName(event.target.value);
    clearErrors('name');
  };
  var clearErrors = function clearErrors(field) {
    if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
      delete errors[0][field];
      setErrors(errors);
    }
  };
  var handlerInputError = function handlerInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? 'error' : '';
  };
  var displayInputError = function displayInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "form-error-messsage"
    }, errors[0][inputName]) : '';
  };
  var handleSubmit = function handleSubmit() {
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("/api/auth/onboarding/add-build-supplier", {
      build_id: build_id,
      name: name,
      standard_id: standard_id
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      added(e.data);
      setName('');
    })["catch"](function (err) {
      setLoading(false);
      if (err.response.status === 500) {
        react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.8',
      marginRight: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Suppliers Type",
    fullWidth: true,
    variant: "outlined",
    size: "small",
    value: name,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('name'), 'build__input'),
    onChange: handleNameChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.5'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    variant: "outlined",
    disabled: loading,
    size: "large",
    onClick: handleSubmit
  }, "Add"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, displayInputError('name')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddBuildSupplier);

/***/ }),

/***/ "./resources/js/components/onboarding/Suppliers/BuildSupplier.jsx":
/*!************************************************************************!*\
  !*** ./resources/js/components/onboarding/Suppliers/BuildSupplier.jsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControlLabel/FormControlLabel.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Checkbox/Checkbox.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BuildSupplierExample__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BuildSupplierExample */ "./resources/js/components/onboarding/Suppliers/BuildSupplierExample.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }









var BuildSupplier = function BuildSupplier(_ref) {
  var activity = _ref.activity;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    errors = _useState2[0],
    setErrors = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    responded = _useState6[0],
    setResponded = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    included = _useState8[0],
    setIncluded = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(activity)) {
      setIncluded(activity.included == 1 ? true : false);
      setResponded(activity.responded);
    }
  }, [activity]);
  var handlerInputError = function handlerInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? 'error' : '';
  };
  var displayInputError = function displayInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "form-error-messsage"
    }, errors[0][inputName]) : '';
  };
  var clearErrors = function clearErrors(field) {
    if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
      delete errors[0][field];
      setErrors(errors);
    }
  };
  var handleChange = function handleChange(event) {
    var status = event.target.checked;
    setResponded(true);
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/auth/onboarding/select-build-supplier", {
      id: activity.id,
      included: status
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      setIncluded(status);
    })["catch"](function (err) {
      setLoading(false);
      if (err.response.status === 500) {
        react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      marginBottom: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      color: '#000'
    },
    onChange: handleChange,
    checked: included && responded,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('build__label', included && responded ? 'checkbox__selected' : 'checkbox__unselected'),
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], null),
    label: "".concat(activity.name)
  })), included && responded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BuildSupplierExample__WEBPACK_IMPORTED_MODULE_4__["default"], {
    asset: activity
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BuildSupplier);

/***/ }),

/***/ "./resources/js/components/onboarding/Suppliers/BuildSupplierExample.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/onboarding/Suppliers/BuildSupplierExample.jsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/Dropdown.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var BuildSupplierExample = function BuildSupplierExample(_ref) {
  var asset = _ref.asset;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    errors = _useState2[0],
    setErrors = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    examples = _useState6[0],
    setExamples = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    exampleOptions = _useState8[0],
    setExampleOptions = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!_.isEmpty(asset)) {
      setExampleOptions(_.map(asset.examples, function (ex, index) {
        return {
          key: ex.id,
          text: ex.name,
          value: ex.id
        };
      }));
      var selected_examples = _.filter(asset.examples, function (ex) {
        return ex.selected == 1;
      });
      setExamples(_.map(selected_examples, function (m, index) {
        return m.id;
      }));
    }
  }, [asset]);
  var handlerInputError = function handlerInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? 'error' : '';
  };
  var displayInputError = function displayInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "form-error-messsage"
    }, errors[0][inputName]) : '';
  };
  var handleExampleChange = function handleExampleChange(event, _ref2) {
    var value = _ref2.value;
    var items = value.filter(function (e) {
      return typeof e !== "string";
    });
    setExamples(items);
    if (items.length > 0) {
      toggleExamples('toggle', {
        example_ids: items,
        build_supplier_id: asset.id
      });
    } else {
      toggleExamples('unselect-all', {
        build_supplier_id: asset.id
      });
    }
    clearErrors('examples');
  };
  var toggleExamples = function toggleExamples(enpoint, object) {
    setLoading(true);
    var url = "/api/auth/onboarding/supplier-example/".concat(enpoint);
    axios__WEBPACK_IMPORTED_MODULE_2__["default"].post(url, object).then(function (e) {
      setErrors([]);
      setLoading(false);
    })["catch"](function (err) {
      setLoading(false);
      if (err.response.status === 500) {
        setErrors([]);
        react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  var handleAddExample = function handleAddExample(e, _ref3) {
    var value = _ref3.value;
    setErrors([]);
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/api/auth/onboarding/supplier-example/add-new', {
      name: value,
      build_supplier_id: asset.id,
      standard_id: asset.standard_id
    }).then(function (response) {
      setErrors([]);
      setLoading(false);
      setExamples([].concat(_toConsumableArray(examples), [response.data.id]));
      setExampleOptions([].concat(_toConsumableArray(exampleOptions), [{
        key: response.data.id,
        value: response.data.id,
        text: response.data.name
      }]));
    })["catch"](function (err) {
      setLoading(false);
      if (err.response.status === 500) {
        setErrors([]);
        react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  var clearErrors = function clearErrors(field) {
    if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
      delete errors[0][field];
      setErrors(errors);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Examples:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
    placeholder: "Examples",
    onChange: handleExampleChange,
    value: examples,
    onAddItem: handleAddExample,
    multiple: true,
    search: true,
    fluid: true,
    allowAdditions: true,
    selection: true,
    options: exampleOptions,
    className: "__asset__example__dd"
  }), displayInputError(errors, 'examples')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BuildSupplierExample);

/***/ }),

/***/ "./resources/js/components/onboarding/Suppliers/CustomBuildSupplier.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/components/onboarding/Suppliers/CustomBuildSupplier.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BuildSupplierExample__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BuildSupplierExample */ "./resources/js/components/onboarding/Suppliers/BuildSupplierExample.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var CustomBuildSupplier = function CustomBuildSupplier(_ref) {
  var asset = _ref.asset,
    delete_asset = _ref.delete_asset;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    errors = _useState2[0],
    setErrors = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    touched = _useState6[0],
    setTouched = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    name = _useState8[0],
    setName = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(asset)) {
      setName(asset.name);
    }
  }, [asset]);
  var handleNameChange = function handleNameChange(event) {
    setName(event.target.value);
    setTouched(true);
    clearErrors(event.target.name);
  };
  var clearErrors = function clearErrors(field) {
    if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
      delete errors[0][field];
      setErrors(errors);
    }
  };
  var handlerInputError = function handlerInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? 'error' : '';
  };
  var displayInputError = function displayInputError(inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "form-error-messsage"
    }, errors[0][inputName]) : '';
  };
  var handleUpdate = function handleUpdate() {
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/auth/onboarding/update-build-supplier", {
      id: asset.id,
      name: name
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      setTouched(false);
    })["catch"](function (err) {
      setLoading(false);
      setTouched(true);
      if (err.response.status === 500) {
        react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  var handleDelete = function handleDelete() {
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_5__["default"].post("/api/auth/onboarding/delete-build-supplier", {
      id: asset.id
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      delete_asset(asset);
    })["catch"](function (err) {
      setLoading(false);
      if (err.response.status === 500) {
        react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      padding: '10px',
      border: '1px solid #ccc',
      marginBottom: '10px',
      borderRadius: '6px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      flex: '0.8',
      marginRight: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: "Asset Type",
    fullWidth: true,
    size: "small",
    variant: "outlined",
    value: name,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('name'), 'build__input'),
    onChange: handleNameChange
  }), displayInputError('name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      flex: '0.5'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    size: "large",
    disabled: loading || !touched,
    variant: "contained",
    color: "success",
    onClick: handleUpdate,
    sx: {
      marginRight: '10px'
    }
  }, "Update"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    size: "large",
    disabled: loading,
    onClick: handleDelete,
    color: "error",
    variant: "contained"
  }, "Delete"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BuildSupplierExample__WEBPACK_IMPORTED_MODULE_4__["default"], {
    asset: asset
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomBuildSupplier);

/***/ }),

/***/ "./resources/js/components/onboarding/Suppliers/VerifySuppliers.jsx":
/*!**************************************************************************!*\
  !*** ./resources/js/components/onboarding/Suppliers/VerifySuppliers.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var _CustomBuildSupplier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomBuildSupplier */ "./resources/js/components/onboarding/Suppliers/CustomBuildSupplier.jsx");
/* harmony import */ var _AddBuildSupplier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddBuildSupplier */ "./resources/js/components/onboarding/Suppliers/AddBuildSupplier.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-scroll */ "./node_modules/react-scroll/modules/index.js");
/* harmony import */ var _BuildSupplier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BuildSupplier */ "./resources/js/components/onboarding/Suppliers/BuildSupplier.jsx");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }










var VerifySuppliers = function VerifySuppliers(_ref) {
  var match = _ref.match,
    history = _ref.history,
    location = _ref.location;
  var params = new URLSearchParams(location.search);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    errors = _useState2[0],
    setErrors = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    suppliers = _useState6[0],
    setSuppliers = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    custom_suppilers = _useState8[0],
    setCustomSuppliers = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    build_id = _useState10[0],
    setBuildID = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState12 = _slicedToArray(_useState11, 2),
    standard_id = _useState12[0],
    setStandardId = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState14 = _slicedToArray(_useState13, 1),
    departments = _useState14[0];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setBuildID(match.params.build_id);
    setStandardId(match.params.standard_id);
    setLoading(true);
    // axios.get(`/api/auth/onboarding/selected-business-depts/${match.params.build_id}`)
    //     .then(e => {
    //         setDepartments(e.data);
    //     })
    //     .catch(err => {
    //         setLoading(false);
    //         if (err.response.status === 500) {
    //             NotificationManager.error('Server Error, Please contact customer support.', 'Error');
    //         }
    //         if (err.response.status === 422) {
    //             NotificationManager.error(err.response.data, 'Error');
    //         }
    //     });
  }, [match.params]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_4___default().isEmpty(build_id)) {
      setLoading(true);
      axios__WEBPACK_IMPORTED_MODULE_7__["default"].get("/api/auth/onboarding/build-suppliers/".concat(build_id, "/").concat(standard_id)).then(function (e) {
        setLoading(false);
        setErrors([]);
        setSuppliers(lodash__WEBPACK_IMPORTED_MODULE_4___default().filter(e.data, function (funct) {
          return funct.custom == 0;
        }));
        setCustomSuppliers(lodash__WEBPACK_IMPORTED_MODULE_4___default().filter(e.data, function (funct) {
          return funct.custom == 1;
        }));
      })["catch"](function (err) {
        setLoading(false);
        if (err.response.status === 500) {
          react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
        }
        if (err.response.status === 422) {
          react_notifications__WEBPACK_IMPORTED_MODULE_1__.NotificationManager.error(err.response.data, 'Error');
        }
      });
    }
  }, [build_id, standard_id]);
  var handleAddCustomAsset = function handleAddCustomAsset(activity) {
    setCustomSuppliers([].concat(_toConsumableArray(custom_suppilers), [activity]));
  };
  var handleDeleteAsset = function handleDeleteAsset(activity) {
    var the_custom_suppilers = JSON.parse(JSON.stringify(custom_suppilers));
    lodash__WEBPACK_IMPORTED_MODULE_4___default().remove(the_custom_suppilers, function (act) {
      return act.id == activity.id;
    });
    setCustomSuppliers(the_custom_suppilers);
  };
  var getQueryStringParameter = function getQueryStringParameter(url, param) {
    var params = new URL(url).searchParams;
    return params.get(param);
  };
  var scrollToHeading = function scrollToHeading() {
    react_scroll__WEBPACK_IMPORTED_MODULE_5__.scroller.scrollTo("page__heading", {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };
  var handleNext = function handleNext(event) {
    history.push("/verify-404/".concat(build_id, "/").concat(standard_id, "?page=1"));
  };
  var handleBack = function handleBack() {
    history.push("/verify-department-assets/".concat(build_id, "/").concat(standard_id, "?page=2"));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "auth_page_content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sx: {
      display: 'flex',
      marginTop: '30px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sx: {
      flex: '0.4',
      marginRight: '50px',
      marginTop: '50px',
      fontSize: '19px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "An automated step by step onboarding process typically involves the following steps:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Initial registration: The new hire provides their personal information, such as name, address, and contact details."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Verification: The system verifies the employee's identity through email or SMS."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sx: {
      flex: '0.6',
      padding: '20px',
      borderRadius: '6px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    variant: "h4",
    name: "page__heading",
    sx: {
      marginBottom: '50px'
    }
  }, "Verify the Suppliers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", null, lodash__WEBPACK_IMPORTED_MODULE_4___default().size(suppliers) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sx: {
      padding: '0px 10px 15px 10px'
    }
  }, lodash__WEBPACK_IMPORTED_MODULE_4___default().map(suppliers, function (funct) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BuildSupplier__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: funct.id,
      activity: funct,
      departments: departments
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      paddingTop: '10px'
    }
  }, "Please verify key suppliers before continuing "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sx: {
      padding: '15px 10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    variant: "h5",
    sx: {
      color: '#000',
      paddingBottom: '10px'
    }
  }, "Add Missing Suppliers"), lodash__WEBPACK_IMPORTED_MODULE_4___default().map(custom_suppilers, function (activity) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CustomBuildSupplier__WEBPACK_IMPORTED_MODULE_2__["default"], {
      delete_asset: handleDeleteAsset,
      key: activity.id,
      asset: activity
    });
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AddBuildSupplier__WEBPACK_IMPORTED_MODULE_3__["default"], {
    added: handleAddCustomAsset,
    standard_id: standard_id,
    build_id: build_id
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
    onClick: handleBack,
    variant: "outlined"
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_11__["default"], {
    sx: {
      marginLeft: '15px'
    },
    size: "large",
    loading: loading,
    onClick: handleNext,
    loadingIndicator: "Processing...",
    variant: "contained"
  }, "Next")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifySuppliers);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Flag/Flag.js":
/*!**********************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Flag/Flag.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   names: () => (/* binding */ names)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");






var names = ['ad', 'andorra', 'ae', 'united arab emirates', 'uae', 'af', 'afghanistan', 'ag', 'antigua', 'ai', 'anguilla', 'al', 'albania', 'am', 'armenia', 'an', 'netherlands antilles', 'ao', 'angola', 'ar', 'argentina', 'as', 'american samoa', 'at', 'austria', 'au', 'australia', 'aw', 'aruba', 'ax', 'aland islands', 'az', 'azerbaijan', 'ba', 'bosnia', 'bb', 'barbados', 'bd', 'bangladesh', 'be', 'belgium', 'bf', 'burkina faso', 'bg', 'bulgaria', 'bh', 'bahrain', 'bi', 'burundi', 'bj', 'benin', 'bm', 'bermuda', 'bn', 'brunei', 'bo', 'bolivia', 'br', 'brazil', 'bs', 'bahamas', 'bt', 'bhutan', 'bv', 'bouvet island', 'bw', 'botswana', 'by', 'belarus', 'bz', 'belize', 'ca', 'canada', 'cc', 'cocos islands', 'cd', 'congo', 'cf', 'central african republic', 'cg', 'congo brazzaville', 'ch', 'switzerland', 'ci', 'cote divoire', 'ck', 'cook islands', 'cl', 'chile', 'cm', 'cameroon', 'cn', 'china', 'co', 'colombia', 'cr', 'costa rica', 'cs', 'cu', 'cuba', 'cv', 'cape verde', 'cx', 'christmas island', 'cy', 'cyprus', 'cz', 'czech republic', 'de', 'germany', 'dj', 'djibouti', 'dk', 'denmark', 'dm', 'dominica', 'do', 'dominican republic', 'dz', 'algeria', 'ec', 'ecuador', 'england', 'gb eng', 'ee', 'estonia', 'eg', 'egypt', 'eh', 'western sahara', 'er', 'eritrea', 'es', 'spain', 'et', 'ethiopia', 'eu', 'european union', 'fi', 'finland', 'fj', 'fiji', 'fk', 'falkland islands', 'fm', 'micronesia', 'fo', 'faroe islands', 'fr', 'france', 'ga', 'gabon', 'gb', 'uk', 'united kingdom', 'gd', 'grenada', 'ge', 'georgia', 'gf', 'french guiana', 'gh', 'ghana', 'gi', 'gibraltar', 'gl', 'greenland', 'gm', 'gambia', 'gn', 'guinea', 'gp', 'guadeloupe', 'gq', 'equatorial guinea', 'gr', 'greece', 'gs', 'sandwich islands', 'gt', 'guatemala', 'gu', 'guam', 'gw', 'guinea-bissau', 'gy', 'guyana', 'hk', 'hong kong', 'hm', 'heard island', 'hn', 'honduras', 'hr', 'croatia', 'ht', 'haiti', 'hu', 'hungary', 'id', 'indonesia', 'ie', 'ireland', 'il', 'israel', 'in', 'india', 'io', 'indian ocean territory', 'iq', 'iraq', 'ir', 'iran', 'is', 'iceland', 'it', 'italy', 'jm', 'jamaica', 'jo', 'jordan', 'jp', 'japan', 'ke', 'kenya', 'kg', 'kyrgyzstan', 'kh', 'cambodia', 'ki', 'kiribati', 'km', 'comoros', 'kn', 'saint kitts and nevis', 'kp', 'north korea', 'kr', 'south korea', 'kw', 'kuwait', 'ky', 'cayman islands', 'kz', 'kazakhstan', 'la', 'laos', 'lb', 'lebanon', 'lc', 'saint lucia', 'li', 'liechtenstein', 'lk', 'sri lanka', 'lr', 'liberia', 'ls', 'lesotho', 'lt', 'lithuania', 'lu', 'luxembourg', 'lv', 'latvia', 'ly', 'libya', 'ma', 'morocco', 'mc', 'monaco', 'md', 'moldova', 'me', 'montenegro', 'mg', 'madagascar', 'mh', 'marshall islands', 'mk', 'macedonia', 'ml', 'mali', 'mm', 'myanmar', 'burma', 'mn', 'mongolia', 'mo', 'macau', 'mp', 'northern mariana islands', 'mq', 'martinique', 'mr', 'mauritania', 'ms', 'montserrat', 'mt', 'malta', 'mu', 'mauritius', 'mv', 'maldives', 'mw', 'malawi', 'mx', 'mexico', 'my', 'malaysia', 'mz', 'mozambique', 'na', 'namibia', 'nc', 'new caledonia', 'ne', 'niger', 'nf', 'norfolk island', 'ng', 'nigeria', 'ni', 'nicaragua', 'nl', 'netherlands', 'no', 'norway', 'np', 'nepal', 'nr', 'nauru', 'nu', 'niue', 'nz', 'new zealand', 'om', 'oman', 'pa', 'panama', 'pe', 'peru', 'pf', 'french polynesia', 'pg', 'new guinea', 'ph', 'philippines', 'pk', 'pakistan', 'pl', 'poland', 'pm', 'saint pierre', 'pn', 'pitcairn islands', 'pr', 'puerto rico', 'ps', 'palestine', 'pt', 'portugal', 'pw', 'palau', 'py', 'paraguay', 'qa', 'qatar', 're', 'reunion', 'ro', 'romania', 'rs', 'serbia', 'ru', 'russia', 'rw', 'rwanda', 'sa', 'saudi arabia', 'sb', 'solomon islands', 'sc', 'seychelles', 'gb sct', 'scotland', 'sd', 'sudan', 'se', 'sweden', 'sg', 'singapore', 'sh', 'saint helena', 'si', 'slovenia', 'sj', 'svalbard', 'jan mayen', 'sk', 'slovakia', 'sl', 'sierra leone', 'sm', 'san marino', 'sn', 'senegal', 'so', 'somalia', 'sr', 'suriname', 'st', 'sao tome', 'sv', 'el salvador', 'sy', 'syria', 'sz', 'swaziland', 'tc', 'caicos islands', 'td', 'chad', 'tf', 'french territories', 'tg', 'togo', 'th', 'thailand', 'tj', 'tajikistan', 'tk', 'tokelau', 'tl', 'timorleste', 'tm', 'turkmenistan', 'tn', 'tunisia', 'to', 'tonga', 'tr', 'turkey', 'tt', 'trinidad', 'tv', 'tuvalu', 'tw', 'taiwan', 'tz', 'tanzania', 'ua', 'ukraine', 'ug', 'uganda', 'um', 'us minor islands', 'us', 'america', 'united states', 'uy', 'uruguay', 'uz', 'uzbekistan', 'va', 'vatican city', 'vc', 'saint vincent', 've', 'venezuela', 'vg', 'british virgin islands', 'vi', 'us virgin islands', 'vn', 'vietnam', 'vu', 'vanuatu', 'gb wls', 'wales', 'wf', 'wallis and futuna', 'ws', 'samoa', 'ye', 'yemen', 'yt', 'mayotte', 'za', 'south africa', 'zm', 'zambia', 'zw', 'zimbabwe'];
/**
 * A flag is is used to represent a political state.
 */

var Flag = /*#__PURE__*/function (_PureComponent) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Flag, _PureComponent);

  function Flag() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Flag.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        name = _this$props.name;
    var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(name, 'flag', className);
    var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(Flag, this.props);
    var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(Flag, this.props);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }));
  };

  return Flag;
}(react__WEBPACK_IMPORTED_MODULE_3__.PureComponent);

Flag.handledProps = ["as", "className", "name"];
Flag.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Flag name, can use the two digit country code, the full name, or a common alias. */
  name: _lib__WEBPACK_IMPORTED_MODULE_7__.suggest(names)
} : 0;
Flag.defaultProps = {
  as: 'i'
};
Flag.create = (0,_lib__WEBPACK_IMPORTED_MODULE_8__.createShorthandFactory)(Flag, function (value) {
  return {
    name: value
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Flag);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/Dropdown.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/Dropdown.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dropdown)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var lodash_es_includes__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! lodash-es/includes */ "./node_modules/lodash-es/includes.js");
/* harmony import */ var lodash_es_compact__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! lodash-es/compact */ "./node_modules/lodash-es/compact.js");
/* harmony import */ var lodash_es_map__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! lodash-es/map */ "./node_modules/lodash-es/map.js");
/* harmony import */ var lodash_es_every__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! lodash-es/every */ "./node_modules/lodash-es/every.js");
/* harmony import */ var lodash_es_without__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! lodash-es/without */ "./node_modules/lodash-es/without.js");
/* harmony import */ var lodash_es_find__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! lodash-es/find */ "./node_modules/lodash-es/find.js");
/* harmony import */ var lodash_es_dropRight__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! lodash-es/dropRight */ "./node_modules/lodash-es/dropRight.js");
/* harmony import */ var lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! lodash-es/isEmpty */ "./node_modules/lodash-es/isEmpty.js");
/* harmony import */ var lodash_es_size__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! lodash-es/size */ "./node_modules/lodash-es/size.js");
/* harmony import */ var lodash_es_difference__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lodash-es/difference */ "./node_modules/lodash-es/difference.js");
/* harmony import */ var lodash_es_union__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lodash-es/union */ "./node_modules/lodash-es/union.js");
/* harmony import */ var lodash_es_get__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lodash-es/get */ "./node_modules/lodash-es/get.js");
/* harmony import */ var lodash_es_noop__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lodash-es/noop */ "./node_modules/lodash-es/noop.js");
/* harmony import */ var lodash_es_isUndefined__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lodash-es/isUndefined */ "./node_modules/lodash-es/isUndefined.js");
/* harmony import */ var lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash-es/invoke */ "./node_modules/lodash-es/invoke.js");
/* harmony import */ var lodash_es_has__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! lodash-es/has */ "./node_modules/lodash-es/has.js");
/* harmony import */ var lodash_es_isEqual__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! lodash-es/isEqual */ "./node_modules/lodash-es/isEqual.js");
/* harmony import */ var lodash_es_isFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash-es/isFunction */ "./node_modules/lodash-es/isFunction.js");
/* harmony import */ var lodash_es_pick__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash-es/pick */ "./node_modules/lodash-es/pick.js");
/* harmony import */ var lodash_es_isNil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es/isNil */ "./node_modules/lodash-es/isNil.js");
/* harmony import */ var _semantic_ui_react_event_stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @semantic-ui-react/event-stack */ "./node_modules/@semantic-ui-react/event-stack/lib/index.js");
/* harmony import */ var _semantic_ui_react_event_stack__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_semantic_ui_react_event_stack__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fluentui_react_component_ref__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @fluentui/react-component-ref */ "./node_modules/@fluentui/react-component-ref/dist/es/Ref.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var keyboard_key__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! keyboard-key */ "./node_modules/keyboard-key/src/keyboardKey.js");
/* harmony import */ var keyboard_key__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(keyboard_key__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_45___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_45__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! shallowequal */ "./node_modules/shallowequal/index.js");
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(shallowequal__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/doesNodeContainClick.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/ModernAutoControlledComponent.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _elements_Icon__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../../elements/Icon */ "./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js");
/* harmony import */ var _elements_Label__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../elements/Label */ "./node_modules/semantic-ui-react/dist/es/elements/Label/Label.js");
/* harmony import */ var _elements_Flag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../elements/Flag */ "./node_modules/semantic-ui-react/dist/es/elements/Flag/Flag.js");
/* harmony import */ var _elements_Image__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../elements/Image */ "./node_modules/semantic-ui-react/dist/es/elements/Image/Image.js");
/* harmony import */ var _DropdownDivider__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./DropdownDivider */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownDivider.js");
/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./DropdownItem */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownItem.js");
/* harmony import */ var _DropdownHeader__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./DropdownHeader */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownHeader.js");
/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./DropdownMenu */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownMenu.js");
/* harmony import */ var _DropdownSearchInput__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./DropdownSearchInput */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownSearchInput.js");
/* harmony import */ var _DropdownText__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./DropdownText */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownText.js");
/* harmony import */ var _utils_getMenuOptions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/getMenuOptions */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/utils/getMenuOptions.js");
/* harmony import */ var _utils_getSelectedIndex__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/getSelectedIndex */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/utils/getSelectedIndex.js");











































var getKeyOrValue = function getKeyOrValue(key, value) {
  return (0,lodash_es_isNil__WEBPACK_IMPORTED_MODULE_7__["default"])(key) ? value : key;
};

var getKeyAndValues = function getKeyAndValues(options) {
  return options ? options.map(function (option) {
    return (0,lodash_es_pick__WEBPACK_IMPORTED_MODULE_8__["default"])(option, ['key', 'value']);
  }) : options;
};

function renderItemContent(item) {
  var flag = item.flag,
      image = item.image,
      text = item.text; // TODO: remove this in v3
  // This maintains compatibility with Shorthand API in v1 as this might be called in "Label.create()"

  if ((0,lodash_es_isFunction__WEBPACK_IMPORTED_MODULE_9__["default"])(text)) {
    return text;
  }

  return {
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(react__WEBPACK_IMPORTED_MODULE_5__.Fragment, null, _elements_Flag__WEBPACK_IMPORTED_MODULE_10__["default"].create(flag), _elements_Image__WEBPACK_IMPORTED_MODULE_11__["default"].create(image), text)
  };
}
/**
 * A dropdown allows a user to select a value from a series of options.
 * @see Form
 * @see Select
 * @see Menu
 */


var Dropdown = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Dropdown, _Component);

  function Dropdown() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.searchRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.createRef)();
    _this.sizerRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.createRef)();
    _this.ref = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.createRef)();

    _this.handleChange = function (e, value) {
      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onChange', e, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this.props, {
        value: value
      }));
    };

    _this.closeOnChange = function (e) {
      var _this$props = _this.props,
          closeOnChange = _this$props.closeOnChange,
          multiple = _this$props.multiple;
      var shouldClose = (0,lodash_es_isUndefined__WEBPACK_IMPORTED_MODULE_13__["default"])(closeOnChange) ? !multiple : closeOnChange;

      if (shouldClose) {
        _this.close(e, lodash_es_noop__WEBPACK_IMPORTED_MODULE_14__["default"]);
      }
    };

    _this.closeOnEscape = function (e) {
      if (!_this.props.closeOnEscape) return;
      if (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().getCode(e) !== (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().Escape)) return;
      e.preventDefault();

      _this.close(e);
    };

    _this.moveSelectionOnKeyDown = function (e) {
      var _moves;

      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          selectOnNavigation = _this$props2.selectOnNavigation;
      var open = _this.state.open;

      if (!open) {
        return;
      }

      var moves = (_moves = {}, _moves[(keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().ArrowDown)] = 1, _moves[(keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().ArrowUp)] = -1, _moves);
      var move = moves[keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().getCode(e)];

      if (move === undefined) {
        return;
      }

      e.preventDefault();

      var nextIndex = _this.getSelectedIndexAfterMove(move);

      if (!multiple && selectOnNavigation) {
        _this.makeSelectedItemActive(e, nextIndex);
      }

      _this.setState({
        selectedIndex: nextIndex
      });
    };

    _this.openOnSpace = function (e) {
      var _e$target, _e$target2, _e$target3;

      var shouldHandleEvent = _this.state.focus && !_this.state.open && keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().getCode(e) === (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().Spacebar);
      var shouldPreventDefault = ((_e$target = e.target) == null ? void 0 : _e$target.tagName) !== 'INPUT' && ((_e$target2 = e.target) == null ? void 0 : _e$target2.tagName) !== 'TEXTAREA' && ((_e$target3 = e.target) == null ? void 0 : _e$target3.isContentEditable) !== true;

      if (shouldHandleEvent) {
        if (shouldPreventDefault) {
          e.preventDefault();
        }

        _this.open(e);
      }
    };

    _this.openOnArrow = function (e) {
      var _this$state = _this.state,
          focus = _this$state.focus,
          open = _this$state.open;

      if (focus && !open) {
        var code = keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().getCode(e);

        if (code === (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().ArrowDown) || code === (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().ArrowUp)) {
          e.preventDefault();

          _this.open(e);
        }
      }
    };

    _this.makeSelectedItemActive = function (e, selectedIndex) {
      var _this$state2 = _this.state,
          open = _this$state2.open,
          value = _this$state2.value;
      var multiple = _this.props.multiple;

      var item = _this.getSelectedItem(selectedIndex);

      var selectedValue = (0,lodash_es_get__WEBPACK_IMPORTED_MODULE_15__["default"])(item, 'value');

      var disabled = (0,lodash_es_get__WEBPACK_IMPORTED_MODULE_15__["default"])(item, 'disabled'); // prevent selecting null if there was no selected item value
      // prevent selecting duplicate items when the dropdown is closed
      // prevent selecting disabled items


      if ((0,lodash_es_isNil__WEBPACK_IMPORTED_MODULE_7__["default"])(selectedValue) || !open || disabled) {
        return value;
      } // state value may be undefined


      var newValue = multiple ? (0,lodash_es_union__WEBPACK_IMPORTED_MODULE_16__["default"])(value, [selectedValue]) : selectedValue;
      var valueHasChanged = multiple ? !!(0,lodash_es_difference__WEBPACK_IMPORTED_MODULE_17__["default"])(newValue, value).length : newValue !== value;

      if (valueHasChanged) {
        // notify the onChange prop that the user is trying to change value
        _this.setState({
          value: newValue
        });

        _this.handleChange(e, newValue); // Heads up! This event handler should be called after `onChange`
        // Notify the onAddItem prop if this is a new value


        if (item['data-additional']) {
          (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onAddItem', e, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this.props, {
            value: selectedValue
          }));
        }
      }

      return value;
    };

    _this.selectItemOnEnter = function (e) {
      var search = _this.props.search;
      var _this$state3 = _this.state,
          open = _this$state3.open,
          selectedIndex = _this$state3.selectedIndex;

      if (!open) {
        return;
      }

      var shouldSelect = keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().getCode(e) === (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().Enter) || // https://github.com/Semantic-Org/Semantic-UI-React/pull/3766
      !search && keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().getCode(e) === (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().Spacebar);

      if (!shouldSelect) {
        return;
      }

      e.preventDefault();

      var optionSize = (0,lodash_es_size__WEBPACK_IMPORTED_MODULE_18__["default"])((0,_utils_getMenuOptions__WEBPACK_IMPORTED_MODULE_19__["default"])({
        value: _this.state.value,
        options: _this.props.options,
        searchQuery: _this.state.searchQuery,
        additionLabel: _this.props.additionLabel,
        additionPosition: _this.props.additionPosition,
        allowAdditions: _this.props.allowAdditions,
        deburr: _this.props.deburr,
        multiple: _this.props.multiple,
        search: _this.props.search
      }));

      if (search && optionSize === 0) {
        return;
      }

      var nextValue = _this.makeSelectedItemActive(e, selectedIndex); // This is required as selected value may be the same


      _this.setState({
        selectedIndex: (0,_utils_getSelectedIndex__WEBPACK_IMPORTED_MODULE_20__["default"])({
          additionLabel: _this.props.additionLabel,
          additionPosition: _this.props.additionPosition,
          allowAdditions: _this.props.allowAdditions,
          deburr: _this.props.deburr,
          multiple: _this.props.multiple,
          search: _this.props.search,
          selectedIndex: selectedIndex,
          value: nextValue,
          options: _this.props.options,
          searchQuery: ''
        })
      });

      _this.closeOnChange(e);

      _this.clearSearchQuery();

      if (search) {
        (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.searchRef.current, 'focus');
      }
    };

    _this.removeItemOnBackspace = function (e) {
      var _this$props3 = _this.props,
          multiple = _this$props3.multiple,
          search = _this$props3.search;
      var _this$state4 = _this.state,
          searchQuery = _this$state4.searchQuery,
          value = _this$state4.value;
      if (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().getCode(e) !== (keyboard_key__WEBPACK_IMPORTED_MODULE_4___default().Backspace)) return;
      if (searchQuery || !search || !multiple || (0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_21__["default"])(value)) return;
      e.preventDefault(); // remove most recent value

      var newValue = (0,lodash_es_dropRight__WEBPACK_IMPORTED_MODULE_22__["default"])(value);

      _this.setState({
        value: newValue
      });

      _this.handleChange(e, newValue);
    };

    _this.closeOnDocumentClick = function (e) {
      if (!_this.props.closeOnBlur) return; // If event happened in the dropdown, ignore it

      if (_this.ref.current && (0,_lib__WEBPACK_IMPORTED_MODULE_23__["default"])(_this.ref.current, e)) return;

      _this.close();
    };

    _this.handleMouseDown = function (e) {
      _this.isMouseDown = true;

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onMouseDown', e, _this.props);

      document.addEventListener('mouseup', _this.handleDocumentMouseUp);
    };

    _this.handleDocumentMouseUp = function () {
      _this.isMouseDown = false;
      document.removeEventListener('mouseup', _this.handleDocumentMouseUp);
    };

    _this.handleClick = function (e) {
      var _this$props4 = _this.props,
          minCharacters = _this$props4.minCharacters,
          search = _this$props4.search;
      var _this$state5 = _this.state,
          open = _this$state5.open,
          searchQuery = _this$state5.searchQuery;

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onClick', e, _this.props); // prevent closeOnDocumentClick()


      e.stopPropagation();
      if (!search) return _this.toggle(e);

      if (open) {
        (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.searchRef.current, 'focus');

        return;
      }

      if (searchQuery.length >= minCharacters || minCharacters === 1) {
        _this.open(e);

        return;
      }

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.searchRef.current, 'focus');
    };

    _this.handleIconClick = function (e) {
      var clearable = _this.props.clearable;

      var hasValue = _this.hasValue();

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onClick', e, _this.props); // prevent handleClick()


      e.stopPropagation();

      if (clearable && hasValue) {
        _this.clearValue(e);
      } else {
        _this.toggle(e);
      }
    };

    _this.handleItemClick = function (e, item) {
      var _this$props5 = _this.props,
          multiple = _this$props5.multiple,
          search = _this$props5.search;
      var currentValue = _this.state.value;
      var value = item.value; // prevent toggle() in handleClick()

      e.stopPropagation(); // prevent closeOnDocumentClick() if multiple or item is disabled

      if (multiple || item.disabled) {
        e.nativeEvent.stopImmediatePropagation();
      }

      if (item.disabled) {
        return;
      }

      var isAdditionItem = item['data-additional'];
      var newValue = multiple ? (0,lodash_es_union__WEBPACK_IMPORTED_MODULE_16__["default"])(_this.state.value, [value]) : value;
      var valueHasChanged = multiple ? !!(0,lodash_es_difference__WEBPACK_IMPORTED_MODULE_17__["default"])(newValue, currentValue).length : newValue !== currentValue; // notify the onChange prop that the user is trying to change value

      if (valueHasChanged) {
        _this.setState({
          value: newValue
        });

        _this.handleChange(e, newValue);
      }

      _this.clearSearchQuery();

      if (search) {
        (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.searchRef.current, 'focus');
      } else {
        (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.ref.current, 'focus');
      }

      _this.closeOnChange(e); // Heads up! This event handler should be called after `onChange`
      // Notify the onAddItem prop if this is a new value


      if (isAdditionItem) {
        (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onAddItem', e, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this.props, {
          value: value
        }));
      }
    };

    _this.handleFocus = function (e) {
      var focus = _this.state.focus;
      if (focus) return;

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onFocus', e, _this.props);

      _this.setState({
        focus: true
      });
    };

    _this.handleBlur = function (e) {
      // Heads up! Don't remove this.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/1315
      var currentTarget = (0,lodash_es_get__WEBPACK_IMPORTED_MODULE_15__["default"])(e, 'currentTarget');

      if (currentTarget && currentTarget.contains(document.activeElement)) return;
      var _this$props6 = _this.props,
          closeOnBlur = _this$props6.closeOnBlur,
          multiple = _this$props6.multiple,
          selectOnBlur = _this$props6.selectOnBlur; // do not "blur" when the mouse is down inside of the Dropdown

      if (_this.isMouseDown) return;

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onBlur', e, _this.props);

      if (selectOnBlur && !multiple) {
        _this.makeSelectedItemActive(e, _this.state.selectedIndex);

        if (closeOnBlur) _this.close();
      }

      _this.setState({
        focus: false
      });

      _this.clearSearchQuery();
    };

    _this.handleSearchChange = function (e, _ref) {
      var value = _ref.value;
      // prevent propagating to this.props.onChange()
      e.stopPropagation();
      var minCharacters = _this.props.minCharacters;
      var open = _this.state.open;
      var newQuery = value;

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onSearchChange', e, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this.props, {
        searchQuery: newQuery
      }));

      _this.setState({
        searchQuery: newQuery,
        selectedIndex: 0
      }); // open search dropdown on search query


      if (!open && newQuery.length >= minCharacters) {
        _this.open();

        return;
      } // close search dropdown if search query is too small


      if (open && minCharacters !== 1 && newQuery.length < minCharacters) _this.close();
    };

    _this.handleKeyDown = function (e) {
      _this.moveSelectionOnKeyDown(e);

      _this.openOnArrow(e);

      _this.openOnSpace(e);

      _this.selectItemOnEnter(e);

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onKeyDown', e);
    };

    _this.getSelectedItem = function (selectedIndex) {
      var options = (0,_utils_getMenuOptions__WEBPACK_IMPORTED_MODULE_19__["default"])({
        value: _this.state.value,
        options: _this.props.options,
        searchQuery: _this.state.searchQuery,
        additionLabel: _this.props.additionLabel,
        additionPosition: _this.props.additionPosition,
        allowAdditions: _this.props.allowAdditions,
        deburr: _this.props.deburr,
        multiple: _this.props.multiple,
        search: _this.props.search
      });
      return (0,lodash_es_get__WEBPACK_IMPORTED_MODULE_15__["default"])(options, "[" + selectedIndex + "]");
    };

    _this.getItemByValue = function (value) {
      var options = _this.props.options;
      return (0,lodash_es_find__WEBPACK_IMPORTED_MODULE_24__["default"])(options, {
        value: value
      });
    };

    _this.getDropdownAriaOptions = function () {
      var _this$props7 = _this.props,
          loading = _this$props7.loading,
          disabled = _this$props7.disabled,
          search = _this$props7.search,
          multiple = _this$props7.multiple;
      var open = _this.state.open;
      var ariaOptions = {
        role: search ? 'combobox' : 'listbox',
        'aria-busy': loading,
        'aria-disabled': disabled,
        'aria-expanded': !!open
      };

      if (ariaOptions.role === 'listbox') {
        ariaOptions['aria-multiselectable'] = multiple;
      }

      return ariaOptions;
    };

    _this.clearSearchQuery = function () {
      var searchQuery = _this.state.searchQuery;
      if (searchQuery === undefined || searchQuery === '') return;

      _this.setState({
        searchQuery: ''
      });
    };

    _this.handleLabelClick = function (e, labelProps) {
      // prevent focusing search input on click
      e.stopPropagation();

      _this.setState({
        selectedLabel: labelProps.value
      });

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onLabelClick', e, labelProps);
    };

    _this.handleLabelRemove = function (e, labelProps) {
      // prevent focusing search input on click
      e.stopPropagation();
      var value = _this.state.value;

      var newValue = (0,lodash_es_without__WEBPACK_IMPORTED_MODULE_25__["default"])(value, labelProps.value);

      _this.setState({
        value: newValue
      });

      _this.handleChange(e, newValue);
    };

    _this.getSelectedIndexAfterMove = function (offset, startIndex) {
      if (startIndex === void 0) {
        startIndex = _this.state.selectedIndex;
      }

      var options = (0,_utils_getMenuOptions__WEBPACK_IMPORTED_MODULE_19__["default"])({
        value: _this.state.value,
        options: _this.props.options,
        searchQuery: _this.state.searchQuery,
        additionLabel: _this.props.additionLabel,
        additionPosition: _this.props.additionPosition,
        allowAdditions: _this.props.allowAdditions,
        deburr: _this.props.deburr,
        multiple: _this.props.multiple,
        search: _this.props.search
      }); // Prevent infinite loop
      // TODO: remove left part of condition after children API will be removed

      if (options === undefined || (0,lodash_es_every__WEBPACK_IMPORTED_MODULE_26__["default"])(options, 'disabled')) return;
      var lastIndex = options.length - 1;
      var wrapSelection = _this.props.wrapSelection; // next is after last, wrap to beginning
      // next is before first, wrap to end

      var nextIndex = startIndex + offset; // if 'wrapSelection' is set to false and selection is after last or before first, it just does not change

      if (!wrapSelection && (nextIndex > lastIndex || nextIndex < 0)) {
        nextIndex = startIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = lastIndex;
      }

      if (options[nextIndex].disabled) {
        return _this.getSelectedIndexAfterMove(offset, nextIndex);
      }

      return nextIndex;
    };

    _this.handleIconOverrides = function (predefinedProps) {
      var clearable = _this.props.clearable;
      var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(clearable && _this.hasValue() && 'clear', predefinedProps.className);
      return {
        className: classes,
        onClick: function onClick(e) {
          (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(predefinedProps, 'onClick', e, predefinedProps);

          _this.handleIconClick(e);
        }
      };
    };

    _this.clearValue = function (e) {
      var multiple = _this.props.multiple;
      var newValue = multiple ? [] : '';

      _this.setState({
        value: newValue
      });

      _this.handleChange(e, newValue);
    };

    _this.computeSearchInputTabIndex = function () {
      var _this$props8 = _this.props,
          disabled = _this$props8.disabled,
          tabIndex = _this$props8.tabIndex;
      if (!(0,lodash_es_isNil__WEBPACK_IMPORTED_MODULE_7__["default"])(tabIndex)) return tabIndex;
      return disabled ? -1 : 0;
    };

    _this.computeSearchInputWidth = function () {
      var searchQuery = _this.state.searchQuery;

      if (_this.sizerRef.current && searchQuery) {
        // resize the search input, temporarily show the sizer so we can measure it
        _this.sizerRef.current.style.display = 'inline';
        _this.sizerRef.current.textContent = searchQuery;
        var searchWidth = Math.ceil(_this.sizerRef.current.getBoundingClientRect().width);

        _this.sizerRef.current.style.removeProperty('display');

        return searchWidth;
      }
    };

    _this.computeTabIndex = function () {
      var _this$props9 = _this.props,
          disabled = _this$props9.disabled,
          search = _this$props9.search,
          tabIndex = _this$props9.tabIndex; // don't set a root node tabIndex as the search input has its own tabIndex

      if (search) return undefined;
      if (disabled) return -1;
      return (0,lodash_es_isNil__WEBPACK_IMPORTED_MODULE_7__["default"])(tabIndex) ? 0 : tabIndex;
    };

    _this.handleSearchInputOverrides = function (predefinedProps) {
      return {
        onChange: function onChange(e, inputProps) {
          (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(predefinedProps, 'onChange', e, inputProps);

          _this.handleSearchChange(e, inputProps);
        }
      };
    };

    _this.hasValue = function () {
      var multiple = _this.props.multiple;
      var value = _this.state.value;
      return multiple ? !(0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_21__["default"])(value) : !(0,lodash_es_isNil__WEBPACK_IMPORTED_MODULE_7__["default"])(value) && value !== '';
    };

    _this.scrollSelectedItemIntoView = function () {
      if (!_this.ref.current) return;

      var menu = _this.ref.current.querySelector('.menu.visible');

      if (!menu) return;
      var item = menu.querySelector('.item.selected');
      if (!item) return;
      var isOutOfUpperView = item.offsetTop < menu.scrollTop;
      var isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight;

      if (isOutOfUpperView) {
        menu.scrollTop = item.offsetTop;
      } else if (isOutOfLowerView) {
        // eslint-disable-next-line no-mixed-operators
        menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight;
      }
    };

    _this.setOpenDirection = function () {
      if (!_this.ref.current) return;

      var menu = _this.ref.current.querySelector('.menu.visible');

      if (!menu) return;

      var dropdownRect = _this.ref.current.getBoundingClientRect();

      var menuHeight = menu.clientHeight;
      var spaceAtTheBottom = document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight;
      var spaceAtTheTop = dropdownRect.top - menuHeight;
      var upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom; // set state only if there's a relevant difference

      if (!upward !== !_this.state.upward) {
        _this.setState({
          upward: upward
        });
      }
    };

    _this.open = function (e, triggerSetState) {
      if (e === void 0) {
        e = null;
      }

      if (triggerSetState === void 0) {
        triggerSetState = true;
      }

      var _this$props10 = _this.props,
          disabled = _this$props10.disabled,
          search = _this$props10.search;
      if (disabled) return;
      if (search) (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.searchRef.current, 'focus');

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onOpen', e, _this.props);

      if (triggerSetState) {
        _this.setState({
          open: true
        });
      }

      _this.scrollSelectedItemIntoView();
    };

    _this.close = function (e, callback) {
      if (callback === void 0) {
        callback = _this.handleClose;
      }

      if (_this.state.open) {
        (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_12__["default"])(_this.props, 'onClose', e, _this.props);

        _this.setState({
          open: false
        }, callback);
      }
    };

    _this.handleClose = function () {
      var hasSearchFocus = document.activeElement === _this.searchRef.current; // https://github.com/Semantic-Org/Semantic-UI-React/issues/627
      // Blur the Dropdown on close so it is blurred after selecting an item.
      // This is to prevent it from re-opening when switching tabs after selecting an item.

      if (!hasSearchFocus && _this.ref.current) {
        _this.ref.current.blur();
      }

      var hasDropdownFocus = document.activeElement === _this.ref.current;
      var hasFocus = hasSearchFocus || hasDropdownFocus; // We need to keep the virtual model in sync with the browser focus change
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/692

      _this.setState({
        focus: hasFocus
      });
    };

    _this.toggle = function (e) {
      return _this.state.open ? _this.close(e) : _this.open(e);
    };

    _this.renderText = function () {
      var _this$props11 = _this.props,
          multiple = _this$props11.multiple,
          placeholder = _this$props11.placeholder,
          search = _this$props11.search,
          text = _this$props11.text;
      var _this$state6 = _this.state,
          searchQuery = _this$state6.searchQuery,
          selectedIndex = _this$state6.selectedIndex,
          value = _this$state6.value,
          open = _this$state6.open;

      var hasValue = _this.hasValue();

      var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(placeholder && !hasValue && 'default', 'text', search && searchQuery && 'filtered');
      var _text = placeholder;
      var selectedItem;

      if (text) {
        _text = text;
      } else if (open && !multiple) {
        selectedItem = _this.getSelectedItem(selectedIndex);
      } else if (hasValue) {
        selectedItem = _this.getItemByValue(value);
      }

      return _DropdownText__WEBPACK_IMPORTED_MODULE_27__["default"].create(selectedItem ? renderItemContent(selectedItem) : _text, {
        defaultProps: {
          className: classes
        }
      });
    };

    _this.renderSearchInput = function () {
      var _this$props12 = _this.props,
          search = _this$props12.search,
          searchInput = _this$props12.searchInput;
      var searchQuery = _this.state.searchQuery;
      return search && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(_fluentui_react_component_ref__WEBPACK_IMPORTED_MODULE_28__.Ref, {
        innerRef: _this.searchRef
      }, _DropdownSearchInput__WEBPACK_IMPORTED_MODULE_29__["default"].create(searchInput, {
        defaultProps: {
          style: {
            width: _this.computeSearchInputWidth()
          },
          tabIndex: _this.computeSearchInputTabIndex(),
          value: searchQuery
        },
        overrideProps: _this.handleSearchInputOverrides
      }));
    };

    _this.renderSearchSizer = function () {
      var _this$props13 = _this.props,
          search = _this$props13.search,
          multiple = _this$props13.multiple;
      return search && multiple && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("span", {
        className: "sizer",
        ref: _this.sizerRef
      });
    };

    _this.renderLabels = function () {
      var _this$props14 = _this.props,
          multiple = _this$props14.multiple,
          renderLabel = _this$props14.renderLabel;
      var _this$state7 = _this.state,
          selectedLabel = _this$state7.selectedLabel,
          value = _this$state7.value;

      if (!multiple || (0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_21__["default"])(value)) {
        return;
      }

      var selectedItems = (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_30__["default"])(value, _this.getItemByValue);

      // if no item could be found for a given state value the selected item will be undefined
      // compact the selectedItems so we only have actual objects left
      return (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_30__["default"])((0,lodash_es_compact__WEBPACK_IMPORTED_MODULE_31__["default"])(selectedItems), function (item, index) {
        var defaultProps = {
          active: item.value === selectedLabel,
          as: 'a',
          key: getKeyOrValue(item.key, item.value),
          onClick: _this.handleLabelClick,
          onRemove: _this.handleLabelRemove,
          value: item.value
        };
        return _elements_Label__WEBPACK_IMPORTED_MODULE_32__["default"].create(renderLabel(item, index, defaultProps), {
          defaultProps: defaultProps
        });
      });
    };

    _this.renderOptions = function () {
      var _this$props15 = _this.props,
          lazyLoad = _this$props15.lazyLoad,
          multiple = _this$props15.multiple,
          search = _this$props15.search,
          noResultsMessage = _this$props15.noResultsMessage;
      var _this$state8 = _this.state,
          open = _this$state8.open,
          selectedIndex = _this$state8.selectedIndex,
          value = _this$state8.value; // lazy load, only render options when open

      if (lazyLoad && !open) return null;
      var options = (0,_utils_getMenuOptions__WEBPACK_IMPORTED_MODULE_19__["default"])({
        value: _this.state.value,
        options: _this.props.options,
        searchQuery: _this.state.searchQuery,
        additionLabel: _this.props.additionLabel,
        additionPosition: _this.props.additionPosition,
        allowAdditions: _this.props.allowAdditions,
        deburr: _this.props.deburr,
        multiple: _this.props.multiple,
        search: _this.props.search
      });

      if (noResultsMessage !== null && search && (0,lodash_es_isEmpty__WEBPACK_IMPORTED_MODULE_21__["default"])(options)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", {
          className: "message"
        }, noResultsMessage);
      }

      var isActive = multiple ? function (optValue) {
        return (0,lodash_es_includes__WEBPACK_IMPORTED_MODULE_33__["default"])(value, optValue);
      } : function (optValue) {
        return optValue === value;
      };
      return (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_30__["default"])(options, function (opt, i) {
        return _DropdownItem__WEBPACK_IMPORTED_MODULE_34__["default"].create((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          active: isActive(opt.value),
          selected: selectedIndex === i
        }, opt, {
          key: getKeyOrValue(opt.key, opt.value),
          // Needed for handling click events on disabled items
          style: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, opt.style, {
            pointerEvents: 'all'
          })
        }), {
          generateKey: false,
          overrideProps: function overrideProps(predefinedProps) {
            return {
              onClick: function onClick(e, item) {
                predefinedProps.onClick == null ? void 0 : predefinedProps.onClick(e, item);

                _this.handleItemClick(e, item);
              }
            };
          }
        });
      });
    };

    _this.renderMenu = function () {
      var _this$props16 = _this.props,
          children = _this$props16.children,
          direction = _this$props16.direction,
          header = _this$props16.header;
      var open = _this.state.open;

      var ariaOptions = _this.getDropdownMenuAriaOptions(); // single menu child


      if (!_lib__WEBPACK_IMPORTED_MODULE_35__.isNil(children)) {
        var menuChild = react__WEBPACK_IMPORTED_MODULE_5__.Children.only(children);
        var className = (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(direction, (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(open, 'visible'), menuChild.props.className);
        return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.cloneElement)(menuChild, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          className: className
        }, ariaOptions));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(_DropdownMenu__WEBPACK_IMPORTED_MODULE_37__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, ariaOptions, {
        direction: direction,
        open: open
      }), _DropdownHeader__WEBPACK_IMPORTED_MODULE_38__["default"].create(header, {
        autoGenerateKey: false
      }), _this.renderOptions());
    };

    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.getInitialAutoControlledState = function getInitialAutoControlledState() {
    return {
      focus: false,
      searchQuery: ''
    };
  };

  Dropdown.getAutoControlledStateFromProps = function getAutoControlledStateFromProps(nextProps, computedState, prevState) {
    // These values are stored only for a comparison on next getAutoControlledStateFromProps()
    var derivedState = {
      __options: nextProps.options,
      __value: computedState.value
    }; // The selected index is only dependent:

    var shouldComputeSelectedIndex = // On value change
    !shallowequal__WEBPACK_IMPORTED_MODULE_6___default()(prevState.__value, computedState.value) || // On option keys/values, we only check those properties to avoid recursive performance impacts.
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000
    !(0,lodash_es_isEqual__WEBPACK_IMPORTED_MODULE_39__["default"])(getKeyAndValues(nextProps.options), getKeyAndValues(prevState.__options));

    if (shouldComputeSelectedIndex) {
      derivedState.selectedIndex = (0,_utils_getSelectedIndex__WEBPACK_IMPORTED_MODULE_20__["default"])({
        additionLabel: nextProps.additionLabel,
        additionPosition: nextProps.additionPosition,
        allowAdditions: nextProps.allowAdditions,
        deburr: nextProps.deburr,
        multiple: nextProps.multiple,
        search: nextProps.search,
        selectedIndex: computedState.selectedIndex,
        value: computedState.value,
        options: nextProps.options,
        searchQuery: computedState.searchQuery
      });
    }

    return derivedState;
  };

  _proto.componentDidMount = function componentDidMount() {
    var open = this.state.open;

    if (open) {
      this.open(null, false);
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !shallowequal__WEBPACK_IMPORTED_MODULE_6___default()(nextProps, this.props) || !shallowequal__WEBPACK_IMPORTED_MODULE_6___default()(nextState, this.state);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // eslint-disable-line complexity
    var _this$props17 = this.props,
        closeOnBlur = _this$props17.closeOnBlur,
        minCharacters = _this$props17.minCharacters,
        openOnFocus = _this$props17.openOnFocus,
        search = _this$props17.search;
    /* eslint-disable no-console */

    if (true) {
      // in development, validate value type matches dropdown type
      var isNextValueArray = Array.isArray(this.props.value);

      var hasValue = (0,lodash_es_has__WEBPACK_IMPORTED_MODULE_40__["default"])(this.props, 'value');

      if (hasValue && this.props.multiple && !isNextValueArray) {
        console.error('Dropdown `value` must be an array when `multiple` is set.' + (" Received type: `" + Object.prototype.toString.call(this.props.value) + "`."));
      } else if (hasValue && !this.props.multiple && isNextValueArray) {
        console.error('Dropdown `value` must not be an array when `multiple` is not set.' + ' Either set `multiple={true}` or use a string or number value.');
      }
    }
    /* eslint-enable no-console */
    // focused / blurred


    if (!prevState.focus && this.state.focus) {
      if (!this.isMouseDown) {
        var openable = !search || search && minCharacters === 1 && !this.state.open;
        if (openOnFocus && openable) this.open();
      }
    } else if (prevState.focus && !this.state.focus) {
      if (!this.isMouseDown && closeOnBlur) {
        this.close();
      }
    } // opened / closed


    if (!prevState.open && this.state.open) {
      this.setOpenDirection();
      this.scrollSelectedItemIntoView();
    } else if (prevState.open && !this.state.open) {}

    if (prevState.selectedIndex !== this.state.selectedIndex) {
      this.scrollSelectedItemIntoView();
    }
  } // ----------------------------------------
  // Document Event Handlers
  // ----------------------------------------
  // onChange needs to receive a value
  // can't rely on props.value if we are controlled
  ;

  _proto.getDropdownMenuAriaOptions = function getDropdownMenuAriaOptions() {
    var _this$props18 = this.props,
        search = _this$props18.search,
        multiple = _this$props18.multiple;
    var ariaOptions = {};

    if (search) {
      ariaOptions['aria-multiselectable'] = multiple;
      ariaOptions.role = 'listbox';
    }

    return ariaOptions;
  } // ----------------------------------------
  // Setters
  // ----------------------------------------
  ;

  _proto.render = function render() {
    var _this$props19 = this.props,
        basic = _this$props19.basic,
        button = _this$props19.button,
        className = _this$props19.className,
        compact = _this$props19.compact,
        disabled = _this$props19.disabled,
        error = _this$props19.error,
        fluid = _this$props19.fluid,
        floating = _this$props19.floating,
        icon = _this$props19.icon,
        inline = _this$props19.inline,
        item = _this$props19.item,
        labeled = _this$props19.labeled,
        loading = _this$props19.loading,
        multiple = _this$props19.multiple,
        pointing = _this$props19.pointing,
        search = _this$props19.search,
        selection = _this$props19.selection,
        scrolling = _this$props19.scrolling,
        simple = _this$props19.simple,
        trigger = _this$props19.trigger;
    var _this$state9 = this.state,
        focus = _this$state9.focus,
        open = _this$state9.open,
        upward = _this$state9.upward; // Classes

    var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])('ui', (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(open, 'active visible'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(disabled, 'disabled'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(error, 'error'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(loading, 'loading'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(basic, 'basic'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(button, 'button'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(compact, 'compact'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(fluid, 'fluid'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(floating, 'floating'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(inline, 'inline'), // TODO: consider augmentation to render Dropdowns as Button/Menu, solves icon/link item issues
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/401#issuecomment-240487229
    // TODO: the icon class is only required when a dropdown is a button
    // useKeyOnly(icon, 'icon'),
    (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(labeled, 'labeled'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(item, 'item'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(multiple, 'multiple'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(search, 'search'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(selection, 'selection'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(simple, 'simple'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(scrolling, 'scrolling'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOnly)(upward, 'upward'), (0,_lib__WEBPACK_IMPORTED_MODULE_36__.useKeyOrValueAndKey)(pointing, 'pointing'), 'dropdown', className);
    var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_41__["default"])(Dropdown, this.props);
    var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_42__["default"])(Dropdown, this.props);
    var ariaOptions = this.getDropdownAriaOptions(ElementType, this.props);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(_fluentui_react_component_ref__WEBPACK_IMPORTED_MODULE_28__.Ref, {
      innerRef: this.ref
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, ariaOptions, {
      className: classes,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleMouseDown,
      onFocus: this.handleFocus,
      onChange: this.handleChange,
      tabIndex: this.computeTabIndex()
    }), this.renderLabels(), this.renderSearchInput(), this.renderSearchSizer(), trigger || this.renderText(), _elements_Icon__WEBPACK_IMPORTED_MODULE_43__["default"].create(icon, {
      overrideProps: this.handleIconOverrides,
      autoGenerateKey: false
    }), this.renderMenu(), open && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement((_semantic_ui_react_event_stack__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: "keydown",
      on: this.closeOnEscape
    }), open && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement((_semantic_ui_react_event_stack__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: "click",
      on: this.closeOnDocumentClick
    }), focus && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__.createElement((_semantic_ui_react_event_stack__WEBPACK_IMPORTED_MODULE_2___default()), {
      name: "keydown",
      on: this.removeItemOnBackspace
    })));
  };

  return Dropdown;
}(_lib__WEBPACK_IMPORTED_MODULE_44__["default"]);

Dropdown.handledProps = ["additionLabel", "additionPosition", "allowAdditions", "as", "basic", "button", "children", "className", "clearable", "closeOnBlur", "closeOnChange", "closeOnEscape", "compact", "deburr", "defaultOpen", "defaultSearchQuery", "defaultSelectedLabel", "defaultUpward", "defaultValue", "direction", "disabled", "error", "floating", "fluid", "header", "icon", "inline", "item", "labeled", "lazyLoad", "loading", "minCharacters", "multiple", "noResultsMessage", "onAddItem", "onBlur", "onChange", "onClick", "onClose", "onFocus", "onLabelClick", "onMouseDown", "onOpen", "onSearchChange", "open", "openOnFocus", "options", "placeholder", "pointing", "renderLabel", "scrolling", "search", "searchInput", "searchQuery", "selectOnBlur", "selectOnNavigation", "selectedLabel", "selection", "simple", "tabIndex", "text", "trigger", "upward", "value", "wrapSelection"];

Dropdown.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().elementType),

  /** Label prefixed to an option added by a user. */
  additionLabel: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().element), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string)]),

  /** Position of the `Add: ...` option in the dropdown list ('top' or 'bottom'). */
  additionPosition: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOf(['top', 'bottom']),

  /**
   * Allow user additions to the list of options (boolean).
   * Requires the use of `selection`, `options` and `search`.
   */
  allowAdditions: _lib__WEBPACK_IMPORTED_MODULE_46__.every([_lib__WEBPACK_IMPORTED_MODULE_46__.demand(['options', 'selection', 'search']), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool)]),

  /** A Dropdown can reduce its complexity. */
  basic: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Format the Dropdown to appear as a button. */
  button: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Primary content. */
  children: _lib__WEBPACK_IMPORTED_MODULE_46__.every([_lib__WEBPACK_IMPORTED_MODULE_46__.disallow(['options', 'selection']), _lib__WEBPACK_IMPORTED_MODULE_46__.givenProps({
    children: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().any).isRequired
  }, (prop_types__WEBPACK_IMPORTED_MODULE_45___default().element).isRequired)]),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string),

  /** Using the clearable setting will let users remove their selection from a dropdown. */
  clearable: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Whether or not the menu should close when the dropdown is blurred. */
  closeOnBlur: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Whether or not the dropdown should close when the escape key is pressed. */
  closeOnEscape: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /**
   * Whether or not the menu should close when a value is selected from the dropdown.
   * By default, multiple selection dropdowns will remain open on change, while single
   * selection dropdowns will close on change.
   */
  closeOnChange: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A compact dropdown has no minimum width. */
  compact: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Whether or not the dropdown should strip diacritics in options and input search */
  deburr: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Initial value of open. */
  defaultOpen: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Initial value of searchQuery. */
  defaultSearchQuery: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string),

  /** Currently selected label in multi-select. */
  defaultSelectedLabel: _lib__WEBPACK_IMPORTED_MODULE_46__.every([_lib__WEBPACK_IMPORTED_MODULE_46__.demand(['multiple']), prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string)])]),

  /** Initial value of upward. */
  defaultUpward: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Initial value or value array if multiple. */
  defaultValue: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_45___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool)]))]),

  /** A dropdown menu can open to the left or to the right. */
  direction: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOf(['left', 'right']),

  /** A disabled dropdown menu or item does not allow user interaction. */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** An errored dropdown can alert a user to a problem. */
  error: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown menu can contain floated content. */
  floating: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown can take the full width of its parent */
  fluid: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown menu can contain a header. */
  header: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().node),

  /** Shorthand for Icon. */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().node), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().object)]),

  /** A dropdown can be formatted to appear inline in other content. */
  inline: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown can be formatted as a Menu item. */
  item: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown can be labeled. */
  labeled: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown can defer rendering its options until it is open. */
  lazyLoad: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown can show that it is currently loading data. */
  loading: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** The minimum characters for a search to begin showing results. */
  minCharacters: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().number),

  /** A selection dropdown can allow multiple selections. */
  multiple: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Message to display when there are no results. */
  noResultsMessage: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().node),

  /**
   * Called when a user adds a new item. Use this to update the options list.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and the new item's value.
   */
  onAddItem: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called on blur.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBlur: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called when the user attempts to change the value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called on focus.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onFocus: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called when a multi-select label is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All label props.
   */
  onLabelClick: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called on mousedown.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseDown: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /**
   * Called on search input change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props, includes current value of searchQuery.
   */
  onSearchChange: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /** Controls whether or not the dropdown menu is displayed. */
  open: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Whether or not the menu should open when the dropdown is focused. */
  openOnFocus: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: _lib__WEBPACK_IMPORTED_MODULE_46__.every([_lib__WEBPACK_IMPORTED_MODULE_46__.disallow(['children']), prop_types__WEBPACK_IMPORTED_MODULE_45___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_45___default().shape(_DropdownItem__WEBPACK_IMPORTED_MODULE_34__["default"].propTypes))]),

  /** Placeholder text. */
  placeholder: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string),

  /** A dropdown can be formatted so that its menu is pointing. */
  pointing: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOf(['left', 'right', 'top', 'top left', 'top right', 'bottom', 'bottom left', 'bottom right'])]),

  /**
   * Mapped over the active items and returns shorthand for the active item Labels.
   * Only applies to `multiple` Dropdowns.
   *
   * @param {object} item - A currently active dropdown item.
   * @param {number} index - The current index.
   * @param {object} defaultLabelProps - The default props for an active item Label.
   * @returns {*} Shorthand for a Label.
   */
  renderLabel: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func),

  /** A dropdown can have its menu scroll. */
  scrolling: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /**
   * A selection dropdown can allow a user to search through a large list of choices.
   * Pass a function here to replace the default search.
   */
  search: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().func)]),

  /** A shorthand for a search input. */
  searchInput: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().array), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().node), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().object)]),

  /** Current value of searchQuery. Creates a controlled component. */
  searchQuery: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string),
  // TODO 'searchInMenu' or 'search='in menu' or ???  How to handle this markup and functionality?

  /** Define whether the highlighted item should be selected on blur. */
  selectOnBlur: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /**
   * Whether or not to change the value when navigating the menu using arrow keys.
   * Setting to false will require enter or left click to confirm a choice.
   */
  selectOnNavigation: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** Currently selected label in multi-select. */
  selectedLabel: _lib__WEBPACK_IMPORTED_MODULE_46__.every([_lib__WEBPACK_IMPORTED_MODULE_46__.demand(['multiple']), prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().number)])]),

  /** A dropdown can be used to select between choices in a form. */
  selection: _lib__WEBPACK_IMPORTED_MODULE_46__.every([_lib__WEBPACK_IMPORTED_MODULE_46__.disallow(['children']), _lib__WEBPACK_IMPORTED_MODULE_46__.demand(['options']), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool)]),

  /** A simple dropdown can open without Javascript. */
  simple: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /** A dropdown can receive focus. */
  tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string)]),

  /** The text displayed in the dropdown, usually for the active item. */
  text: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string),

  /** Custom element to trigger the menu to become visible. Takes place of 'text'. */
  trigger: _lib__WEBPACK_IMPORTED_MODULE_46__.every([_lib__WEBPACK_IMPORTED_MODULE_46__.disallow(['selection', 'text']), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().node)]),

  /** Current value or value array if multiple. Creates a controlled component. */
  value: prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().number), prop_types__WEBPACK_IMPORTED_MODULE_45___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_45___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_45___default().number)]))]),

  /** Controls whether the dropdown will open upward. */
  upward: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool),

  /**
   * A dropdown will go to the last element when ArrowUp is pressed on the first,
   * or go to the first when ArrowDown is pressed on the last( aka infinite selection )
   */
  wrapSelection: (prop_types__WEBPACK_IMPORTED_MODULE_45___default().bool)
} : 0;
Dropdown.defaultProps = {
  additionLabel: 'Add ',
  additionPosition: 'top',
  closeOnBlur: true,
  closeOnEscape: true,
  deburr: false,
  icon: 'dropdown',
  minCharacters: 1,
  noResultsMessage: 'No results found.',
  openOnFocus: true,
  renderLabel: renderItemContent,
  searchInput: 'text',
  selectOnBlur: true,
  selectOnNavigation: true,
  wrapSelection: true
};
Dropdown.autoControlledProps = ['open', 'searchQuery', 'selectedLabel', 'value', 'upward'];
Dropdown.Divider = _DropdownDivider__WEBPACK_IMPORTED_MODULE_47__["default"];
Dropdown.Header = _DropdownHeader__WEBPACK_IMPORTED_MODULE_38__["default"];
Dropdown.Item = _DropdownItem__WEBPACK_IMPORTED_MODULE_34__["default"];
Dropdown.Menu = _DropdownMenu__WEBPACK_IMPORTED_MODULE_37__["default"];
Dropdown.SearchInput = _DropdownSearchInput__WEBPACK_IMPORTED_MODULE_29__["default"];
Dropdown.Text = _DropdownText__WEBPACK_IMPORTED_MODULE_27__["default"];

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownDivider.js":
/*!************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownDivider.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");





/**
 * A dropdown menu can contain dividers to separate related content.
 */

function DropdownDivider(props) {
  var className = props.className;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('divider', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(DropdownDivider, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(DropdownDivider, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }));
}

DropdownDivider.handledProps = ["as", "className"];
DropdownDivider.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().elementType),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownDivider);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownHeader.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownHeader.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _elements_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../elements/Icon */ "./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js");






/**
 * A dropdown menu can contain a header.
 */

function DropdownHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('header', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(DropdownHeader, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(DropdownHeader, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), children);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _elements_Icon__WEBPACK_IMPORTED_MODULE_6__["default"].create(icon, {
    autoGenerateKey: false
  }), content);
}

DropdownHeader.handledProps = ["as", "children", "className", "content", "icon"];
DropdownHeader.propTypes =  true ? {
  /** An element type to render as (string or function) */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_8__.contentShorthand,

  /** Shorthand for Icon. */
  icon: _lib__WEBPACK_IMPORTED_MODULE_8__.itemShorthand
} : 0;
DropdownHeader.create = (0,_lib__WEBPACK_IMPORTED_MODULE_9__.createShorthandFactory)(DropdownHeader, function (content) {
  return {
    content: content
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownHeader);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownItem.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownItem.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var lodash_es_isNil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash-es/isNil */ "./node_modules/lodash-es/isNil.js");
/* harmony import */ var lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es/invoke */ "./node_modules/lodash-es/invoke.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _elements_Flag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../elements/Flag */ "./node_modules/semantic-ui-react/dist/es/elements/Flag/Flag.js");
/* harmony import */ var _elements_Icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../elements/Icon */ "./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js");
/* harmony import */ var _elements_Image__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../elements/Image */ "./node_modules/semantic-ui-react/dist/es/elements/Image/Image.js");
/* harmony import */ var _elements_Label__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../elements/Label */ "./node_modules/semantic-ui-react/dist/es/elements/Label/Label.js");












/**
 * An item sub-component for Dropdown component.
 */

var DropdownItem = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(DropdownItem, _Component);

  function DropdownItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.handleClick = function (e) {
      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.props, 'onClick', e, _this.props);
    };

    return _this;
  }

  var _proto = DropdownItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        children = _this$props.children,
        className = _this$props.className,
        content = _this$props.content,
        disabled = _this$props.disabled,
        description = _this$props.description,
        flag = _this$props.flag,
        icon = _this$props.icon,
        image = _this$props.image,
        label = _this$props.label,
        selected = _this$props.selected,
        text = _this$props.text;
    var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(active, 'active'), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(disabled, 'disabled'), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(selected, 'selected'), 'item', className); // add default dropdown icon if item contains another menu

    var iconName = (0,lodash_es_isNil__WEBPACK_IMPORTED_MODULE_6__["default"])(icon) ? _lib__WEBPACK_IMPORTED_MODULE_7__.someByType(children, 'DropdownMenu') && 'dropdown' : icon;
    var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_8__["default"])(DropdownItem, this.props);
    var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_9__["default"])(DropdownItem, this.props);
    var ariaOptions = {
      role: 'option',
      'aria-disabled': disabled,
      'aria-checked': active,
      'aria-selected': selected
    };

    if (!_lib__WEBPACK_IMPORTED_MODULE_7__.isNil(children)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, ariaOptions, {
        className: classes,
        onClick: this.handleClick
      }), children);
    }

    var flagElement = _elements_Flag__WEBPACK_IMPORTED_MODULE_10__["default"].create(flag, {
      autoGenerateKey: false
    });
    var iconElement = _elements_Icon__WEBPACK_IMPORTED_MODULE_11__["default"].create(iconName, {
      autoGenerateKey: false
    });
    var imageElement = _elements_Image__WEBPACK_IMPORTED_MODULE_12__["default"].create(image, {
      autoGenerateKey: false
    });
    var labelElement = _elements_Label__WEBPACK_IMPORTED_MODULE_13__["default"].create(label, {
      autoGenerateKey: false
    });
    var descriptionElement = (0,_lib__WEBPACK_IMPORTED_MODULE_14__.createShorthand)('span', function (val) {
      return {
        children: val
      };
    }, description, {
      defaultProps: {
        className: 'description'
      },
      autoGenerateKey: false
    });
    var textElement = (0,_lib__WEBPACK_IMPORTED_MODULE_14__.createShorthand)('span', function (val) {
      return {
        children: val
      };
    }, _lib__WEBPACK_IMPORTED_MODULE_7__.isNil(content) ? text : content, {
      defaultProps: {
        className: 'text'
      },
      autoGenerateKey: false
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, ariaOptions, {
      className: classes,
      onClick: this.handleClick
    }), imageElement, iconElement, flagElement, labelElement, descriptionElement, textElement);
  };

  return DropdownItem;
}(react__WEBPACK_IMPORTED_MODULE_3__.Component);

DropdownItem.handledProps = ["active", "as", "children", "className", "content", "description", "disabled", "flag", "icon", "image", "label", "onClick", "selected", "text", "value"];
DropdownItem.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().elementType),

  /** Style as the currently chosen item. */
  active: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_16__.contentShorthand,

  /** Additional text with less emphasis. */
  description: _lib__WEBPACK_IMPORTED_MODULE_16__.itemShorthand,

  /** A dropdown item can be disabled. */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /** Shorthand for Flag. */
  flag: _lib__WEBPACK_IMPORTED_MODULE_16__.itemShorthand,

  /** Shorthand for Icon. */
  icon: _lib__WEBPACK_IMPORTED_MODULE_16__.itemShorthand,

  /** Shorthand for Image. */
  image: _lib__WEBPACK_IMPORTED_MODULE_16__.itemShorthand,

  /** Shorthand for Label. */
  label: _lib__WEBPACK_IMPORTED_MODULE_16__.itemShorthand,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func),

  /**
   * The item currently selected by keyboard shortcut.
   * This is not the active item.
   */
  selected: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),

  /** Display text. */
  text: _lib__WEBPACK_IMPORTED_MODULE_16__.contentShorthand,

  /** Stored value. */
  value: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string)])
} : 0;
DropdownItem.create = (0,_lib__WEBPACK_IMPORTED_MODULE_14__.createShorthandFactory)(DropdownItem, function (opts) {
  return opts;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownItem);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownMenu.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownMenu.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A dropdown menu can contain a menu.
 */

function DropdownMenu(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      direction = props.direction,
      open = props.open,
      scrolling = props.scrolling;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(direction, (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(open, 'visible'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(scrolling, 'scrolling'), 'menu transition', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(DropdownMenu, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(DropdownMenu, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_6__.isNil(children) ? content : children);
}

DropdownMenu.handledProps = ["as", "children", "className", "content", "direction", "open", "scrolling"];
DropdownMenu.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_8__.contentShorthand,

  /** A dropdown menu can open to the left or to the right. */
  direction: prop_types__WEBPACK_IMPORTED_MODULE_7___default().oneOf(['left', 'right']),

  /** Whether or not the dropdown menu is displayed. */
  open: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /** A dropdown menu can scroll. */
  scrolling: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenu);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownSearchInput.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownSearchInput.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var lodash_es_invoke__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es/invoke */ "./node_modules/lodash-es/invoke.js");
/* harmony import */ var lodash_es_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es/get */ "./node_modules/lodash-es/get.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");








/**
 * A search item sub-component for Dropdown component.
 */

var DropdownSearchInput = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(DropdownSearchInput, _Component);

  function DropdownSearchInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.handleChange = function (e) {
      var value = (0,lodash_es_get__WEBPACK_IMPORTED_MODULE_4__["default"])(e, 'target.value');

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_5__["default"])(_this.props, 'onChange', e, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _this.props, {
        value: value
      }));
    };

    return _this;
  }

  var _proto = DropdownSearchInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        autoComplete = _this$props.autoComplete,
        className = _this$props.className,
        tabIndex = _this$props.tabIndex,
        type = _this$props.type,
        value = _this$props.value;
    var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])('search', className);
    var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_6__["default"])(DropdownSearchInput, this.props);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      "aria-autocomplete": "list",
      autoComplete: autoComplete,
      className: classes,
      onChange: this.handleChange,
      tabIndex: tabIndex,
      type: type,
      value: value
    }));
  };

  return DropdownSearchInput;
}(react__WEBPACK_IMPORTED_MODULE_3__.Component);

DropdownSearchInput.handledProps = ["as", "autoComplete", "className", "tabIndex", "type", "value"];
DropdownSearchInput.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().elementType),

  /** An input can have the auto complete. */
  autoComplete: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** An input can receive focus. */
  tabIndex: prop_types__WEBPACK_IMPORTED_MODULE_7___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_7___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)]),

  /** The HTML input type. */
  type: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** Stored value. */
  value: prop_types__WEBPACK_IMPORTED_MODULE_7___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_7___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)])
} : 0;
DropdownSearchInput.defaultProps = {
  autoComplete: 'off',
  type: 'text'
};
DropdownSearchInput.create = (0,_lib__WEBPACK_IMPORTED_MODULE_8__.createShorthandFactory)(DropdownSearchInput, function (type) {
  return {
    type: type
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownSearchInput);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownText.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/DropdownText.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");





/**
 * A dropdown contains a selected value.
 */

function DropdownText(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('divider', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(DropdownText, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(DropdownText, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-atomic": true,
    "aria-live": "polite",
    role: "alert"
  }, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children) ? content : children);
}

DropdownText.handledProps = ["as", "children", "className", "content"];
DropdownText.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_7__.contentShorthand
} : 0;
DropdownText.create = (0,_lib__WEBPACK_IMPORTED_MODULE_8__.createShorthandFactory)(DropdownText, function (val) {
  return {
    content: val
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownText);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/utils/getMenuOptions.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/utils/getMenuOptions.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMenuOptions)
/* harmony export */ });
/* harmony import */ var lodash_es_some__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash-es/some */ "./node_modules/lodash-es/some.js");
/* harmony import */ var lodash_es_escapeRegExp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es/escapeRegExp */ "./node_modules/lodash-es/escapeRegExp.js");
/* harmony import */ var lodash_es_deburr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es/deburr */ "./node_modules/lodash-es/deburr.js");
/* harmony import */ var lodash_es_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash-es/isFunction */ "./node_modules/lodash-es/isFunction.js");
/* harmony import */ var lodash_es_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es/includes */ "./node_modules/lodash-es/includes.js");
/* harmony import */ var lodash_es_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es/filter */ "./node_modules/lodash-es/filter.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");






 // There are times when we need to calculate the options based on a value
// that hasn't yet been persisted to state.

function getMenuOptions(config) {
  var additionLabel = config.additionLabel,
      additionPosition = config.additionPosition,
      allowAdditions = config.allowAdditions,
      deburr = config.deburr,
      multiple = config.multiple,
      options = config.options,
      search = config.search,
      searchQuery = config.searchQuery,
      value = config.value;
  var filteredOptions = options; // filter out active options

  if (multiple) {
    filteredOptions = (0,lodash_es_filter__WEBPACK_IMPORTED_MODULE_1__["default"])(filteredOptions, function (opt) {
      return !(0,lodash_es_includes__WEBPACK_IMPORTED_MODULE_2__["default"])(value, opt.value);
    });
  } // filter by search query


  if (search && searchQuery) {
    if ((0,lodash_es_isFunction__WEBPACK_IMPORTED_MODULE_3__["default"])(search)) {
      filteredOptions = search(filteredOptions, searchQuery);
    } else {
      // remove diacritics on search input and options, if deburr prop is set
      var strippedQuery = deburr ? (0,lodash_es_deburr__WEBPACK_IMPORTED_MODULE_4__["default"])(searchQuery) : searchQuery;
      var re = new RegExp((0,lodash_es_escapeRegExp__WEBPACK_IMPORTED_MODULE_5__["default"])(strippedQuery), 'i');
      filteredOptions = (0,lodash_es_filter__WEBPACK_IMPORTED_MODULE_1__["default"])(filteredOptions, function (opt) {
        return re.test(deburr ? (0,lodash_es_deburr__WEBPACK_IMPORTED_MODULE_4__["default"])(opt.text) : opt.text);
      });
    }
  } // insert the "add" item


  if (allowAdditions && search && searchQuery && !(0,lodash_es_some__WEBPACK_IMPORTED_MODULE_6__["default"])(filteredOptions, {
    text: searchQuery
  })) {
    var additionLabelElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(additionLabel) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(additionLabel, {
      key: 'addition-label'
    }) : additionLabel || '';
    var addItem = {
      key: 'addition',
      // by using an array, we can pass multiple elements, but when doing so
      // we must specify a `key` for React to know which one is which
      text: [additionLabelElement, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", {
        key: "addition-query"
      }, searchQuery)],
      value: searchQuery,
      className: 'addition',
      'data-additional': true
    };
    if (additionPosition === 'top') filteredOptions.unshift(addItem);else filteredOptions.push(addItem);
  }

  return filteredOptions;
}
getMenuOptions.handledProps = [];

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/utils/getSelectedIndex.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Dropdown/utils/getSelectedIndex.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSelectedIndex)
/* harmony export */ });
/* harmony import */ var lodash_es_includes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es/includes */ "./node_modules/lodash-es/includes.js");
/* harmony import */ var lodash_es_find__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash-es/find */ "./node_modules/lodash-es/find.js");
/* harmony import */ var lodash_es_findIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es/findIndex */ "./node_modules/lodash-es/findIndex.js");
/* harmony import */ var lodash_es_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es/reduce */ "./node_modules/lodash-es/reduce.js");
/* harmony import */ var _getMenuOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getMenuOptions */ "./node_modules/semantic-ui-react/dist/es/modules/Dropdown/utils/getMenuOptions.js");





function getSelectedIndex(config) {
  var additionLabel = config.additionLabel,
      additionPosition = config.additionPosition,
      allowAdditions = config.allowAdditions,
      deburr = config.deburr,
      multiple = config.multiple,
      options = config.options,
      search = config.search,
      searchQuery = config.searchQuery,
      selectedIndex = config.selectedIndex,
      value = config.value;
  var menuOptions = (0,_getMenuOptions__WEBPACK_IMPORTED_MODULE_0__["default"])({
    value: value,
    options: options,
    searchQuery: searchQuery,
    additionLabel: additionLabel,
    additionPosition: additionPosition,
    allowAdditions: allowAdditions,
    deburr: deburr,
    multiple: multiple,
    search: search
  });

  var enabledIndexes = (0,lodash_es_reduce__WEBPACK_IMPORTED_MODULE_1__["default"])(menuOptions, function (memo, item, index) {
    if (!item.disabled) memo.push(index);
    return memo;
  }, []);

  var newSelectedIndex; // update the selected index

  if (!selectedIndex || selectedIndex < 0) {
    var firstIndex = enabledIndexes[0]; // Select the currently active item, if none, use the first item.
    // Multiple selects remove active items from the list,
    // their initial selected index should be 0.

    newSelectedIndex = multiple ? firstIndex : (0,lodash_es_findIndex__WEBPACK_IMPORTED_MODULE_2__["default"])(menuOptions, ['value', value]) || enabledIndexes[0];
  } else if (multiple) {
    newSelectedIndex = (0,lodash_es_find__WEBPACK_IMPORTED_MODULE_3__["default"])(enabledIndexes, function (index) {
      return index >= selectedIndex;
    }); // multiple selects remove options from the menu as they are made active
    // keep the selected index within range of the remaining items

    if (selectedIndex >= menuOptions.length - 1) {
      newSelectedIndex = enabledIndexes[enabledIndexes.length - 1];
    }
  } else {
    var activeIndex = (0,lodash_es_findIndex__WEBPACK_IMPORTED_MODULE_2__["default"])(menuOptions, ['value', value]); // regular selects can only have one active item
    // set the selected index to the currently active item


    newSelectedIndex = (0,lodash_es_includes__WEBPACK_IMPORTED_MODULE_4__["default"])(enabledIndexes, activeIndex) ? activeIndex : undefined;
  }

  if (!newSelectedIndex || newSelectedIndex < 0) {
    newSelectedIndex = enabledIndexes[0];
  }

  return newSelectedIndex;
}

/***/ }),

/***/ "./node_modules/lodash-es/_arrayEvery.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_arrayEvery.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A specialized version of `_.every` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 */
function arrayEvery(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrayEvery);


/***/ }),

/***/ "./node_modules/lodash-es/_asciiSize.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_asciiSize.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseProperty.js */ "./node_modules/lodash-es/_baseProperty.js");


/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var asciiSize = (0,_baseProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])('length');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (asciiSize);


/***/ }),

/***/ "./node_modules/lodash-es/_baseEvery.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_baseEvery.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseEach_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseEach.js */ "./node_modules/lodash-es/_baseEach.js");


/**
 * The base implementation of `_.every` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  var result = true;
  (0,_baseEach_js__WEBPACK_IMPORTED_MODULE_0__["default"])(collection, function(value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (baseEvery);


/***/ }),

/***/ "./node_modules/lodash-es/_basePropertyOf.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_basePropertyOf.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (basePropertyOf);


/***/ }),

/***/ "./node_modules/lodash-es/_deburrLetter.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_deburrLetter.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _basePropertyOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_basePropertyOf.js */ "./node_modules/lodash-es/_basePropertyOf.js");


/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = (0,_basePropertyOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(deburredLetters);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deburrLetter);


/***/ }),

/***/ "./node_modules/lodash-es/_stringSize.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_stringSize.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _asciiSize_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_asciiSize.js */ "./node_modules/lodash-es/_asciiSize.js");
/* harmony import */ var _hasUnicode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_hasUnicode.js */ "./node_modules/lodash-es/_hasUnicode.js");
/* harmony import */ var _unicodeSize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_unicodeSize.js */ "./node_modules/lodash-es/_unicodeSize.js");




/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
  return (0,_hasUnicode_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string)
    ? (0,_unicodeSize_js__WEBPACK_IMPORTED_MODULE_1__["default"])(string)
    : (0,_asciiSize_js__WEBPACK_IMPORTED_MODULE_2__["default"])(string);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringSize);


/***/ }),

/***/ "./node_modules/lodash-es/_unicodeSize.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/_unicodeSize.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;
  while (reUnicode.test(string)) {
    ++result;
  }
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unicodeSize);


/***/ }),

/***/ "./node_modules/lodash-es/compact.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/compact.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (compact);


/***/ }),

/***/ "./node_modules/lodash-es/deburr.js":
/*!******************************************!*\
  !*** ./node_modules/lodash-es/deburr.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _deburrLetter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_deburrLetter.js */ "./node_modules/lodash-es/_deburrLetter.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toString.js */ "./node_modules/lodash-es/toString.js");



/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = (0,_toString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string);
  return string && string.replace(reLatin, _deburrLetter_js__WEBPACK_IMPORTED_MODULE_1__["default"]).replace(reComboMark, '');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deburr);


/***/ }),

/***/ "./node_modules/lodash-es/dropRight.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/dropRight.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseSlice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseSlice.js */ "./node_modules/lodash-es/_baseSlice.js");
/* harmony import */ var _toInteger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toInteger.js */ "./node_modules/lodash-es/toInteger.js");



/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropRight([1, 2, 3]);
 * // => [1, 2]
 *
 * _.dropRight([1, 2, 3], 2);
 * // => [1]
 *
 * _.dropRight([1, 2, 3], 5);
 * // => []
 *
 * _.dropRight([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function dropRight(array, n, guard) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : (0,_toInteger_js__WEBPACK_IMPORTED_MODULE_0__["default"])(n);
  n = length - n;
  return (0,_baseSlice_js__WEBPACK_IMPORTED_MODULE_1__["default"])(array, 0, n < 0 ? 0 : n);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dropRight);


/***/ }),

/***/ "./node_modules/lodash-es/escapeRegExp.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/escapeRegExp.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toString.js */ "./node_modules/lodash-es/toString.js");


/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = (0,_toString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string);
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (escapeRegExp);


/***/ }),

/***/ "./node_modules/lodash-es/every.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/every.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayEvery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_arrayEvery.js */ "./node_modules/lodash-es/_arrayEvery.js");
/* harmony import */ var _baseEvery_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseEvery.js */ "./node_modules/lodash-es/_baseEvery.js");
/* harmony import */ var _baseIteratee_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_baseIteratee.js */ "./node_modules/lodash-es/_baseIteratee.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isArray.js */ "./node_modules/lodash-es/isArray.js");
/* harmony import */ var _isIterateeCall_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_isIterateeCall.js */ "./node_modules/lodash-es/_isIterateeCall.js");






/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * **Note:** This method returns `true` for
 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty collections.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes'], Boolean);
 * // => false
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.every(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.every(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.every(users, 'active');
 * // => false
 */
function every(collection, predicate, guard) {
  var func = (0,_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(collection) ? _arrayEvery_js__WEBPACK_IMPORTED_MODULE_1__["default"] : _baseEvery_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  if (guard && (0,_isIterateeCall_js__WEBPACK_IMPORTED_MODULE_3__["default"])(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, (0,_baseIteratee_js__WEBPACK_IMPORTED_MODULE_4__["default"])(predicate, 3));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (every);


/***/ }),

/***/ "./node_modules/lodash-es/isEqual.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/isEqual.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseIsEqual_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseIsEqual.js */ "./node_modules/lodash-es/_baseIsEqual.js");


/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return (0,_baseIsEqual_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, other);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isEqual);


/***/ }),

/***/ "./node_modules/lodash-es/size.js":
/*!****************************************!*\
  !*** ./node_modules/lodash-es/size.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseKeys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_baseKeys.js */ "./node_modules/lodash-es/_baseKeys.js");
/* harmony import */ var _getTag_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_getTag.js */ "./node_modules/lodash-es/_getTag.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isArrayLike.js */ "./node_modules/lodash-es/isArrayLike.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isString.js */ "./node_modules/lodash-es/isString.js");
/* harmony import */ var _stringSize_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_stringSize.js */ "./node_modules/lodash-es/_stringSize.js");






/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  if (collection == null) {
    return 0;
  }
  if ((0,_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(collection)) {
    return (0,_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(collection) ? (0,_stringSize_js__WEBPACK_IMPORTED_MODULE_2__["default"])(collection) : collection.length;
  }
  var tag = (0,_getTag_js__WEBPACK_IMPORTED_MODULE_3__["default"])(collection);
  if (tag == mapTag || tag == setTag) {
    return collection.size;
  }
  return (0,_baseKeys_js__WEBPACK_IMPORTED_MODULE_4__["default"])(collection).length;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (size);


/***/ }),

/***/ "./node_modules/lodash-es/union.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/union.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _baseFlatten_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_baseFlatten.js */ "./node_modules/lodash-es/_baseFlatten.js");
/* harmony import */ var _baseRest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_baseRest.js */ "./node_modules/lodash-es/_baseRest.js");
/* harmony import */ var _baseUniq_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_baseUniq.js */ "./node_modules/lodash-es/_baseUniq.js");
/* harmony import */ var _isArrayLikeObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isArrayLikeObject.js */ "./node_modules/lodash-es/isArrayLikeObject.js");





/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = (0,_baseRest_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function(arrays) {
  return (0,_baseUniq_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_baseFlatten_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arrays, 1, _isArrayLikeObject_js__WEBPACK_IMPORTED_MODULE_3__["default"], true));
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (union);


/***/ })

}]);