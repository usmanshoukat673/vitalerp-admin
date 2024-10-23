import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import AuthHeader from '../AuthHeader';

const BuildChoice = ({history, match}) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const { email } = match.params;
        setEmail(email);
    }, [match]);

    const handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const useAIBuilder = event => {
        event.preventDefault();

        setErrors([]);
        setLoading(true);

        axios.post('/api/auth/onboarding/get-build-id', {
            email: email
        })
            .then(e => {
                history.push(`/verify-company/${e.data}`);
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

    const dyi = () => {
        history.push(`/create-account/${email}`);
    }

    return (
        <>
            <AuthHeader signup={true} />

            <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                </Box>

                <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">

                        <Typography variant="h4">Language needed.</Typography>
                        <Typography sx={{ marginBottom: '50px' }}>lorep ipsump Lorem ipsum dolor sit amet consectetur adipisicing elit</Typography>

                        <LoadingButton
                            type="button"
                            size='large'
                            onClick={dyi}
                            sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                            loading={loading}
                            loadingIndicator="Processing..."
                            variant="contained">
                            Do it yourself
                        </LoadingButton>

                        <LoadingButton
                            onClick={useAIBuilder}
                            type="button"
                            size='large'
                            sx={{ paddingRight: '40px', paddingLeft: '40px', marginInlineStart: '20px' }}
                            loading={loading}
                            loadingIndicator="Processing..."
                            variant="contained">
                            Use AI Builder
                        </LoadingButton>
                </Box>

            </Box>
        </>
    );
}

export default BuildChoice;