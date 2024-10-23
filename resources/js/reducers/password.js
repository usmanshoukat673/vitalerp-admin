import * as actionTypes from '../actions/types';

const initialUserState = {
    rotation: null
}

const password_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_PWD_ROTATION:
            return {
                rotation: action.payload.password,
            };
        case actionTypes.CLEAR_PWD_ROTATION:
            return {
                rotation: null
            };
        default:
            return state;
    }
}
export default password_reducer;
