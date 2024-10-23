import * as actionTypes from '../actions/types';
import _ from 'lodash';

const initialUserState = {
    open: false,
    summary: {
        subscriptionId: '',
        clientSecret: ''
    }
}

const mpackages_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_PAKCAGE_STATUS:
            return {
                ...state,
                open: action.payload.open,
            };
        case actionTypes.SET_PACKAGES_SUMMARY:
            return {
                ...state,
                summary: action.payload.summary,
            };
        case actionTypes.RESET_PACKAGES_SUMMARY:
            return {
                ...state,
                summary: {
                    subscriptionId: '',
                    clientSecret: ''
                },
            };
        default:
            return state;
    }
}
export default mpackages_reducer;
