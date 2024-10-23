import * as actionTypes from '../actions/types';

const initialOrgState = {
    field_types: [],
    field_type_to_add: {}
}

const subject_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SET_FIELD_TYPE_TO_ADD:
            return {
                ...state,
                field_type_to_add: action.payload.field_type_to_add
            };
        case actionTypes.SET_FIELD_TYPES:
            return {
                ...state,
                field_types: action.payload.field_types
            };
        default:
            return state;
    }
}
export default subject_reducer;
