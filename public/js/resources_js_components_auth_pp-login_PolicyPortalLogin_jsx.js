"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_auth_pp-login_PolicyPortalLogin_jsx"],{

/***/ "./resources/js/components/auth/PPAuthHeader.jsx":
/*!*******************************************************!*\
  !*** ./resources/js/components/auth/PPAuthHeader.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ "./resources/js/index.js");


var PPAuthHeader = function PPAuthHeader(_ref) {
  var signup = _ref.signup;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "apibuild__header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header__section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header__tier"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header__logo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "h_logo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: ___WEBPACK_IMPORTED_MODULE_1__.AppOnboardingLogo,
    alt: ___WEBPACK_IMPORTED_MODULE_1__.GlobalAppName
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header__center"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header__right"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PPAuthHeader);

/***/ }),

/***/ "./resources/js/components/auth/pp-login/PolicyPortalLogin.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/components/auth/pp-login/PolicyPortalLogin.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/localStorage */ "./resources/js/store/localStorage.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-cookie */ "./node_modules/react-cookie/es6/Cookies.js");
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-cookie */ "./node_modules/react-cookie/es6/withCookies.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var lodash_isempty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash.isempty */ "./node_modules/lodash.isempty/index.js");
/* harmony import */ var lodash_isempty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isempty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _PPAuthHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../PPAuthHeader */ "./resources/js/components/auth/PPAuthHeader.jsx");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
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












var PolicyPortalLogin = /*#__PURE__*/function (_Component) {
  function PolicyPortalLogin() {
    var _this;
    _classCallCheck(this, PolicyPortalLogin);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, PolicyPortalLogin, [].concat(args));
    _defineProperty(_this, "state", {
      email: '',
      errors: [],
      loading: false
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
        className: "form-error-messsage"
      }, errors[0][inputName]) : '';
    });
    _defineProperty(_this, "handleSubmit", function (event) {
      event.preventDefault();
      var portal_link = _this.props.match.params.portal_link;
      _this.setState({
        errors: [],
        loading: true
      });
      var cookies = _this.props.cookies;
      var cock = cookies.get("__CJPPREMERME__".concat(_this.state.email));
      var mfa_remb = false;
      if (cock === 'true') {
        mfa_remb = true;
      }
      var email = _this.state.email;
      axios__WEBPACK_IMPORTED_MODULE_7__["default"].post('/api/auth/policy-panels-login', {
        email: email,
        mfa_remb: mfa_remb
      }, {
        headers: {
          'X-Company-Portal-Link-ID': portal_link
        }
      }).then(function (response) {
        var params = new URLSearchParams(_this.props.location.search);
        var redirect = params.get('redirect');
        _this.setState({
          email: ''
        });
        _this.props.history.push("/".concat(portal_link, "/policy-panels/").concat(response.data.email, "/").concat(response.data.unique_id).concat(!lodash_isempty__WEBPACK_IMPORTED_MODULE_4___default()(redirect) ? "?redirect=".concat(redirect) : ''));
      })["catch"](function (err) {
        _this.setState({
          loading: false
        });
        if (err.response.status === 500) {
          _this.setState({
            errors: []
          });
          react_notifications__WEBPACK_IMPORTED_MODULE_3__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
        }
        if (err.response.status === 422) {
          _this.setState({
            errors: _this.state.errors.concat(err.response.data.errors)
          });
        }
        if (err.response.status === 429) {
          _this.setState({
            errors: _this.state.errors.concat(err.response.data.errors)
          });
        }
        if (err.response.status === 404) {
          react_notifications__WEBPACK_IMPORTED_MODULE_3__.NotificationManager.error(err.response.data.message, "Error");
        }
      });
    });
    return _this;
  }
  _inherits(PolicyPortalLogin, _Component);
  return _createClass(PolicyPortalLogin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var params = new URLSearchParams(this.props.location.search);
      if (!lodash_isempty__WEBPACK_IMPORTED_MODULE_4___default()(this.props.portal_user)) {
        var redirect = params.get('redirect');
        if (redirect) {
          this.props.history.push(redirect);
        } else {
          // redirect user to the PolicyPortal 
          var portal_link = this.props.match.params.portal_link;
          this.props.history.push("/policy-panels/".concat(portal_link, "/introduction"));
        }
      } else {
        // do not delete entire store for now, will see later 
        // we may just needs to verify the portal link 
        // deleteStore();

        if (params.get('email')) {
          this.setState({
            email: window.atob(params.get('email'))
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState = function (state, callback) {
        return;
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        errors = _this$state.errors,
        loading = _this$state.loading,
        email = _this$state.email;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PPAuthHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
        signup: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
        sx: {
          display: 'flex',
          marginTop: '30px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
        sx: {
          flex: '0.5',
          marginRight: '50px',
          marginTop: '50px',
          fontSize: '19px',
          textAlign: 'center'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
        sx: {
          flex: '0.5',
          padding: '20px',
          borderRadius: '6px',
          mt: '50px'
        },
        className: "_auth__right"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
        variant: "h4"
      }, "Policy Panel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
        sx: {
          marginBottom: '50px'
        }
      }, "Please enter your email to access policy portal."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
        sx: {
          '& > :not(style)': {
            width: '55ch'
          },
          marginBottom: '15px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
        label: "E-mail",
        autoComplete: "true",
        variant: "outlined",
        onChange: this.handleChange,
        name: "email",
        value: email,
        className: classnames__WEBPACK_IMPORTED_MODULE_6___default()(this.handlerInputError(errors, 'email'), 'build__input')
      }), this.displayInputError(errors, 'email')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_11__["default"], {
        type: "submit",
        size: "large",
        sx: {
          paddingRight: '40px',
          paddingLeft: '40px'
        },
        loading: loading,
        loadingIndicator: "Generating OTP...",
        variant: "contained"
      }, "Request OTP")))));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
_defineProperty(PolicyPortalLogin, "propTypes", {
  cookies: (0,prop_types__WEBPACK_IMPORTED_MODULE_12__.instanceOf)(react_cookie__WEBPACK_IMPORTED_MODULE_13__["default"]).isRequired
});
var mapStateToProps = function mapStateToProps(state) {
  return {
    portal_user: state.user.portalUser
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps)((0,react_cookie__WEBPACK_IMPORTED_MODULE_14__["default"])(PolicyPortalLogin)));

/***/ })

}]);