import * as actionTypes from '../actions/types';

const initialOrgState = {
    sections: [],
}

const sections_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SET_CATALOG_SECTIONS:
            return {
                sections: action.payload.sections
            };
        case actionTypes.UNSET_CATALOG_SECTIONS:
            return {
                sections: []
            };
        default:
            return state;
    }
}
export default sections_reducer;
