"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_auth_signup_VerifyEmailOTP_jsx"],{

/***/ "./resources/js/components/auth/signup/VerifyEmailOTP.jsx":
/*!****************************************************************!*\
  !*** ./resources/js/components/auth/signup/VerifyEmailOTP.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var _AuthHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AuthHeader */ "./resources/js/components/auth/AuthHeader.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var VerifyEmailOTP = function VerifyEmailOTP(_ref) {
  var history = _ref.history,
    match = _ref.match;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    code = _useState2[0],
    setCode = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    email = _useState4[0],
    setEmail = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    errors = _useState8[0],
    setErrors = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var email = match.params.email;
    setEmail(email);
  }, [match]);
  var handleCodeChange = function handleCodeChange(event) {
    setCode(event.target.value);
    if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
      delete errors[0][event.target.name];
      setErrors(errors);
    }
  };
  var handlerInputError = function handlerInputError(errors, inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? 'error' : '';
  };
  var displayInputError = function displayInputError(errors, inputName) {
    return errors.some(function (error) {
      return error.hasOwnProperty(inputName);
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
      className: "form-error-messsage"
    }, errors[0][inputName]) : '';
  };
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setErrors([]);
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post('/api/auth/verify-email', {
      code: code,
      email: email
    }).then(function (e) {
      history.push("/build-choice/".concat(email));
    })["catch"](function (err) {
      setLoading(false);
      if (err.response.status === 500) {
        setErrors([]);
        react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_AuthHeader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    signup: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      display: 'flex',
      marginTop: '30px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.5',
      marginRight: '50px',
      marginTop: '50px',
      fontSize: '19px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "h1",
    gutterBottom: true,
    sx: {
      color: '#fff'
    }
  }, "Streamline your GRC process and focus on the big picture.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.5',
      padding: '20px',
      borderRadius: '6px',
      mt: '50px'
    },
    className: "_auth__right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "h4"
  }, "Enter Verification Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      marginBottom: '50px'
    }
  }, "Please enter verification code sent to your email addresss."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      marginBottom: '15px',
      width: '40%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fullWidth: true,
    type: "number",
    label: "Verification-code",
    variant: "outlined",
    onChange: handleCodeChange,
    name: "code",
    value: code,
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(handlerInputError(errors, 'code'), 'build__input')
  }), displayInputError(errors, 'code')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_8__["default"], {
    type: "submit",
    size: "large",
    sx: {
      paddingRight: '40px',
      paddingLeft: '40px'
    },
    loading: loading,
    loadingIndicator: "Verifing...",
    variant: "contained"
  }, "Verify")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifyEmailOTP);

/***/ })

}]);