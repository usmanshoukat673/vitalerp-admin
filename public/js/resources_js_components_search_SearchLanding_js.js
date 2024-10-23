"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_search_SearchLanding_js"],{

/***/ "./resources/js/components/search/SearchLanding.js":
/*!*********************************************************!*\
  !*** ./resources/js/components/search/SearchLanding.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/views/Feed/Feed.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/modules/Tab/Tab.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/modules/Checkbox/Checkbox.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SearchLanding_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SearchLanding.scss */ "./resources/js/components/search/SearchLanding.scss");
/* harmony import */ var _Searching__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Searching */ "./resources/js/components/search/Searching.js");
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








var SearchLanding = /*#__PURE__*/function (_Component) {
  function SearchLanding() {
    var _this;
    _classCallCheck(this, SearchLanding);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, SearchLanding, [].concat(args));
    _defineProperty(_this, "state", {
      errors: [],
      loading: false,
      apps: [],
      query: '',
      results: []
    });
    _defineProperty(_this, "runCustomQuery", function () {
      _this.setState({
        loading: true
      });
      var _this$props = _this.props,
        search = _this$props.search,
        standards = _this$props.standards;
      var all_stds = lodash__WEBPACK_IMPORTED_MODULE_3___default().filter(standards, function (std) {
        return std.selected === true;
      });
      var stds = lodash__WEBPACK_IMPORTED_MODULE_3___default().map(all_stds, function (std) {
        return std.standard_id;
      });
      _api_api__WEBPACK_IMPORTED_MODULE_6__["default"].post("/api/user/search/custom-query", {
        standards: stds,
        query: search.query
      }).then(function (e) {
        _this.setState({
          loading: false,
          results: e.data.results
        });
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
    _defineProperty(_this, "listSections", function (sections) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "the__results"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "search__feed"
      }, lodash__WEBPACK_IMPORTED_MODULE_3___default().map(sections, function (sec) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Event, {
          key: "search-item".concat(sec.id)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Summary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
          href: "#"
        }, sec.section.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Date, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Extra, {
          text: true
        }, sec.section.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Meta, null, "Section (", sec.standard_name, ")")));
      })));
    });
    _defineProperty(_this, "listControls", function (controls) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "the__results"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "search__feed"
      }, lodash__WEBPACK_IMPORTED_MODULE_3___default().map(controls, function (ctrl) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Event, {
          key: "search-ctrl-item".concat(ctrl.id)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Summary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
          href: "#"
        }, ctrl.control.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Date, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Extra, {
          text: true
        }, ctrl.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Meta, null, "Control (", ctrl.control.standard.name, ")")));
      })));
    });
    _defineProperty(_this, "listDocuments", function (documents) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "the__results"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "search__feed"
      }, lodash__WEBPACK_IMPORTED_MODULE_3___default().map(documents, function (doc) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Event, {
          key: "search-doc-item".concat(doc.id)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Summary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
          href: "#"
        }, doc.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Date, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Extra, {
          text: true
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_7__["default"].Meta, null, "Digital Document")));
      })));
    });
    _defineProperty(_this, "toggleStandard", function (standard) {
      var standards = _this.props.standards;
      var index = lodash__WEBPACK_IMPORTED_MODULE_3___default().findIndex(standards, function (std) {
        return std.standard_id === standard.standard_id;
      });
      standard.selected = !standard.selected;
      standards[index] = standard;
      _this.props.setCompStandards(standards);
      _this.runCustomQuery();
    });
    return _this;
  }
  _inherits(SearchLanding, _Component);
  return _createClass(SearchLanding, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (lodash__WEBPACK_IMPORTED_MODULE_3___default().isEmpty(this.props.user)) {
        this.props.history.push('/login');
      } else if (lodash__WEBPACK_IMPORTED_MODULE_3___default().isEmpty(this.props.company)) {
        this.props.history.push('/select-organization');
      } else {
        this.props.closeSubLeftNav();
      }
      this.setState({
        query: this.props.search.query
      });
      this.runCustomQuery();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.search.query !== this.state.query) {
        this.setState({
          query: nextProps.search.query
        });
        if (nextProps.search.query.length > 3) {
          this.runCustomQuery();
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
      var _this2 = this;
      var _this$state = this.state,
        loading = _this$state.loading,
        results = _this$state.results;
      var _this$props2 = this.props,
        search = _this$props2.search,
        leftnav = _this$props2.leftnav,
        standards = _this$props2.standards;
      var query = search.query;
      var panes = [{
        menuItem: 'All',
        render: function render() {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__["default"].Pane, {
            attached: false
          }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Searching__WEBPACK_IMPORTED_MODULE_5__["default"], null) : '', results.sections ? _this2.listSections(results.sections.results) : '', results.controls ? _this2.listControls(results.controls.results) : '', results.documents ? _this2.listDocuments(results.documents.results) : '');
        }
      }, {
        menuItem: 'Sections',
        render: function render() {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__["default"].Pane, {
            attached: false
          }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Searching__WEBPACK_IMPORTED_MODULE_5__["default"], null) : '', results.sections ? _this2.listSections(results.sections.results) : '');
        }
      }, {
        menuItem: 'Controls',
        render: function render() {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__["default"].Pane, {
            attached: false
          }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Searching__WEBPACK_IMPORTED_MODULE_5__["default"], null) : '', results.controls ? _this2.listControls(results.controls.results) : '');
        }
      }, {
        menuItem: 'Documents',
        render: function render() {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__["default"].Pane, {
            attached: false
          }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Searching__WEBPACK_IMPORTED_MODULE_5__["default"], null) : '', results.documents ? _this2.listDocuments(results.documents.results) : '');
        }
      }];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: leftnav.open_sub ? 'sub__slide__menu_opened' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "page__header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "heading"
      }, "Search Result"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, lodash__WEBPACK_IMPORTED_MODULE_3___default().map(standards, function (std) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
          onChange: function onChange() {
            _this2.toggleStandard(std);
          },
          checked: std.selected,
          style: {
            marginRight: '10px',
            marginTop: '10px'
          },
          key: std.standard_id,
          label: std.standard.expand_name
        });
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "search__results"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
        menu: {
          secondary: true,
          pointing: true
        },
        panes: panes
      })));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
var mapStateToProps = function mapStateToProps(state) {
  return {
    search: state.search,
    standards: state.compliance.standards
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_1__.connect)(mapStateToProps, {
  closeSubLeftNav: _actions__WEBPACK_IMPORTED_MODULE_2__.closeSubLeftNav,
  selectControlFunction: _actions__WEBPACK_IMPORTED_MODULE_2__.selectControlFunction,
  selectCatalogSection: _actions__WEBPACK_IMPORTED_MODULE_2__.selectCatalogSection,
  setCompStandards: _actions__WEBPACK_IMPORTED_MODULE_2__.setCompStandards
})(SearchLanding));

/***/ }),

/***/ "./resources/js/components/search/Searching.js":
/*!*****************************************************!*\
  !*** ./resources/js/components/search/Searching.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/Placeholder.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var Searching = /*#__PURE__*/function (_Component) {
  function Searching() {
    _classCallCheck(this, Searching);
    return _callSuper(this, Searching, arguments);
  }
  _inherits(Searching, _Component);
  return _createClass(Searching, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Paragraph, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["default"].Line, null))));
    }
  }]);
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Searching);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./resources/js/components/search/SearchLanding.scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./resources/js/components/search/SearchLanding.scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".search__results {\n  padding-bottom: 48px;\n  margin: 15px 15px 0px 15px;\n}\n.search__results .the__results h3 {\n  margin-top: 5px !important;\n}\n.search__results .the__results h4 {\n  color: #17c6f6;\n  font-size: 18px;\n  font-weight: 200;\n  margin: 0;\n}\n.search__results .the__results p {\n  margin-bottom: 10px;\n}\n.search__results .search__feed {\n  padding-left: 15px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/collections/Grid/Grid.js":
/*!*************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/collections/Grid/Grid.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _GridColumn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GridColumn */ "./node_modules/semantic-ui-react/dist/es/collections/Grid/GridColumn.js");
/* harmony import */ var _GridRow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./GridRow */ "./node_modules/semantic-ui-react/dist/es/collections/Grid/GridRow.js");







