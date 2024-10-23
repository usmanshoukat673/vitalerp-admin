import _ from 'lodash';

export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');

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
        sessionStorage.setItem('state', serializedState);
    } catch (error) {
        // log error
    }
};
