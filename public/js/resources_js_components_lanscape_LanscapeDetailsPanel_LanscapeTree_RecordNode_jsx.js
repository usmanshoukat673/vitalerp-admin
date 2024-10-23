"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_lanscape_LanscapeDetailsPanel_LanscapeTree_RecordNode_jsx"],{

/***/ "./resources/js/components/lanscape/LanscapeDetailsPanel/LanscapeTree/RecordNode.jsx":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/lanscape/LanscapeDetailsPanel/LanscapeTree/RecordNode.jsx ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Box */ "./node_modules/@mui/material/Box/Box.js");
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Typography */ "./node_modules/@mui/material/Typography/Typography.js");
/* harmony import */ var _mui_x_tree_view_TreeItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/x-tree-view/TreeItem */ "./node_modules/@mui/x-tree-view/TreeItem/TreeItem.js");
/* harmony import */ var _mui_icons_material_Settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/icons-material/Settings */ "./node_modules/@mui/icons-material/Settings.js");
/* harmony import */ var _utils_stringUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/stringUtils */ "./resources/js/utils/stringUtils.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../actions */ "./resources/js/actions/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _compliance_STDTree_TreeTooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../compliance/STDTree/TreeTooltip */ "./resources/js/components/compliance/STDTree/TreeTooltip.jsx");










var RecordNode = function RecordNode(_ref) {
  var history = _ref.history,
    parent_asset = _ref.parent_asset,
    sub_asset = _ref.sub_asset,
    record = _ref.record;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (state) {
      return {
        category: state.lanscape.category,
        tree_mode: state.leftnav.tree_mode
      };
    }),
    category = _useSelector.category,
    tree_mode = _useSelector.tree_mode;
  var handleControlClick = function handleControlClick() {
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_3__.selectLanDetailsPanelType)('record'));
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_3__.selectLanParentAsset)(parent_asset));
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_3__.selectLanChildAsset)(sub_asset));
    dispatch((0,_actions__WEBPACK_IMPORTED_MODULE_3__.saveRecord)(record));
    history.push("/".concat(tree_mode.route, "/").concat(category.slug, "/").concat(parent_asset.id, "/").concat(sub_asset.id, "/").concat(record.id));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_x_tree_view_TreeItem__WEBPACK_IMPORTED_MODULE_5__.TreeItem, {
    onClick: handleControlClick,
    id: "record_id_".concat(record.id),
    nodeId: "".concat(record.id),
    label: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
      sx: {
        display: 'flex',
        alignItems: 'center',
        p: 0.5,
        pr: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__["default"], {
      component: _mui_icons_material_Settings__WEBPACK_IMPORTED_MODULE_7__["default"],
      color: "inherit",
      sx: {
        mr: 1
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__["default"], {
      "aria-label": "".concat(record.name),
      variant: "body2",
      sx: {
        fontWeight: 'inherit',
        flexGrow: 1
      }
    }, (0,_utils_stringUtils__WEBPACK_IMPORTED_MODULE_1__.truncateTextByChars)("".concat(record.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_compliance_STDTree_TreeTooltip__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: "tooltip_id_".concat(record.id),
      tooltipText: "record: ".concat(record.name)
    }))
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.withRouter)(RecordNode));

/***/ })

}]);