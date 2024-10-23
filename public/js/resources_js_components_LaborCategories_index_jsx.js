"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_LaborCategories_index_jsx"],{

/***/ "./node_modules/@mui/icons-material/Add.js":
/*!*************************************************!*\
  !*** ./node_modules/@mui/icons-material/Add.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


"use client";

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _default = exports["default"] = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
}), 'Add');

/***/ }),

/***/ "./node_modules/@mui/icons-material/DeleteOutline.js":
/*!***********************************************************!*\
  !*** ./node_modules/@mui/icons-material/DeleteOutline.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


"use client";

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _default = exports["default"] = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"
}), 'DeleteOutline');

/***/ }),

/***/ "./node_modules/@mui/icons-material/MoreVert.js":
/*!******************************************************!*\
  !*** ./node_modules/@mui/icons-material/MoreVert.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


"use client";

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ "./node_modules/@mui/icons-material/utils/createSvgIcon.js"));
var _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _default = exports["default"] = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
}), 'MoreVert');

/***/ }),

/***/ "./node_modules/@mui/material/Pagination/Pagination.js":
/*!*************************************************************!*\
  !*** ./node_modules/@mui/material/Pagination/Pagination.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/@mui/material/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/utils/composeClasses */ "./node_modules/@mui/utils/composeClasses/composeClasses.js");
/* harmony import */ var _mui_utils_integerPropType__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/utils/integerPropType */ "./node_modules/@mui/utils/integerPropType/integerPropType.js");
/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/useThemeProps */ "./node_modules/@mui/material/styles/useThemeProps.js");
/* harmony import */ var _paginationClasses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./paginationClasses */ "./node_modules/@mui/material/Pagination/paginationClasses.js");
/* harmony import */ var _usePagination__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../usePagination */ "./node_modules/@mui/material/usePagination/usePagination.js");
/* harmony import */ var _PaginationItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../PaginationItem */ "./node_modules/@mui/material/PaginationItem/PaginationItem.js");
/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/styled */ "./node_modules/@mui/material/styles/styled.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';



const _excluded = ["boundaryCount", "className", "color", "count", "defaultPage", "disabled", "getItemAriaLabel", "hideNextButton", "hidePrevButton", "onChange", "page", "renderItem", "shape", "showFirstButton", "showLastButton", "siblingCount", "size", "variant"];











const useUtilityClasses = ownerState => {
  const {
    classes,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant],
    ul: ['ul']
  };
  return (0,_mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_5__["default"])(slots, _paginationClasses__WEBPACK_IMPORTED_MODULE_6__.getPaginationUtilityClass, classes);
};
const PaginationRoot = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_7__["default"])('nav', {
  name: 'MuiPagination',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant]];
  }
})({});
const PaginationUl = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_7__["default"])('ul', {
  name: 'MuiPagination',
  slot: 'Ul',
  overridesResolver: (props, styles) => styles.ul
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none'
});
function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}
const Pagination = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function Pagination(inProps, ref) {
  const props = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_8__["default"])({
    props: inProps,
    name: 'MuiPagination'
  });
  const {
      boundaryCount = 1,
      className,
      color = 'standard',
      count = 1,
      defaultPage = 1,
      disabled = false,
      getItemAriaLabel = defaultGetAriaLabel,
      hideNextButton = false,
      hidePrevButton = false,
      renderItem = item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_PaginationItem__WEBPACK_IMPORTED_MODULE_9__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item)),
      shape = 'circular',
      showFirstButton = false,
      showLastButton = false,
      siblingCount = 1,
      size = 'medium',
      variant = 'text'
    } = props,
    other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, _excluded);
  const {
    items
  } = (0,_usePagination__WEBPACK_IMPORTED_MODULE_10__["default"])((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    componentName: 'Pagination'
  }));
  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    boundaryCount,
    color,
    count,
    defaultPage,
    disabled,
    getItemAriaLabel,
    hideNextButton,
    hidePrevButton,
    renderItem,
    shape,
    showFirstButton,
    showLastButton,
    siblingCount,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PaginationRoot, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-label": "pagination navigation",
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PaginationUl, {
      className: classes.ul,
      ownerState: ownerState,
      children: items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
        children: renderItem((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item, {
          color,
          'aria-label': getItemAriaLabel(item.type, item.page, item.selected),
          shape,
          size,
          variant
        }))
      }, index))
    })
  }));
});

// @default tags synced with default values from usePagination

 true ? Pagination.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount: _mui_utils_integerPropType__WEBPACK_IMPORTED_MODULE_11__["default"],
  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().object),
  /**
   * @ignore
   */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string),
  /**
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['primary', 'secondary', 'standard']), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string)]),
  /**
   * The total number of pages.
   * @default 1
   */
  count: _mui_utils_integerPropType__WEBPACK_IMPORTED_MODULE_11__["default"],
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage: _mui_utils_integerPropType__WEBPACK_IMPORTED_MODULE_11__["default"],
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().func),
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),
  /**
   * Callback fired when the page is changed.
   *
   * @param {React.ChangeEvent<unknown>} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().func),
  /**
   * The current page. Unlike `TablePagination`, which starts numbering from `0`, this pagination starts from `1`.
   */
  page: _mui_utils_integerPropType__WEBPACK_IMPORTED_MODULE_11__["default"],
  /**
   * Render the item.
   * @param {PaginationRenderItemParams} params The props to spread on a PaginationItem.
   * @returns {ReactNode}
   * @default (item) => <PaginationItem {...item} />
   */
  renderItem: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().func),
  /**
   * The shape of the pagination items.
   * @default 'circular'
   */
  shape: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['circular', 'rounded']),
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool),
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount: _mui_utils_integerPropType__WEBPACK_IMPORTED_MODULE_11__["default"],
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['small', 'medium', 'large']), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string)]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_12___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_12___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().object)]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_12___default().oneOf(['outlined', 'text']), (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string)])
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/***/ }),

