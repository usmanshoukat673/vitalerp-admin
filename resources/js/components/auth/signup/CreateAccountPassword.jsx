import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import AuthHeader from '../AuthHeader';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setCompanies, setMaturityLevels, setPWDRotation, setUser, setUserNewDevice, unsetSearchQuery, unsetSearchResults, setToken } from '../../../actions';

const CreateAccountPassword = ({ history, match }) => {

    const [company_name, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfimrationPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const { email } = match.params;
        setEmail(email);
    }, [match]);

    const handCompanyNameChange = event => {
        setCompanyName(event.target.value);
        clearErrors(event.target.name);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);

        clearErrors(event.target.name);
    }

    const handleConfirmPasswordChange = event => {
        setConfimrationPassword(event.target.value);

        clearErrors(event.target.name);
    }

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        setErrors([]);
        setLoading(true);

        axios.post('/api/auth/setup-new-account', {
            email: email,
            company_name: company_name,
            password: password,
            password_confirmation: password_confirmation
        })
            .then(e => {
                dispatch(setToken(e.data.token));
                dispatch(setUser(e.data.user));
                dispatch(setCompanies(e.data.companies));
                dispatch(setUserNewDevice(e.data.new_device));
                dispatch(setPWDRotation(e.data.pwd_rotaion));
                dispatch(setMaturityLevels(e.data.maturity_levels));
                dispatch(unsetSearchQuery());
                dispatch(unsetSearchResults());
                history.push('/select-organization');
            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 500) {
                    setErrors([]);
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors))
                }
            });
    }

    return (
        <>
            <AuthHeader signup={true} />

            <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                </Box>

                <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">

                    <Typography variant="h4">Create Password</Typography>
                    <Typography sx={{ marginBottom: '50px' }}>Please set your account password</Typography>

                    <form className="" onSubmit={handleSubmit}>

                        <Box sx={{ marginBottom: '15px' }}>
                            <TextField fullWidth label="Company Name" variant="outlined" 
                                onChange={handCompanyNameChange}
                                name="company_name" value={company_name}
                                className={classNames(handlerInputError('company_name'), 'build__input')}
                                />

                            {displayInputError('company_name')}
                        </Box>

                        <Box sx={{ marginBottom: '15px' }}>
                            <TextField type="password" fullWidth label="Enter Password" variant="outlined"
                                onChange={handlePasswordChange}
                                name="password" value={password}
                                className={classNames(handlerInputError('password'), 'build__input')}
                            />
                            {displayInputError('password')}
                        </Box>

                        <Box sx={{ marginBottom: '15px' }}>
                            <TextField type="password" fullWidth label="Confirm Password" variant="outlined"
                                onChange={handleConfirmPasswordChange}
                                name="password_confirmation" value={password_confirmation}
                                className={classNames(handlerInputError('password_confirmation'), 'build__input')}
                            />
                        </Box>

                        <LoadingButton
                            type="submit"
                            size='large'
                            sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                            loading={loading}
                            loadingIndicator="Processing..."
                            variant="contained">
                            Save Password
                        </LoadingButton>
                    </form>
                </Box>
            </Box>

        </>
    );
}

export default CreateAccountPassword;