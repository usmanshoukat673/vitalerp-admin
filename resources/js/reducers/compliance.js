import * as actionTypes from '../actions/types';

const initialOrgState = {
    maturity_level: {},
    maturity_levels: [],
    standards: [],
    asset_types: [],
    control_models: [],
    controls: [],
    last_active_section_id: 0,
    last_active_section_name: '',
    parent_domain: {},
    sub_domain: {},
    control: {},
    details_panel_type: 'standard', // domain, sub_domain, control 
    standard_info: {
        control_count: 0,
        documents_count: 0,
        applicable_ctrls: 0,
        partially_imple_ctrls: 0,
        implemented_ctrls: 0,
        excluded_ctrls: 0
    },
    domain_info: {
        control_count: 0,
        documents_count: 0,
        applicable_ctrls: 0,
        partially_imple_ctrls: 0,
        implemented_ctrls: 0,
        excluded_ctrls: 0
    },
    domain_documents: [],
    open_document: {
        open: false,
        document_type: 'document', // file
        document: {},
        from: 'domain' // domain or control 
    },
    domain_controls: [],
    domain_activities: [],
    control_mappings: [],
    control_info: {
        documents_count: 0,
        control: {}
    },
    control_documents: [],
    control_activities: [],
    control_questions: [],
    create_document: {
        open: false,
        document: { id: 0, name: '--New Docoument--', content: '', type: 'document' },
        from: 'control' // domain or control 
    },
    rename_document: {
        open: false,
        document: { id: 0, name: '--New Docoument--' },
        from: 'control' // domain or control 
    },
    delete_document: {
        open: false,
        document: { id: 0, name: '--New Docoument--' },
        from: 'control' // domain or control 
    },
    unlink_document: {
        open: false,
        company_document: { id: 0, comp_id: 0, document_id: 0, control_id: 0, section_id: 0, standard_id: 0, document: {}, control: {} },
        from: 'control' // domain or control 
    },
    upload_document: {
        open: false
    },
    link_documents: {
        open: false
    }
}

const compliance_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SET_MATURITY_LEVELS:
            return {
                ...state,
                maturity_levels: action.payload.maturity_levels
            };
        case actionTypes.UNSET_MATURITY_LEVELS:
            return {
                ...state,
                maturity_levels: []
            };
        case actionTypes.SET_MATURITY_LEVEL:
            return {
                ...state,
                maturity_level: action.payload.maturity_level
            };
        case actionTypes.SET_COMP_STANDARDS:
            return {
                ...state,
                standards: action.payload.standards
            };
        case actionTypes.UNSET_COMP_STANDARDS:
            return {
                ...state,
                standards: []
            };
        case actionTypes.SET_ASSET_TYPES:
            return {
                ...state,
                asset_types: action.payload.asset_types
            };
        case actionTypes.UNSET_ASSET_TYPES:
            return {
                ...state,
                asset_types: []
            };
        case actionTypes.SET_CONTROL_MODELS:
            return {
                ...state,
                control_models: action.payload.control_models
            };
        case actionTypes.UNSET_CONTROL_MODELS:
            return {
                ...state,
                control_models: []
            };
        case actionTypes.SET_SECTION_CONTROLS:
            return {
                ...state,
                controls: action.payload.controls
            };
        case actionTypes.UNSET_SECTION_CONTROLS:
            return {
                ...state,
                controls: []
            };
        case actionTypes.SET_LAST_ACTIVE_SECTION_ID:
            return {
                ...state,
                last_active_section_id: action.payload.last_active_section_id,
                last_active_section_name: action.payload.last_active_section_name
            };
        case actionTypes.SET_DETAILS_PANEL_TYPE:
            return {
                ...state,
                details_panel_type: action.payload.details_panel_type
            };
        case actionTypes.SET_PARENT_DOMAIN:
            return {
                ...state,
                parent_domain: action.payload.parent_domain
            };
        case actionTypes.SET_PARENT_SUB_DOMAIN:
            return {
                ...state,
                sub_domain: action.payload.sub_domain
            };
        case actionTypes.SET_STANDARD_INFO:
            return {
                ...state,
                standard_info: action.payload.standard_info
            };
        case actionTypes.SET_DOMAIN_INFO:
            return {
                ...state,
                domain_info: action.payload.domain_info
            };
        case actionTypes.SET_DOMAIN_DOCUMENTS:
            return {
                ...state,
                domain_documents: action.payload.domain_documents
            };
        case actionTypes.SET_CONTROL:
            return {
                ...state,
                control: action.payload.control
            };
        case actionTypes.OPEN_DOCUMENT:
            return {
                ...state,
                open_document: action.payload.open_document
            };
        case actionTypes.SET_DOMAIN_CONTROLS:
            return {
                ...state,
                domain_controls: action.payload.domain_controls
            };
        case actionTypes.SET_DOMAIN_ACTIVITIES:
            return {
                ...state,
                domain_activities: action.payload.domain_activities
            };
        case actionTypes.SET_CONTROL_INFO:
            return {
                ...state,
                control_info: action.payload.control_info
            };
        case actionTypes.SET_CONTROL_DOCUMENTS:
            return {
                ...state,
                control_documents: action.payload.control_documents
            };
        case actionTypes.SET_CONTROL_ACTIVITIES:
            return {
                ...state,
                control_activities: action.payload.control_activities
            };
        case actionTypes.SET_CREATE_DOCUMENT:
            return {
                ...state,
                create_document: action.payload.create_document
            };
        case actionTypes.SET_RENAME_DOCUMENT:
            return {
                ...state,
                rename_document: action.payload.rename_document
            };
        case actionTypes.SET_DELETE_DOCUMENT:
            return {
                ...state,
                delete_document: action.payload.delete_document
            };
        case actionTypes.SET_UNLINK_DOCUMENT:
            return {
                ...state,
                unlink_document: action.payload.unlink_document
            };
        case actionTypes.SET_UPLOAD_DOCUMENT:
            return {
                ...state,
                upload_document: action.payload.upload_document
            };
        case actionTypes.SET_LINK_DOCUMENT:
            return {
                ...state,
                link_documents: action.payload.link_documents
            };
        case actionTypes.SET_CONTROL_MAPPINGS:
            return {
                ...state,
                control_mappings: action.payload.control_mappings
            };
        case actionTypes.SET_CONTROL_QUESTIONS:
            return {
                ...state,
                control_questions: action.payload.control_questions
            };
        default:
            return state;
    }
}
export default compliance_reducer;
