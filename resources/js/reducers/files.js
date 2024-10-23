import * as actionTypes from '../actions/types';

const initialOrgState = {
    documents: [],
};

const files_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SET_FILES_DOCUMENTS:
            return {
                documents: action.payload.documents
            };
        case actionTypes.UNSET_FILES_DOCUMENTS:
            return {
                documents: []
            };
        default:
            return state;
    }
};

export default files_reducer;
