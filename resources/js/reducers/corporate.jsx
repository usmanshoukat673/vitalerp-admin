import * as actionTypes from '../actions/types';

const initialCorporateState = {
    active_supplier: {},
    cp_active_tab: 'corporate-information',
    corporate_profile_status: {
        corporate_information: false,
        supplier_capability: false,
        supplier_socioenomic: false,
        security_certifications: false,
        past_performance: false
    }
}

const corporate_reducer = (state = initialCorporateState, action) => {
    switch (action.type) {

        case actionTypes.SET_ACTIVE_SUPPLIER:
            return {
                ...state,
                active_supplier: action.payload.active_supplier
            };

        case actionTypes.SET_CP_ACTIVE_TAB:
            return {
                ...state,
                cp_active_tab: action.payload.cp_active_tab
            };

        case actionTypes.SET_CORPORATE_PROFILE_STATUS:
            return {
                ...state,
                corporate_profile_status: action.payload.corporate_profile_status
            };

        default:
            return state;
    }
}
export default corporate_reducer;
