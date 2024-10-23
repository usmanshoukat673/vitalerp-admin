import * as actionTypes from '../actions/types';

const initialTokenState = {
    activeToken: null,
    portalToken: null,
}

const token_reducer = (state = initialTokenState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return {
                activeToken: action.payload.activeToken
            };
        case actionTypes.CLEAR_TOKEN:
            return {
                activeToken: null
            };
        case actionTypes.SET_PORTAL_TOKEN:
            return {
                portalToken: action.payload.portalToken
            };
        case actionTypes.CLEAR_PORTAL_TOKEN:
            return {
                portalToken: null
            };
        default:
            return state;
    }
}
export default token_reducer;
