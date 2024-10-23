import * as actionTypes from '../actions/types';

const initialOrgState = {
    company: {},
    company_users: [],
    teams: [],
    companies: [],
    profile_company: {},
    device_newly_assigned: false,
    new_location: false,
    policy_portal: {},
    suppliers_count: 0,
    company_suppliers: [],
}

const orgs_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORGS:
            return {
                ...state,
                companies: action.payload.companies
            };
        case actionTypes.SELECT_ORG:
            return {
                ...state,
                company: action.payload.company
            };
        case actionTypes.SET_PROORG:
            return {
                ...state,
                profile_company: action.payload.profile_company
            };
        case actionTypes.SET_DEVICE_ASSIGNED_STATUS:
            return {
                ...state,
                device_newly_assigned: action.payload.device_newly_assigned
            };
        case actionTypes.SET_LOCATION_STATUS:
            return {
                ...state,
                new_location: action.payload.new_location
            };
        case actionTypes.SET_COMPANY_USERS:
            return {
                ...state,
                company_users: action.payload.company_users
            };
        case actionTypes.SET_COMPANY_TEAMS:
            return {
                ...state,
                teams: action.payload.teams
            };
        // setCompanyTeams
        case actionTypes.SET_COMPANY_PORTAL:
            return {
                ...state,
                policy_portal: action.payload.policy_portal
            };
        case actionTypes.SET_SUPPLIERS_COUNT:
            return {
                ...state,
                suppliers_count: action.payload.suppliers_count
            };

        case actionTypes.SET_COMPANY_SUPPLIERS:
            return {
                ...state,
                company_suppliers: action.payload.company_suppliers
            };
        default:
            return state;
    }
}
export default orgs_reducer;