/**
 * A grid is used to harmonize negative space in a layout.
 */

function Grid(props) {
  var celled = props.celled,
      centered = props.centered,
      children = props.children,
      className = props.className,
      columns = props.columns,
      container = props.container,
      divided = props.divided,
      doubling = props.doubling,
      inverted = props.inverted,
      padded = props.padded,
      relaxed = props.relaxed,
      reversed = props.reversed,
      stackable = props.stackable,
      stretched = props.stretched,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('ui', (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(centered, 'centered'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(container, 'container'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(doubling, 'doubling'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(inverted, 'inverted'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(stackable, 'stackable'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(stretched, 'stretched'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOrValueAndKey)(celled, 'celled'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOrValueAndKey)(divided, 'divided'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOrValueAndKey)(padded, 'padded'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOrValueAndKey)(relaxed, 'relaxed'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useMultipleProp)(reversed, 'reversed'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useTextAlignProp)(textAlign), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useVerticalAlignProp)(verticalAlign), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(columns, 'column', true), 'grid', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(Grid, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(Grid, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), children);
}

Grid.handledProps = ["as", "celled", "centered", "children", "className", "columns", "container", "divided", "doubling", "inverted", "padded", "relaxed", "reversed", "stackable", "stretched", "textAlign", "verticalAlign"];
Grid.Column = _GridColumn__WEBPACK_IMPORTED_MODULE_6__["default"];
Grid.Row = _GridRow__WEBPACK_IMPORTED_MODULE_7__["default"];
Grid.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().elementType),

  /** A grid can have rows divided into cells. */
  celled: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOf(['internally'])]),

  /** A grid can have its columns centered. */
  centered: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),

  /** Represents column count per row in Grid. */
  columns: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOf([].concat(_lib__WEBPACK_IMPORTED_MODULE_9__.WIDTHS, ['equal'])),

  /** A grid can be combined with a container to use the available layout and alignment. */
  container: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /** A grid can have dividers between its columns. */
  divided: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOf(['vertically'])]),

  /** A grid can double its column width on tablet and mobile sizes. */
  doubling: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /** A grid's colors can be inverted. */
  inverted: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /** A grid can preserve its vertical and horizontal gutters on first and last columns. */
  padded: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOf(['horizontally', 'vertically'])]),

  /** A grid can increase its gutters to allow for more negative space. */
  relaxed: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOf(['very'])]),

  /** A grid can specify that its columns should reverse order at different device sizes. */
  reversed: _lib__WEBPACK_IMPORTED_MODULE_10__.multipleProp(['computer', 'computer vertically', 'mobile', 'mobile vertically', 'tablet', 'tablet vertically']),

  /** A grid can have its columns stack on-top of each other after reaching mobile breakpoints. */
  stackable: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /** A grid can stretch its contents to take up the entire grid height. */
  stretched: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /** A grid can specify its text alignment. */
  textAlign: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_9__.TEXT_ALIGNMENTS),

  /** A grid can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: prop_types__WEBPACK_IMPORTED_MODULE_8___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_9__.VERTICAL_ALIGNMENTS)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grid);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/collections/Grid/GridColumn.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/collections/Grid/GridColumn.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");





/**
 * A column sub-component for Grid.
 */

function GridColumn(props) {
  var children = props.children,
      className = props.className,
      computer = props.computer,
      color = props.color,
      floated = props.floated,
      largeScreen = props.largeScreen,
      mobile = props.mobile,
      only = props.only,
      stretched = props.stretched,
      tablet = props.tablet,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign,
      widescreen = props.widescreen,
      width = props.width;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(color, (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(stretched, 'stretched'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useMultipleProp)(only, 'only'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useTextAlignProp)(textAlign), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useValueAndKey)(floated, 'floated'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useVerticalAlignProp)(verticalAlign), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(computer, 'wide computer'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(largeScreen, 'wide large screen'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(mobile, 'wide mobile'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(tablet, 'wide tablet'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(widescreen, 'wide widescreen'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(width, 'wide'), 'column', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(GridColumn, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(GridColumn, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), children);
}

GridColumn.handledProps = ["as", "children", "className", "color", "computer", "floated", "largeScreen", "mobile", "only", "stretched", "tablet", "textAlign", "verticalAlign", "widescreen", "width"];
GridColumn.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** A grid column can be colored. */
  color: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.COLORS),

  /** A column can specify a width for a computer. */
  computer: _lib__WEBPACK_IMPORTED_MODULE_8__.every([_lib__WEBPACK_IMPORTED_MODULE_8__.disallow(['width']), prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.WIDTHS)]),

  /** A column can sit flush against the left or right edge of a row. */
  floated: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.FLOATS),

  /** A column can specify a width for a large screen device. */
  largeScreen: _lib__WEBPACK_IMPORTED_MODULE_8__.every([_lib__WEBPACK_IMPORTED_MODULE_8__.disallow(['width']), prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.WIDTHS)]),

  /** A column can specify a width for a mobile device. */
  mobile: _lib__WEBPACK_IMPORTED_MODULE_8__.every([_lib__WEBPACK_IMPORTED_MODULE_8__.disallow(['width']), prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.WIDTHS)]),

  /** A column can appear only for a specific device, or screen sizes. */
  only: _lib__WEBPACK_IMPORTED_MODULE_8__.multipleProp(_lib__WEBPACK_IMPORTED_MODULE_7__.VISIBILITY),

  /** A column can stretch its contents to take up the entire grid or row height. */
  stretched: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /** A column can specify a width for a tablet device. */
  tablet: _lib__WEBPACK_IMPORTED_MODULE_8__.every([_lib__WEBPACK_IMPORTED_MODULE_8__.disallow(['width']), prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.WIDTHS)]),

  /** A column can specify its text alignment. */
  textAlign: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.TEXT_ALIGNMENTS),

  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.VERTICAL_ALIGNMENTS),

  /** A column can specify a width for a wide screen device. */
  widescreen: _lib__WEBPACK_IMPORTED_MODULE_8__.every([_lib__WEBPACK_IMPORTED_MODULE_8__.disallow(['width']), prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.WIDTHS)]),

  /** Represents width of column. */
  width: _lib__WEBPACK_IMPORTED_MODULE_8__.every([_lib__WEBPACK_IMPORTED_MODULE_8__.disallow(['computer', 'largeScreen', 'mobile', 'tablet', 'widescreen']), prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.WIDTHS)])
} : 0;
GridColumn.create = (0,_lib__WEBPACK_IMPORTED_MODULE_9__.createShorthandFactory)(GridColumn, function (children) {
  return {
    children: children
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridColumn);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/collections/Grid/GridRow.js":
/*!****************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/collections/Grid/GridRow.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A row sub-component for Grid.
 */

function GridRow(props) {
  var centered = props.centered,
      children = props.children,
      className = props.className,
      color = props.color,
      columns = props.columns,
      divided = props.divided,
      only = props.only,
      reversed = props.reversed,
      stretched = props.stretched,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(color, (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(centered, 'centered'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(divided, 'divided'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(stretched, 'stretched'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useMultipleProp)(only, 'only'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useMultipleProp)(reversed, 'reversed'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useTextAlignProp)(textAlign), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useVerticalAlignProp)(verticalAlign), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useWidthProp)(columns, 'column', true), 'row', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(GridRow, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(GridRow, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), children);
}

GridRow.handledProps = ["as", "centered", "children", "className", "color", "columns", "divided", "only", "reversed", "stretched", "textAlign", "verticalAlign"];
GridRow.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** A row can have its columns centered. */
  centered: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** A grid row can be colored. */
  color: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.COLORS),

  /** Represents column count per line in Row. */
  columns: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf([].concat(_lib__WEBPACK_IMPORTED_MODULE_7__.WIDTHS, ['equal'])),

  /** A row can have dividers between its columns. */
  divided: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /** A row can appear only for a specific device, or screen sizes. */
  only: _lib__WEBPACK_IMPORTED_MODULE_8__.multipleProp(_lib__WEBPACK_IMPORTED_MODULE_7__.VISIBILITY),

  /** A row can specify that its columns should reverse order at different device sizes. */
  reversed: _lib__WEBPACK_IMPORTED_MODULE_8__.multipleProp(['computer', 'computer vertically', 'mobile', 'mobile vertically', 'tablet', 'tablet vertically']),

  /** A row can stretch its contents to take up the entire column height. */
  stretched: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /** A row can specify its text alignment. */
  textAlign: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.TEXT_ALIGNMENTS),

  /** A row can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_7__.VERTICAL_ALIGNMENTS)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridRow);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/collections/Menu/Menu.js":
/*!*************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/collections/Menu/Menu.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var lodash_es_without__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lodash-es/without */ "./node_modules/lodash-es/without.js");
/* harmony import */ var lodash_es_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es/map */ "./node_modules/lodash-es/map.js");
/* harmony import */ var lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es/invoke */ "./node_modules/lodash-es/invoke.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/ModernAutoControlledComponent.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _MenuHeader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MenuHeader */ "./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuHeader.js");
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MenuItem */ "./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuItem.js");
/* harmony import */ var _MenuMenu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./MenuMenu */ "./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuMenu.js");












