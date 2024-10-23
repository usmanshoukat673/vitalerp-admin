"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_accept-invitation_AcceptInvitation_js"],{

/***/ "./resources/js/components/accept-invitation/AcceptInvitation.js":
/*!***********************************************************************!*\
  !*** ./resources/js/components/accept-invitation/AcceptInvitation.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
/* harmony import */ var _LoadingBackgrop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../LoadingBackgrop */ "./resources/js/components/LoadingBackgrop.jsx");
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





var AcceptInvitation = /*#__PURE__*/function (_Component) {
  function AcceptInvitation() {
    var _this;
    _classCallCheck(this, AcceptInvitation);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, AcceptInvitation, [].concat(args));
    _defineProperty(_this, "state", {
      loading: false
    });
    return _this;
  }
  _inherits(AcceptInvitation, _Component);
  return _createClass(AcceptInvitation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.setState({
        loading: true
      });
      var _this$props$match$par = this.props.match.params,
        _token = _this$props$match$par._token,
        email = _this$props$match$par.email;
      this.props.setCreateNewOrg({
        open: false,
        in_org: false
      });
      if (_token && email) {
        _api_api__WEBPACK_IMPORTED_MODULE_3__["default"].post('/api/user/accept-invite', {
          _token: _token,
          email: email
        }).then(function (e) {
          _this2.setState({
            loading: false
          });
          _this2.props.setCompanies(e.data.companies);
          _this2.props.setUserNewDevice(e.data.new_device);
          _this2.props.history.push('/select-organization');
        })["catch"](function (err) {
          if (err.response.status === 500 || err.response.status === 422) {
            _this2.setState({
              loading: false
            });
          }
          if (err.response.status === 400) {
            _this2.setState({
              loading: false
            });
            _this2.props.history.push('/select-organization');
          }
        });
      } else {
        this.props.history.push('/select-organization');
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
      var loading = this.state.loading;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_LoadingBackgrop__WEBPACK_IMPORTED_MODULE_4__["default"], {
        open: true
      }) : '');
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(null, {
  setCompanies: _actions__WEBPACK_IMPORTED_MODULE_1__.setCompanies,
  setUserNewDevice: _actions__WEBPACK_IMPORTED_MODULE_1__.setUserNewDevice,
  setCreateNewOrg: _actions__WEBPACK_IMPORTED_MODULE_1__.setCreateNewOrg
})(AcceptInvitation));

/***/ })

}]);