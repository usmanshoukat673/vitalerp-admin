import * as actionTypes from '../actions/types';

const initialUserState = {
    activeUser: null,
    portalUser: null,
    isLoading: true,
    new_device: {}
}

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                activeUser: action.payload.activeUser,
                isLoading: false
            };
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false,
                activeUser: null
            };
        case actionTypes.SET_PORTAL_USER:
            return {
                ...state,
                portalUser: action.payload.portalUser,
                isLoading: false
            };
        case actionTypes.CLEAR_PORTAL_USER:
            return {
                ...state,
                isLoading: false,
                portalUser: null
            };
        case actionTypes.SET_USER_NEW_DEVICE:
            return {
                ...state,
                new_device: action.payload.new_device,
            };
        default:
            return state;
    }
}
export default user_reducer;