/***/ "./node_modules/@mui/material/Pagination/paginationClasses.js":
/*!********************************************************************!*\
  !*** ./node_modules/@mui/material/Pagination/paginationClasses.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getPaginationUtilityClass: () => (/* binding */ getPaginationUtilityClass)
/* harmony export */ });
/* harmony import */ var _mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/utils/generateUtilityClasses */ "./node_modules/@mui/utils/generateUtilityClasses/generateUtilityClasses.js");
/* harmony import */ var _mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils/generateUtilityClass */ "./node_modules/@mui/utils/generateUtilityClass/generateUtilityClass.js");


function getPaginationUtilityClass(slot) {
  return (0,_mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__["default"])('MuiPagination', slot);
}
const paginationClasses = (0,_mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__["default"])('MuiPagination', ['root', 'ul', 'outlined', 'text']);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paginationClasses);

/***/ }),

/***/ "./node_modules/@mui/material/PaginationItem/PaginationItem.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@mui/material/PaginationItem/PaginationItem.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/@mui/material/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/utils/composeClasses */ "./node_modules/@mui/utils/composeClasses/composeClasses.js");
/* harmony import */ var _mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/system/colorManipulator */ "./node_modules/@mui/system/colorManipulator.js");
/* harmony import */ var _mui_system_RtlProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/system/RtlProvider */ "./node_modules/@mui/system/esm/RtlProvider/index.js");
/* harmony import */ var _styles_useThemeProps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/useThemeProps */ "./node_modules/@mui/material/styles/useThemeProps.js");
/* harmony import */ var _paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./paginationItemClasses */ "./node_modules/@mui/material/PaginationItem/paginationItemClasses.js");
/* harmony import */ var _ButtonBase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ButtonBase */ "./node_modules/@mui/material/ButtonBase/ButtonBase.js");
/* harmony import */ var _utils_capitalize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/capitalize */ "./node_modules/@mui/material/utils/capitalize.js");
/* harmony import */ var _internal_svg_icons_FirstPage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../internal/svg-icons/FirstPage */ "./node_modules/@mui/material/internal/svg-icons/FirstPage.js");
/* harmony import */ var _internal_svg_icons_LastPage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../internal/svg-icons/LastPage */ "./node_modules/@mui/material/internal/svg-icons/LastPage.js");
/* harmony import */ var _internal_svg_icons_NavigateBefore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../internal/svg-icons/NavigateBefore */ "./node_modules/@mui/material/internal/svg-icons/NavigateBefore.js");
/* harmony import */ var _internal_svg_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../internal/svg-icons/NavigateNext */ "./node_modules/@mui/material/internal/svg-icons/NavigateNext.js");
/* harmony import */ var _styles_styled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../styles/styled */ "./node_modules/@mui/material/styles/styled.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';



const _excluded = ["className", "color", "component", "components", "disabled", "page", "selected", "shape", "size", "slots", "type", "variant"];

















