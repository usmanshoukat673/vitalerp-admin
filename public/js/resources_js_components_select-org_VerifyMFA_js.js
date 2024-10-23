"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_select-org_VerifyMFA_js"],{

/***/ "./resources/js/components/select-org/VerifyMFA.js":
/*!*********************************************************!*\
  !*** ./resources/js/components/select-org/VerifyMFA.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









var VerifyMFA = /*#__PURE__*/function (_Component) {
  function VerifyMFA(props) {
    var _this;
    _classCallCheck(this, VerifyMFA);
    _this = _callSuper(this, VerifyMFA, [props]);
    _defineProperty(_this, "state", {
      code: '',
      id: '',
      errors: [],
      loading: false,
      loading_resend: false,
      enable_resend: true
    });
    _defineProperty(_this, "setID", function () {
      var token = _this.props.match.params.token;
      if (!lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(token) && _this.state.id !== token) {
        _this.setState({
          id: token
        });
      }
    });
    _defineProperty(_this, "handleChange", function (event) {
      _this.setState(_defineProperty({}, event.target.name, event.target.value));
      var errors = _this.state.errors;
      if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
        delete errors[0][event.target.name];
        _this.setState({
          errors: errors
        });
      }
    });
    _defineProperty(_this, "handlerInputError", function (errors, inputName) {
      return errors.some(function (error) {
        return error.hasOwnProperty(inputName);
      }) ? 'error' : '';
    });
    _defineProperty(_this, "displayInputError", function (errors, inputName) {
      return errors.some(function (error) {
        return error.hasOwnProperty(inputName);
      }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        style: {
          marginTop: '5px'
        },
        className: "form-error-messsage"
      }, errors[0][inputName]) : '';
    });
    _defineProperty(_this, "handleSubmit", function (event) {
      event.preventDefault();
      _this.setState({
        errors: [],
        loading: true
      });
      _api_api__WEBPACK_IMPORTED_MODULE_6__["default"].post('/api/user/verify-otp', _this.state).then(function (response) {
        _this.setState({
          code: '',
          errors: [],
          loading: false
        });
        _this.props.setUser(response.data.user);
        _this.props.history.push('/select-organization');
        react_notifications__WEBPACK_IMPORTED_MODULE_4__.NotificationManager.success('Multi-Factor Authentication has been successfully configured.', 'Success');
      })["catch"](function (err) {
        if (err.response.status === 500) {
          _this.setState({
            errors: [],
            loading: false
          });
        }
        if (err.response.status === 422) {
          _this.setState({
            errors: _this.state.errors.concat(err.response.data.errors),
            loading: false
          });
        }
      });
    });
    _defineProperty(_this, "handleResendVerificationCode", function (event) {
      event.preventDefault();
      _this.setState({
        errors: [],
        loading_resend: true
      });
      _api_api__WEBPACK_IMPORTED_MODULE_6__["default"].post('/api/user/resend-otp', _this.state).then(function (response) {
        _this.setState({
          errors: [],
          loading_resend: false
        });
        _this.props.setUser(response.data.user);
        _this.props.history.push("/user/verify-phone/".concat(response.data.id));
      })["catch"](function (err) {
        if (err.response.status === 500) {
          _this.setState({
            errors: [],
            loading_resend: false
          });
        }
        if (err.response.status === 422) {
          _this.setState({
            errors: _this.state.errors.concat(err.response.data.errors),
            loading_resend: false
          });
        }
      });
    });
    setTimeout(function () {
      this.setState({
        enable_resend: false
      });
    }.bind(_this), 60000);
    _this.props.setCreateNewOrg({
      open: false,
      in_org: false
    });
    return _this;
  }
  _inherits(VerifyMFA, _Component);
  return _createClass(VerifyMFA, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setID();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.setID();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        errors = _this$state.errors,
        loading = _this$state.loading,
        code = _this$state.code,
        loading_resend = _this$state.loading_resend;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
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
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
        variant: "h4",
        sx: {
          color: '#fff'
        }
      }, "Multi-Factor Authentication"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
        sx: {
          marginBottom: '50px',
          color: '#fff'
        }
      }, "Enter a verification code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
        style: {
          color: '#fff'
        }
      }, "Please enter verification code which is sent via SMS on your mobile number, please note verification code will expire in 2 minutes."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        className: "",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
        sx: {
          marginBottom: '15px',
          width: '45%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
        fullWidth: true,
        label: "Verification Code",
        variant: "outlined",
        onChange: this.handleChange,
        name: "code",
        value: code,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(this.handlerInputError(errors, 'code'), 'build__input')
      }), this.displayInputError(errors, 'code')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
        sx: {
          display: 'flex'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_10__["default"], {
        type: "submit",
        size: "large",
        sx: {
          paddingRight: '40px',
          paddingLeft: '40px',
          marginRight: '20px'
        },
        loading: loading,
        loadingIndicator: "Verifing...",
        variant: "contained"
      }, "Verify"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        type: "button",
        size: "large",
        onClick: this.handleResendVerificationCode,
        sx: {
          paddingRight: '40px',
          paddingLeft: '40px'
        },
        disabled: loading_resend,
        variant: "outlined"
      }, "Resend new Code?")))));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(null, {
  setUser: _actions__WEBPACK_IMPORTED_MODULE_3__.setUser,
  setCreateNewOrg: _actions__WEBPACK_IMPORTED_MODULE_3__.setCreateNewOrg
})(VerifyMFA));

/***/ })

}]);