import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';

const VerifyCompany = ({ match, history }) => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const [company_name, setCompanyName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [states, setStates] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [build_id, setBuildID] = useState('');

    useEffect(() => {
        setBuildID(match.params.build_id);
    }, [match.params]);

    useEffect(() => {
        setBuildID(match.params.build_id);
        if (!_.isEmpty(match.params.build_id)) {
            axios.get(`/api/auth/onboarding/verify-company/${match.params.build_id}`)
                .then(e => {
                    setCompanyName(e.data.company_name);
                    setCity(e.data.city);
                    setState(e.data.state);
                    setStreetAddress(e.data.street_address);
                })
                .catch(err => {
                    setLoading(false);
                    if (err.response.status === 500) {
                        NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                    }
                    if (err.response.status === 422) {
                        NotificationManager.error(err.response.data, 'Error');
                    }
                });

            axios.get(`/api/auth/onboarding/us-states`)
                .then(e => {
                    setStates(e.data);
                })
                .catch(err => {
                    if (err.response.status === 500) {
                        NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                    }
                    if (err.response.status === 422) {
                        NotificationManager.error(err.response.data, 'Error');
                    }
                });
        }
    }, [match.params]);

    const handCompanyNameChange = event => {
        setCompanyName(event.target.value);
        clearErrors(event.target.name);
    }

    const handleCityChange = event => {
        setCity(event.target.value);
        clearErrors(event.target.name);
    }

    const handleStateChange = event => {
        setState(event.target.value);
        clearErrors(event.target.id);
    }

    const handleStreedAddressChange = event => {
        setStreetAddress(event.target.value);
        clearErrors(event.target.name);
    }

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post(`/api/auth/onboarding/verify-company`, {
            build_id: build_id,
            company_name: company_name,
            city: city,
            state: state,
            street_address: street_address
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                history.push(`/verify-overview/${e.data}`);
            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }


    return (<>
        <Box sx={{ display: 'flex', marginTop: '30px' }}>
            <Box sx={{ flex: '0.4', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                <h2>An automated step by step onboarding process typically involves the following steps:</h2>

                <p>Initial registration: The new hire provides their personal information, such as name, address, and contact details.</p>

                <p>Verification: The system verifies the employee's identity through email or SMS.</p>

                <p>Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically.</p>

                <p>HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.</p>
            </Box>
            <Box sx={{ flex: '0.6', padding: '20px', borderRadius: '6px' }}>
                <Typography variant="h4">Company Details</Typography>
                <Typography sx={{marginBottom: '50px'}}>Please enter your company details.</Typography>

                <form onSubmit={handleSubmit}>

                    <Box sx={{ marginBottom: '15px' }}>
                        <TextField fullWidth label="Company Name" variant="outlined" 
                            onChange={handCompanyNameChange}
                            name="company_name" value={company_name}
                            className={classNames(handlerInputError('company_name'), 'build__input')}
                            />

                        {displayInputError('company_name')}
                    </Box>

                    <Box sx={{ marginBottom: '15px' }}>
                        <TextField fullWidth label="Street address" variant="outlined" className={classNames(handlerInputError('street_address'), 'build__input')}
                            onChange={handleStreedAddressChange}
                            name="street_address" value={street_address} />

                        {displayInputError('street_address')}
                    </Box>

                    <Box sx={{ marginBottom: '15px' }}>
                        <TextField fullWidth label="City" variant="outlined" className={classNames(handlerInputError('city'), 'build__input')}
                            onChange={handleCityChange}
                            name="city" value={city} />

                        {displayInputError('city')}
                    </Box>

                    <FormControl fullWidth>
                        <InputLabel id="state_label_id">State</InputLabel>
                        <Select
                            labelId="state_label_id"
                            id="state"
                            value={state}
                            label="State"
                            onChange={handleStateChange}
                            className={classNames(handlerInputError('state'), 'build__input')}
                        >
                            {
                                _.map(states, st => (
                                    <MenuItem sx={{fontSize: '18px!important'}} key={st.id} value={st.name}>{st.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <div>
                        {displayInputError('build_id')}
                    </div>

                    <div className="mt-3">
                        <LoadingButton type="submit" size='large' loading={loading} loadingIndicator="Processing..." variant="contained">
                            Continue
                        </LoadingButton>
                    </div>
                </form>
            </Box>
        </Box>
    </>);
}

export default VerifyCompany;