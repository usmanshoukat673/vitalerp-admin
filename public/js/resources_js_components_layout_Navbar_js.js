"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_layout_Navbar_js"],{

/***/ "./resources/js/components/constants/menu.js":
/*!***************************************************!*\
  !*** ./resources/js/components/constants/menu.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var MENU_ITEMS = [{
  key: 'navigation',
  label: 'Navigation',
  isTitle: true
}, {
  key: 'dashboards',
  label: 'Dashboards',
  isTitle: false,
  icon: 'uil-home-alt',
  badge: {
    variant: 'success',
    text: '4'
  },
  children: [{
    key: 'ds-analytics',
    label: 'Analytics',
    url: '/dashboard/analytics',
    parentKey: 'dashboards'
  }, {
    key: 'ds-ecommerce',
    label: 'Ecommerce',
    url: '/dashboard/ecommerce',
    parentKey: 'dashboards'
  }, {
    key: 'ds-project',
    label: 'Projects',
    url: '/dashboard/project',
    parentKey: 'dashboards'
  }, {
    key: 'ds-ewallet',
    label: 'E-Wallet',
    url: '/dashboard/e-wallet',
    parentKey: 'dashboards',
    badge: {
      variant: 'danger',
      text: 'New'
    }
  }]
}, {
  key: 'apps',
  label: 'Apps',
  isTitle: true
}, {
  key: 'apps-calendar',
  label: 'Calendar',
  isTitle: false,
  icon: 'uil-calender',
  url: '/apps/calendar'
}, {
  key: 'apps-chat',
  label: 'Chat',
  isTitle: false,
  icon: 'uil-comments-alt',
  url: '/apps/chat'
}, {
  key: 'apps-crm',
  label: 'CRM',
  isTitle: false,
  badge: {
    variant: 'danger',
    text: 'New'
  },
  icon: 'uil-tachometer-fast',
  children: [{
    key: 'crm-products',
    label: 'Dashboard',
    url: '/apps/crm/dashboard',
    parentKey: 'apps-crm'
  }, {
    key: 'crm-projects',
    label: 'Project',
    url: '/apps/crm/projects',
    parentKey: 'apps-crm'
  }, {
    key: 'crm-orders',
    label: 'Orders List',
    url: '/apps/crm/orders',
    parentKey: 'apps-crm'
  }, {
    key: 'crm-clients',
    label: 'Clients',
    url: '/apps/crm/clients',
    parentKey: 'apps-crm'
  }, {
    key: 'crm-management',
    label: 'Management',
    url: '/apps/crm/management',
    parentKey: 'apps-crm'
  }]
}, {
  key: 'apps-ecommerce',
  label: 'Ecommerce',
  isTitle: false,
  icon: 'uil-store',
  children: [{
    key: 'ecommerce-products',
    label: 'Products',
    url: '/apps/ecommerce/products',
    parentKey: 'apps-ecommerce'
  }, {
    key: 'ecommerce-details',
    label: 'Products Details',
    url: '/apps/ecommerce/details',
    parentKey: 'apps-ecommerce'
  }, {
    key: 'ecommerce-orders',
    label: 'Orders',
    url: '/apps/ecommerce/orders',
    parentKey: 'apps-ecommerce'
  }, {
    key: 'ecommerce-order-details',
    label: 'Order Details',
    url: '/apps/ecommerce/order/details',
    parentKey: 'apps-ecommerce'
  }, {
    key: 'ecommerce-customers',
    label: 'Customers',
    url: '/apps/ecommerce/customers',
    parentKey: 'apps-ecommerce'
  }, {
    key: 'ecommerce-shopping-cart',
    label: 'Shopping Cart',
    url: '/apps/ecommerce/shopping-cart',
    parentKey: 'apps-ecommerce'
  }, {
    key: 'ecommerce-checkout',
    label: 'Checkout',
    url: '/apps/ecommerce/checkout',
    parentKey: 'apps-ecommerce'
  }, {
    key: 'ecommerce-sellers',
    label: 'Sellers',
    url: '/apps/ecommerce/sellers',
    parentKey: 'apps-ecommerce'
  }]
}, {
  key: 'apps-email',
  label: 'Email',
  isTitle: false,
  icon: 'uil-envelope',
  children: [{
    key: 'email-inbox',
    label: 'Inbox',
    url: '/apps/email/inbox',
    parentKey: 'apps-email'
  }, {
    key: 'email-read-email',
    label: 'Read Email',
    url: '/apps/email/details',
    parentKey: 'apps-email'
  }]
}, {
  key: 'apps-projects',
  label: 'Projects',
  isTitle: false,
  icon: 'uil-briefcase',
  children: [{
    key: 'project-list',
    label: 'List',
    url: '/apps/projects/list',
    parentKey: 'apps-projects'
  }, {
    key: 'project-details',
    label: 'Details',
    url: '/apps/projects/details',
    parentKey: 'apps-projects'
  }, {
    key: 'project-gantt',
    label: 'Gantt',
    url: '/apps/projects/gantt',
    badge: {
      variant: 'light',
      text: 'New'
    },
    parentKey: 'apps-projects'
  }, {
    key: 'project-create-project',
    label: 'Create Project',
    url: '/apps/projects/new',
    parentKey: 'apps-projects'
  }]
}, {
  key: 'apps-social',
  label: 'Social Feed',
  isTitle: false,
  icon: 'uil-rss',
  url: '/apps/social'
}, {
  key: 'apps-tasks',
  label: 'Tasks',
  isTitle: false,
  icon: 'uil-clipboard-alt',
  children: [{
    key: 'task-list',
    label: 'List',
    url: '/apps/tasks/list',
    parentKey: 'apps-tasks'
  }, {
    key: 'task-details',
    label: 'Details',
    url: '/apps/tasks/details',
    parentKey: 'apps-tasks'
  }, {
    key: 'task-kanban',
    label: 'Kanban Board',
    url: '/apps/tasks/kanban',
    parentKey: 'apps-tasks'
  }]
}, {
  key: 'apps-file-manager',
  label: 'File Manager',
  isTitle: false,
  icon: 'uil-folder-plus',
  url: '/apps/file'
}, {
  key: 'custom',
  label: 'Custom',
  isTitle: true
}, {
  key: 'pages',
  label: 'Pages',
  isTitle: false,
  icon: 'uil-copy-alt',
  children: [{
    key: 'page-profile',
    label: 'Profile',
    url: '/pages/profile',
    parentKey: 'pages'
  }, {
    key: 'page-profile2',
    label: 'Profile 2',
    url: '/pages/profile2',
    parentKey: 'pages'
  }, {
    key: 'page-invoice',
    label: 'Invoice',
    url: '/pages/invoice',
    parentKey: 'pages'
  }, {
    key: 'page-faq',
    label: 'FAQ',
    url: '/pages/faq',
    parentKey: 'pages'
  }, {
    key: 'page-pricing',
    label: 'Pricing',
    url: '/pages/pricing',
    parentKey: 'pages'
  }, {
    key: 'page-maintenance',
    label: 'Maintenance',
    url: '/maintenance',
    target: '_blank',
    parentKey: 'pages'
  }, {
    key: 'page-error-404',
    label: 'Error - 404',
    url: '/error-404',
    parentKey: 'pages'
  }, {
    key: 'page-error-404-alt',
    label: 'Error - 404-alt',
    url: '/pages/error-404-alt',
    parentKey: 'pages'
  }, {
    key: 'page-error-500',
    label: 'Error - 500',
    url: '/error-500',
    parentKey: 'pages'
  }, {
    key: 'page-starter',
    label: 'Starter Page',
    url: '/pages/starter',
    parentKey: 'pages'
  }, {
    key: 'page-preloader',
    label: 'With Preloader',
    url: '/pages/preloader',
    parentKey: 'pages'
  }, {
    key: 'page-timeline',
    label: 'Timeline',
    url: '/pages/timeline',
    parentKey: 'pages'
  }]
}, {
  key: 'landing',
  label: 'Landing',
  isTitle: false,
  icon: 'uil-globe',
  url: '/landing',
  target: '_blank',
  badge: {
    variant: 'secondary',
    text: 'New'
  }
}, {
  key: 'components',
  label: 'Components',
  isTitle: true
}, {
  key: 'base-ui',
  label: 'Base UI',
  isTitle: false,
  icon: 'uil-box',
  children: [{
    key: 'base-ui-accordions',
    label: 'Accordions',
    url: '/ui/base-ui/accordions',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-alerts',
    label: 'Alerts',
    url: '/ui/base-ui/alerts',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-avatars',
    label: 'Avatars',
    url: '/ui/base-ui/avatars',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-badges',
    label: 'Badges',
    url: '/ui/base-ui/badges',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-breadcrumb',
    label: 'Breadcrumb',
    url: '/ui/base-ui/breadcrumb',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-buttons',
    label: 'Buttons',
    url: '/ui/base-ui/buttons',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-cards',
    label: 'Cards',
    url: '/ui/base-ui/cards',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-carousel',
    label: 'Carousel',
    url: '/ui/base-ui/carousel',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-dropdown',
    label: 'Dropdowns',
    url: '/ui/base-ui/dropdowns',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-embedvideo',
    label: 'Embed Video',
    url: '/ui/base-ui/embedvideo',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-grid',
    label: 'Grid',
    url: '/ui/base-ui/grid',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-listgroups',
    label: 'List Groups',
    url: '/ui/base-ui/listgroups',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-modals',
    label: 'Modals',
    url: '/ui/base-ui/modals',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-notifications',
    label: 'Notifications',
    url: '/ui/base-ui/notifications',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-offcanvas',
    label: 'Offcanvas',
    url: '/ui/base-ui/offcanvas',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-paginations',
    label: 'Paginations',
    url: '/ui/base-ui/paginations',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-popovers',
    label: 'Popovers',
    url: '/ui/base-ui/popovers',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-progress',
    label: 'Progress',
    url: '/ui/base-ui/progress',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-ribbons',
    label: 'Ribbons',
    url: '/ui/base-ui/ribbons',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-spinners',
    label: 'Spinners',
    url: '/ui/base-ui/spinners',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-tabs',
    label: 'Tabs',
    url: '/ui/base-ui/tabs',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-tooltips',
    label: 'Tooltips',
    url: '/ui/base-ui/tooltips',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-typography',
    label: 'Typography',
    url: '/ui/base-ui/typography',
    parentKey: 'base-ui'
  }]
}, {
  key: 'extended-ui',
  label: 'Extended UI',
  isTitle: false,
  icon: 'uil-package',
  children: [{
    key: 'extended-ui-dragdrop',
    label: 'Drag and Drop',
    url: '/ui/extended/dragdrop',
    parentKey: 'extended-ui'
  }, {
    key: 'extended-ui-rangesliders',
    label: 'Range Sliders',
    url: '/ui/extended/rangesliders',
    parentKey: 'extended-ui'
  }, {
    key: 'extended-ui-ratings',
    label: 'Ratings',
    url: '/ui/extended/ratings',
    parentKey: 'extended-ui'
  }]
}, {
  key: 'widgets',
  label: 'Widgets',
  isTitle: false,
  icon: 'uil-layer-group',
  url: '/ui/widgets'
}, {
  key: 'icons',
  label: 'Icons',
  isTitle: false,
  icon: 'uil-streering',
  children: [{
    key: 'icon-dripicons',
    label: 'Dripicons',
    url: '/ui/icons/dripicons',
    parentKey: 'icons'
  }, {
    key: 'icon-mdiicons',
    label: 'Material Design',
    url: '/ui/icons/mdi',
    parentKey: 'icons'
  }, {
    key: 'icon-unicons',
    label: 'Unicons',
    url: '/ui/icons/unicons',
    parentKey: 'icons'
  }]
}, {
  key: 'forms',
  label: 'Forms',
  isTitle: false,
  icon: 'uil-document-layout-center',
  children: [{
    key: 'form-basic',
    label: 'Basic Elements',
    url: '/ui/forms/basic',
    parentKey: 'forms'
  }, {
    key: 'form-advanced',
    label: 'Form Advanced',
    url: '/ui/forms/advanced',
    parentKey: 'forms'
  }, {
    key: 'form-validation',
    label: 'Validation',
    url: '/ui/forms/validation',
    parentKey: 'forms'
  }, {
    key: 'form-wizard',
    label: 'Wizard',
    url: '/ui/forms/wizard',
    parentKey: 'forms'
  }, {
    key: 'form-upload',
    label: 'File Upload',
    url: '/ui/forms/upload',
    parentKey: 'forms'
  }, {
    key: 'form-editors',
    label: 'Editors',
    url: '/ui/forms/editors',
    parentKey: 'forms'
  }]
}, {
  key: 'charts',
  label: 'Charts',
  isTitle: false,
  icon: 'uil-chart',
  children: [{
    key: 'chart-apex',
    label: 'Apex Charts',
    url: '/ui/charts/apex',
    parentKey: 'charts'
  }, {
    key: 'chart-brite',
    label: 'Brite Charts',
    url: '/ui/charts/brite',
    parentKey: 'charts'
  }, {
    key: 'chart-chartjs',
    label: 'Chartjs',
    url: '/ui/charts/chartjs',
    parentKey: 'charts'
  }]
}, {
  key: 'tables',
  label: 'Tables',
  isTitle: false,
  icon: 'uil-table',
  children: [{
    key: 'table-basic',
    label: 'Basic Tables',
    url: '/ui/tables/basic',
    parentKey: 'tables'
  }, {
    key: 'table-advanced',
    label: 'Advanced Tables',
    url: '/ui/tables/advanced',
    parentKey: 'tables'
  }]
}, {
  key: 'maps',
  label: 'Maps',
  isTitle: false,
  icon: 'uil-location-point',
  children: [{
    key: 'maps-googlemaps',
    label: 'Google Maps',
    url: '/ui/maps/googlemaps',
    parentKey: 'maps'
  }, {
    key: 'maps-vectormaps',
    label: 'Vector Maps',
    url: '/ui/maps/vectormaps',
    parentKey: 'maps'
  }]
}, {
  key: 'menu-levels',
  label: 'Menu Levels',
  isTitle: false,
  icon: 'uil-folder-plus',
  children: [{
    key: 'menu-levels-1-1',
    label: 'Level 1.1',
    url: '/',
    parentKey: 'menu-levels',
    children: [{
      key: 'menu-levels-2-1',
      label: 'Level 2.1',
      url: '/',
      parentKey: 'menu-levels-1-1',
      children: [{
        key: 'menu-levels-3-1',
        label: 'Level 3.1',
        url: '/',
        parentKey: 'menu-levels-2-1'
      }, {
        key: 'menu-levels-3-2',
        label: 'Level 3.2',
        url: '/',
        parentKey: 'menu-levels-2-1'
      }]
    }, {
      key: 'menu-levels-2-2',
      label: 'Level 2.2',
      url: '/',
      parentKey: 'menu-levels-1-1'
    }]
  }, {
    key: 'menu-levels-1-2',
    label: 'Level 1.2',
    url: '/',
    parentKey: 'menu-levels'
  }]
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MENU_ITEMS);

/***/ }),

