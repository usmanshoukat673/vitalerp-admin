import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import AuthHeader from '../AuthHeader';

const VerifyEmailOTP = ({ history, match }) => {

    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const { email } = match.params;
        setEmail(email);
    }, [match]);

    const handleCodeChange = event => {
        setCode(event.target.value)

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

        axios.post('/api/auth/verify-email', {
            code: code,
            email: email
        })
            .then(e => {
                history.push(`/build-choice/${email}`);
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
                    <Typography variant="h1" gutterBottom sx={{ color: '#fff' }}>
                        Streamline your GRC process and focus on the big picture.
                    </Typography>
                </Box>

                <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">
                    <Typography variant="h4">Enter Verification Code</Typography>
                    <Typography sx={{ marginBottom: '50px' }}>Please enter verification code sent to your email addresss.</Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: '15px', width: '40%' }}>

                            <TextField fullWidth
                                type="number"
                                label="Verification-code" variant="outlined"
                                onChange={handleCodeChange}
                                name="code" value={code}
                                className={classNames(handlerInputError(errors, 'code'), 'build__input')}
                            />
                            {displayInputError(errors, 'code')}
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

export default VerifyEmailOTP;