/**
 * A menu displays grouped navigation actions.
 * @see Dropdown
 */

var Menu = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Menu, _Component);

  function Menu() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.handleItemOverrides = function (predefinedProps) {
      return {
        onClick: function onClick(e, itemProps) {
          var index = itemProps.index;

          _this.setState({
            activeIndex: index
          });

          (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__["default"])(predefinedProps, 'onClick', e, itemProps);

          (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.props, 'onItemClick', e, itemProps);
        }
      };
    };

    return _this;
  }

  var _proto = Menu.prototype;

  _proto.renderItems = function renderItems() {
    var _this2 = this;

    var items = this.props.items;
    var activeIndex = this.state.activeIndex;
    return (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_5__["default"])(items, function (item, index) {
      return _MenuItem__WEBPACK_IMPORTED_MODULE_6__["default"].create(item, {
        defaultProps: {
          active: parseInt(activeIndex, 10) === index,
          index: index
        },
        overrideProps: _this2.handleItemOverrides
      });
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        attached = _this$props.attached,
        borderless = _this$props.borderless,
        children = _this$props.children,
        className = _this$props.className,
        color = _this$props.color,
        compact = _this$props.compact,
        fixed = _this$props.fixed,
        floated = _this$props.floated,
        fluid = _this$props.fluid,
        icon = _this$props.icon,
        inverted = _this$props.inverted,
        pagination = _this$props.pagination,
        pointing = _this$props.pointing,
        secondary = _this$props.secondary,
        size = _this$props.size,
        stackable = _this$props.stackable,
        tabular = _this$props.tabular,
        text = _this$props.text,
        vertical = _this$props.vertical,
        widths = _this$props.widths;
    var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])('ui', color, size, (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(borderless, 'borderless'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(compact, 'compact'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(fluid, 'fluid'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(inverted, 'inverted'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(pagination, 'pagination'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(pointing, 'pointing'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(secondary, 'secondary'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(stackable, 'stackable'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(text, 'text'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOnly)(vertical, 'vertical'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOrValueAndKey)(attached, 'attached'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOrValueAndKey)(floated, 'floated'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOrValueAndKey)(icon, 'icon'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useKeyOrValueAndKey)(tabular, 'tabular'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useValueAndKey)(fixed, 'fixed'), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.useWidthProp)(widths, 'item'), className, 'menu');
    var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_8__["default"])(Menu, this.props);
    var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_9__["default"])(Menu, this.props);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), _lib__WEBPACK_IMPORTED_MODULE_10__.isNil(children) ? this.renderItems() : children);
  };

  return Menu;
}(_lib__WEBPACK_IMPORTED_MODULE_11__["default"]);

Menu.handledProps = ["activeIndex", "as", "attached", "borderless", "children", "className", "color", "compact", "defaultActiveIndex", "fixed", "floated", "fluid", "icon", "inverted", "items", "onItemClick", "pagination", "pointing", "secondary", "size", "stackable", "tabular", "text", "vertical", "widths"];
Menu.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().elementType),

  /** Index of the currently active item. */
  activeIndex: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_12___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string)]),

  /** A menu may be attached to other content segments. */
  attached: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['top', 'bottom'])]),

  /** A menu item or menu can have no borders. */
  borderless: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string),

  /** Additional colors can be specified. */
  color: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_13__.COLORS),

  /** A menu can take up only the space necessary to fit its content. */
  compact: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** Initial activeIndex value. */
  defaultActiveIndex: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_12___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string)]),

  /** A menu can be fixed to a side of its context. */
  fixed: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['left', 'right', 'bottom', 'top']),

  /** A menu can be floated. */
  floated: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['right'])]),

  /** A vertical menu may take the size of its container. */
  fluid: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** A menu may have just icons (bool) or labeled icons. */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['labeled'])]),

  /** A menu may have its colors inverted to show greater contrast. */
  inverted: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** Shorthand array of props for Menu. */
  items: _lib__WEBPACK_IMPORTED_MODULE_14__.collectionShorthand,

  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick: _lib__WEBPACK_IMPORTED_MODULE_14__.every([_lib__WEBPACK_IMPORTED_MODULE_14__.disallow(['children']), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().func)]),

  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** A menu can point to show its relationship to nearby content. */
  pointing: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** A menu can vary in size. */
  size: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf((0,lodash_es_without__WEBPACK_IMPORTED_MODULE_15__["default"])(_lib__WEBPACK_IMPORTED_MODULE_13__.SIZES, 'medium', 'big')),

  /** A menu can stack at mobile resolutions. */
  stackable: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** A menu can be formatted to show tabs of information. */
  tabular: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['right'])]),

  /** A menu can be formatted for text content. */
  text: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** A vertical menu displays elements vertically. */
  vertical: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),

  /** A menu can have its items divided evenly. */
  widths: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_13__.WIDTHS)
} : 0;
Menu.autoControlledProps = ['activeIndex'];
Menu.Header = _MenuHeader__WEBPACK_IMPORTED_MODULE_16__["default"];
Menu.Item = _MenuItem__WEBPACK_IMPORTED_MODULE_6__["default"];
Menu.Menu = _MenuMenu__WEBPACK_IMPORTED_MODULE_17__["default"];
Menu.create = (0,_lib__WEBPACK_IMPORTED_MODULE_18__.createShorthandFactory)(Menu, function (items) {
  return {
    items: items
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Menu);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuHeader.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuHeader.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A menu item may include a header or may itself be a header.
 */

function MenuHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('header', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(MenuHeader, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(MenuHeader, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children) ? content : children);
}

MenuHeader.handledProps = ["as", "children", "className", "content"];
MenuHeader.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_7__.contentShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuHeader);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuItem.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuItem.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var lodash_es_startCase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash-es/startCase */ "./node_modules/lodash-es/startCase.js");
/* harmony import */ var lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es/invoke */ "./node_modules/lodash-es/invoke.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _elements_Icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../elements/Icon */ "./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js");









/**
 * A menu can contain an item.
 */

