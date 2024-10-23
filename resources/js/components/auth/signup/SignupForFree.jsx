import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import AuthHeader from '../AuthHeader';

const SignupForFree = ({ history }) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleEmailChange = event => {
        setEmail(event.target.value)

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            setErrors(errors);
        }
    }

    const handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleSubmit = event => {
        event.preventDefault();

        setErrors([]);
        setLoading(true);

        axios.post('/api/auth/signup-for-free', {
            email: email
        })
            .then(e => {
                history.push(`/signup-for-free/verify/${email}`);
            })
            .catch(err => {
                setLoading(false);
                if (err.response.status === 500) {
                    setErrors([]);
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }

    return (
        <>
            <AuthHeader signup={true} />

            <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px', textAlign: 'center' }}>
                    <Typography variant="h1" gutterBottom sx={{ color: '#fff' }}>
                        Say goodbye to manual GRC tasks and hello to automation.
                    </Typography>
                </Box>

                <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }}  className="_auth__right">
                    <Typography variant="h4">Signup For Free</Typography>
                    <Typography sx={{ marginBottom: '50px' }}>Please enter your email address.</Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{
                            '& > :not(style)': { width: '55ch' },
                            marginBottom: '15px'
                        }}>

                            <TextField fullWidth label="E-mail address" variant="outlined"
                                onChange={handleEmailChange}
                                name="email" value={email}
                                className={classNames(handlerInputError(errors, 'email'), 'build__input')}
                            />
                            {displayInputError(errors, 'email')}
                        </Box>

                        <LoadingButton
                            type="submit"
                            size='large'
                            sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                            loading={loading}
                            loadingIndicator="Verifing..."
                            variant="contained">
                            Verify
                        </LoadingButton>
                    </form>
                </Box>

            </Box>
        </>
    );
}

export default SignupForFree;