const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, styles[ownerState.variant], styles[`size${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(ownerState.size)}`], ownerState.variant === 'text' && styles[`text${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(ownerState.color)}`], ownerState.variant === 'outlined' && styles[`outlined${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(ownerState.color)}`], ownerState.shape === 'rounded' && styles.rounded, ownerState.type === 'page' && styles.page, (ownerState.type === 'start-ellipsis' || ownerState.type === 'end-ellipsis') && styles.ellipsis, (ownerState.type === 'previous' || ownerState.type === 'next') && styles.previousNext, (ownerState.type === 'first' || ownerState.type === 'last') && styles.firstLast];
};
const useUtilityClasses = ownerState => {
  const {
    classes,
    color,
    disabled,
    selected,
    size,
    shape,
    type,
    variant
  } = ownerState;
  const slots = {
    root: ['root', `size${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(size)}`, variant, shape, color !== 'standard' && `color${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(color)}`, color !== 'standard' && `${variant}${(0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_5__["default"])(color)}`, disabled && 'disabled', selected && 'selected', {
      page: 'page',
      first: 'firstLast',
      last: 'firstLast',
      'start-ellipsis': 'ellipsis',
      'end-ellipsis': 'ellipsis',
      previous: 'previousNext',
      next: 'previousNext'
    }[type]],
    icon: ['icon']
  };
  return (0,_mui_utils_composeClasses__WEBPACK_IMPORTED_MODULE_6__["default"])(slots, _paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__.getPaginationItemUtilityClass, classes);
};
const PaginationItemEllipsis = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__["default"])('div', {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, theme.typography.body2, {
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: (theme.vars || theme).palette.text.primary,
  height: 'auto',
  [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }
}, ownerState.size === 'small' && {
  minWidth: 26,
  borderRadius: 26 / 2,
  margin: '0 1px',
  padding: '0 4px'
}, ownerState.size === 'large' && {
  minWidth: 40,
  borderRadius: 40 / 2,
  padding: '0 10px',
  fontSize: theme.typography.pxToRem(15)
}));
const PaginationItemPage = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__["default"])(_ButtonBase__WEBPACK_IMPORTED_MODULE_9__["default"], {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, theme.typography.body2, {
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  height: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: (theme.vars || theme).palette.text.primary,
  [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  },
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].selected}`]: {
    backgroundColor: (theme.vars || theme).palette.action.selected,
    '&:hover': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : (0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_10__.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette.action.selected
      }
    },
    [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : (0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_10__.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    },
    [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].disabled}`]: {
      opacity: 1,
      color: (theme.vars || theme).palette.action.disabled,
      backgroundColor: (theme.vars || theme).palette.action.selected
    }
  }
}, ownerState.size === 'small' && {
  minWidth: 26,
  height: 26,
  borderRadius: 26 / 2,
  margin: '0 1px',
  padding: '0 4px'
}, ownerState.size === 'large' && {
  minWidth: 40,
  height: 40,
  borderRadius: 40 / 2,
  padding: '0 10px',
  fontSize: theme.typography.pxToRem(15)
}, ownerState.shape === 'rounded' && {
  borderRadius: (theme.vars || theme).shape.borderRadius
}), ({
  theme,
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, ownerState.variant === 'text' && {
  [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].selected}`]: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, ownerState.color !== 'standard' && {
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    },
    [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
    }
  }, {
    [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled
    }
  })
}, ownerState.variant === 'outlined' && {
  border: theme.vars ? `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
  [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].selected}`]: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, ownerState.color !== 'standard' && {
    color: (theme.vars || theme).palette[ownerState.color].main,
    border: `1px solid ${theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : (0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_10__.alpha)(theme.palette[ownerState.color].main, 0.5)}`,
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.activatedOpacity})` : (0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_10__.alpha)(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity),
    '&:hover': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / calc(${theme.vars.palette.action.activatedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : (0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_10__.alpha)(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / calc(${theme.vars.palette.action.activatedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : (0,_mui_system_colorManipulator__WEBPACK_IMPORTED_MODULE_10__.alpha)(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity)
    }
  }, {
    [`&.${_paginationItemClasses__WEBPACK_IMPORTED_MODULE_7__["default"].disabled}`]: {
      borderColor: (theme.vars || theme).palette.action.disabledBackground,
      color: (theme.vars || theme).palette.action.disabled
    }
  })
}));
const PaginationItemPageIcon = (0,_styles_styled__WEBPACK_IMPORTED_MODULE_8__["default"])('div', {
  name: 'MuiPaginationItem',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon
})(({
  theme,
  ownerState
}) => (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
  fontSize: theme.typography.pxToRem(20),
  margin: '0 -8px'
}, ownerState.size === 'small' && {
  fontSize: theme.typography.pxToRem(18)
}, ownerState.size === 'large' && {
  fontSize: theme.typography.pxToRem(22)
}));
const PaginationItem = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function PaginationItem(inProps, ref) {
  const props = (0,_styles_useThemeProps__WEBPACK_IMPORTED_MODULE_11__["default"])({
    props: inProps,
    name: 'MuiPaginationItem'
  });
  const {
      className,
      color = 'standard',
      component,
      components = {},
      disabled = false,
      page,
      selected = false,
      shape = 'circular',
      size = 'medium',
      slots = {},
      type = 'page',
      variant = 'text'
    } = props,
    other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const ownerState = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    color,
    disabled,
    selected,
    shape,
    size,
    type,
    variant
  });
  const isRtl = (0,_mui_system_RtlProvider__WEBPACK_IMPORTED_MODULE_12__.useRtl)();
  const classes = useUtilityClasses(ownerState);
  const normalizedIcons = isRtl ? {
    previous: slots.next || components.next || _internal_svg_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_13__["default"],
    next: slots.previous || components.previous || _internal_svg_icons_NavigateBefore__WEBPACK_IMPORTED_MODULE_14__["default"],
    last: slots.first || components.first || _internal_svg_icons_FirstPage__WEBPACK_IMPORTED_MODULE_15__["default"],
    first: slots.last || components.last || _internal_svg_icons_LastPage__WEBPACK_IMPORTED_MODULE_16__["default"]
  } : {
    previous: slots.previous || components.previous || _internal_svg_icons_NavigateBefore__WEBPACK_IMPORTED_MODULE_14__["default"],
    next: slots.next || components.next || _internal_svg_icons_NavigateNext__WEBPACK_IMPORTED_MODULE_13__["default"],
    first: slots.first || components.first || _internal_svg_icons_FirstPage__WEBPACK_IMPORTED_MODULE_15__["default"],
    last: slots.last || components.last || _internal_svg_icons_LastPage__WEBPACK_IMPORTED_MODULE_16__["default"]
  };
  const Icon = normalizedIcons[type];
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PaginationItemEllipsis, {
    ref: ref,
    ownerState: ownerState,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className),
    children: "\u2026"
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(PaginationItemPage, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: ref,
    ownerState: ownerState,
    component: component,
    disabled: disabled,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])(classes.root, className)
  }, other, {
    children: [type === 'page' && page, Icon ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PaginationItemPageIcon, {
      as: Icon,
      ownerState: ownerState,
      className: classes.icon
    }) : null]
  }));
});
 true ? PaginationItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().node),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().object),
  /**
   * @ignore
   */
  className: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
  /**
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOf(['primary', 'secondary', 'standard']), (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string)]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: prop_types__WEBPACK_IMPORTED_MODULE_17___default().shape({
    first: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType),
    last: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType),
    next: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType),
    previous: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType)
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().bool),
  /**
   * The current page number.
   */
  page: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().node),
  /**
   * If `true` the pagination item is selected.
   * @default false
   */
  selected: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().bool),
  /**
   * The shape of the pagination item.
   * @default 'circular'
   */
  shape: prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOf(['circular', 'rounded']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOf(['small', 'medium', 'large']), (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string)]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: prop_types__WEBPACK_IMPORTED_MODULE_17___default().shape({
    first: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType),
    last: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType),
    next: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType),
    previous: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().elementType)
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_17___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_17___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_17___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_17___default().bool)])), (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func), (prop_types__WEBPACK_IMPORTED_MODULE_17___default().object)]),
  /**
   * The type of pagination item.
   * @default 'page'
   */
  type: prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOf(['end-ellipsis', 'first', 'last', 'next', 'page', 'previous', 'start-ellipsis']),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_17___default().oneOf(['outlined', 'text']), (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string)])
} : 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaginationItem);