/***/ "./resources/js/components/helpers/menu.js":
/*!*************************************************!*\
  !*** ./resources/js/components/helpers/menu.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findAllParent": () => (/* binding */ findAllParent),
/* harmony export */   "findMenuItem": () => (/* binding */ findMenuItem),
/* harmony export */   "getMenuItems": () => (/* binding */ getMenuItems)
/* harmony export */ });
/* harmony import */ var _constants_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/menu */ "./resources/js/components/constants/menu.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var getMenuItems = function getMenuItems() {
  // NOTE - You can fetch from server and return here as well
  return _constants_menu__WEBPACK_IMPORTED_MODULE_0__["default"];
};

var findAllParent = function findAllParent(menuItems, menuItem) {
  var parents = [];
  var parent = findMenuItem(menuItems, menuItem['parentKey']);

  if (parent) {
    parents.push(parent['key']);
    if (parent['parentKey']) parents = [].concat(_toConsumableArray(parents), _toConsumableArray(findAllParent(menuItems, parent)));
  }

  return parents;
};

var findMenuItem = function findMenuItem(menuItems, menuItemKey) {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }

      var found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }

  return null;
};



/***/ }),

/***/ "./resources/js/components/layout/Menu.js":
/*!************************************************!*\
  !*** ./resources/js/components/layout/Menu.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/menu */ "./resources/js/components/helpers/menu.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// @flow





