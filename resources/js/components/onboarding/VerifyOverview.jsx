import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { LoadingButton } from '@mui/lab';

const VerifyOverview = ({ match, history }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [build, setBuild] = useState({});
    const [build_id, setBuildID] = useState('');
    const [overview, setOverview] = useState('');

    useEffect(() => {
        setBuildID(match.params.build_id);
    }, [match.params]);

    useEffect(() => {
        if (!_.isEmpty(build_id)) {
            setLoading(true);
            axios.get(`/api/auth/onboarding/verify-company/${build_id}`)
                .then(e => {
                    setLoading(false);
                    setErrors([]);
                    setBuild(e.data);
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
        }
    }, [build_id]);

    useEffect(() => {
        if (!_.isEmpty(build)) {
            setOverview(build.overview);
        }
    }, [build]);

    const handCompanyNameChange = event => {
        setCompanyName(event.target.value);
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
        axios.post(`/api/auth/onboarding/verify-overview`, {
            build_id: build_id,
            overview: overview,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                history.push(`/select-compailance/${e.data}`);
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

    const handleBack = () => {
        history.push(`/verify-company/${build_id}`);
    }

    return (<>
        <div className="auth_page_content">
            <Box sx={{ display: 'flex', marginTop: '80px' }}>
                <Box sx={{ flex: '0.4', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                    <h2>An automated step by step onboarding process typically involves the following steps:</h2>

                    <p>Initial registration: The new hire provides their personal information, such as name, address, and contact details.</p>

                    <p>Verification: The system verifies the employee's identity through email or SMS.</p>

                    <p>Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically.</p>

                    <p>HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.</p>
                </Box>
                <Box sx={{ flex: '0.6', padding: '20px', borderRadius: '6px' }}>
                    <Typography variant="h4" sx={{marginBottom: '50px'}}>Verify Company Description</Typography>
                    <form>
                        <Box sx={{ backgroundColor: '#fff', padding: '15px 10px', borderRadius: '6px' }}>
                            <TextField
                                fullWidth
                                label="Descriotion"
                                multiline
                                rows={12}
                                value={overview}
                                onChange={(e) => setOverview(e.target.value)}
                                className="build__input"
                            />
                        </Box>
                        <Box>
                            <p>Please verify and make sure the company description is correct before continuing </p>
                        </Box>
                        <div className="mt-3">
                            <Button size='large' onClick={handleBack} variant="outlined" sx={{ marginRight: '15px' }}>Back</Button>
                            <LoadingButton size='large' className='ml-2' loading={loading} onClick={handleSubmit} loadingIndicator="Processing..." variant="contained">
                                Continue
                            </LoadingButton>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    </>);
}

export default VerifyOverview;