/***/ }),

/***/ "./node_modules/@mui/material/PaginationItem/paginationItemClasses.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@mui/material/PaginationItem/paginationItemClasses.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getPaginationItemUtilityClass: () => (/* binding */ getPaginationItemUtilityClass)
/* harmony export */ });
/* harmony import */ var _mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/utils/generateUtilityClasses */ "./node_modules/@mui/utils/generateUtilityClasses/generateUtilityClasses.js");
/* harmony import */ var _mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/utils/generateUtilityClass */ "./node_modules/@mui/utils/generateUtilityClass/generateUtilityClass.js");


function getPaginationItemUtilityClass(slot) {
  return (0,_mui_utils_generateUtilityClass__WEBPACK_IMPORTED_MODULE_0__["default"])('MuiPaginationItem', slot);
}
const paginationItemClasses = (0,_mui_utils_generateUtilityClasses__WEBPACK_IMPORTED_MODULE_1__["default"])('MuiPaginationItem', ['root', 'page', 'sizeSmall', 'sizeLarge', 'text', 'textPrimary', 'textSecondary', 'outlined', 'outlinedPrimary', 'outlinedSecondary', 'rounded', 'ellipsis', 'firstLast', 'previousNext', 'focusVisible', 'disabled', 'selected', 'icon', 'colorPrimary', 'colorSecondary']);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paginationItemClasses);

/***/ }),

/***/ "./node_modules/@mui/material/internal/svg-icons/FirstPage.js":
/*!********************************************************************!*\
  !*** ./node_modules/@mui/material/internal/svg-icons/FirstPage.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/createSvgIcon */ "./node_modules/@mui/material/utils/createSvgIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';




/**
 * @ignore - internal component.
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
  d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"
}), 'FirstPage'));

/***/ }),

/***/ "./node_modules/@mui/material/internal/svg-icons/LastPage.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mui/material/internal/svg-icons/LastPage.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/createSvgIcon */ "./node_modules/@mui/material/utils/createSvgIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';




/**
 * @ignore - internal component.
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
  d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"
}), 'LastPage'));

/***/ }),

/***/ "./node_modules/@mui/material/internal/svg-icons/NavigateBefore.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@mui/material/internal/svg-icons/NavigateBefore.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/createSvgIcon */ "./node_modules/@mui/material/utils/createSvgIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';




/**
 * @ignore - internal component.
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), 'NavigateBefore'));

/***/ }),

/***/ "./node_modules/@mui/material/internal/svg-icons/NavigateNext.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mui/material/internal/svg-icons/NavigateNext.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/createSvgIcon */ "./node_modules/@mui/material/utils/createSvgIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client';




/**
 * @ignore - internal component.
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_2__["default"])( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), 'NavigateNext'));

/***/ }),

/***/ "./node_modules/@mui/material/usePagination/usePagination.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mui/material/usePagination/usePagination.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ usePagination)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _mui_utils_useControlled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/utils/useControlled */ "./node_modules/@mui/utils/useControlled/useControlled.js");
'use client';



const _excluded = ["boundaryCount", "componentName", "count", "defaultPage", "disabled", "hideNextButton", "hidePrevButton", "onChange", "page", "showFirstButton", "showLastButton", "siblingCount"];

function usePagination(props = {}) {
  // keep default values in sync with @default tags in Pagination.propTypes
  const {
      boundaryCount = 1,
      componentName = 'usePagination',
      count = 1,
      defaultPage = 1,
      disabled = false,
      hideNextButton = false,
      hidePrevButton = false,
      onChange: handleChange,
      page: pageProp,
      showFirstButton = false,
      showLastButton = false,
      siblingCount = 1
    } = props,
    other = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, _excluded);
  const [page, setPageState] = (0,_mui_utils_useControlled__WEBPACK_IMPORTED_MODULE_2__["default"])({
    controlled: pageProp,
    default: defaultPage,
    name: componentName,
    state: 'page'
  });
  const handleClick = (event, value) => {
    if (!pageProp) {
      setPageState(value);
    }
    if (handleChange) {
      handleChange(event, value);
    }
  };

  // https://dev.to/namirsab/comment/2050
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({
      length
    }, (_, i) => start + i);
  };
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
  const siblingsStart = Math.max(Math.min(
  // Natural start
  page - siblingCount,
  // Lower boundary when page is high
  count - boundaryCount - siblingCount * 2 - 1),
  // Greater than startPages
  boundaryCount + 2);
  const siblingsEnd = Math.min(Math.max(
  // Natural end
  page + siblingCount,
  // Upper boundary when page is low
  boundaryCount + siblingCount * 2 + 2),
  // Less than endPages
  endPages.length > 0 ? endPages[0] - 2 : count - 1);

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [...(showFirstButton ? ['first'] : []), ...(hidePrevButton ? [] : ['previous']), ...startPages,
  // Start ellipsis
  // eslint-disable-next-line no-nested-ternary
  ...(siblingsStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []),
  // Sibling pages
  ...range(siblingsStart, siblingsEnd),
  // End ellipsis
  // eslint-disable-next-line no-nested-ternary
  ...(siblingsEnd < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []), ...endPages, ...(hideNextButton ? [] : ['next']), ...(showLastButton ? ['last'] : [])];

  // Map the button type to its page number
  const buttonPage = type => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map(item => {
    return typeof item === 'number' ? {
      onClick: event => {
        handleClick(event, item);
      },
      type: 'page',
      page: item,
      selected: item === page,
      disabled,
      'aria-current': item === page ? 'true' : undefined
    } : {
      onClick: event => {
        handleClick(event, buttonPage(item));
      },
      type: item,
      page: buttonPage(item),
      selected: false,
      disabled: disabled || item.indexOf('ellipsis') === -1 && (item === 'next' || item === 'last' ? page >= count : page <= 1)
    };
  });
  return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    items
  }, other);
}

