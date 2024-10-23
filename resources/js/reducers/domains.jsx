import * as actionTypes from '../actions/types';

const initialSupplierState = {
    addDomainDialog: {
        open: false,
        added: false,
    },
    editDomainDialog: {
        open: false,
        domain: {},
        updated: false,
    },
}

const domains_reducer = (state = initialSupplierState, action) => {
    switch (action.type) {
        case actionTypes.SET_ADD_DOMAIN_DIALOG:
            return {
                ...state,
                addDomainDialog: action.payload.addDomainDialog
            };
        case actionTypes.SET_EDIT_DOMAIN_DIALOG:
            return {
                ...state,
                editDomainDialog: action.payload.editDomainDialog
            };
        default:
            return state;
    }
}
export default domains_reducer;
