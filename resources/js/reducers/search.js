import * as actionTypes from '../actions/types';

const initialOrgState = {
    query: '',
    results: [],
}

const search_reducer = (state = initialOrgState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                query: action.payload.query
            };
        case actionTypes.UNSET_SEARCH_QUERY:
            return {
                ...state,
                query: ''
            };
        case actionTypes.SET_SEARCH_RESULTS:
            return {
                ...state,
                results: action.payload.results
            };
        case actionTypes.UNSET_SEARCH_RESULTS:
            return {
                ...state,
                results: []
            };
        default:
            return state;
    }
}
export default search_reducer;
