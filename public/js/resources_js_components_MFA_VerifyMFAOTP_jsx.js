"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_MFA_VerifyMFAOTP_jsx"],{

/***/ "./resources/js/components/MFA/VerifyMFAOTP.jsx":
/*!******************************************************!*\
  !*** ./resources/js/components/MFA/VerifyMFAOTP.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/collections/Message/Message.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/TextField */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/lab/LoadingButton */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _auth_AuthHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/AuthHeader */ "./resources/js/components/auth/AuthHeader.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }











var VerifyMFAOTP = function VerifyMFAOTP(_ref) {
  var user = _ref.user,
    token = _ref.token,
    location = _ref.location;
  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useHistory)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    otp = _useState6[0],
    setOtp = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    errorMessage = _useState8[0],
    setErrorMessage = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    successMessage = _useState10[0],
    setSuccessMessage = _useState10[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var handleOtpChange = function handleOtpChange(e) {
    setOtp(e.target.value);
  };
  var handleVerify = function handleVerify() {
    setLoading(true);
    _api_api__WEBPACK_IMPORTED_MODULE_2__["default"].post('/api/auth/2fa/verify', {
      otp: otp
    }).then(function (response) {
      setSuccessMessage('2FA configured successfully.');
      setErrorMessage('');
      var params = new URLSearchParams(location.search);
      var redirect = params.get('redirect');
      setUserData(response.data);
      if (redirect) {
        history.push(redirect);
      } else {
        history.push(response.data.redirect);
      }
    })["catch"](function (error) {
      setSuccessMessage('');
      setErrorMessage('Verification failed. Please try again.');
    })["finally"](function () {
      return setLoading(false);
    });
  };
  var setUserData = function setUserData(data) {
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_4__.setUser)(data.user));
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_4__.setCompanies)(data.companies));
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_4__.setMaturityLevels)(data.maturity_levels));
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_4__.setSupplier)(data.supplier));
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_4__.setPWDRotation)(data.pwd_rotaion));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_auth_AuthHeader__WEBPACK_IMPORTED_MODULE_3__["default"], {
    signup: false
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      display: 'flex',
      marginTop: '30px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      flex: '0.5',
      marginRight: '50px',
      marginTop: '50px',
      fontSize: '19px'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      flex: '0.5',
      padding: '20px',
      borderRadius: '6px',
      mt: '50px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    variant: "h4",
    sx: {
      color: '#fff'
    }
  }, "Multi-Factor Authentication"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      marginBottom: '50px',
      color: '#fff'
    }
  }, "Verify Your Authentication Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      width: '50%',
      color: '#fff'
    }
  }, "Please enter the 6-digit code generated by your authenticator app (Google Authenticator or Microsoft Authenticator) to complete the login process. This code changes every 30 seconds. If you encounter any issues, please ensure your device's time settings are correct and try again."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      marginBottom: '15px',
      width: '45%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_8__["default"], {
    fullWidth: true,
    label: "Verification Code",
    variant: "outlined",
    onChange: handleOtpChange,
    name: "otp",
    value: otp
    // className={classNames(this.handlerInputError(errors, 'code'), 'build__input')}
  })), errorMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
    negative: true
  }, errorMessage), successMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
    positive: true
  }, successMessage), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      display: 'flex'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    onClick: handleVerify,
    type: "button",
    size: "large",
    sx: {
      paddingRight: '40px',
      paddingLeft: '40px',
      marginRight: '20px'
    },
    loading: loading,
    loadingIndicator: "Verifing...",
    variant: "contained"
  }, "Verify")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifyMFAOTP);

/***/ })

}]);