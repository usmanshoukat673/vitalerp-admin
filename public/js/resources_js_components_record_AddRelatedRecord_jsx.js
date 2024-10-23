"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_record_AddRelatedRecord_jsx"],{

/***/ "./node_modules/@mui/material/Link/Link.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/material/Link/Link.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/@mui/material/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _mui_utils_elementTypeAcceptingRef__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/utils/elementTypeAcceptingRef */ "./node_modules/@mui/utils/elementTypeAcceptingRef/elementTypeAcceptingRef.js");
/* harmony import */ var _mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/utils/composeClasses */ "./node_modules/@mui/utils/composeClasses/composeClasses.js");
/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/capitalize */ "./node_modules/@mui/material/utils/capitalize.js");
/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/styled */ "./node_modules/@mui/material/styles/styled.js");
/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/useThemeProps */ "./node_modules/@mui/material/styles/useThemeProps.js");
/* harmony import */ var _utils_useIsFocusVisible__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/useIsFocusVisible */ "./node_modules/@mui/material/utils/useIsFocusVisible.js");
/* harmony import */ var _utils_useForkRef__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/useForkRef */ "./node_modules/@mui/material/utils/useForkRef.js");
/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Typography */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _linkClasses__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./linkClasses */ "./node_modules/@mui/material/Link/linkClasses.js");
/* harmony import */ var _getTextDecoration__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getTextDecoration */ "./node_modules/@mui/material/Link/getTextDecoration.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';



const _excluded = ["className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant", "sx"];














const useUtilityClasses = ownerState => {
  const {
    classes,
    component,
    focusVisible,
    underline
  } = ownerState;
  const slots = {
    root: ['root', `underline${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(underline)}`, component === 'button' && 'button', focusVisible && 'focusVisible']
  };
  return (0,_mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_6__["default"])(slots, _linkClasses__WEBPACK_IMPORTED_MODULE_7__.getLinkUtilityClass, classes);
};
const LinkRoot = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__["default"])(_Typography__WEBPACK_IMPORTED_MODULE_9__["default"], {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`underline${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(ownerState.underline)}`], ownerState.component === 'button' && styles.button];
  }
})(({
  theme,
  ownerState
}) => {
  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, ownerState.underline === 'none' && {
    textDecoration: 'none'
  }, ownerState.underline === 'hover' && {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }, ownerState.underline === 'always' && (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    textDecoration: 'underline'
  }, ownerState.color !== 'inherit' && {
    textDecorationColor: (0,_getTextDecoration__WEBPACK_IMPORTED_MODULE_10__["default"])({
      theme,
      ownerState
    })
  }, {
    '&:hover': {
      textDecorationColor: 'inherit'
    }
  }), ownerState.component === 'button' && {
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    // Reset
    WebkitAppearance: 'none',
    // Reset
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.
    },
    [`&.${_linkClasses__WEBPACK_IMPORTED_MODULE_7__["default"].focusVisible}`]: {
      outline: 'auto'
    }
  });
});
const Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Link(inProps, ref) {
  const props = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_11__["default"])({
    props: inProps,
    name: 'MuiLink'
  });
  const {
      className,
      color = 'primary',
      component = 'a',
      onBlur,
      onFocus,
      TypographyClasses,
      underline = 'always',
      variant = 'inherit',
      sx
    } = props,
    other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = (0,_utils_useIsFocusVisible__WEBPACK_IMPORTED_MODULE_12__["default"])();
  const [focusVisible, setFocusVisible] = react__WEBPACK_IMPORTED_MODULE_2__.useState(false);
  const handlerRef = (0,_utils_useForkRef__WEBPACK_IMPORTED_MODULE_13__["default"])(ref, focusVisibleRef);
  const handleBlur = event => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = event => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    color,
    component,
    focusVisible,
    underline,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(LinkRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    color: color,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className),
    classes: TypographyClasses,
    component: component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref: handlerRef,
    ownerState: ownerState,
    variant: variant,
    sx: [...(!Object.keys(_getTextDecoration__WEBPACK_IMPORTED_MODULE_10__.colorTransformations).includes(color) ? [{
      color
    }] : []), ...(Array.isArray(sx) ? sx : [sx])]
  }, other));
});
 true ? Link.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().node),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),
  /**
   * @ignore
   */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string),
  /**
   * The color of the link.
   * @default 'primary'
   */
  color: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().any),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _mui_utils_elementTypeAcceptingRef__WEBPACK_IMPORTED_MODULE_15__["default"],
  /**
   * @ignore
   */
  onBlur: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
  /**
   * @ignore
   */
  onFocus: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_14___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_14___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object)]),
  /**
   * `classes` prop applied to the [`Typography`](/material-ui/api/typography/) element.
   */
  TypographyClasses: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),
  /**
   * Controls when the link should have an underline.
   * @default 'always'
   */
  underline: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOf(['always', 'hover', 'none']),
  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_14___default().oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)])
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Link);