var MenuItemWithChildren = function MenuItemWithChildren(_ref) {
  var item = _ref.item,
      tag = _ref.tag,
      linkClassName = _ref.linkClassName,
      className = _ref.className,
      subMenuClassNames = _ref.subMenuClassNames,
      activeMenuItems = _ref.activeMenuItems,
      toggleMenu = _ref.toggleMenu;
  var Tag = tag;

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(activeMenuItems.includes(item.key)),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var showMenu = window.screen.width <= 768 && open;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item]);

  var toggleMenuItem = function toggleMenuItem(e) {
    e.preventDefault();
    var status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Tag, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dropdown', className, activeMenuItems.includes(item.key) ? 'active' : '')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
    to: "/#",
    onClick: toggleMenuItem,
    "data-menu-key": item.key,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dropdown-toggle', 'arrow-none', linkClassName),
    id: item.key,
    role: "button",
    "data-bs-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": open
  }, item.icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: item.icon
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, " ", item.label, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "arrow-down"
  })), item.children ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(subMenuClassNames, {
      show: showMenu
    }),
    "aria-labelledby": item.key
  }, item.children.map(function (child, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: i
    }, child.children ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItemWithChildren, {
      item: child,
      tag: "div",
      linkClassName: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dropdown-item', activeMenuItems.includes(child.key) ? 'active' : ''),
      activeMenuItems: activeMenuItems,
      className: "",
      subMenuClassNames: "dropdown-menu",
      toggleMenu: toggleMenu
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItemLink, {
      item: child,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dropdown-item', {
        active: activeMenuItems.includes(child.key)
      })
    })));
  })) : null);
};

