"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_select-org_ChangeExpiredPassword_js"],{

/***/ "./resources/js/components/select-org/ChangeExpiredPassword.js":
/*!*********************************************************************!*\
  !*** ./resources/js/components/select-org/ChangeExpiredPassword.js ***!
  \*********************************************************************/
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
/* harmony import */ var react_password_strength_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-password-strength-bar */ "./node_modules/react-password-strength-bar/dist/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
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









var ChangeExpiredPassword = /*#__PURE__*/function (_Component) {
  function ChangeExpiredPassword() {
    var _this;
    _classCallCheck(this, ChangeExpiredPassword);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ChangeExpiredPassword, [].concat(args));
    _defineProperty(_this, "state", {
      password: '',
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
      _api_api__WEBPACK_IMPORTED_MODULE_6__["default"].post('/api/user/change-current-password', _this.state).then(function (response) {
        _this.setState({
          password: '',
          password_confirmation: '',
          errors: [],
          loading: false
        });
        _this.props.setUser(response.data.user);
        _this.props.setPWDRotation(response.data.pwd_rotaion);
        _this.props.history.push('/select-organization');
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
    return _this;
  }
  _inherits(ChangeExpiredPassword, _Component);
  return _createClass(ChangeExpiredPassword, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setCreateNewOrg({
        open: false,
        in_org: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var rotation = this.props.rotation;
      var _this$state = this.state,
        errors = _this$state.errors,
        loading = _this$state.loading,
        password = _this$state.password,
        password_confirmation = _this$state.password_confirmation;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
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
      }, "Your Password is Expired"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
        sx: {
          marginBottom: '50px',
          color: '#fff'
        }
      }, "Your password is already ", rotation.days, " days old, it is time change your password."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        className: "",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
        sx: {
          marginBottom: '15px',
          width: '55%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
        type: "password",
        fullWidth: true,
        label: "New Password",
        variant: "outlined",
        onChange: this.handleChange,
        name: "password",
        value: password,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(this.handlerInputError(errors, 'password'), 'build__input')
      }), this.displayInputError(errors, 'password'), password != '' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_password_strength_bar__WEBPACK_IMPORTED_MODULE_4__["default"], {
        password: password
      }) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
        sx: {
          marginBottom: '15px',
          width: '55%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
        type: "password",
        fullWidth: true,
        label: "Confirm Password",
        variant: "outlined",
        onChange: this.handleChange,
        name: "password_confirmation",
        value: password_confirmation,
        className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(this.handlerInputError(errors, 'password_confirmation'), 'build__input')
      }), this.displayInputError(errors, 'password_confirmation')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_lab__WEBPACK_IMPORTED_MODULE_10__["default"], {
        type: "submit",
        size: "large",
        sx: {
          paddingRight: '40px',
          paddingLeft: '40px'
        },
        loading: loading,
        loadingIndicator: "Changing...",
        variant: "contained"
      }, "Change Password")))));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
var mapStateToProps = function mapStateToProps(state) {
  return {
    rotation: state.password.rotation
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {
  setUser: _actions__WEBPACK_IMPORTED_MODULE_3__.setUser,
  setPWDRotation: _actions__WEBPACK_IMPORTED_MODULE_3__.setPWDRotation,
  setCreateNewOrg: _actions__WEBPACK_IMPORTED_MODULE_3__.setCreateNewOrg
})(ChangeExpiredPassword));

/***/ })

}]);