/***/ }),

/***/ "./node_modules/@mui/material/Link/getTextDecoration.js":
/*!**************************************************************!*\
  !*** ./node_modules/@mui/material/Link/getTextDecoration.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorTransformations: () => (/* binding */ colorTransformations),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/system */ "./node_modules/@mui/system/esm/style.js");
/* harmony import */ var _mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/system/colorManipulator */ "./node_modules/@mui/system/colorManipulator.js");


const colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};
const transformDeprecatedColors = color => {
  return colorTransformations[color] || color;
};
const getTextDecoration = ({
  theme,
  ownerState
}) => {
  const transformedColor = transformDeprecatedColors(ownerState.color);
  const color = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.getPath)(theme, `palette.${transformedColor}`, false) || ownerState.color;
  const channelColor = (0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.getPath)(theme, `palette.${transformedColor}Channel`);
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return (0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_1__.alpha)(color, 0.4);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTextDecoration);

/***/ }),

/***/ "./node_modules/@mui/material/Link/linkClasses.js":
/*!********************************************************!*\
  !*** ./node_modules/@mui/material/Link/linkClasses.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getLinkUtilityClass: () => (/* binding */ getLinkUtilityClass)
/* harmony export */ });
/* harmony import */ var _mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/utils/generateUtilityClasses */ "./node_modules/@mui/utils/generateUtilityClasses/generateUtilityClasses.js");
/* harmony import */ var _mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils/generateUtilityClass */ "./node_modules/@mui/utils/generateUtilityClass/generateUtilityClass.js");


function getLinkUtilityClass(slot) {
  return (0,_mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__["default"])('MuiLink', slot);
}
const linkClasses = (0,_mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__["default"])('MuiLink', ['root', 'underlineNone', 'underlineHover', 'underlineAlways', 'button', 'focusVisible']);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (linkClasses);

/***/ }),

/***/ "./resources/js/components/record/AddRelatedRecord.jsx":
/*!*************************************************************!*\
  !*** ./resources/js/components/record/AddRelatedRecord.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/FormControl */ "./node_modules/@mui/material/FormControl/FormControl.js");
/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/TextField */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material_OutlinedInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/OutlinedInput */ "./node_modules/@mui/material/OutlinedInput/OutlinedInput.js");
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/MenuItem */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Select */ "./node_modules/@mui/material/Select/Select.js");
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/ListItemText */ "./node_modules/@mui/material/ListItemText/ListItemText.js");
/* harmony import */ var _mui_material_Checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Checkbox */ "./node_modules/@mui/material/Checkbox/Checkbox.js");
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Link */ "./node_modules/@mui/material/Link/Link.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }














function idExists(array, targetProperty, targetId) {
  // Use Array.some() method to check if any object in the array has the targetId
  return array.some(function (item) {
    return item[targetProperty] === targetId;
  });
}
var AddRelatedRecord = function AddRelatedRecord(_ref) {
  var module_id = _ref.module_id,
    question_id = _ref.question_id;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    creating = _useState2[0],
    setCreating = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    loading_records = _useState4[0],
    setLoadingRecords = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    records = _useState6[0],
    setRecords = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState8 = _slicedToArray(_useState7, 2),
    module = _useState8[0],
    setModule = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    selected_records = _useState10[0],
    setSelectedRecords = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    add_record = _useState12[0],
    setAddSoftware = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState14 = _slicedToArray(_useState13, 2),
    add_record_name = _useState14[0],
    setAddRecordName = _useState14[1];
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
      return {
        category: state.lanscape.category,
        record_details: state.lanscape.record_details,
        record: state.lanscape.record
      };
    }),
    category = _useSelector.category,
    record_details = _useSelector.record_details,
    record = _useSelector.record;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    _api_api__WEBPACK_IMPORTED_MODULE_3__["default"].get("/api/user/records/module/".concat(module_id)).then(function (e) {
      setModule(e.data);
    })["catch"](function (err) {});
  }, [module_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    loadRecords();
  }, [category]);
  var loadRecords = function loadRecords() {
    setLoadingRecords(true);
    // Perform actions based on the URL parameters
    _api_api__WEBPACK_IMPORTED_MODULE_3__["default"].get("/api/user/records/index/all").then(function (e) {
      setRecords(e.data.records);
    })["catch"](function (err) {})["finally"](function () {
      return setLoadingRecords(false);
    });
  };
  var handleSubmit = function handleSubmit() {
    setCreating(true);
    _api_api__WEBPACK_IMPORTED_MODULE_3__["default"].post("/api/user/records/related/add", {
      selected_records: selected_records,
      add_record: add_record,
      add_record_name: add_record_name,
      module_id: module_id,
      parent: record.id,
      question_id: question_id
    }).then(function (e) {
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_2__.saveRecordDetails)(_objectSpread(_objectSpread({}, record_details), {}, {
        relatedrecords: e.data.relatedrecords
      })));
      setSelectedRecords([]);
      handleClose();
    })["catch"](function (err) {})["finally"](function () {
      return setCreating(false);
    });
  };
  var handleClose = function handleClose() {
    // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
    // if the document waiting to save changes then it will take some time to update redux back again. 
    setTimeout(function () {
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_2__.setRelatedRecord)({
        open: false
      }));
    }, 50);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "create_record_input_group"
  }, !add_record && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fullWidth: true,
    sx: {
      m: 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "add_record_name"
  }, "Select ", "".concat(module.name), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_6__["default"], {
    id: "".concat(module.slug),
    size: "small",
    multiple: true,
    value: selected_records,
    onChange: function onChange(e) {
      return setSelectedRecords(e.target.value);
    },
    input: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_OutlinedInput__WEBPACK_IMPORTED_MODULE_7__["default"], {
      label: "".concat(module.name)
    }),
    renderValue: function renderValue(selected) {
      return selected.map(function (id) {
        return records.find(function (rec) {
          return rec.id === id;
        }).name;
      }).join(', ');
    }
  }, _.map(records, function (r) {
    return r.module_id == module_id && !idExists(record_details.relatedrecords, 'related_record_id', r.id) && !idExists(record_details.relatedrecords, 'record_id', r.id) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_8__["default"], {
      key: "".concat(module.slug, "_").concat(r.id),
      value: r.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Checkbox__WEBPACK_IMPORTED_MODULE_9__["default"], {
      checked: selected_records.indexOf(r.id) > -1
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_10__["default"], {
      primary: r.name
    }));
  })), _.size(selected_records) > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: '#ccc'
    }
  }, "Click here to add new ", "".concat(module.name)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "chand",
    underline: "none",
    onClick: function onClick() {
      return setAddSoftware(true);
    }
  }, "Click here to add new ", "".concat(module.name))), add_record && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    fullWidth: true,
    sx: {
      m: 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "add_record_name"
  }, "".concat(module.name), " Name:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_12__["default"], {
    id: "",
    size: "small",
    label: "Add New",
    name: "add_record_name",
    value: add_record_name,
    onChange: function onChange(e) {
      return setAddRecordName(e.target.value);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_11__["default"], {
    className: "chand",
    underline: "none",
    onClick: function onClick() {
      return setAddSoftware(false);
    }
  }, "Click here to select existing ", "".concat(module.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_4__["default"], {
    sx: {
      display: 'flex',
      flexWrap: 'wrap',
      m: 1
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_13__["default"], {
    disabled: creating,
    onClick: handleSubmit,
    variant: "contained"
  }, "Submit"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_13__["default"], {
    sx: {
      marginLeft: '10px'
    },
    variant: "outlined",
    onClick: handleClose
  }, "Cancel")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddRelatedRecord);

/***/ })

}]);