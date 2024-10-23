"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_lanscape_LanscapeDetailsPanel_LanscapeTree_ParentAssetNode_jsx"],{

/***/ "./resources/js/components/lanscape/LanscapeDetailsPanel/LanscapeTree/ParentAssetNode.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/lanscape/LanscapeDetailsPanel/LanscapeTree/ParentAssetNode.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material/FolderOpen */ "./node_modules/@mui/icons-material/FolderOpen.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom_cjs_react_router_dom_min__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom/cjs/react-router-dom.min */ "./node_modules/react-router-dom/cjs/react-router-dom.min.js");






var SubAssetNode = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_components_lanscape_LanscapeDetailsPanel_LanscapeTree_SubAssetNode_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./SubAssetNode */ "./resources/js/components/lanscape/LanscapeDetailsPanel/LanscapeTree/SubAssetNode.jsx"));
});
var _lazy = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../../../../utils/stringUtils */ "./resources/js/utils/stringUtils.jsx"));
  }),
  truncateTextByChars = _lazy.truncateTextByChars;
var CustomTreeItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../../../compliance/STDTree/CustomTreeItem */ "./resources/js/components/compliance/STDTree/CustomTreeItem.jsx"));
});
var TreeTooltip = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../../../compliance/STDTree/TreeTooltip */ "./resources/js/components/compliance/STDTree/TreeTooltip.jsx"));
});
var _lazy2 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../../../../actions */ "./resources/js/actions/index.js"));
  }),
  selectLanDetailsPanelType = _lazy2.selectLanDetailsPanelType,
  selectLanParentAsset = _lazy2.selectLanParentAsset;
var ParentAssetNode = function ParentAssetNode(_ref) {
  var parent_asset = _ref.parent_asset,
    history = _ref.history;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
      return {
        category: state.lanscape.category,
        tree_mode: state.leftnav.tree_mode
      };
    }),
    category = _useSelector.category,
    tree_mode = _useSelector.tree_mode;
  var handleDomainClick = function handleDomainClick() {
    dispatch(selectLanDetailsPanelType('parent_asset'));
    dispatch(selectLanParentAsset(parent_asset));
    history.push("/".concat(tree_mode.route, "/").concat(category.slug, "/").concat(parent_asset.id));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CustomTreeItem, {
    id: "parent_asset_id_".concat(parent_asset.id),
    nodeId: "parent_asset_id_".concat(parent_asset.id),
    label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
      sx: {
        display: 'flex',
        alignItems: 'center',
        p: 0.5,
        pr: 0
      },
      onClick: handleDomainClick
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__["default"], {
      component: _mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_3__["default"],
      color: "inherit",
      sx: {
        mr: 1
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_4__["default"], {
      "aria-label": "".concat(parent_asset.name),
      variant: "body2",
      sx: {
        fontWeight: 'inherit',
        flexGrow: 1
      }
    }, truncateTextByChars(parent_asset.name, 30)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(TreeTooltip, {
      id: "tooltip_id_".concat(parent_asset.id),
      tooltipText: ""
    }))
  }, _.map(parent_asset.childs, function (sub_asset) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(SubAssetNode, {
      key: "sub_asset_".concat(sub_asset.id),
      parent_asset: parent_asset,
      sub_asset: sub_asset
    });
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom_cjs_react_router_dom_min__WEBPACK_IMPORTED_MODULE_5__.withRouter)(ParentAssetNode));

/***/ })

}]);