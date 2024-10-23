"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_onboarding_Activities_VerifyBusinessActivities_jsx"],{

/***/ "./resources/js/components/onboarding/Activities/AddBusinessActivity.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/onboarding/Activities/AddBusinessActivity.jsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var AddBusinessActivity = function AddBusinessActivity(_ref) {
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
  var handleNameChange = function handleNameChange(event) {
    setName(event.target.value);
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
    axios__WEBPACK_IMPORTED_MODULE_3__["default"].post("/api/auth/onboarding/add-business-activity", {
      build_id: build_id,
      name: name
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      flex: '1',
      marginRight: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fullWidth: true,
    variant: "outlined",
    value: name,
    className: handlerInputError('name'),
    onChange: handleNameChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      flex: '0.5'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "outlined",
    disabled: loading,
    size: "large",
    onClick: handleSubmit
  }, "Save"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, displayInputError('name')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddBusinessActivity);

/***/ }),

/***/ "./resources/js/components/onboarding/Activities/BusinessActivity.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/components/onboarding/Activities/BusinessActivity.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var BusinessActivity = function BusinessActivity(_ref) {
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
      setIncluded(activity.included);
      setResponded(activity.responded);
    }
  }, [activity]);
  var handleResponse = function handleResponse(status) {
    setResponded(true);
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_3__["default"].post("/api/auth/onboarding/business-activities", {
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      flex: '1',
      marginRight: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fullWidth: true,
    variant: "outlined",
    value: activity.name
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      flex: '0.5'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "large",
    disabled: included && loading,
    variant: included && responded ? 'contained' : 'outlined',
    color: included && responded ? 'success' : 'primary',
    onClick: function onClick() {
      return handleResponse(true);
    },
    sx: {
      marginRight: '10px'
    }
  }, "We do this"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "large",
    disabled: !included && loading,
    onClick: function onClick() {
      return handleResponse(false);
    },
    color: !included && responded ? 'error' : 'primary',
    variant: !included && responded ? 'contained' : 'outlined'
  }, "We Don't")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BusinessActivity);

/***/ }),

/***/ "./resources/js/components/onboarding/Activities/CustomBusinessActivity.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/onboarding/Activities/CustomBusinessActivity.jsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var CustomBusinessActivity = function CustomBusinessActivity(_ref) {
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(activity)) {
      setName(activity.name);
    }
  }, [activity]);
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
    axios__WEBPACK_IMPORTED_MODULE_3__["default"].post("/api/auth/onboarding/update-business-activity", {
      id: activity.id,
      name: name
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      setTouched(true);
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
    axios__WEBPACK_IMPORTED_MODULE_3__["default"].post("/api/auth/onboarding/delete-business-activity", {
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      flex: '1',
      marginRight: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fullWidth: true,
    variant: "outlined",
    value: name,
    className: handlerInputError('name'),
    onChange: handleNameChange
  }), displayInputError('name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      flex: '0.5'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "large",
    disabled: loading || !touched,
    variant: "contained",
    color: "success",
    onClick: handleUpdate,
    sx: {
      marginRight: '10px'
    }
  }, "Update"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "large",
    disabled: loading,
    onClick: handleDelete,
    color: "error",
    variant: "contained"
  }, "Delete")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomBusinessActivity);

/***/ }),

/***/ "./resources/js/components/onboarding/Activities/VerifyBusinessActivities.jsx":
/*!************************************************************************************!*\
  !*** ./resources/js/components/onboarding/Activities/VerifyBusinessActivities.jsx ***!
  \************************************************************************************/
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
/* harmony import */ var _BusinessActivity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BusinessActivity */ "./resources/js/components/onboarding/Activities/BusinessActivity.jsx");
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CustomBusinessActivity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CustomBusinessActivity */ "./resources/js/components/onboarding/Activities/CustomBusinessActivity.jsx");
/* harmony import */ var _AddBusinessActivity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AddBusinessActivity */ "./resources/js/components/onboarding/Activities/AddBusinessActivity.jsx");
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









var VerifyBusinessActivities = function VerifyBusinessActivities(_ref) {
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setBuildID(match.params.build_id);
  }, [match.params]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_3___default().isEmpty(build_id)) {
      setLoading(true);
      axios__WEBPACK_IMPORTED_MODULE_6__["default"].get("/api/auth/onboarding/business-activities/".concat(build_id)).then(function (e) {
        setLoading(false);
        setErrors([]);
        setActivities(lodash__WEBPACK_IMPORTED_MODULE_3___default().filter(e.data, function (activity) {
          return activity.custom == 0;
        }));
        setCustomActivities(lodash__WEBPACK_IMPORTED_MODULE_3___default().filter(e.data, function (activity) {
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
    lodash__WEBPACK_IMPORTED_MODULE_3___default().remove(the_custom_activities, function (act) {
      return act.id == activity.id;
    });
    setCustomActivities(the_custom_activities);
  };
  var handleSubmit = function handleSubmit() {};
  var handleBack = function handleBack() {
    history.push("/verify-bussiness-departments/".concat(build_id));
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
    variant: "h4"
  }, "Verify Business Activities"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "hr_line"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", null, lodash__WEBPACK_IMPORTED_MODULE_3___default().size(activities) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      padding: '0px 10px 15px 10px',
      borderRadius: '6px'
    }
  }, lodash__WEBPACK_IMPORTED_MODULE_3___default().map(activities, function (activity) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BusinessActivity__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: activity.id,
      activity: activity
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      paddingTop: '10px'
    }
  }, "Please verify key business activities before continuing "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      padding: '15px 10px',
      borderRadius: '6px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "h5",
    sx: {
      color: '#000',
      paddingBottom: '10px'
    }
  }, "Add Missing"), lodash__WEBPACK_IMPORTED_MODULE_3___default().map(custom_activities, function (activity) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CustomBusinessActivity__WEBPACK_IMPORTED_MODULE_4__["default"], {
      delete_activity: handleDeleteActivity,
      key: activity.id,
      activity: activity
    });
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AddBusinessActivity__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifyBusinessActivities);

/***/ })

}]);