var MenuItem = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(MenuItem, _Component);

  function MenuItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.handleClick = function (e) {
      var disabled = _this.props.disabled;
      if (!disabled) (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.props, 'onClick', e, _this.props);
    };

    return _this;
  }

  var _proto = MenuItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        children = _this$props.children,
        className = _this$props.className,
        color = _this$props.color,
        content = _this$props.content,
        disabled = _this$props.disabled,
        fitted = _this$props.fitted,
        header = _this$props.header,
        icon = _this$props.icon,
        link = _this$props.link,
        name = _this$props.name,
        onClick = _this$props.onClick,
        position = _this$props.position;
    var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])(color, position, (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(active, 'active'), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(disabled, 'disabled'), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(icon === true || icon && !(name || content), 'icon'), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(header, 'header'), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOnly)(link, 'link'), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.useKeyOrValueAndKey)(fitted, 'fitted'), 'item', className);
    var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_6__["default"])(MenuItem, this.props, function () {
      if (onClick) return 'a';
    });
    var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_7__["default"])(MenuItem, this.props);

    if (!_lib__WEBPACK_IMPORTED_MODULE_8__.isNil(children)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
        className: classes,
        onClick: this.handleClick
      }), children);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes,
      onClick: this.handleClick
    }), _elements_Icon__WEBPACK_IMPORTED_MODULE_9__["default"].create(icon, {
      autoGenerateKey: false
    }), _lib__WEBPACK_IMPORTED_MODULE_8__.isNil(content) ? (0,lodash_es_startCase__WEBPACK_IMPORTED_MODULE_10__["default"])(name) : content);
  };

  return MenuItem;
}(react__WEBPACK_IMPORTED_MODULE_3__.Component);

MenuItem.handledProps = ["active", "as", "children", "className", "color", "content", "disabled", "fitted", "header", "icon", "index", "link", "name", "onClick", "position"];

MenuItem.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType),

  /** A menu item can be active. */
  active: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),

  /** Additional colors can be specified. */
  color: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_12__.COLORS),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_13__.contentShorthand,

  /** A menu item can be disabled. */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf(['horizontally', 'vertically'])]),

  /** A menu item may include a header or may itself be a header. */
  header: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /** MenuItem can be only icon. */
  icon: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool), _lib__WEBPACK_IMPORTED_MODULE_13__.itemShorthand]),

  /** MenuItem index inside Menu. */
  index: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number),

  /** A menu item can be link. */
  link: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().bool),

  /** Internal name of the MenuItem. */
  name: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func),

  /** A menu item can take left or right position. */
  position: prop_types__WEBPACK_IMPORTED_MODULE_11___default().oneOf(['left', 'right'])
} : 0;
MenuItem.create = (0,_lib__WEBPACK_IMPORTED_MODULE_14__.createShorthandFactory)(MenuItem, function (val) {
  return {
    content: val,
    name: val
  };
});

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuMenu.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/collections/Menu/MenuMenu.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A menu can contain a sub menu.
 */

function MenuMenu(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      position = props.position;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])(position, 'menu', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(MenuMenu, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(MenuMenu, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children) ? content : children);
}

MenuMenu.handledProps = ["as", "children", "className", "content", "position"];
MenuMenu.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_7__.contentShorthand,

  /** A sub menu can take left or right position. */
  position: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(['left', 'right'])
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MenuMenu);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/Placeholder.js":
/*!************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Placeholder/Placeholder.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _PlaceholderHeader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PlaceholderHeader */ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderHeader.js");
/* harmony import */ var _PlaceholderImage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PlaceholderImage */ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderImage.js");
/* harmony import */ var _PlaceholderLine__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PlaceholderLine */ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderLine.js");
/* harmony import */ var _PlaceholderParagraph__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PlaceholderParagraph */ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderParagraph.js");









/**
 * A placeholder is used to reserve space for content that soon will appear in a layout.
 */

function Placeholder(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      fluid = props.fluid,
      inverted = props.inverted;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('ui', (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(fluid, 'fluid'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(inverted, 'inverted'), 'placeholder', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(Placeholder, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(Placeholder, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_6__.isNil(children) ? content : children);
}

Placeholder.handledProps = ["as", "children", "className", "content", "fluid", "inverted"];
Placeholder.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_8__.contentShorthand,

  /** A fluid placeholder takes up the width of its container. */
  fluid: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /** A placeholder can have their colors inverted. */
  inverted: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool)
} : 0;
Placeholder.Header = _PlaceholderHeader__WEBPACK_IMPORTED_MODULE_9__["default"];
Placeholder.Image = _PlaceholderImage__WEBPACK_IMPORTED_MODULE_10__["default"];
Placeholder.Line = _PlaceholderLine__WEBPACK_IMPORTED_MODULE_11__["default"];
Placeholder.Paragraph = _PlaceholderParagraph__WEBPACK_IMPORTED_MODULE_12__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Placeholder);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderHeader.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderHeader.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A placeholder can contain a header.
 */

function PlaceholderHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      image = props.image;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(image, 'image'), 'header', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(PlaceholderHeader, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(PlaceholderHeader, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_6__.isNil(children) ? content : children);
}

PlaceholderHeader.handledProps = ["as", "children", "className", "content", "image"];
PlaceholderHeader.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_8__.contentShorthand,

  /** A placeholder can contain an image. */
  image: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaceholderHeader);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderImage.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderImage.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A placeholder can contain an image.
 */

function PlaceholderImage(props) {
  var className = props.className,
      square = props.square,
      rectangular = props.rectangular;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(square, 'square'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(rectangular, 'rectangular'), 'image', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(PlaceholderImage, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(PlaceholderImage, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }));
}

PlaceholderImage.handledProps = ["as", "className", "rectangular", "square"];
PlaceholderImage.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** An image can modify size correctly with responsive styles. */
  square: _lib__WEBPACK_IMPORTED_MODULE_7__.every([_lib__WEBPACK_IMPORTED_MODULE_7__.disallow(['rectangular']), (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool)]),

  /** An image can modify size correctly with responsive styles. */
  rectangular: _lib__WEBPACK_IMPORTED_MODULE_7__.every([_lib__WEBPACK_IMPORTED_MODULE_7__.disallow(['square']), (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool)])
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaceholderImage);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderLine.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderLine.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");





/**
 * A placeholder can contain have lines of text.
 */

function PlaceholderLine(props) {
  var className = props.className,
      length = props.length;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('line', length, className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(PlaceholderLine, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(PlaceholderLine, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }));
}

PlaceholderLine.handledProps = ["as", "className", "length"];
PlaceholderLine.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().elementType),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),

  /** A line can specify how long its contents should appear. */
  length: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(['full', 'very long', 'long', 'medium', 'short', 'very short'])
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaceholderLine);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderParagraph.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Placeholder/PlaceholderParagraph.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A placeholder can contain a paragraph.
 */

function PlaceholderParagraph(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('paragraph', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(PlaceholderParagraph, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(PlaceholderParagraph, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children) ? content : children);
}

PlaceholderParagraph.handledProps = ["as", "children", "className", "content"];
PlaceholderParagraph.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_7__.contentShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlaceholderParagraph);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Segment/Segment.js":
/*!****************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Segment/Segment.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var lodash_es_without__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash-es/without */ "./node_modules/lodash-es/without.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _SegmentGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SegmentGroup */ "./node_modules/semantic-ui-react/dist/es/elements/Segment/SegmentGroup.js");
/* harmony import */ var _SegmentInline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SegmentInline */ "./node_modules/semantic-ui-react/dist/es/elements/Segment/SegmentInline.js");








/**
 * A segment is used to create a grouping of related content.
 */

