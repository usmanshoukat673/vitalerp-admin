import * as actionTypes from '../actions/types';

const initialSupplierState = {
    addLaborCategoryDialog: {
        open: false,
        added: false,
    },
    editLaborCategoryDialog: {
        open: false,
        laborCategory: {},
        updated: false,
    },
    states: [],
    countries: [],
    naics_codes: [],
    ethnicities: [],
    compliant_reqs: [],
    security_levels: [],
}

const validvalues_reducer = (state = initialSupplierState, action) => {
    switch (action.type) {
        case actionTypes.SET_ADD_LABOR_CATEGORY_DIALOG:
            return {
                ...state,
                addLaborCategoryDialog: action.payload.addLaborCategoryDialog
            };
        case actionTypes.SET_EDIT_LABOR_CATEGORY_DIALOG:
            return {
                ...state,
                editLaborCategoryDialog: action.payload.editLaborCategoryDialog
            };

        case actionTypes.SET_STATES:
            return {
                ...state,
                states: action.payload.states
            };
        case actionTypes.SET_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries
            };

        case actionTypes.SET_NAICS_CODES:
            return {
                ...state,
                naics_codes: action.payload.naics_codes
            };

        case actionTypes.SET_ETHNICITIES:
            return {
                ...state,
                ethnicities: action.payload.ethnicities
            };

        case actionTypes.SET_COMPLIANT_REQS:
            return {
                ...state,
                compliant_reqs: action.payload.compliant_reqs
            };

        case actionTypes.SET_SECURITY_LEVELS:
            return {
                ...state,
                security_levels: action.payload.security_levels
            };
        default:
            return state;
    }
}
export default validvalues_reducer;
