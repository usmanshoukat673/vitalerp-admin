import * as actionTypes from '../actions/types';

let template = { id: null, name: null, created_at: null, updated_at: null, categories: [], sub_categories: [] };

const initialOrgState = {
    category: {},
    details_panel_type: 'category',
    lan_assets: [],
    parent_asset: {},
    sub_asset: {},
    create_record: {
        open: false,
        type: '',
        record_to_configure: {}
    },
    record: {},
    record_details: {
        relatedrecords: [],
        teams: [],
        users: [],
        locations: [],
    },
    assign_related_record: {
        open: false,
        module_id: null,
        type: null,
    },
    module_details: {
        not_configured: [],
        records: []
    },
    delete_related_record: {
        open: false,
        record: {},
        module_id: null,
        name: null
    },
    delete_record: {
        open: false,
        record: {},
    },
    // old items 
    template: template,
    templates: [],
    primary_item: {}
}

const lanscape_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_LAN_CATEGORY:
            return {
                ...state,
                category: action.payload.category
            };
        case actionTypes.SET_LAN_DETAILS_PANEL_TYPE:
            return {
                ...state,
                details_panel_type: action.payload.details_panel_type
            };
        case actionTypes.SET_LAN_ASSETS:
            return {
                ...state,
                lan_assets: action.payload.lan_assets
            };
        case actionTypes.SET_LAN_PARENT_ASSET:
            return {
                ...state,
                parent_asset: action.payload.parent_asset
            };
        case actionTypes.SET_LAN_CHILD_ASSET:
            return {
                ...state,
                sub_asset: action.payload.sub_asset
            };
        case actionTypes.SET_CREATE_RECORD:
            return {
                ...state,
                create_record: action.payload.create_record
            };
        case actionTypes.SET_RECORD:
            return {
                ...state,
                record: action.payload.record
            };
        case actionTypes.SET_RECORD_DETAILS:
            return {
                ...state,
                record_details: action.payload.record_details
            };
        case actionTypes.SET_ASSIGN_RELATED_RECORD:
            return {
                ...state,
                assign_related_record: action.payload.assign_related_record
            };
        case actionTypes.SET_MODULE_DETAILS:
            return {
                ...state,
                module_details: action.payload.module_details
            };
        case actionTypes.SET_DELETE_RELATED_RECORD:
            return {
                ...state,
                delete_related_record: action.payload.delete_related_record
            };
        case actionTypes.SET_DELETE_RECORD:
            return {
                ...state,
                delete_record: action.payload.delete_record
            };
        // old items from old lanspace  SET_LAN_ASSETS
        case actionTypes.SELECT_TEMPLATES:
            return {
                ...state,
                templates: action.payload.templates
            };
        case actionTypes.SELECT_TEMPLATE:
            return {
                ...state,
                template: action.payload.template
            };
        case actionTypes.SELECT_PRIMARY_ITEM:
            return {
                ...state,
                primary_item: action.payload.primary_item
            };
        default:
            return state;
    }
}
export default lanscape_reducer;