function Segment(props) {
  var attached = props.attached,
      basic = props.basic,
      children = props.children,
      circular = props.circular,
      className = props.className,
      clearing = props.clearing,
      color = props.color,
      compact = props.compact,
      content = props.content,
      disabled = props.disabled,
      floated = props.floated,
      inverted = props.inverted,
      loading = props.loading,
      placeholder = props.placeholder,
      padded = props.padded,
      piled = props.piled,
      raised = props.raised,
      secondary = props.secondary,
      size = props.size,
      stacked = props.stacked,
      tertiary = props.tertiary,
      textAlign = props.textAlign,
      vertical = props.vertical;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('ui', color, size, (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(basic, 'basic'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(circular, 'circular'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(clearing, 'clearing'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(compact, 'compact'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(disabled, 'disabled'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(inverted, 'inverted'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(loading, 'loading'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(placeholder, 'placeholder'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(piled, 'piled'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(raised, 'raised'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(secondary, 'secondary'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(stacked, 'stacked'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(tertiary, 'tertiary'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(vertical, 'vertical'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOrValueAndKey)(attached, 'attached'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOrValueAndKey)(padded, 'padded'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useTextAlignProp)(textAlign), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useValueAndKey)(floated, 'floated'), 'segment', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(Segment, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(Segment, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_6__.isNil(children) ? content : children);
}

Segment.handledProps = ["as", "attached", "basic", "children", "circular", "className", "clearing", "color", "compact", "content", "disabled", "floated", "inverted", "loading", "padded", "piled", "placeholder", "raised", "secondary", "size", "stacked", "tertiary", "textAlign", "vertical"];
Segment.Group = _SegmentGroup__WEBPACK_IMPORTED_MODULE_7__["default"];
Segment.Inline = _SegmentInline__WEBPACK_IMPORTED_MODULE_8__["default"];
Segment.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().elementType),

  /** Attach segment to other content, like a header. */
  attached: prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOf(['top', 'bottom'])]),

  /** A basic segment has no special formatting. */
  basic: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().node),

  /** A segment can be circular. */
  circular: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),

  /** A segment can clear floated content. */
  clearing: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** Segment can be colored. */
  color: prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_10__.COLORS),

  /** A segment may take up only as much space as is necessary. */
  compact: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_11__.contentShorthand,

  /** A segment may show its content is disabled. */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** Segment content can be floated to the left or right. */
  floated: prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOf(_lib__WEBPACK_IMPORTED_MODULE_10__.FLOATS),

  /** A segment can have its colors inverted for contrast. */
  inverted: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** A segment may show its content is being loaded. */
  loading: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** A segment can increase its padding. */
  padded: prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOf(['very'])]),

  /** A segment can be used to reserve space for conditionally displayed content. */
  placeholder: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** Formatted to look like a pile of pages. */
  piled: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** A segment may be formatted to raise above the page. */
  raised: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** A segment can be formatted to appear less noticeable. */
  secondary: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** A segment can have different sizes. */
  size: prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOf((0,lodash_es_without__WEBPACK_IMPORTED_MODULE_12__["default"])(_lib__WEBPACK_IMPORTED_MODULE_10__.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** A segment can be formatted to appear even less noticeable. */
  tertiary: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool),

  /** Formats content to be aligned as part of a vertical group. */
  textAlign: prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOf((0,lodash_es_without__WEBPACK_IMPORTED_MODULE_12__["default"])(_lib__WEBPACK_IMPORTED_MODULE_10__.TEXT_ALIGNMENTS, 'justified')),

  /** Formats content to be aligned vertically. */
  vertical: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Segment);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Segment/SegmentGroup.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Segment/SegmentGroup.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var lodash_es_without__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash-es/without */ "./node_modules/lodash-es/without.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");






/**
 * A group of segments can be formatted to appear together.
 */

function SegmentGroup(props) {
  var children = props.children,
      className = props.className,
      compact = props.compact,
      content = props.content,
      horizontal = props.horizontal,
      piled = props.piled,
      raised = props.raised,
      size = props.size,
      stacked = props.stacked;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('ui', size, (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(compact, 'compact'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(horizontal, 'horizontal'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(piled, 'piled'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(raised, 'raised'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(stacked, 'stacked'), 'segments', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(SegmentGroup, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(SegmentGroup, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_6__.isNil(children) ? content : children);
}

SegmentGroup.handledProps = ["as", "children", "className", "compact", "content", "horizontal", "piled", "raised", "size", "stacked"];
SegmentGroup.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** A segment may take up only as much space as is necessary. */
  compact: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_8__.contentShorthand,

  /** Formats content to be aligned horizontally. */
  horizontal: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /** Formatted to look like a pile of pages. */
  piled: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /** A segment group may be formatted to raise above the page. */
  raised: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool),

  /** A segment group can have different sizes. */
  size: prop_types__WEBPACK_IMPORTED_MODULE_7___default().oneOf((0,lodash_es_without__WEBPACK_IMPORTED_MODULE_9__["default"])(_lib__WEBPACK_IMPORTED_MODULE_10__.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SegmentGroup);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/elements/Segment/SegmentInline.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/elements/Segment/SegmentInline.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A placeholder segment can be inline.
 */

function SegmentInline(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('inline', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(SegmentInline, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(SegmentInline, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children) ? content : children);
}

SegmentInline.handledProps = ["as", "children", "className", "content"];
SegmentInline.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_7__.contentShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SegmentInline);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Tab/Tab.js":
/*!*******************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Tab/Tab.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var lodash_es_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash-es/map */ "./node_modules/lodash-es/map.js");
/* harmony import */ var lodash_es_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es/get */ "./node_modules/lodash-es/get.js");
/* harmony import */ var lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es/invoke */ "./node_modules/lodash-es/invoke.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/ModernAutoControlledComponent.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _collections_Grid_Grid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../collections/Grid/Grid */ "./node_modules/semantic-ui-react/dist/es/collections/Grid/Grid.js");
/* harmony import */ var _collections_Grid_GridColumn__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../collections/Grid/GridColumn */ "./node_modules/semantic-ui-react/dist/es/collections/Grid/GridColumn.js");
/* harmony import */ var _collections_Menu_Menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../collections/Menu/Menu */ "./node_modules/semantic-ui-react/dist/es/collections/Menu/Menu.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TabPane */ "./node_modules/semantic-ui-react/dist/es/modules/Tab/TabPane.js");













/**
 * A Tab is a hidden section of content activated by a Menu.
 * @see Menu
 * @see Segment
 */

var Tab = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Tab, _Component);

  function Tab() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.handleItemClick = function (e, _ref) {
      var index = _ref.index;

      (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__["default"])(_this.props, 'onTabChange', e, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props, {
        activeIndex: index
      }));

      _this.setState({
        activeIndex: index
      });
    };

    return _this;
  }

  var _proto = Tab.prototype;

  _proto.getInitialAutoControlledState = function getInitialAutoControlledState() {
    return {
      activeIndex: 0
    };
  };

  _proto.renderItems = function renderItems() {
    var _this$props = this.props,
        panes = _this$props.panes,
        renderActiveOnly = _this$props.renderActiveOnly;
    var activeIndex = this.state.activeIndex;
    if (renderActiveOnly) return (0,lodash_es_invoke__WEBPACK_IMPORTED_MODULE_4__["default"])((0,lodash_es_get__WEBPACK_IMPORTED_MODULE_5__["default"])(panes, "[" + activeIndex + "]"), 'render', this.props);
    return (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_6__["default"])(panes, function (_ref2, index) {
      var pane = _ref2.pane;
      return _TabPane__WEBPACK_IMPORTED_MODULE_7__["default"].create(pane, {
        overrideProps: {
          active: index === activeIndex
        }
      });
    });
  };

  _proto.renderMenu = function renderMenu() {
    var _this$props2 = this.props,
        menu = _this$props2.menu,
        panes = _this$props2.panes,
        menuPosition = _this$props2.menuPosition;
    var activeIndex = this.state.activeIndex;

    if (menu.tabular === true && menuPosition === 'right') {
      menu.tabular = 'right';
    }

    return _collections_Menu_Menu__WEBPACK_IMPORTED_MODULE_8__["default"].create(menu, {
      autoGenerateKey: false,
      overrideProps: {
        items: (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_6__["default"])(panes, 'menuItem'),
        onItemClick: this.handleItemClick,
        activeIndex: activeIndex
      }
    });
  };

  _proto.renderVertical = function renderVertical(menu) {
    var _this$props3 = this.props,
        grid = _this$props3.grid,
        menuPosition = _this$props3.menuPosition;

    var paneWidth = grid.paneWidth,
        tabWidth = grid.tabWidth,
        gridProps = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(grid, ["paneWidth", "tabWidth"]);

    var position = menuPosition || menu.props.tabular === 'right' && 'right' || 'left';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_collections_Grid_Grid__WEBPACK_IMPORTED_MODULE_9__["default"], gridProps, position === 'left' && _collections_Grid_GridColumn__WEBPACK_IMPORTED_MODULE_10__["default"].create({
      width: tabWidth,
      children: menu
    }, {
      autoGenerateKey: false
    }), _collections_Grid_GridColumn__WEBPACK_IMPORTED_MODULE_10__["default"].create({
      width: paneWidth,
      children: this.renderItems(),
      stretched: true
    }, {
      autoGenerateKey: false
    }), position === 'right' && _collections_Grid_GridColumn__WEBPACK_IMPORTED_MODULE_10__["default"].create({
      width: tabWidth,
      children: menu
    }, {
      autoGenerateKey: false
    }));
  };

  _proto.render = function render() {
    var menu = this.renderMenu();
    var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_11__["default"])(Tab, this.props);
    var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_12__["default"])(Tab, this.props);

    if (menu.props.vertical) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, rest, this.renderVertical(menu));
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, rest, menu.props.attached !== 'bottom' && menu, this.renderItems(), menu.props.attached === 'bottom' && menu);
  };

  return Tab;
}(_lib__WEBPACK_IMPORTED_MODULE_13__["default"]);

Tab.handledProps = ["activeIndex", "as", "defaultActiveIndex", "grid", "menu", "menuPosition", "onTabChange", "panes", "renderActiveOnly"];
Tab.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().elementType),

  /** The initial activeIndex. */
  defaultActiveIndex: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)]),

  /** Index of the currently active tab. */
  activeIndex: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)]),

  /**
   * Shorthand props for the Menu.
   * tabular, if true, will derive final value from `menuPosition`, otherwise set 'left' or 'right' explicitly.
   */
  menu: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),

  /** Align vertical menu */
  menuPosition: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOf(['left', 'right']),

  /** Shorthand props for the Grid. Only applicable to vertical menus. */
  grid: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),

  /**
   * Called on tab change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed new activeIndex.
   * @param {object} data.activeIndex - The new proposed activeIndex.
   */
  onTabChange: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),

  /**
   * Array of objects describing each Menu.Item and Tab.Pane:
   * { menuItem: 'Home', render: () => <Tab.Pane /> }
   * or
   * { menuItem: 'Home', pane: 'Welcome' }
   */
  panes: prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_14___default().shape({
    menuItem: _lib__WEBPACK_IMPORTED_MODULE_15__.itemShorthand,
    pane: _lib__WEBPACK_IMPORTED_MODULE_15__.itemShorthand,
    render: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func)
  })),

  /** A Tab can render only active pane. */
  renderActiveOnly: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool)
} : 0;
Tab.autoControlledProps = ['activeIndex'];
Tab.defaultProps = {
  grid: {
    paneWidth: 12,
    tabWidth: 4
  },
  menu: {
    attached: true,
    tabular: true
  },
  renderActiveOnly: true
};
Tab.Pane = _TabPane__WEBPACK_IMPORTED_MODULE_7__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tab);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/modules/Tab/TabPane.js":
/*!***********************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/modules/Tab/TabPane.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _elements_Segment_Segment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../elements/Segment/Segment */ "./node_modules/semantic-ui-react/dist/es/elements/Segment/Segment.js");