/***/ }),

/***/ "./resources/js/components/Global/ActionsButton.jsx":
/*!**********************************************************!*\
  !*** ./resources/js/components/Global/ActionsButton.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActionsButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/styles/styled.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/system/esm/colorManipulator.js");
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/IconButton */ "./node_modules/@mui/material/IconButton/IconButton.js");
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Menu */ "./node_modules/@mui/material/Menu/Menu.js");
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/MoreVert */ "./node_modules/@mui/icons-material/MoreVert.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }





var StyledMenu = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__["default"])(function (props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Menu__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
    elevation: 0,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  }, props));
})(function (_ref) {
  var theme = _ref.theme;
  return {
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }
    }
  };
});
function ActionsButton(_ref2) {
  var children = _ref2.children;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    anchorEl = _React$useState2[0],
    setAnchorEl = _React$useState2[1];
  var open = Boolean(anchorEl);
  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };
  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  // Enhance children to automatically close the menu on click
  var handleMenuItemClick = function handleMenuItemClick(child) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, {
      onClick: function onClick(event) {
        if (child.props.onClick) {
          child.props.onClick(event);
        }
        handleClose();
      }
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    "aria-label": "action menu",
    id: "action-button",
    "aria-controls": open ? 'action-menu' : undefined,
    "aria-expanded": open ? 'true' : undefined,
    "aria-haspopup": "true",
    onClick: handleClick,
    size: "small"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StyledMenu, {
    id: "action-menu",
    MenuListProps: {
      'aria-labelledby': 'action-button'
    },
    anchorEl: anchorEl,
    open: open,
    onClose: handleClose
  }, react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, handleMenuItemClick)));
}

/***/ }),

/***/ "./resources/js/components/LaborCategories/AddLaborCategoryDialog.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/components/LaborCategories/AddLaborCategoryDialog.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/DialogContent */ "./node_modules/@mui/material/DialogContent/DialogContent.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/DialogTitle */ "./node_modules/@mui/material/DialogTitle/DialogTitle.js");
/* harmony import */ var _mui_material_Slide__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Slide */ "./node_modules/@mui/material/Slide/Slide.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControl/FormControl.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Select/Select.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
/* harmony import */ var _utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/errorHelper */ "./resources/js/utils/errorHelper.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }













var Transition = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Slide__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
    direction: "up",
    ref: ref
  }, props));
});
var AddLaborCategoryDialog = function AddLaborCategoryDialog(_ref) {
  var naicsCodes = _ref.naicsCodes;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
      return {
        addLaborCategoryDialog: state.validvalues.addLaborCategoryDialog
      };
    }),
    addLaborCategoryDialog = _useSelector.addLaborCategoryDialog;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      name: '',
      naics_code: '',
      pcs_code: '',
      description: ''
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    formData = _useState6[0],
    setFormData = _useState6[1];
  var handleChange = function handleChange(event) {
    var _event$target = event.target,
      name = _event$target.name,
      value = _event$target.value;
    setFormData(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, name, value));
    });
    clearError(name);
  };
  var clearError = function clearError(fieldName) {
    setErrors(function (prevErrors) {
      var newErrors = _objectSpread({}, prevErrors);
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  var handleSubmit = function handleSubmit() {
    setLoading(true);
    _api_api__WEBPACK_IMPORTED_MODULE_3__["default"].post('/api/user/valid-values/labor-categories', formData).then(function (response) {
      clearFormData();
      if (response.data) {
        dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setAddLaborCategoryDialog)({
          open: false,
          added: true
        }));
      }
    })["catch"](function (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        return;
      }
    })["finally"](function () {
      setLoading(false);
    });
  };
  var clearFormData = function clearFormData() {
    setFormData({
      name: '',
      naics_code: '',
      pcs_code: '',
      description: ''
    });
    setErrors({});
  };
  var handleClose = function handleClose() {
    clearFormData();
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setAddLaborCategoryDialog)({
      open: false
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fullWidth: true,
    maxWidth: "md",
    open: addLaborCategoryDialog === null || addLaborCategoryDialog === void 0 ? void 0 : addLaborCategoryDialog.open,
    TransitionComponent: Transition,
    keepMounted: true,
    onClose: handleClose,
    "aria-describedby": "Add new Labor Category dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_8__["default"], null, "Add Labor Category"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
    component: "form",
    noValidate: true,
    autoComplete: "off"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "name"
  }, "Name ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: "small",
    name: "name",
    onChange: handleChange,
    id: "name",
    value: formData.name,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('name', errors)
  }), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('name', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.getError)('name', errors))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "naics_code"
  }, "North American Industry Classification System (NAICS) Code ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {
    size: "small",
    id: "naics_code",
    name: "naics_code",
    value: formData.naics_code,
    onChange: handleChange,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('naics_code', errors),
    fullWidth: true,
    MenuProps: {
      style: {
        display: 'block'
      }
    }
  }, lodash__WEBPACK_IMPORTED_MODULE_2___default().map(naicsCodes, function (naicsCode) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], {
      key: "naics_code_".concat(naicsCode.id),
      value: naicsCode.id
    }, "".concat(naicsCode.naics_code, " - ").concat(naicsCode.naics_industry_description));
  })), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('naics_code', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.getError)('naics_code', errors))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "pcs_code"
  }, "Product Service Code (PSC) ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: "small",
    name: "pcs_code",
    onChange: handleChange,
    id: "pcs_code",
    value: formData.pcs_code,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('pcs_code', errors)
  }), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('pcs_code', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.getError)('pcs_code', errors))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "description"
  }, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: "small",
    name: "description",
    onChange: handleChange,
    id: "description",
    multiline: true,
    value: formData.description,
    rows: 4,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('description', errors)
  }), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.isFieldExistsInErrors)('description', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_4__.getError)('description', errors))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_15__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_16__["default"], {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_16__["default"], {
    disabled: loading,
    onClick: handleSubmit
  }, "Save"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddLaborCategoryDialog);

