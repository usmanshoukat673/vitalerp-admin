import * as actionTypes from '../actions/types';

const initialSupplierState = {
    supplier: {},
    addSupplierUserDialog: {
        open: false,
        added: false
    },
    editSupplierUserDialog: {
        open: false,
        user: {},
        updated: false
    },
    assignDomainDialog: {
        open: false,
        assigned: false,
        supplier: {}
    }
}

const supplier_reducer = (state = initialSupplierState, action) => {
    switch (action.type) {
        case actionTypes.SET_SUPPLIER:
            return {
                ...state,
                supplier: action.payload.supplier
            };
        case actionTypes.SET_ADD_SUPPLIER_USER_DIALOG:
            return {
                ...state,
                addSupplierUserDialog: action.payload.addSupplierUserDialog
            };

        case actionTypes.SET_EDIT_SUPPLIER_USER_DIALOG:
            return {
                ...state,
                editSupplierUserDialog: action.payload.editSupplierUserDialog
            };

        case actionTypes.SET_ASSIGN_DOMAIN_DIALOG:
            return {
                ...state,
                assignDomainDialog: action.payload.assignDomainDialog
            };

        default:
            return state;
    }
}
export default supplier_reducer;
