"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_auth_join_JoinNewUser_js"],{

/***/ "./resources/js/components/auth/join/JoinNewUser.js":
/*!**********************************************************!*\
  !*** ./resources/js/components/auth/join/JoinNewUser.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _JoinNewUser_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JoinNewUser.scss */ "./resources/js/components/auth/join/JoinNewUser.scss");
/* harmony import */ var _store_localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/localStorage */ "./resources/js/store/localStorage.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var react_password_strength_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-password-strength-bar */ "./node_modules/react-password-strength-bar/dist/index.js");
/* harmony import */ var _IdentificationLogo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../IdentificationLogo */ "./resources/js/components/auth/IdentificationLogo.jsx");
/* harmony import */ var _AuthHeader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AuthHeader */ "./resources/js/components/auth/AuthHeader.jsx");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_lab__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/lab */ "./node_modules/@mui/lab/LoadingButton/LoadingButton.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
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













var JoinNewUser = /*#__PURE__*/function (_Component) {
  function JoinNewUser() {
    var _this;
    _classCallCheck(this, JoinNewUser);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, JoinNewUser, [].concat(args));
    _defineProperty(_this, "state", {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      _token: '',
      password_confirmation: '',
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
      _this.setState({
        errors: [],
        loading: true
      });
      axios__WEBPACK_IMPORTED_MODULE_10__["default"].post('/api/auth/join', _this.state).then(function (response) {
        _this.setState({
          loading: false,
          first_name: '',
          last_name: '',
          password: '',
          password_confirmation: ''
        });
        _this.props.setToken(response.data.token);
        _this.props.setUser(response.data.user);
        _this.props.setPWDRotation(response.data.pwd_rotaion);
        _this.props.setCompanies(response.data.companies);
        _this.props.setMaturityLevels(response.data.maturity_levels);
        _this.props.unsetSearchQuery();
        _this.props.unsetSearchResults();
        // TODO: disable MFA for now as twilip is not working properly
        // this.props.history.push('/user/enable-mfa');
        _this.props.history.push('/select-organization');
      })["catch"](function (err) {
        if (err.response.status === 500) {
          _this.setState({
            errors: [],
            loading: false
          });
          react_notifications__WEBPACK_IMPORTED_MODULE_5__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
        }
        if (err.response.status === 422) {
          _this.setState({
            errors: _this.state.errors.concat(err.response.data.errors),
            loading: false
          });
        }
      });
    });
    return _this;
  }
  _inherits(JoinNewUser, _Component);
  return _createClass(JoinNewUser, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0,_store_localStorage__WEBPACK_IMPORTED_MODULE_2__.deleteStore)();
      this.props.clearUser();
      this.props.clearPWDRotation();
      this.props.clearToken();
      var _this$props$match$par = this.props.match.params,
        _token = _this$props$match$par._token,
        email = _this$props$match$par.email;
      this.setState({
        _token: _token,
        email: email
      });
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
        password = _this$state.password,
        password_confirmation = _this$state.password_confirmation,
        first_name = _this$state.first_name,
        last_name = _this$state.last_name;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AuthHeader__WEBPACK_IMPORTED_MODULE_8__["default"], {
        signup: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          display: 'flex',
          marginTop: '30px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          flex: '0.5',
          marginRight: '50px',
          marginTop: '50px',
          fontSize: '19px'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          flex: '0.5',
          padding: '20px',
          borderRadius: '6px',
          mt: '50px'
        },
        className: "_auth__right"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
        variant: "h4"
      }, "Account Setup"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
        sx: {
          marginBottom: '50px'
        }
      }, "Few more details and your account will be ready to use."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        className: "",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          display: 'flex',
          justifyItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          marginBottom: '15px',
          flex: '0.5',
          marginRight: '10px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {
        fullWidth: true,
        label: "First name",
        variant: "outlined",
        onChange: this.handleChange,
        name: "first_name",
        value: first_name,
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.handlerInputError(errors, 'first_name'), 'build__input')
      }), this.displayInputError(errors, 'first_name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          marginBottom: '15px',
          flex: '0.5',
          marginLeft: '10px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {
        fullWidth: true,
        label: "Last name",
        variant: "outlined",
        onChange: this.handleChange,
        name: "last_name",
        value: last_name,
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.handlerInputError(errors, 'last_name'), 'build__input')
      }), this.displayInputError(errors, 'last_name'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          marginBottom: '15px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {
        type: "password",
        fullWidth: true,
        label: "Enter new Password",
        variant: "outlined",
        onChange: this.handleChange,
        name: "password",
        value: password,
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.handlerInputError(errors, 'password'), 'build__input')
      }), this.displayInputError(errors, 'password')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
        sx: {
          marginBottom: '15px'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {
        type: "password",
        fullWidth: true,
        label: "Confirm Password",
        variant: "outlined",
        onChange: this.handleChange,
        name: "password_confirmation",
        value: password_confirmation,
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()(this.handlerInputError(errors, 'password_confirmation'), 'build__input')
      }), this.displayInputError(errors, 'password_confirmation'), password != '' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_password_strength_bar__WEBPACK_IMPORTED_MODULE_6__["default"], {
        password: password
      }) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_14__["default"], {
        type: "submit",
        size: "large",
        sx: {
          paddingRight: '40px',
          paddingLeft: '40px'
        },
        loading: loading,
        loadingIndicator: "Processing...",
        variant: "contained"
      }, "Finish Setup")))));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user.activeUser
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, {
  setUser: _actions__WEBPACK_IMPORTED_MODULE_4__.setUser,
  clearUser: _actions__WEBPACK_IMPORTED_MODULE_4__.clearUser,
  setToken: _actions__WEBPACK_IMPORTED_MODULE_4__.setToken,
  clearToken: _actions__WEBPACK_IMPORTED_MODULE_4__.clearToken,
  setCompanies: _actions__WEBPACK_IMPORTED_MODULE_4__.setCompanies,
  setPWDRotation: _actions__WEBPACK_IMPORTED_MODULE_4__.setPWDRotation,
  clearPWDRotation: _actions__WEBPACK_IMPORTED_MODULE_4__.clearPWDRotation,
  setMaturityLevels: _actions__WEBPACK_IMPORTED_MODULE_4__.setMaturityLevels,
  unsetSearchQuery: _actions__WEBPACK_IMPORTED_MODULE_4__.unsetSearchQuery,
  unsetSearchResults: _actions__WEBPACK_IMPORTED_MODULE_4__.unsetSearchResults
})(JoinNewUser));

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./resources/js/components/auth/join/JoinNewUser.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./resources/js/components/auth/join/JoinNewUser.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/components/auth/join/JoinNewUser.scss":
/*!************************************************************!*\
  !*** ./resources/js/components/auth/join/JoinNewUser.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_3_JoinNewUser_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./JoinNewUser.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./resources/js/components/auth/join/JoinNewUser.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_3_JoinNewUser_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_3_JoinNewUser_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);