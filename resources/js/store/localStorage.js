import _ from 'lodash';

export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('__vitalerp_appstate__');

        if (_.isEmpty(serializedState)) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('__vitalerp_appstate__', serializedState);
    } catch (error) {
        // log error
    }
};

export const deleteStore = () => {
    try {
        sessionStorage.removeItem('__vitalerp_appstate__');
    } catch (error) {
        // log error
    }
};