/**
 * A tab pane holds the content of a tab.
 */

function TabPane(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      loading = props.loading;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(active, 'active'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(loading, 'loading'), 'tab', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(TabPane, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(TabPane, props);
  var calculatedDefaultProps = {};

  if (ElementType === _elements_Segment_Segment__WEBPACK_IMPORTED_MODULE_6__["default"]) {
    calculatedDefaultProps.attached = 'bottom';
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, calculatedDefaultProps, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_7__.isNil(children) ? content : children);
}

TabPane.handledProps = ["active", "as", "children", "className", "content", "loading"];
TabPane.defaultProps = {
  as: _elements_Segment_Segment__WEBPACK_IMPORTED_MODULE_6__["default"],
  active: true
};
TabPane.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().elementType),

  /** A tab pane can be active. */
  active: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_9__.contentShorthand,

  /** A Tab.Pane can display a loading indicator. */
  loading: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool)
} : 0;
TabPane.create = (0,_lib__WEBPACK_IMPORTED_MODULE_10__.createShorthandFactory)(TabPane, function (content) {
  return {
    content: content
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabPane);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/Feed.js":
/*!*******************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/Feed.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var lodash_es_without__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash-es/without */ "./node_modules/lodash-es/without.js");
/* harmony import */ var lodash_es_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es/map */ "./node_modules/lodash-es/map.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/SUI.js");
/* harmony import */ var _FeedContent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FeedContent */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedContent.js");
/* harmony import */ var _FeedDate__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./FeedDate */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedDate.js");
/* harmony import */ var _FeedEvent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FeedEvent */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedEvent.js");
/* harmony import */ var _FeedExtra__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./FeedExtra */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedExtra.js");
/* harmony import */ var _FeedLabel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./FeedLabel */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLabel.js");
/* harmony import */ var _FeedLike__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./FeedLike */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLike.js");
/* harmony import */ var _FeedMeta__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./FeedMeta */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedMeta.js");
/* harmony import */ var _FeedSummary__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./FeedSummary */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedSummary.js");
/* harmony import */ var _FeedUser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./FeedUser */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedUser.js");

















/**
 * A feed presents user activity chronologically.
 */

function Feed(props) {
  var children = props.children,
      className = props.className,
      events = props.events,
      size = props.size;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_2__["default"])('ui', size, 'feed', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(Feed, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(Feed, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_6__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, rest, {
      className: classes
    }), children);
  }

  var eventElements = (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_7__["default"])(events, function (eventProps) {
    var childKey = eventProps.childKey,
        date = eventProps.date,
        meta = eventProps.meta,
        summary = eventProps.summary,
        eventData = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(eventProps, ["childKey", "date", "meta", "summary"]);

    var finalKey = childKey != null ? childKey : [date, meta, summary].join('-');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FeedEvent__WEBPACK_IMPORTED_MODULE_8__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      date: date,
      key: finalKey,
      meta: meta,
      summary: summary
    }, eventData));
  });

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, rest, {
    className: classes
  }), eventElements);
}

Feed.handledProps = ["as", "children", "className", "events", "size"];
Feed.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),

  /** Shorthand array of props for FeedEvent. */
  events: _lib__WEBPACK_IMPORTED_MODULE_10__.collectionShorthand,

  /** A feed can have different sizes. */
  size: prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOf((0,lodash_es_without__WEBPACK_IMPORTED_MODULE_11__["default"])(_lib__WEBPACK_IMPORTED_MODULE_12__.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive'))
} : 0;
Feed.Content = _FeedContent__WEBPACK_IMPORTED_MODULE_13__["default"];
Feed.Date = _FeedDate__WEBPACK_IMPORTED_MODULE_14__["default"];
Feed.Event = _FeedEvent__WEBPACK_IMPORTED_MODULE_8__["default"];
Feed.Extra = _FeedExtra__WEBPACK_IMPORTED_MODULE_15__["default"];
Feed.Label = _FeedLabel__WEBPACK_IMPORTED_MODULE_16__["default"];
Feed.Like = _FeedLike__WEBPACK_IMPORTED_MODULE_17__["default"];
Feed.Meta = _FeedMeta__WEBPACK_IMPORTED_MODULE_18__["default"];
Feed.Summary = _FeedSummary__WEBPACK_IMPORTED_MODULE_19__["default"];
Feed.User = _FeedUser__WEBPACK_IMPORTED_MODULE_20__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feed);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedContent.js":
/*!**************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedContent.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _FeedDate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FeedDate */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedDate.js");
/* harmony import */ var _FeedExtra__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FeedExtra */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedExtra.js");
/* harmony import */ var _FeedMeta__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FeedMeta */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedMeta.js");
/* harmony import */ var _FeedSummary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FeedSummary */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedSummary.js");










function FeedContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      extraImages = props.extraImages,
      extraText = props.extraText,
      date = props.date,
      meta = props.meta,
      summary = props.summary;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('content', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedContent, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedContent, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), children);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedDate__WEBPACK_IMPORTED_MODULE_7__["default"], function (val) {
    return {
      content: val
    };
  }, date, {
    autoGenerateKey: false
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedSummary__WEBPACK_IMPORTED_MODULE_8__["default"], function (val) {
    return {
      content: val
    };
  }, summary, {
    autoGenerateKey: false
  }), content, (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedExtra__WEBPACK_IMPORTED_MODULE_9__["default"], function (val) {
    return {
      text: true,
      content: val
    };
  }, extraText, {
    autoGenerateKey: false
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedExtra__WEBPACK_IMPORTED_MODULE_9__["default"], function (val) {
    return {
      images: val
    };
  }, extraImages, {
    autoGenerateKey: false
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedMeta__WEBPACK_IMPORTED_MODULE_10__["default"], function (val) {
    return {
      content: val
    };
  }, meta, {
    autoGenerateKey: false
  }));
}

FeedContent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "meta", "summary"];
FeedContent.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_12__.contentShorthand,

  /** An event can contain a date. */
  date: _lib__WEBPACK_IMPORTED_MODULE_12__.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: _FeedExtra__WEBPACK_IMPORTED_MODULE_9__["default"].propTypes.images,

  /** Shorthand for FeedExtra with text. */
  extraText: _lib__WEBPACK_IMPORTED_MODULE_12__.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: _lib__WEBPACK_IMPORTED_MODULE_12__.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: _lib__WEBPACK_IMPORTED_MODULE_12__.itemShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedContent);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedDate.js":
/*!***********************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedDate.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * An event or an event summary can contain a date.
 */

function FeedDate(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('date', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedDate, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedDate, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children) ? content : children);
}

FeedDate.handledProps = ["as", "children", "className", "content"];
FeedDate.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_7__.contentShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedDate);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedEvent.js":
/*!************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedEvent.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _FeedContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FeedContent */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedContent.js");
/* harmony import */ var _FeedLabel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FeedLabel */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLabel.js");







/**
 * A feed contains an event.
 */

function FeedEvent(props) {
  var content = props.content,
      children = props.children,
      className = props.className,
      date = props.date,
      extraImages = props.extraImages,
      extraText = props.extraText,
      image = props.image,
      icon = props.icon,
      meta = props.meta,
      summary = props.summary;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('event', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedEvent, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedEvent, props);
  var hasContentProp = content || date || extraImages || extraText || meta || summary;
  var contentProps = {
    content: content,
    date: date,
    extraImages: extraImages,
    extraText: extraText,
    meta: meta,
    summary: summary
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.createShorthand)(_FeedLabel__WEBPACK_IMPORTED_MODULE_6__["default"], function (val) {
    return {
      icon: val
    };
  }, icon, {
    autoGenerateKey: false
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_5__.createShorthand)(_FeedLabel__WEBPACK_IMPORTED_MODULE_6__["default"], function (val) {
    return {
      image: val
    };
  }, image, {
    autoGenerateKey: false
  }), hasContentProp && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FeedContent__WEBPACK_IMPORTED_MODULE_7__["default"], contentProps), children);
}

FeedEvent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "icon", "image", "meta", "summary"];
FeedEvent.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),

  /** Shorthand for FeedContent. */
  content: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** Shorthand for FeedDate. */
  date: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** Shorthand for FeedExtra with content. */
  extraText: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** An event can contain icon label. */
  icon: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** An event can contain image label. */
  image: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedEvent);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedExtra.js":
/*!************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedExtra.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var lodash_es_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es/map */ "./node_modules/lodash-es/map.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/classNameBuilders.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");






/**
 * A feed can contain an extra content.
 */

function FeedExtra(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      images = props.images,
      text = props.text;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(images, 'images'), (0,_lib__WEBPACK_IMPORTED_MODULE_3__.useKeyOnly)(content || text, 'text'), 'extra', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedExtra, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_5__["default"])(FeedExtra, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_6__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), children);
  } // TODO need a "collection factory" to handle creating multiple image elements and their keys


  var imageElements = (0,lodash_es_map__WEBPACK_IMPORTED_MODULE_7__["default"])(images, function (image, index) {
    var key = [index, image].join('-');
    return (0,_lib__WEBPACK_IMPORTED_MODULE_8__.createHTMLImage)(image, {
      key: key
    });
  });

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), content, imageElements);
}

FeedExtra.handledProps = ["as", "children", "className", "content", "images", "text"];
FeedExtra.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_10__.contentShorthand,

  /** An event can contain additional information like a set of images. */
  images: _lib__WEBPACK_IMPORTED_MODULE_10__.every([_lib__WEBPACK_IMPORTED_MODULE_10__.disallow(['text']), prop_types__WEBPACK_IMPORTED_MODULE_9___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool), _lib__WEBPACK_IMPORTED_MODULE_10__.collectionShorthand])]),

  /** An event can contain additional text information. */
  text: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool)
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedExtra);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLabel.js":
/*!************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLabel.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _elements_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../elements/Icon */ "./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js");






/**
 * An event can contain an image or icon label.
 */

function FeedLabel(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon,
      image = props.image;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('label', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedLabel, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedLabel, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), children);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), content, _elements_Icon__WEBPACK_IMPORTED_MODULE_6__["default"].create(icon, {
    autoGenerateKey: false
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_7__.createHTMLImage)(image));
}

FeedLabel.handledProps = ["as", "children", "className", "content", "icon", "image"];
FeedLabel.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_9__.contentShorthand,

  /** An event can contain icon label. */
  icon: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand,

  /** An event can contain image label. */
  image: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedLabel);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLike.js":
/*!***********************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLike.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _elements_Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../elements/Icon */ "./node_modules/semantic-ui-react/dist/es/elements/Icon/Icon.js");






/**
 * A feed can contain a like element.
 */

function FeedLike(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('like', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedLike, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedLike, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), children);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _elements_Icon__WEBPACK_IMPORTED_MODULE_6__["default"].create(icon, {
    autoGenerateKey: false
  }), content);
}

FeedLike.handledProps = ["as", "children", "className", "content", "icon"];
FeedLike.defaultProps = {
  as: 'a'
};
FeedLike.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_8__.contentShorthand,

  /** Shorthand for icon. Mutually exclusive with children. */
  icon: _lib__WEBPACK_IMPORTED_MODULE_8__.itemShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedLike);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedMeta.js":
/*!***********************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedMeta.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _FeedLike__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FeedLike */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedLike.js");






/**
 * A feed can contain a meta.
 */

function FeedMeta(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      like = props.like;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('meta', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedMeta, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedMeta, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), children);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedLike__WEBPACK_IMPORTED_MODULE_7__["default"], function (val) {
    return {
      content: val
    };
  }, like, {
    autoGenerateKey: false
  }), content);
}