/***/ }),

/***/ "./resources/js/components/LaborCategories/EditLaborCategoryDialog.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/LaborCategories/EditLaborCategoryDialog.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditLaborCategoryDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var _mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/DialogContent */ "./node_modules/@mui/material/DialogContent/DialogContent.js");
/* harmony import */ var _mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/DialogTitle */ "./node_modules/@mui/material/DialogTitle/DialogTitle.js");
/* harmony import */ var _mui_material_Slide__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Slide */ "./node_modules/@mui/material/Slide/Slide.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/FormControl/FormControl.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Select/Select.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var _utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/errorHelper */ "./resources/js/utils/errorHelper.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }














var Transition = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function Transition(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Slide__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
    direction: "up",
    ref: ref
  }, props));
});
function EditLaborCategoryDialog(_ref) {
  var naicsCodes = _ref.naicsCodes;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
      return {
        editLaborCategoryDialog: state.validvalues.editLaborCategoryDialog
      };
    }),
    editLaborCategoryDialog = _useSelector.editLaborCategoryDialog;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      name: '',
      naics_code: '',
      pcs_code: '',
      description: ''
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    formData = _useState6[0],
    setFormData = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!lodash__WEBPACK_IMPORTED_MODULE_4___default().isEmpty(editLaborCategoryDialog === null || editLaborCategoryDialog === void 0 ? void 0 : editLaborCategoryDialog.laborCategory)) {
      setFormData(function (prevState) {
        return _objectSpread(_objectSpread({}, prevState), {}, {
          name: editLaborCategoryDialog.laborCategory.name,
          naics_code: lodash__WEBPACK_IMPORTED_MODULE_4___default().isEmpty(editLaborCategoryDialog.laborCategory.naics_code) ? '' : editLaborCategoryDialog.laborCategory.naics_code.id,
          pcs_code: editLaborCategoryDialog.laborCategory.pcs_code,
          description: editLaborCategoryDialog.laborCategory.description
        });
      });
    }
  }, [editLaborCategoryDialog]);
  var handleChange = function handleChange(event) {
    var _event$target = event.target,
      name = _event$target.name,
      value = _event$target.value;
    setFormData(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, name, value));
    });
    clearError(name);
  };
  var clearError = function clearError(fieldName) {
    setErrors(function (prevErrors) {
      var newErrors = _objectSpread({}, prevErrors);
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  var handleSubmit = function handleSubmit() {
    setLoading(true);
    _api_api__WEBPACK_IMPORTED_MODULE_5__["default"].put("/api/user/valid-values/labor-categories/".concat(editLaborCategoryDialog.laborCategory.id), formData).then(function (response) {
      clearFormData();
      if (response.data) {
        dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_2__.setEditLaborCategoryDialog)({
          open: false,
          updated: true
        }));
      }
    })["catch"](function (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        return;
      }
    })["finally"](function () {
      setLoading(false);
    });
  };
  var clearFormData = function clearFormData() {
    setFormData({
      name: '',
      naics_code: '',
      pcs_code: '',
      description: ''
    });
    setErrors({});
  };
  var handleClose = function handleClose() {
    clearFormData();
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_2__.setEditLaborCategoryDialog)({
      open: false
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_7__["default"], {
    fullWidth: true,
    maxWidth: "md",
    open: editLaborCategoryDialog === null || editLaborCategoryDialog === void 0 ? void 0 : editLaborCategoryDialog.open,
    TransitionComponent: Transition,
    keepMounted: true,
    onClose: handleClose,
    "aria-describedby": "Modify Labor Category Details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_DialogTitle__WEBPACK_IMPORTED_MODULE_8__["default"], null, "Labor Category Details"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_DialogContent__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
    component: "form",
    noValidate: true,
    autoComplete: "off"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "name"
  }, "Name ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: "small",
    name: "name",
    onChange: handleChange,
    id: "name",
    value: formData.name,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('name', errors)
  }), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('name', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.getError)('name', errors))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "naics_code"
  }, "North American Industry Classification System (NAICS) Code ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_13__["default"], {
    size: "small",
    id: "naics_code",
    name: "naics_code",
    value: formData.naics_code,
    onChange: handleChange,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('naics_code', errors),
    fullWidth: true,
    MenuProps: {
      style: {
        display: 'block'
      }
    }
  }, lodash__WEBPACK_IMPORTED_MODULE_4___default().map(naicsCodes, function (naicsCode) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__["default"], {
      key: "naics_code_".concat(naicsCode.id),
      value: naicsCode.id
    }, "".concat(naicsCode.naics_code, " - ").concat(naicsCode.naics_industry_description));
  })), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('naics_code', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.getError)('naics_code', errors))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "pcs_code"
  }, "Product Service Code (PSC) ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      color: 'red'
    }
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: "small",
    name: "pcs_code",
    onChange: handleChange,
    id: "pcs_code",
    value: formData.pcs_code,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('pcs_code', errors)
  }), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('pcs_code', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.getError)('pcs_code', errors))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__["default"], {
    fullWidth: true,
    sx: {
      mb: '10px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "description"
  }, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: "small",
    name: "description",
    onChange: handleChange,
    id: "description",
    multiline: true,
    rows: 4,
    value: formData.description,
    error: (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('description', errors)
  }), (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.isFieldExistsInErrors)('description', errors) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: 'red'
    }
  }, (0,_utils_errorHelper__WEBPACK_IMPORTED_MODULE_3__.getError)('description', errors))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_15__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_16__["default"], {
    onClick: handleClose
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_16__["default"], {
    onClick: handleSubmit
  }, "Save Changes"))));
}

