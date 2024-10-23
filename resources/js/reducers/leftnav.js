import * as actionTypes from '../actions/types';
import * as layoutConstants from '../constants/layout';

const initialNavState = {
    open: true,
    open_sub: false,
    open_documents_menu: true,
    sub_menu_x_btn: true,
    control_functions: [],
    control_function: {},
    parent_sections: {},
    standard: {},
    section: {},
    psection: {},
    back_url: '',
    leftSideBarType: layoutConstants.LEFT_SIDEBAR_TYPE_FIXED,
    layoutType: layoutConstants.LAYOUT_VERTICAL,
    layoutColor: layoutConstants.LAYOUT_COLOR_LIGHT,
    layoutWidth: layoutConstants.LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: layoutConstants.LEFT_SIDEBAR_THEME_DARK,
    showRightSidebar: false,
    rightSideBarState: layoutConstants.RIGHT_SIDEBAR_STATE,
    centerPageAreaState: layoutConstants.CENTER_PAGE_AREA_STATE,
    tree_mode: {
        open: false,
        type: 'cs', // cs, lanscape
        route: 'assets',
    },
    create_new_org: {
        open: false,
        in_org: false
    }
}

const leftnav_reducer = (state = initialNavState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_LEFT_NAV:
            return {
                ...state,
                open: true
            };
        case actionTypes.CLOSE_LEFT_NAV:
            return {
                ...state,
                open: false,
            };
        case actionTypes.OPEN_SUB_LEFT_NAV:
            return {
                ...state,
                open_sub: true
            };
        case actionTypes.TOGGLE_SUB_LEFT_NAV:
            return {
                ...state,
                open_sub: action.payload.open_sub
            };
        case actionTypes.CLOSE_SUB_LEFT_NAV:
            return {
                ...state,
                open_sub: false,
            };
        case actionTypes.TOGGLE_RIGHT_SIDE_DOCUMENTS:
            return {
                ...state,
                open_documents_menu: action.payload.open_documents_menu
            };
        case actionTypes.SET_CTR_FUNCTIONS:
            return {
                ...state,
                control_functions: action.payload.control_functions
            };
        case actionTypes.UNSET_CTR_FUNCTIONS:
            return {
                ...state,
                control_functions: []
            };
        case actionTypes.SET_PARENT_SECTIONS:
            return {
                ...state,
                parent_sections: action.payload.parent_sections
            };
        case actionTypes.UNSET_PARENT_SECTIONS:
            return {
                ...state,
                parent_sections: []
            };
        case actionTypes.SELECT_CONTROL_FUNCTION:
            return {
                ...state,
                control_function: action.payload.control_function
            };
        case actionTypes.SELECT_STANDARD:
            return {
                ...state,
                standard: action.payload.standard
            };
        case actionTypes.TOGGLE_SUB_MENU_X_BUTTON:
            return {
                ...state,
                sub_menu_x_btn: action.payload.sub_menu_x_btn
            };
        case actionTypes.SELECT_CATALOG_SECTION:
            return {
                ...state,
                section: action.payload.section
            };
        case actionTypes.SELECT_CATALOG_PARENT_SECTION:
            return {
                ...state,
                psection: action.payload.psection
            };
        case actionTypes.BACK_PAGE_URL:
            return {
                ...state,
                back_url: action.payload.back_url
            };
        case actionTypes.CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload.sidebarType
            };
        case actionTypes.SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: true,
                rightSideBarState: 'now_visible'
            };
        case actionTypes.HIDE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: false,
                rightSideBarState: layoutConstants.RIGHT_SIDEBAR_STATE
            };
        case actionTypes.CHANGE_CENTER_PAGE_AREA:
            return {
                ...state,
                centerPageAreaState: action.payload.centerPageAreaState
            };
        case actionTypes.TOGGLE_CS_AREA:
            return {
                ...state,
                tree_mode: action.payload.tree_mode
            };
        case actionTypes.SET_CREATE_NEW_ORG:
            return {
                ...state,
                create_new_org: action.payload.create_new_org
            };
        default:
            return state;
    }
}
export default leftnav_reducer;
