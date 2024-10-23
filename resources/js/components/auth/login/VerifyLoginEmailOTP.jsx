import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress, Box } from '@mui/material';
import { Alert } from '@mui/material';
import AuthHeader from '../AuthHeader';
import OTPInput from './OTPInput';
import axiosInstance from '../../../api/api';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCompanies, setMaturityLevels, setPWDRotation, setSupplier, setUser } from '../../../actions';

const VerifyLoginEmailOTP = ({ location }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Handler for OTP input
    const handleOtpChange = (value) => {
        setOtp(value);
        setError('');  // Clear any previous error when input changes
    };

    // Handler for verifying OTP
    const handleVerify = () => {
        if (_.size(otp) !== 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }

        setLoading(true);

        axiosInstance.post('/api/auth/email/2fa/verify', { otp })
            .then(response => {
                setSuccess('One time password validated successfully.');
                setError('');
                setLoading(false)
                const params = new URLSearchParams(location.search);
                const redirect = params.get('redirect');

                setUserData(response.data);

                if (redirect) {
                    history.push(redirect);
                }
                else {
                    history.push(response.data.redirect);
                }

            })
            .catch(error => {
                setSuccess('');
                if(error.response.status === 400) {
                    setError(error.response.data.error);
                }
                else{
                    setError('Verification failed. Please try again.');
                }
            })
            .finally(() => setLoading(false));
    };

    const handleResend = () => {
        setLoading(true);

        axiosInstance.post('/api/auth/email/2fa/resend')
            .then(response => {
                setSuccess(response.data.message);
                setError('');
                setLoading(false)
            })
            .catch(error => {
                setSuccess('');
                setError('Verification failed. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    const setUserData = (data) => {
        dispatch(setUser(data.user));
        dispatch(setCompanies(data.companies));
        dispatch(setMaturityLevels(data.maturity_levels));
        dispatch(setSupplier(data.supplier));
        dispatch(setPWDRotation(data.pwd_rotaion));
    }

    return (
        <>
            <AuthHeader signup={false} />

            <Box sx={{ display: 'flex', marginTop: '30px', justifyContent: 'center' }}>
                <Box sx={{ padding: '20px', borderRadius: '6px', mt: '50px', background: '#0000008c', width: '40%' }} className="_auth__right">
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>Enter One-Time-Password</Typography>
                    <Typography sx={{ marginBottom: '40px', textAlign: 'center' }}>Please enter the 6-digit code sent to your email.</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '30px', alignItems: 'center' }}>
                        <OTPInput
                            autoFocus
                            separator={<span>-</span>} value={otp} onChange={handleOtpChange} length={6} />
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        size='large'
                        onClick={handleVerify}
                        disabled={loading}
                        sx={{ marginBottom: '20px' }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Verify'}
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleResend}
                        disabled={loading}
                        sx={{ marginBottom: '30px' }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Resend Code'}
                    </Button>

                    {error && <Alert severity="error" style={{ marginBottom: '15px' }}>{error}</Alert>}
                    {success && <Alert severity="success" style={{ marginBottom: '15px' }}>{success}</Alert>}

                </Box>
            </Box>


        </>
    );
};

export default VerifyLoginEmailOTP;
