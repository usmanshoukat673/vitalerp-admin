import * as actionTypes from '../actions/types';
import _ from 'lodash';

const initialUserState = {
    items: [],
    summary: {
        gross_total: 0,
        discount: 0,
        tax: 0,
        net_total: 0,
        type: 'month',
        prices: [],
        subscriptionId: '',
        clientSecret: ''
    }
}

const cart_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_CART_ITEMS:
            return {
                ...state,
                items: action.payload.items,
            };
        case actionTypes.SET_CART_SUMMARY:
            return {
                ...state,
                summary: action.payload.summary,
            };
        case actionTypes.RESET_CART_SUMMARY:
            return {
                ...state,
                summary: {
                    gross_total: 0,
                    discount: 0,
                    tax: 0,
                    net_total: 0,
                    type: 'month',
                    prices: [],
                    subscriptionId: '',
                    clientSecret: ''
                },
            };
        default:
            return state;
    }
}
export default cart_reducer;
