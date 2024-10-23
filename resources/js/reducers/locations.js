import * as actionTypes from '../actions/types';

const initialLocationsState = {
    locations: [],
    addSupplierLocationDialog: {
        open: false,
        added: false,
    },
    editSupplierLocationDialog: {
        open: false,
        updated: false,
        location: {},
    },
}

const locations_reducer = (state = initialLocationsState, action) => {
    switch (action.type) {
        case actionTypes.SET_COMP_LOCATION:
            return {
                ...state,
                locations: action.payload.locations
            };

        case actionTypes.SET_ADD_SUPPLIER_LOCATION_DIALOG:
            return {
                ...state,
                addSupplierLocationDialog: action.payload.addSupplierLocationDialog
            };

        case actionTypes.SET_EDIT_SUPPLIER_LOCATION_DIALOG:
            return {
                ...state,
                editSupplierLocationDialog: action.payload.editSupplierLocationDialog
            };
        default:
            return state;
    }
}

export default locations_reducer;