FeedMeta.handledProps = ["as", "children", "className", "content", "like"];
FeedMeta.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_9__.contentShorthand,

  /** Shorthand for FeedLike. */
  like: _lib__WEBPACK_IMPORTED_MODULE_9__.itemShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedMeta);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedSummary.js":
/*!**************************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedSummary.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/factories.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");
/* harmony import */ var _FeedDate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FeedDate */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedDate.js");
/* harmony import */ var _FeedUser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FeedUser */ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedUser.js");







/**
 * A feed can contain a summary.
 */

function FeedSummary(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      date = props.date,
      user = props.user;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('summary', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedSummary, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedSummary, props);

  if (!_lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
      className: classes
    }), children);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedUser__WEBPACK_IMPORTED_MODULE_7__["default"], function (val) {
    return {
      content: val
    };
  }, user, {
    autoGenerateKey: false
  }), content && ' ', content, content && ' ', (0,_lib__WEBPACK_IMPORTED_MODULE_6__.createShorthand)(_FeedDate__WEBPACK_IMPORTED_MODULE_8__["default"], function (val) {
    return {
      content: val
    };
  }, date, {
    autoGenerateKey: false
  }));
}

FeedSummary.handledProps = ["as", "children", "className", "content", "date", "user"];
FeedSummary.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_10__.contentShorthand,

  /** Shorthand for FeedDate. */
  date: _lib__WEBPACK_IMPORTED_MODULE_10__.itemShorthand,

  /** Shorthand for FeedUser. */
  user: _lib__WEBPACK_IMPORTED_MODULE_10__.itemShorthand
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedSummary);

/***/ }),

/***/ "./node_modules/semantic-ui-react/dist/es/views/Feed/FeedUser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/semantic-ui-react/dist/es/views/Feed/FeedUser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getUnhandledProps.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/getElementType.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/childrenUtils.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib */ "./node_modules/semantic-ui-react/dist/es/lib/customPropTypes.js");





/**
 * A feed can contain a user element.
 */

function FeedUser(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('user', className);
  var rest = (0,_lib__WEBPACK_IMPORTED_MODULE_3__["default"])(FeedUser, props);
  var ElementType = (0,_lib__WEBPACK_IMPORTED_MODULE_4__["default"])(FeedUser, props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(ElementType, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    className: classes
  }), _lib__WEBPACK_IMPORTED_MODULE_5__.isNil(children) ? content : children);
}

FeedUser.handledProps = ["as", "children", "className", "content"];
FeedUser.propTypes =  true ? {
  /** An element type to render as (string or function). */
  as: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /** Primary content. */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node),

  /** Additional classes. */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /** Shorthand for primary content. */
  content: _lib__WEBPACK_IMPORTED_MODULE_7__.contentShorthand
} : 0;
FeedUser.defaultProps = {
  as: 'a'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedUser);

/***/ }),

/***/ "./resources/js/components/search/SearchLanding.scss":
/*!***********************************************************!*\
  !*** ./resources/js/components/search/SearchLanding.scss ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_3_SearchLanding_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./SearchLanding.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[7].oneOf[1].use[3]!./resources/js/components/search/SearchLanding.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_3_SearchLanding_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_7_oneOf_1_use_3_SearchLanding_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/lodash-es/_asciiWords.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_asciiWords.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (asciiWords);


/***/ }),

/***/ "./node_modules/lodash-es/_basePropertyOf.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_basePropertyOf.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (basePropertyOf);


/***/ }),

/***/ "./node_modules/lodash-es/_createCaseFirst.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash-es/_createCaseFirst.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _castSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_castSlice.js */ "./node_modules/lodash-es/_castSlice.js");
/* harmony import */ var _hasUnicode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_hasUnicode.js */ "./node_modules/lodash-es/_hasUnicode.js");
/* harmony import */ var _stringToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_stringToArray.js */ "./node_modules/lodash-es/_stringToArray.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toString.js */ "./node_modules/lodash-es/toString.js");





/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = (0,_toString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string);

    var strSymbols = (0,_hasUnicode_js__WEBPACK_IMPORTED_MODULE_1__["default"])(string)
      ? (0,_stringToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? (0,_castSlice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCaseFirst);


/***/ }),

/***/ "./node_modules/lodash-es/_createCompounder.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash-es/_createCompounder.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arrayReduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arrayReduce.js */ "./node_modules/lodash-es/_arrayReduce.js");
/* harmony import */ var _deburr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deburr.js */ "./node_modules/lodash-es/deburr.js");
/* harmony import */ var _words_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./words.js */ "./node_modules/lodash-es/words.js");




/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return (0,_arrayReduce_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_words_js__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_deburr_js__WEBPACK_IMPORTED_MODULE_2__["default"])(string).replace(reApos, '')), callback, '');
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCompounder);


/***/ }),

/***/ "./node_modules/lodash-es/_deburrLetter.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_deburrLetter.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _basePropertyOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_basePropertyOf.js */ "./node_modules/lodash-es/_basePropertyOf.js");


/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = (0,_basePropertyOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(deburredLetters);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deburrLetter);


/***/ }),

/***/ "./node_modules/lodash-es/_hasUnicodeWord.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_hasUnicodeWord.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hasUnicodeWord);


/***/ }),

/***/ "./node_modules/lodash-es/_unicodeWords.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_unicodeWords.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unicodeWords);


/***/ }),

/***/ "./node_modules/lodash-es/deburr.js":
/*!******************************************!*\
  !*** ./node_modules/lodash-es/deburr.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _deburrLetter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_deburrLetter.js */ "./node_modules/lodash-es/_deburrLetter.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toString.js */ "./node_modules/lodash-es/toString.js");



/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = (0,_toString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string);
  return string && string.replace(reLatin, _deburrLetter_js__WEBPACK_IMPORTED_MODULE_1__["default"]).replace(reComboMark, '');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deburr);


/***/ }),

/***/ "./node_modules/lodash-es/startCase.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash-es/startCase.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createCompounder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createCompounder.js */ "./node_modules/lodash-es/_createCompounder.js");
/* harmony import */ var _upperFirst_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upperFirst.js */ "./node_modules/lodash-es/upperFirst.js");



/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @memberOf _
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * _.startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * _.startCase('fooBar');
 * // => 'Foo Bar'
 *
 * _.startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
var startCase = (0,_createCompounder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function(result, word, index) {
  return result + (index ? ' ' : '') + (0,_upperFirst_js__WEBPACK_IMPORTED_MODULE_1__["default"])(word);
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startCase);


/***/ }),

/***/ "./node_modules/lodash-es/upperFirst.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/upperFirst.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createCaseFirst_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_createCaseFirst.js */ "./node_modules/lodash-es/_createCaseFirst.js");


/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = (0,_createCaseFirst_js__WEBPACK_IMPORTED_MODULE_0__["default"])('toUpperCase');

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (upperFirst);


/***/ }),

/***/ "./node_modules/lodash-es/words.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/words.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _asciiWords_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_asciiWords.js */ "./node_modules/lodash-es/_asciiWords.js");
/* harmony import */ var _hasUnicodeWord_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_hasUnicodeWord.js */ "./node_modules/lodash-es/_hasUnicodeWord.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toString.js */ "./node_modules/lodash-es/toString.js");
/* harmony import */ var _unicodeWords_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_unicodeWords.js */ "./node_modules/lodash-es/_unicodeWords.js");





/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = (0,_toString_js__WEBPACK_IMPORTED_MODULE_0__["default"])(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return (0,_hasUnicodeWord_js__WEBPACK_IMPORTED_MODULE_1__["default"])(string) ? (0,_unicodeWords_js__WEBPACK_IMPORTED_MODULE_2__["default"])(string) : (0,_asciiWords_js__WEBPACK_IMPORTED_MODULE_3__["default"])(string);
  }
  return string.match(pattern) || [];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (words);


/***/ })

}]);