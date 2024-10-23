"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_onboarding_Departments_VerifyBusinessDeparments_jsx"],{

/***/ "./resources/js/components/onboarding/Departments/AddBusinessDeparment.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/onboarding/Departments/AddBusinessDeparment.jsx ***!
  \*********************************************************************************/
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






var AddBusinessProcess = function AddBusinessProcess(_ref) {
  var build_id = _ref.build_id,
    added = _ref.added;
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
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    owner = _useState8[0],
    setOwner = _useState8[1];
  var handleNameChange = function handleNameChange(event) {
    setName(event.target.value);
    clearErrors(event.target.name);
  };
  var handleOwnerChange = function handleOwnerChange(event) {
    setOwner(event.target.value);
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
  var handleSubmit = function handleSubmit() {
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("/api/auth/onboarding/add-business-dept", {
      build_id: build_id,
      name: name,
      owner: owner
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
    label: "Department",
    fullWidth: true,
    variant: "outlined",
    size: "small",
    value: name,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('name'), 'build__input'),
    onChange: handleNameChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.5',
      marginRight: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Department Owner",
    fullWidth: true,
    variant: "outlined",
    size: "small",
    value: owner,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('owner'), 'build__input'),
    onChange: handleOwnerChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.5'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    variant: "outlined",
    disabled: loading,
    size: "large",
    onClick: handleSubmit
  }, "Add"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, displayInputError('name'), displayInputError('owner')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddBusinessProcess);

/***/ }),

/***/ "./resources/js/components/onboarding/Departments/BusinessDeparment.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/components/onboarding/Departments/BusinessDeparment.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControlLabel/FormControlLabel.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Checkbox/Checkbox.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
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








var BusinessProcess = function BusinessProcess(_ref) {
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
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    owner = _useState10[0],
    setOwner = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(activity)) {
      setIncluded(activity.included);
      setResponded(activity.responded);
      setOwner(lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(activity.owner) ? '' : activity.owner);
    }
  }, [activity]);
  var handleOwnerChange = function handleOwnerChange(event) {
    setOwner(event.target.value);
    clearErrors(event.target.name);
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
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("/api/auth/onboarding/business-dept", {
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
  var updateBusinessOwner = function updateBusinessOwner() {
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("/api/auth/onboarding/business-dept-owner", {
      id: activity.id,
      owner: owner
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      marginBottom: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      color: '#000'
    },
    onChange: handleChange,
    checked: included && responded,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('build__label', included && responded ? 'checkbox__selected' : 'checkbox__unselected'),
    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], null),
    label: activity.name
  })), included && responded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      marginLeft: '30px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    label: "Department Owner",
    size: "small",
    variant: "outlined",
    fullWidth: true,
    value: owner,
    className: "build__input",
    onChange: handleOwnerChange,
    onBlur: updateBusinessOwner
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BusinessProcess);

/***/ }),

/***/ "./resources/js/components/onboarding/Departments/CustomBusinessDeparment.jsx":
/*!************************************************************************************!*\
  !*** ./resources/js/components/onboarding/Departments/CustomBusinessDeparment.jsx ***!
  \************************************************************************************/
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






var CustomBusinessProcess = function CustomBusinessProcess(_ref) {
  var activity = _ref.activity,
    delete_activity = _ref.delete_activity;
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
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    owner = _useState10[0],
    setOwner = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(activity)) {
      setName(activity.name);
      setOwner(activity.owner);
    }
  }, [activity]);
  var handleNameChange = function handleNameChange(event) {
    setName(event.target.value);
    setTouched(true);
    clearErrors(event.target.name);
  };
  var handleOwnerChange = function handleOwnerChange(event) {
    setOwner(event.target.value);
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
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("/api/auth/onboarding/update-business-dept", {
      id: activity.id,
      name: name,
      owner: owner
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
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("/api/auth/onboarding/delete-business-dept", {
      id: activity.id
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      delete_activity(activity);
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
    label: "Department",
    fullWidth: true,
    size: "small",
    variant: "outlined",
    value: name,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('name'), 'build__input'),
    onChange: handleNameChange
  }), displayInputError('name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.5',
      marginRight: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: "Department Owner",
    fullWidth: true,
    size: "small",
    variant: "outlined",
    value: owner,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('owner'), 'build__input'),
    onChange: handleOwnerChange
  }), displayInputError('owner')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.5'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "large",
    disabled: loading || !touched,
    variant: "contained",
    color: "success",
    onClick: handleUpdate,
    sx: {
      marginRight: '10px'
    }
  }, "Update"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "large",
    disabled: loading,
    onClick: handleDelete,
    color: "error",
    variant: "contained"
  }, "Delete")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomBusinessProcess);

