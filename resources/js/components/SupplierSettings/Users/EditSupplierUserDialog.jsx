import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, TextField, MenuItem, Select, Checkbox, ListItemText } from '@mui/material';
import _ from 'lodash';
import { setEditSupplierUserDialog } from '../../../actions';
import axiosInstance from '../../../api/api';
import { getError, isFieldExistsInErrors } from '../../../utils/errorHelper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditSupplierUserDialog = ({ roles }) => {

    const { editSupplierUserDialog, supplier } = useSelector((state) => ({
        editSupplierUserDialog: state.supplier.editSupplierUserDialog,
        supplier: state.supplier.supplier
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        roles: [],
        supplier_id: ''
    });

    useEffect(() => {
        if (!_.isEmpty(editSupplierUserDialog?.user)) {
            setFormData((prevState) => ({
                ...prevState,
                first_name: _.isEmpty(editSupplierUserDialog.user.first_name) ? '' : editSupplierUserDialog.user.first_name,
                last_name: _.isEmpty(editSupplierUserDialog.user.last_name) ? '' : editSupplierUserDialog.user.last_name,
                email: _.isEmpty(editSupplierUserDialog.user.email) ? '' : editSupplierUserDialog.user.email,
                phone: _.isEmpty(editSupplierUserDialog.user.phone) ? '' : editSupplierUserDialog.user.phone,
                roles: _.map(editSupplierUserDialog.user.supplier_roles, role => role.role_id),
                supplier_id: supplier.id
            }));
        }
    }, [editSupplierUserDialog]);

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
        axiosInstance.put(`/api/user/suppliers/users/update/${editSupplierUserDialog.user.id}`, formData)
            .then(response => {
                if (response.data) {
                    dispatch(setEditSupplierUserDialog({ open: false, updated: true }));
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => setLoading(false));
    }

    const handleClose = () => {
        dispatch(setEditSupplierUserDialog({ open: false }));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="md"
                open={editSupplierUserDialog?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Supplier User Details"
            >
                <DialogTitle>{"Supplier User Details"}</DialogTitle>
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
                                    autoComplete='off'
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
                                    autoComplete='off'
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
                                    onChange={handleChange}
                                    id='email'
                                    value={formData.email}
                                    type='email'
                                    autoComplete='off'
                                    error={isFieldExistsInErrors('email', errors)}
                                />
                                {isFieldExistsInErrors('email', errors) && (
                                    <p style={{ color: 'red' }}>{getError('email', errors)}</p>
                                )}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: '10px', flex: 1 }}>
                                <label htmlFor="phone">Phone Number</label>
                                <TextField
                                    size='small'
                                    name='phone'
                                    onChange={handleChange}
                                    id='phone'
                                    value={formData.phone}
                                    type='number'
                                    autoComplete='off'
                                    error={isFieldExistsInErrors('phone', errors)}
                                />
                                {isFieldExistsInErrors('phone', errors) && (
                                    <p style={{ color: 'red' }}>{getError('phone', errors)}</p>
                                )}
                            </FormControl>

                        </Box>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="roles">Role(s)<span style={{ color: 'red' }}>*</span></label>
                            <Select
                                id="roles"
                                name="roles"
                                multiple
                                size='small'
                                value={formData.roles}
                                onChange={handleRolesChange}
                                renderValue={(selected) => selected.map(id => {
                                    let roleFound = roles.find(r => r.id === id);
                                    return `${roleFound?.name}`;
                                }).join(', ')}
                                error={isFieldExistsInErrors('roles', errors)}
                            >
                                {
                                    _.map(roles, role => (
                                        <MenuItem key={role.id} value={role.id} sx={{ display: 'flex !important', alignItems: 'center !important' }}>
                                            <Checkbox checked={formData.roles.indexOf(role.id) > -1} />
                                            <ListItemText primary={role?.name} />
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

export default EditSupplierUserDialog;