/***/ }),

/***/ "./resources/js/components/LaborCategories/LaborCategoriesList.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/components/LaborCategories/LaborCategoriesList.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material_Table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Table */ "./node_modules/@mui/material/Table/Table.js");
/* harmony import */ var _mui_material_TableBody__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/TableBody */ "./node_modules/@mui/material/TableBody/TableBody.js");
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/TableCell */ "./node_modules/@mui/material/TableCell/TableCell.js");
/* harmony import */ var _mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/TableContainer */ "./node_modules/@mui/material/TableContainer/TableContainer.js");
/* harmony import */ var _mui_material_TableHead__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/TableHead */ "./node_modules/@mui/material/TableHead/TableHead.js");
/* harmony import */ var _mui_material_TableRow__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/TableRow */ "./node_modules/@mui/material/TableRow/TableRow.js");
/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_notifications__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-notifications */ "./node_modules/react-notifications/lib/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Grid/Grid.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/TextField/TextField.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Link/Link.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Stack/Stack.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Pagination/Pagination.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogTitle/DialogTitle.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogContent/DialogContent.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogContentText/DialogContentText.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/icons-material/Add */ "./node_modules/@mui/icons-material/Add.js");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var _Global_ActionsButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Global/ActionsButton */ "./resources/js/components/Global/ActionsButton.jsx");
/* harmony import */ var _mui_icons_material_DeleteOutline__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @mui/icons-material/DeleteOutline */ "./node_modules/@mui/icons-material/DeleteOutline.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

















var NaicsCodesList = function NaicsCodesList() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
      return {
        addLaborCategoryDialog: state.validvalues.addLaborCategoryDialog,
        editLaborCategoryDialog: state.validvalues.editLaborCategoryDialog
      };
    }),
    addLaborCategoryDialog = _useSelector.addLaborCategoryDialog,
    editLaborCategoryDialog = _useSelector.editLaborCategoryDialog;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    list = _useState4[0],
    setList = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    search = _useState6[0],
    setSearch = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState8 = _slicedToArray(_useState7, 2),
    page = _useState8[0],
    setPage = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    totalPages = _useState10[0],
    setTotalPages = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    nextPage = _useState12[0],
    setNextPage = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    prevPage = _useState14[0],
    setPrevPage = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState16 = _slicedToArray(_useState15, 2),
    totalItems = _useState16[0],
    setTotalItems = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    deleteDialogOpen = _useState18[0],
    setDeleteDialogOpen = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    selectedLaborCategory = _useState20[0],
    setSelectedLaborCategory = _useState20[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getLaborCategories();
  }, [page, search]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (addLaborCategoryDialog !== null && addLaborCategoryDialog !== void 0 && addLaborCategoryDialog.added) {
      setPage(1);
      getLaborCategories();
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setAddLaborCategoryDialog)({
        added: false
      }));
    }
    if (editLaborCategoryDialog !== null && editLaborCategoryDialog !== void 0 && editLaborCategoryDialog.updated) {
      setPage(1);
      getLaborCategories();
      dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setEditLaborCategoryDialog)({
        updated: false
      }));
    }
  }, [addLaborCategoryDialog, editLaborCategoryDialog]);
  var handlePageChange = function handlePageChange(event, value) {
    setPage(value);
  };
  var handleSearchChange = function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1); // Reset to first page when search changes
  };
  var getLaborCategories = function getLaborCategories() {
    _api_api__WEBPACK_IMPORTED_MODULE_4__["default"].get("/api/user/valid-values/labor-categories", {
      params: {
        page: page,
        search: search
      }
    }).then(function (e) {
      setList(e.data.data);
      setTotalPages(e.data.last_page);
      setNextPage(e.data.next_page_url);
      setPrevPage(e.data.prev_page_url);
      setTotalItems(e.data.total);
      setLoading(false);
    })["catch"](function (err) {
      if (err.response.status === 500) {
        react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.error('Server Error, Please contact customer support.', 'Error');
      }
    });
  };
  var handleDeleteClick = function handleDeleteClick(laborCategory) {
    setDeleteDialogOpen(true);
    setSelectedLaborCategory(laborCategory);
  };
  var handleCloseDeleteDialog = function handleCloseDeleteDialog() {
    setDeleteDialogOpen(false);
    setSelectedLaborCategory(null);
  };
  var handleDeleteLBConfirm = function handleDeleteLBConfirm(id) {
    _api_api__WEBPACK_IMPORTED_MODULE_4__["default"]["delete"]("/api/user/valid-values/labor-categories/".concat(id)).then(function (e) {
      handleCloseDeleteDialog();
      getLaborCategories();
      react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.success('Labor Category deleted successfully.', 'Success');
    })["catch"](function (err) {
      if (err.response && err.response.status === 400) {
        react_notifications__WEBPACK_IMPORTED_MODULE_2__.NotificationManager.warning('Cannot deleted Labor Category.', 'Error');
      }
    });
  };
  var handleAddLaborCategories = function handleAddLaborCategories() {
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setAddLaborCategoryDialog)({
      open: true
    }));
  };
  var handleEditClick = function handleEditClick(laborCategory) {
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_5__.setEditLaborCategoryDialog)({
      open: true,
      laborCategory: laborCategory
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], {
    sx: {
      width: '100%',
      mb: 2
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    container: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    item: true,
    xs: 6,
    md: 7,
    lg: 9,
    xl: 10,
    sx: {
      pr: {
        xs: 1,
        md: 0,
        lg: 0,
        xl: 0
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fullWidth: true,
    label: "Search",
    variant: "outlined",
    value: search,
    onChange: handleSearchChange,
    size: "small"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__["default"], {
    item: true,
    xs: 6,
    md: 5,
    lg: 3,
    xl: 2,
    sx: {
      textAlign: {
        xs: 'right',
        md: 'right',
        lg: 'right',
        xl: 'right'
      },
      pl: {
        xs: 1,
        md: 0,
        lg: 0,
        xl: 0
      },
      verticalAlign: 'middle'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
    onClick: handleAddLaborCategories,
    startIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Add__WEBPACK_IMPORTED_MODULE_11__["default"], null),
    variant: "contained"
  }, "Add Labor Category")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableContainer__WEBPACK_IMPORTED_MODULE_12__["default"], {
    component: _mui_material_Paper__WEBPACK_IMPORTED_MODULE_13__["default"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Table__WEBPACK_IMPORTED_MODULE_14__["default"], {
    sx: {
      minWidth: 650
    },
    "aria-label": "labor categories list",
    size: "small"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableHead__WEBPACK_IMPORTED_MODULE_15__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_16__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
    align: "left"
  }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
    align: "center"
  }, "NAICS Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
    align: "center"
  }, "PCS Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
    align: "center"
  }, "Description"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
    align: "right"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableBody__WEBPACK_IMPORTED_MODULE_18__["default"], null, lodash__WEBPACK_IMPORTED_MODULE_3___default().map(list, function (laborCategory) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableRow__WEBPACK_IMPORTED_MODULE_16__["default"], {
      key: laborCategory.id,
      sx: {
        '&:last-child td, &:last-child th': {
          border: 0
        }
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
      component: "th",
      scope: "row",
      align: "left"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_19__["default"], {
      underline: "hover",
      onClick: function onClick() {
        return handleEditClick(laborCategory);
      },
      style: {
        cursor: 'pointer'
      }
    }, "".concat(laborCategory.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
      align: "center"
    }, lodash__WEBPACK_IMPORTED_MODULE_3___default().isEmpty(laborCategory.naics_code) ? '' : "".concat(laborCategory.naics_code.naics_code, " - ").concat(laborCategory.naics_code.naics_industry_description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
      align: "center"
    }, laborCategory.pcs_code), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
      align: "center"
    }, laborCategory.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_17__["default"], {
      align: "right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Global_ActionsButton__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_20__["default"], {
      onClick: function onClick() {
        return handleDeleteClick(laborCategory);
      },
      disableRipple: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_DeleteOutline__WEBPACK_IMPORTED_MODULE_21__["default"], null), "Delete"))));
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_22__["default"], {
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      mt: 2,
      pb: '85px'
    },
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_23__["default"], {
    count: totalPages,
    page: page,
    onChange: handlePageChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_24__["default"], {
    open: deleteDialogOpen,
    onClose: handleCloseDeleteDialog,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_25__["default"], null, "Confirm Delete Labor Category"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_26__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_27__["default"], null, "Are you sure you want to delete this Labor Category?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_28__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
    color: "primary",
    onClick: handleCloseDeleteDialog
  }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_10__["default"], {
    color: "error",
    onClick: function onClick() {
      return handleDeleteLBConfirm(selectedLaborCategory.id);
    }
  }, "Delete"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NaicsCodesList);

