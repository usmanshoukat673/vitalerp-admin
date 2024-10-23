import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { LoadingButton } from '@mui/lab';
import classNames from 'classnames';

const VerifyEmail = ({ history }) => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = event => {
        setEmail(event.target.value);
        clearErrors('email');
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
        axios.post(`/api/auth/onboarding/send-verfication-email`, {
            email: email,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                history.push('/build-email-sent');
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
        <div className="auth_page_content">
            <Box sx={{ display: 'flex', marginTop: '40px', justifyContent: 'center'}}>
                <Typography variant='h2' sx={{fontWeight: '400'}}>Experience the future of compliance management.</Typography>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '80px' }}>
                <Box sx={{ flex: '0.4', marginRight: '50px', marginTop: '10px', fontSize: '19px' }}>
                    <p>With vitalERP's advanced AI technology, you can simplify your compliance management workflows and automate your compliance tasks.</p>

                    <p>Say goodbye to manual data entry, complicated spreadsheets, and never-ending compliance checklists. With vitalERP, you can automate your compliance workflows and gain insights into your compliance status with ease.</p>
                    
                    <p>Create a free account with vitalERP today and experience the power of AI in action!</p>
                </Box>
                <Box sx={{ flex: '0.6', background: 'rgb(249 249 249);', padding: '20px', borderRadius: '6px' }}>
                    <Typography variant='h4'>Create a free account.</Typography>
                    <Typography variant="subtitle1" sx={{marginBottom: '50px'}}>Please enter your email address</Typography>

                    <form onSubmit={handleSubmit}>

                        <Box sx={{ marginBottom: '15px' }}>
                            <TextField fullWidth label="Email address"
                                variant="outlined" 
                                className={classNames(handlerInputError('email'), 'build__input')}
                                onChange={handleEmailChange}
                                name="email"
                                value={email} />

                            {displayInputError('email')}
                        </Box>

                        <div className="mt-3">
                            <LoadingButton sx={{ backgroundColor: '#1a73e8' }} type="submit" size='large' loading={loading} loadingIndicator="Verifying your email..." variant="contained">
                                Verify
                            </LoadingButton>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    </>);
}

export default VerifyEmail;