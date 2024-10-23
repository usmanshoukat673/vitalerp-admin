"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_onboarding_VerifyCompany_jsx"],{

/***/ "./resources/js/components/onboarding/VerifyCompany.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/components/onboarding/VerifyCompany.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControl/FormControl.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/InputLabel/InputLabel.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Select/Select.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var VerifyCompany = function VerifyCompany(_ref) {
  var match = _ref.match,
    history = _ref.history;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
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
    company_name = _useState6[0],
    setCompanyName = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    city = _useState8[0],
    setCity = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    state = _useState10[0],
    setState = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState12 = _slicedToArray(_useState11, 2),
    states = _useState12[0],
    setStates = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState14 = _slicedToArray(_useState13, 2),
    street_address = _useState14[0],
    setStreetAddress = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    build_id = _useState16[0],
    setBuildID = _useState16[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setBuildID(match.params.build_id);
  }, [match.params]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setBuildID(match.params.build_id);
    if (!_.isEmpty(match.params.build_id)) {
      axios__WEBPACK_IMPORTED_MODULE_4__["default"].get("/api/auth/onboarding/verify-company/".concat(match.params.build_id)).then(function (e) {
        setCompanyName(e.data.company_name);
        setCity(e.data.city);
        setState(e.data.state);
        setStreetAddress(e.data.street_address);
      })["catch"](function (err) {
        setLoading(false);
        if (err.response.status === 500) {
          react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
        }
        if (err.response.status === 422) {
          react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.error(err.response.data, 'Error');
        }
      });
      axios__WEBPACK_IMPORTED_MODULE_4__["default"].get("/api/auth/onboarding/us-states").then(function (e) {
        setStates(e.data);
      })["catch"](function (err) {
        if (err.response.status === 500) {
          react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
        }
        if (err.response.status === 422) {
          react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.error(err.response.data, 'Error');
        }
      });
    }
  }, [match.params]);
  var handCompanyNameChange = function handCompanyNameChange(event) {
    setCompanyName(event.target.value);
    clearErrors(event.target.name);
  };
  var handleCityChange = function handleCityChange(event) {
    setCity(event.target.value);
    clearErrors(event.target.name);
  };
  var handleStateChange = function handleStateChange(event) {
    setState(event.target.value);
    clearErrors(event.target.id);
  };
  var handleStreedAddressChange = function handleStreedAddressChange(event) {
    setStreetAddress(event.target.value);
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
    axios__WEBPACK_IMPORTED_MODULE_4__["default"].post("/api/auth/onboarding/verify-company", {
      build_id: build_id,
      company_name: company_name,
      city: city,
      state: state,
      street_address: street_address
    }).then(function (e) {
      setLoading(false);
      setErrors([]);
      history.push("/verify-overview/".concat(e.data));
    })["catch"](function (err) {
      setLoading(false);
      if (err.response.status === 500) {
        react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
      if (err.response.status === 422) {
        setErrors(errors.concat(err.response.data.errors));
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      display: 'flex',
      marginTop: '30px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.4',
      marginRight: '50px',
      marginTop: '50px',
      fontSize: '19px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "An automated step by step onboarding process typically involves the following steps:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Initial registration: The new hire provides their personal information, such as name, address, and contact details."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Verification: The system verifies the employee's identity through email or SMS."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      flex: '0.6',
      padding: '20px',
      borderRadius: '6px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "h4"
  }, "Company Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    sx: {
      marginBottom: '50px'
    }
  }, "Please enter your company details."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      marginBottom: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fullWidth: true,
    label: "Company Name",
    variant: "outlined",
    onChange: handCompanyNameChange,
    name: "company_name",
    value: company_name,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(handlerInputError('company_name'), 'build__input')
  }), displayInputError('company_name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      marginBottom: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fullWidth: true,
    label: "Street address",
    variant: "outlined",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(handlerInputError('street_address'), 'build__input'),
    onChange: handleStreedAddressChange,
    name: "street_address",
    value: street_address
  }), displayInputError('street_address')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      marginBottom: '15px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fullWidth: true,
    label: "City",
    variant: "outlined",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(handlerInputError('city'), 'build__input'),
    onChange: handleCityChange,
    name: "city",
    value: city
  }), displayInputError('city')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    fullWidth: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    id: "state_label_id"
  }, "State"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
    labelId: "state_label_id",
    id: "state",
    value: state,
    label: "State",
    onChange: handleStateChange,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(handlerInputError('state'), 'build__input')
  }, _.map(states, function (st) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
      sx: {
        fontSize: '18px!important'
      },
      key: st.id,
      value: st.name
    }, st.name);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, displayInputError('build_id')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_12__["default"], {
    type: "submit",
    size: "large",
    loading: loading,
    loadingIndicator: "Processing...",
    variant: "contained"
  }, "Continue"))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerifyCompany);

/***/ })

}]);