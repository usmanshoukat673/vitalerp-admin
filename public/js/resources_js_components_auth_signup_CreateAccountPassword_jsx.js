"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_auth_signup_CreateAccountPassword_jsx"],{

/***/ "./resources/js/components/auth/signup/CreateAccountPassword.jsx":
/*!***********************************************************************!*\
  !*** ./resources/js/components/auth/signup/CreateAccountPassword.jsx ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var _AuthHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AuthHeader */ "./resources/js/components/auth/AuthHeader.jsx");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../actions */ "./resources/js/actions/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }









var CreateAccountPassword = function CreateAccountPassword(_ref) {
  var history = _ref.history,
    match = _ref.match;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    company_name = _useState2[0],
    setCompanyName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    email = _useState4[0],
    setEmail = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    password = _useState6[0],
    setPassword = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    password_confirmation = _useState8[0],
    setConfimrationPassword = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    errors = _useState12[0],
    setErrors = _useState12[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var email = match.params.email;
    setEmail(email);
  }, [match]);
  var handCompanyNameChange = function handCompanyNameChange(event) {
    setCompanyName(event.target.value);
    clearErrors(event.target.name);
  };
  var handlePasswordChange = function handlePasswordChange(event) {
    setPassword(event.target.value);
    clearErrors(event.target.name);
  };
  var handleConfirmPasswordChange = function handleConfirmPasswordChange(event) {
    setConfimrationPassword(event.target.value);
    clearErrors(event.target.name);
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
  var clearErrors = function clearErrors(field) {
    if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
      delete errors[0][field];
      setErrors(errors);
    }
  };
  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setErrors([]);
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_6__["default"].post('/api/auth/setup-new-account', {
      email: email,
      company_name: company_name,
      password: password,
      password_confirmation: password_confirmation
    }).then(function (e) {
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setToken)(e.data.token));
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setUser)(e.data.user));
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setCompanies)(e.data.companies));
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setUserNewDevice)(e.data.new_device));
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setPWDRotation)(e.data.pwd_rotaion));
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setMaturityLevels)(e.data.maturity_levels));
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.unsetSearchQuery)());
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.unsetSearchResults)());
      history.push('/select-organization');
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AuthHeader__WEBPACK_IMPORTED_MODULE_2__["default"], {
    signup: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      display: 'flex',
      marginTop: '30px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: '0.5',
      marginRight: '50px',
      marginTop: '50px',
      fontSize: '19px'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      flex: '0.5',
      padding: '20px',
      borderRadius: '6px',
      mt: '50px'
    },
    className: "_auth__right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    variant: "h4"
  }, "Create Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sx: {
      marginBottom: '50px'
    }
  }, "Please set your account password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    className: "",
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      marginBottom: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fullWidth: true,
    label: "Company Name",
    variant: "outlined",
    onChange: handCompanyNameChange,
    name: "company_name",
    value: company_name,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('company_name'), 'build__input')
  }), displayInputError('company_name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      marginBottom: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    type: "password",
    fullWidth: true,
    label: "Enter Password",
    variant: "outlined",
    onChange: handlePasswordChange,
    name: "password",
    value: password,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('password'), 'build__input')
  }), displayInputError('password')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      marginBottom: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    type: "password",
    fullWidth: true,
    label: "Confirm Password",
    variant: "outlined",
    onChange: handleConfirmPasswordChange,
    name: "password_confirmation",
    value: password_confirmation,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(handlerInputError('password_confirmation'), 'build__input')
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_10__["default"], {
    type: "submit",
    size: "large",
    sx: {
      paddingRight: '40px',
      paddingLeft: '40px'
    },
    loading: loading,
    loadingIndicator: "Processing...",
    variant: "contained"
  }, "Save Password")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateAccountPassword);

/***/ })

}]);