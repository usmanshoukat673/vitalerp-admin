import * as actionTypes from '../actions/types';

const initialWatchState = {
    device: {},
    auto_devices: []
}

const devicewatch_reducer = (state = initialWatchState, action) => {
    switch (action.type) {
        case actionTypes.SET_WATCH_DEVICE:
            return {
                ...state,
                device: action.payload.device
            };
        case actionTypes.UNSET_WATCH_DEVICE:
            return {
                ...state,
                device: {}
            };
        case actionTypes.SET_ORGS_AUTO_DEVICES:
            return {
                ...state,
                auto_devices: action.payload.auto_devices
            };
        default:
            return state;
    }
}
export default devicewatch_reducer;