/***/ }),

/***/ "./resources/js/components/onboarding/Departments/VerifyBusinessDeparments.jsx":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/onboarding/Departments/VerifyBusinessDeparments.jsx ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var _BusinessDeparment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BusinessDeparment */ "./resources/js/components/onboarding/Departments/BusinessDeparment.jsx");
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var _CustomBusinessDeparment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CustomBusinessDeparment */ "./resources/js/components/onboarding/Departments/CustomBusinessDeparment.jsx");
/* harmony import */ var _AddBusinessDeparment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AddBusinessDeparment */ "./resources/js/components/onboarding/Departments/AddBusinessDeparment.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
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









var VerifyBusinessDeparments = function VerifyBusinessDeparments(_ref) {
  var match = _ref.match,
    history = _ref.history;
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
    activities = _useState6[0],
    setActivities = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    custom_activities = _useState8[0],
    setCustomActivities = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    build_id = _useState10[0],
    setBuildID = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState12 = _slicedToArray(_useState11, 2),
    standard_id = _useState12[0],
    setStandardId = _useState12[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setBuildID(match.params.build_id);
    setStandardId(match.params.standard_id);
  }, [match.params]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_5___default().isEmpty(build_id)) {
      setLoading(true);
      axios__WEBPACK_IMPORTED_MODULE_6__["default"].get("/api/auth/onboarding/business-dept/".concat(build_id)).then(function (e) {
        setLoading(false);
        setErrors([]);
        setActivities(lodash__WEBPACK_IMPORTED_MODULE_5___default().filter(e.data, function (activity) {
          return activity.custom == 0;
        }));
        setCustomActivities(lodash__WEBPACK_IMPORTED_MODULE_5___default().filter(e.data, function (activity) {
          return activity.custom == 1;
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
  }, [build_id]);
  var handCompanyNameChange = function handCompanyNameChange(event) {
    setCompanyName(event.target.value);
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
  var handleAddCustomActivity = function handleAddCustomActivity(activity) {
    setCustomActivities([].concat(_toConsumableArray(custom_activities), [activity]));
  };
  var handleDeleteActivity = function handleDeleteActivity(activity) {
    var the_custom_activities = JSON.parse(JSON.stringify(custom_activities));
    lodash__WEBPACK_IMPORTED_MODULE_5___default().remove(the_custom_activities, function (act) {
      return act.id == activity.id;
    });
    setCustomActivities(the_custom_activities);
  };
  var handleSubmit = function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    axios__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/auth/onboarding/verify-departments", {
      build_id: build_id,
      standard_id: standard_id
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      history.push("/verify-department-functions/".concat(build_id, "/").concat(standard_id, "?page=1"));
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
  var handleBack = function handleBack() {
    history.push("/select-compailance/".concat(build_id));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "auth_page_content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      display: 'flex',
      marginTop: '30px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: '0.4',
      marginRight: '50px',
      marginTop: '50px',
      fontSize: '19px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "An automated step by step onboarding process typically involves the following steps:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Initial registration: The new hire provides their personal information, such as name, address, and contact details."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Verification: The system verifies the employee's identity through email or SMS."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: '0.6',
      padding: '20px',
      borderRadius: '6px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "h4",
    sx: {
      marginBottom: '50px'
    }
  }, "Verify Business Departments"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", null, lodash__WEBPACK_IMPORTED_MODULE_5___default().size(activities) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      padding: '0px 10px 15px 10px'
    }
  }, lodash__WEBPACK_IMPORTED_MODULE_5___default().map(activities, function (activity) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BusinessDeparment__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: activity.id,
      activity: activity
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      paddingTop: '10px'
    }
  }, "Please verify key business departments before continuing "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      padding: '15px 10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "h5",
    sx: {
      color: '#000',
      paddingBottom: '10px'
    }
  }, "Add Missing"), lodash__WEBPACK_IMPORTED_MODULE_5___default().map(custom_activities, function (activity) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CustomBusinessDeparment__WEBPACK_IMPORTED_MODULE_3__["default"], {
      delete_activity: handleDeleteActivity,
      key: activity.id,
      activity: activity
    });
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AddBusinessDeparment__WEBPACK_IMPORTED_MODULE_4__["default"], {
    added: handleAddCustomActivity,
    build_id: build_id
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    onClick: handleBack,
    variant: "outlined"
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_10__["default"], {
    sx: {
      marginLeft: '15px'
    },
    size: "large",
    loading: loading,
    onClick: handleSubmit,
    loadingIndicator: "Processing...",
    variant: "contained"
  }, "Continue")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifyBusinessDeparments);

/***/ })

}]);