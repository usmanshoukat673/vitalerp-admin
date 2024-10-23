import * as actionTypes from '../actions/types';

const initialUserState = {
    app: {},
}

const applications_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_APP:
            return {
                app: action.payload.app,
            };
        case actionTypes.CLEAR_APP:
            return {
                app: {},
            };
        default:
            return state;
    }
};

export default applications_reducer;
