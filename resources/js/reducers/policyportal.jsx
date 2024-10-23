import * as actionTypes from '../actions/types';

const initialOrgState = {
    shared_standards: [],
    shared_company: {},
    active_standard: {},
    active_domains: [],
    active_parent_domain: {}
}

const policyportal_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SET_SHARED_STANDARD:
            return {
                ...state,
                shared_standards: action.payload.shared_standards
            };
        case actionTypes.SET_PP_ACTIVE_STANDARD:
            return {
                ...state,
                active_standard: action.payload.active_standard
            };
        case actionTypes.SET_PP_ACTIVE_DOMAINS:
            return {
                ...state,
                active_domains: action.payload.active_domains
            };
        case actionTypes.SET_PP_ACTIVE_PARENT_DOMAINS:
            return {
                ...state,
                active_parent_domain: action.payload.active_parent_domain
            };
        case actionTypes.SET_POLICY_PORTAL_COMPANY:
            return {
                ...state,
                shared_company: action.payload.shared_company
            };
        default:
            return state;
    }
}
export default policyportal_reducer;
