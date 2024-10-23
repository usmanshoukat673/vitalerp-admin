import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, TextField, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import _ from 'lodash';
import { setAddSupplierUserDialog } from '../../../actions';
import axiosInstance from '../../../api/api';
import { getError, isFieldExistsInErrors } from '../../../utils/errorHelper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddSupplierUserDialog = ({ roles }) => {

    const { addSupplierUserDialog, supplier } = useSelector((state) => ({
        addSupplierUserDialog: state.supplier.addSupplierUserDialog,
        supplier: state.supplier.supplier,
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        roles: [],
    });

    /**
     * Handles changes to the form data by updating the state with the new value.
     *
     * @param {object} event - The event object triggered by the change.
     * @return {void}
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    }

    const handleRolesChange = (event) => {
        const { value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            roles: typeof value === 'string' ? value.split(',') : value
        }));
        clearError('roles');
    };

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const handleSubmit = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/suppliers/users/add/${supplier.id}`, { ...formData })
            .then(response => {
                clearFormData();
                if (response.data) {
                    dispatch(setAddSupplierUserDialog({ open: false, added: true }));
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => setLoading(false));
    }

    const clearFormData = () => {
        setFormData({
            name: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            roles: [],
        });
        setErrors({});
    }

    const handleClose = () => {
        clearFormData();
        dispatch(setAddSupplierUserDialog({ open: false }));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="md"
                open={addSupplierUserDialog?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add User"
            >
                <DialogTitle>{"Add User"}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete='off'>

                        <Box sx={{ display: 'flex' }}>
                            <FormControl fullWidth sx={{ mb: '10px', flex: 1, mr: 1 }}>
                                <label htmlFor="first_name">First Name <span style={{ color: 'red' }}>*</span></label>
                                <TextField
                                    size='small'
                                    name='first_name'
                                    onChange={handleChange}
                                    id='first_name'
                                    value={formData.first_name}
                                    error={isFieldExistsInErrors('first_name', errors)}
                                />
                                {isFieldExistsInErrors('first_name', errors) && (
                                    <p style={{ color: 'red' }}>{getError('first_name', errors)}</p>
                                )}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: '10px', flex: 1 }}>
                                <label htmlFor="last_name">Last Name <span style={{ color: 'red' }}>*</span></label>
                                <TextField
                                    size='small'
                                    name='last_name'
                                    onChange={handleChange}
                                    id='last_name'
                                    value={formData.last_name}
                                    error={isFieldExistsInErrors('last_name', errors)}
                                />
                                {isFieldExistsInErrors('last_name', errors) && (
                                    <p style={{ color: 'red' }}>{getError('last_name', errors)}</p>
                                )}
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <FormControl fullWidth sx={{ mb: '10px', flex: 1, mr: 1 }}>
                                <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                                <TextField
                                    size='small'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    id='email'
                                    error={isFieldExistsInErrors('email', errors)}
                                />
                                {isFieldExistsInErrors('email', errors) && (
                                    <p style={{ color: 'red' }}>{getError('email', errors)}</p>
                                )}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: '10px', flex: 1 }}>
                                <label htmlFor="phone_number">Phone Number</label>
                                <TextField
                                    size='small'
                                    name='phone_number'
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    id='phone_number'
                                    error={isFieldExistsInErrors('phone_number', errors)}
                                />
                                {isFieldExistsInErrors('phone_number', errors) && (
                                    <p style={{ color: 'red' }}>{getError('phone_number', errors)}</p>
                                )}
                            </FormControl>

                        </Box>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="phone_number">Role(s)<span style={{ color: 'red' }}>*</span></label>
                            <Select
                                labelId="roles-label"
                                id="roles"
                                name="roles"
                                multiple
                                size='small'
                                value={formData.roles}
                                onChange={handleRolesChange}
                                renderValue={(selected) => selected.map(id => {
                                    let roleFound = roles.find(r => r.id === id);
                                    return `${roleFound.name}`;
                                }).join(', ')}
                                error={isFieldExistsInErrors('roles', errors)}
                            >
                                {
                                    _.map(roles, role => (
                                        <MenuItem key={role.id} value={role.id} sx={{ display: 'flex !important', alignItems: 'center !important' }}>
                                            <Checkbox checked={formData.roles.indexOf(role.id) > -1} />
                                            <ListItemText primary={role.name} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>

                            {isFieldExistsInErrors('roles', errors) && (
                                <p style={{ color: 'red' }}>{getError('roles', errors)}</p>
                            )}
                        </FormControl>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={loading} onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddSupplierUserDialog;