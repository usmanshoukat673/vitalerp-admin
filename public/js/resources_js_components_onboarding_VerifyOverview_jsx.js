"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_onboarding_VerifyOverview_jsx"],{

/***/ "./resources/js/components/onboarding/VerifyOverview.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/components/onboarding/VerifyOverview.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var VerifyOverview = function VerifyOverview(_ref) {
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
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    build = _useState6[0],
    setBuild = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    build_id = _useState8[0],
    setBuildID = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    overview = _useState10[0],
    setOverview = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setBuildID(match.params.build_id);
  }, [match.params]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!_.isEmpty(build_id)) {
      setLoading(true);
      axios__WEBPACK_IMPORTED_MODULE_2__["default"].get("/api/auth/onboarding/verify-company/".concat(build_id)).then(function (e) {
        setLoading(false);
        setErrors([]);
        setBuild(e.data);
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!_.isEmpty(build)) {
      setOverview(build.overview);
    }
  }, [build]);
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
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_2__["default"].post("/api/auth/onboarding/verify-overview", {
      build_id: build_id,
      overview: overview
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      history.push("/select-compailance/".concat(e.data));
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
    history.push("/verify-company/".concat(build_id));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "auth_page_content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      display: 'flex',
      marginTop: '80px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      flex: '0.4',
      marginRight: '50px',
      marginTop: '50px',
      fontSize: '19px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "An automated step by step onboarding process typically involves the following steps:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Initial registration: The new hire provides their personal information, such as name, address, and contact details."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Verification: The system verifies the employee's identity through email or SMS."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      flex: '0.6',
      padding: '20px',
      borderRadius: '6px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_4__["default"], {
    variant: "h4",
    sx: {
      marginBottom: '50px'
    }
  }, "Verify Company Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {
    sx: {
      backgroundColor: '#fff',
      padding: '15px 10px',
      borderRadius: '6px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fullWidth: true,
    label: "Descriotion",
    multiline: true,
    rows: 12,
    value: overview,
    onChange: function onChange(e) {
      return setOverview(e.target.value);
    },
    className: "build__input"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Please verify and make sure the company description is correct before continuing ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: "large",
    onClick: handleBack,
    variant: "outlined",
    sx: {
      marginRight: '15px'
    }
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "large",
    className: "ml-2",
    loading: loading,
    onClick: handleSubmit,
    loadingIndicator: "Processing...",
    variant: "contained"
  }, "Continue")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifyOverview);

/***/ })

}]);