/***/ }),

/***/ "./resources/js/components/LaborCategories/index.jsx":
/*!***********************************************************!*\
  !*** ./resources/js/components/LaborCategories/index.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _LaborCategoriesList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LaborCategoriesList */ "./resources/js/components/LaborCategories/LaborCategoriesList.jsx");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/api */ "./resources/js/api/api.jsx");
/* harmony import */ var _AddLaborCategoryDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AddLaborCategoryDialog */ "./resources/js/components/LaborCategories/AddLaborCategoryDialog.jsx");
/* harmony import */ var _EditLaborCategoryDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditLaborCategoryDialog */ "./resources/js/components/LaborCategories/EditLaborCategoryDialog.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var LaborCategories = function LaborCategories(_ref) {
  var leftnav = _ref.leftnav;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    naicsCodes = _useState4[0],
    setNaicsCodes = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    errors = _useState6[0],
    setErrors = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    _api_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/api/user/valid-values/naics-codes').then(function (response) {
      if (response.data) {
        setNaicsCodes(response.data);
      }
    })["catch"](function (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
        return;
      }
    })["finally"](function () {
      setLoading(false);
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: leftnav.open_sub ? 'sub__slide__menu_opened' : ''
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    marginBottom: 2,
    sx: {
      display: 'flex',
      justifyContent: 'space-between',
      pt: '14px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      display: 'flex',
      alignItems: 'center',
      ml: 2
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "uil-streering",
    style: {
      marginRight: '10px',
      fontSize: '24px'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_6__["default"], {
    variant: "h1",
    sx: {
      fontSize: '24px',
      fontWeight: '500',
      color: '#000'
    }
  }, "Labor Categories"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_5__["default"], {
    sx: {
      px: 2
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_LaborCategoriesList__WEBPACK_IMPORTED_MODULE_1__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_AddLaborCategoryDialog__WEBPACK_IMPORTED_MODULE_3__["default"], {
    naicsCodes: naicsCodes
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_EditLaborCategoryDialog__WEBPACK_IMPORTED_MODULE_4__["default"], {
    naicsCodes: naicsCodes
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LaborCategories);

/***/ })

}]);