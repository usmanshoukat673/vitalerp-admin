import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useEffect } from 'react';
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axiosInstance from '../../../api/api';
import { NotificationManager } from 'react-notifications';
import { getError, isFieldExistsInErrors } from '../../../utils/errorHelper';
import moment from 'moment-timezone';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditLocationDialog = ({ location, open, close, tz_list, edited }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { states, countries } = useSelector((state) => ({
        states: state.validvalues.states,
        countries: state.validvalues.countries
    }));

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        timezone: moment.tz.guess(),
    });

    useEffect(() => {
        setFormData({
            name: (location.name != null ? location.name : ''),
            address: (location.address != null ? location.address : ''),
            city: (location.city != null ? location.city : ''),
            state: (location.state != null ? location.state : ''),
            country: (location.country != null ? location.country : ''),
            postal_code: (location.postal_code != null ? location.postal_code : ''),
            timezone: (_.isEmpty(location.timezone) ? moment.tz.guess() : location.timezone)
        });
    }, [location]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        clearError(name);
    }

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    }

    const handleSubmit = () => {
        setLoading(true);
        axiosInstance.post('/api/user/locations/save-location-changes', {
            ...formData,
            location_id: location.id,
        })
            .then(e => {
                setFormData({
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    postal_code: '',
                    timezone: moment.tz.guess(),
                });
                edited(e.data.location);
                NotificationManager.success('New Location has been successfully created!', 'Success');
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

    return (
        <React.Fragment>
            <Dialog
                open={open}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
                aria-describedby="Location Details"
            >
                <DialogTitle>{"Location Details"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={12}>
                            <Box>
                                <label>Office Name / Purpose: <span style={{ color: 'red' }}>*</span></label>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="name"
                                    name='name'
                                    value={formData.name}
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={isFieldExistsInErrors('name', errors)}
                                />
                                {isFieldExistsInErrors('name', errors) && (
                                    <p style={{ color: 'red' }}>{getError('name', errors)}</p>
                                )}
                            </Box>
                        </Grid>
                        {/* <Grid item xs={12} sm={3}> */}
                        {/* <label style={{ display: 'block' }}>Make Primary</label>
                            <Checkbox /> 
                            
                            </Grid>*/}
                    </Grid>

                    <Box sx={{ mb: 3 }}>
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
                    </Box>

                    <Box sx={{ mb: 3 }}>
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
                    </Box>



                    <Box sx={{ mb: 3 }}>
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
                    </Box>

                    <Box sx={{ mb: 3 }}>
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
                    </Box>

                    <Box sx={{ mb: 3 }}>
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
                    </Box>

                    <Box sx={{ mb: 3 }}>
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
                            {_.map(tz_list, tz => (
                                <MenuItem key={`tz_${tz}`} value={tz}>{`${tz}`}</MenuItem>
                            ))}
                        </Select>

                        {isFieldExistsInErrors('timezone', errors) && (
                            <p style={{ color: 'red' }}>{getError('timezone', errors)}</p>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button disabled={loading} onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default EditLocationDialog;