var MenuItem = function MenuItem(_ref2) {
  var item = _ref2.item,
      className = _ref2.className,
      linkClassName = _ref2.linkClassName;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nav-item', className)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItemLink, {
    item: item,
    className: linkClassName
  }));
};

var MenuItemLink = function MenuItemLink(_ref3) {
  var item = _ref3.item,
      className = _ref3.className;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
    to: item.url,
    target: item.target,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className),
    "data-menu-key": item.key
  }, item.icon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: item.icon
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, " ", item.label, " "));
};
/**
 * Renders the application menu
 */
// type AppMenuProps = {
//     menuItems: Array<any>,
// };


var AppMenu = function AppMenu(_ref4) {
  var menuItems = _ref4.menuItems;
  var menuRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useLocation)();

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      topnavMenuItems = _useState4[0],
      setTopnavMenuItems = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      activeMenuItems = _useState6[0],
      setActiveMenuItems = _useState6[1];
  /*
   * toggle the menus
   */


  var toggleMenu = function toggleMenu(menuItem, show) {
    if (show) setActiveMenuItems([menuItem['key']].concat(_toConsumableArray((0,_helpers_menu__WEBPACK_IMPORTED_MODULE_2__.findAllParent)(topnavMenuItems, menuItem))));
  };
  /**
   * activate the menuitems
   */


  var activeMenu = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    var div = document.getElementById('main-side-menu');
    var matchingMenuItem = null;

    if (div) {
      var items = div.getElementsByTagName('a');

      for (var i = 0; i < items.length; ++i) {
        if (location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        var mid = matchingMenuItem.getAttribute('data-menu-key');
        var activeMt = (0,_helpers_menu__WEBPACK_IMPORTED_MODULE_2__.findMenuItem)(topnavMenuItems, mid);

        if (activeMt) {
          setActiveMenuItems([activeMt['key']].concat(_toConsumableArray((0,_helpers_menu__WEBPACK_IMPORTED_MODULE_2__.findAllParent)(topnavMenuItems, activeMt))));
        }
      }
    }
  }, [location.pathname, topnavMenuItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    //controlling how many menu items can be displayed in it
    var modifiedMenuItems = menuItems ? menuItems.filter(function (item) {
      return !item.isTitle ? item : null;
    }) : [];
    var defaultDisplayedItems = window.screen.width > 1366 ? 7 : 5;

    if (modifiedMenuItems.length > defaultDisplayedItems) {
      var displayedItems = modifiedMenuItems.slice(0, defaultDisplayedItems);
      var moreChildren = modifiedMenuItems.slice(defaultDisplayedItems, menuItems.length).map(function (i) {
        return _objectSpread(_objectSpread({}, i), {}, {
          parentKey: 'more'
        });
      });
      var otherItems = {
        id: modifiedMenuItems.length + 1,
        path: '/',
        label: 'More',
        icon: 'uil-ellipsis-h',
        key: 'more',
        children: moreChildren
      };
      modifiedMenuItems = [].concat(_toConsumableArray(displayedItems), [otherItems]);
      setTopnavMenuItems(modifiedMenuItems);
    } else {
      setTopnavMenuItems(modifiedMenuItems);
    }
  }, [menuItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (topnavMenuItems && topnavMenuItems.length > 0) activeMenu();
  }, [activeMenu, topnavMenuItems]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
    className: "navbar-nav",
    ref: menuRef,
    id: "main-side-menu"
  }, (topnavMenuItems || []).map(function (item, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: idx
    }, item.children ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItemWithChildren, {
      item: item,
      tag: "li",
      className: "nav-item",
      subMenuClassNames: "dropdown-menu",
      activeMenuItems: activeMenuItems,
      linkClassName: "nav-link",
      toggleMenu: toggleMenu
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItem, {
      item: item,
      linkClassName: "nav-link dropdown-toggle arrow-none",
      className: {
        active: activeMenuItems.includes(item.key)
      }
    }));
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppMenu);

/***/ }),

/***/ "./resources/js/components/layout/Navbar.js":
/*!**************************************************!*\
  !*** ./resources/js/components/layout/Navbar.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu */ "./resources/js/components/layout/Menu.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Collapse.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/menu */ "./resources/js/components/helpers/menu.js");
// @flow






var Navbar = function Navbar(props) {
  // change the inputTheme value to light for creative theme
  var inputTheme = 'light';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "topnav shadow-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('navbar', 'navbar-expand-lg', 'topnav-menu', 'navbar-' + inputTheme)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"], {
    "in": props.isMenuOpened,
    className: "navbar-collapse",
    id: "topnav-menu-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Menu__WEBPACK_IMPORTED_MODULE_1__["default"], {
    menuItems: (0,_helpers_menu__WEBPACK_IMPORTED_MODULE_3__.getMenuItems)()
  })))))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

/***/ })

}]);