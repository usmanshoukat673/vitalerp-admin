import * as actionTypes from '../actions/types';

const initialUserState = {
    category: {},
    std_families: [],
    std_versions: [],
    std_focuses: [],
    std_statutes: [],
    std_types: [
        { id: "Guideline", name: "Guideline", checked: false },
        { id: "Regulation", name: "Regulation", checked: false }
    ],
    standard: {},
    publishable_key: null,
}

const marketplace_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_STANDARD_FAMILIES:
            return {
                ...state,
                std_families: action.payload.std_families,
            };
        case actionTypes.SET_STANDARD_VERSIONS:
            return {
                ...state,
                std_versions: action.payload.std_versions,
            };
        case actionTypes.SET_STANDARD_FOCUSES:
            return {
                ...state,
                std_focuses: action.payload.std_focuses,
            };
        case actionTypes.SET_STANDARD_STATUTES:
            return {
                ...state,
                std_statutes: action.payload.std_statutes,
            };
        case actionTypes.SET_STANDARD_TYPES:
            return {
                ...state,
                std_types: action.payload.std_types,
            };
        case actionTypes.SELECT_MK_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
            };
        case actionTypes.CLEAR_MK_CATEGORY:
            return {
                ...state,
                category: {},
            };
        case actionTypes.SET_MK_STANDARD:
            return {
                ...state,
                standard: action.payload.standard,
            };
        case actionTypes.SET_STRIPE_PUBLISHABLE_KEY:
            return {
                ...state,
                publishable_key: action.payload.publishable_key,
            };
        default:
            return state;
    }
}
export default marketplace_reducer;
