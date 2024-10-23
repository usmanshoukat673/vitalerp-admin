import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material';
import _ from 'lodash';
import axiosInstance from "../../../api/api";
import { setEditSupplierLocationDialog } from '../../../actions';
import { getError, isFieldExistsInErrors } from '../../../utils/errorHelper';
import moment from 'moment-timezone';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditSupplierLocationDialog = ({ states, countries }) => {

    const { editSupplierLocationDialog, supplier } = useSelector((state) => ({
        editSupplierLocationDialog: state.locations.editSupplierLocationDialog,
        supplier: state.supplier.supplier,
    }));

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [timezones, setTimezones] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        timezone: '',
    });

    useEffect(() => {
        setTimezones(moment.tz.names());
    }, []);

    useEffect(() => {
        if (!_.isEmpty(editSupplierLocationDialog?.location)) {
            setFormData((prevState) => ({
                ...prevState,
                name: editSupplierLocationDialog.location.name,
                address: _.isEmpty(editSupplierLocationDialog.location.address) ? '' : editSupplierLocationDialog.location.address,
                city: _.isEmpty(editSupplierLocationDialog.location.city) ? '' : editSupplierLocationDialog.location.city,
                state: _.isEmpty(editSupplierLocationDialog.location.state) ? '' : editSupplierLocationDialog.location.state,
                country: _.isEmpty(editSupplierLocationDialog.location.country) ? '' : editSupplierLocationDialog.location.country,
                postal_code: _.isEmpty(editSupplierLocationDialog.location.postal_code) ? '' : editSupplierLocationDialog.location.postal_code,
                timezone: _.isEmpty(editSupplierLocationDialog.location.timezone) ? '' : editSupplierLocationDialog.location.timezone,
            }));
        }
    }, [editSupplierLocationDialog]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
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
        axiosInstance.put(`/api/user/suppliers/locations/${editSupplierLocationDialog?.location.id}`, {
            ...formData,
            supplier_id: supplier.id
        })
            .then(response => {
                if (response.data) {
                    dispatch(setEditSupplierLocationDialog({ open: false, updated: true }));
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                    return;
                }
            }).finally(() => {
                setLoading(false);
            });
    }

    const handleClose = () => {
        dispatch(setEditSupplierLocationDialog({ open: false }));
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="md"
                open={editSupplierLocationDialog?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Location Details"
            >
                <DialogTitle>{"Location Details"}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate autoComplete='off'>
                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label htmlFor="name">Name</label>
                            <TextField
                                size='small'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                id='name'
                                error={isFieldExistsInErrors('name', errors)}
                            />
                            {isFieldExistsInErrors('name', errors) && (
                                <p style={{ color: 'red' }}>{getError('name', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label>Address: <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size="small"
                                fullWidth
                                id="address"
                                name='address'
                                value={formData.address}
                                variant="outlined"
                                onChange={handleChange}
                                error={isFieldExistsInErrors('address', errors)}
                            />
                            {isFieldExistsInErrors('address', errors) && (
                                <p style={{ color: 'red' }}>{getError('address', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label>City: <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size="small"
                                fullWidth
                                id="city"
                                name='city'
                                value={formData.city}
                                variant="outlined"
                                onChange={handleChange}
                                error={isFieldExistsInErrors('city', errors)}
                            />
                            {isFieldExistsInErrors('city', errors) && (
                                <p style={{ color: 'red' }}>{getError('city', errors)}</p>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label>State/Province/Region: <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('state', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                {_.map(states, state => (
                                    <MenuItem key={`state_${state.id}`} value={state.name}>{`${state.name}`}</MenuItem>
                                ))}
                            </Select>

                            {isFieldExistsInErrors('state', errors) && (
                                <p style={{ color: 'red' }}>{getError('state', errors)}</p>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label>Country: <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('country', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                {_.map(countries, country => (
                                    <MenuItem key={`country_${country.id}`} value={country.name}>{`${country.name}`}</MenuItem>
                                ))}
                            </Select>

                            {isFieldExistsInErrors('country', errors) && (
                                <p style={{ color: 'red' }}>{getError('country', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label>ZIP / Postal Code: <span style={{ color: 'red' }}>*</span></label>
                            <TextField
                                size="small"
                                fullWidth
                                id="postal_code"
                                name='postal_code'
                                value={formData.postal_code}
                                variant="outlined"
                                onChange={handleChange}
                                error={isFieldExistsInErrors('postal_code', errors)}
                            />
                            {isFieldExistsInErrors('postal_code', errors) && (
                                <p style={{ color: 'red' }}>{getError('postal_code', errors)}</p>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: '10px' }}>
                            <label>Time Zone: <span style={{ color: 'red' }}>*</span></label>
                            <Select
                                size='small'
                                id="timezone"
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                error={isFieldExistsInErrors('timezone', errors)}
                                fullWidth
                                MenuProps={{ style: { display: 'block' } }}
                            >
                                {_.map(timezones, tz => (
                                    <MenuItem key={`tz_${tz}`} value={tz}>{`${tz}`}</MenuItem>
                                ))}
                            </Select>

                            {isFieldExistsInErrors('timezone', errors) && (
                                <p style={{ color: 'red' }}>{getError('timezone', errors)}</p>
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

export default EditSupplierLocationDialog;