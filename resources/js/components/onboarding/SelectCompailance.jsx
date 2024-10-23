import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

const SelectCompailance = ({ match, history }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [standards, setStandards] = useState([]);
    const [build_standard_id, setBuildStandardId] = useState(0);
    const [selected_standards, setSelectedStandards] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/auth/onboarding/standards`)
            .then(e => {
                setLoading(false);
                setErrors([]);
                setStandards(e.data);
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
    }, []);

    const handleChange = (event) => {
        let standard_id = parseInt(event.target.value);
        if (_.findIndex(selected_standards, function (id) { return id == event.target.value; }) < 0 && event.target.checked) {
            setSelectedStandards([...selected_standards, standard_id]);
        }
        else {
            let the_selected_standards = JSON.parse(JSON.stringify(selected_standards));
            _.remove(the_selected_standards, function (id) {
                return id == standard_id;
            })
            setSelectedStandards(the_selected_standards);
        }
    };

    const [build_id, setBuildID] = useState('');

    useEffect(() => {
        setBuildID(match.params.build_id);
        if (!_.isEmpty(match.params.build_id)) {
            axios.get(`/api/auth/onboarding/selected-standards/${match.params.build_id}`)
                .then(e => {
                    setLoading(false);
                    setErrors([]);
                    setSelectedStandards(e.data);
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
    }, [match.params]);

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

    const startBuild = (standard_id) => {
        setLoading(true);
        setBuildStandardId(standard_id);
        axios.post(`/api/auth/onboarding/start-building-standard`, {
            build_id: build_id,
            standard_id: standard_id,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                setBuildStandardId(0);
                history.push(`/verify-bussiness-departments/${build_id}/${standard_id}`);
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
        history.push(`/verify-overview/${build_id}`);
    }

    if (loading) return 'loading...';

    return (<>
        <div className="auth_page_content">
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box sx={{ flex: '0.4', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                    <h2>An automated step by step onboarding process typically involves the following steps:</h2>

                    <p>Initial registration: The new hire provides their personal information, such as name, address, and contact details.</p>

                    <p>Verification: The system verifies the employee's identity through email or SMS.</p>

                    <p>Electronic signature: The employee signs all required paperwork, such as the employment contract and non-disclosure agreement, electronically.</p>

                    <p>HR forms: The employee completes all HR forms, such as the tax forms, emergency contact information, and benefit elections.</p>
                </Box>
                <Box sx={{ flex: '0.6', padding: '20px', borderRadius: '6px' }}>
                    <Typography variant="h4" sx={{ marginBottom: '50px' }}>What you need to comply with?</Typography>
                    <form>
                        <Box sx={{ backgroundColor: '#fff', padding: '15px 10px', borderRadius: '6px', color: '#000' }}>
                            {/* <FormGroup>
                                {
                                    _.map(standards, standard => {
                                        return (
                                            <FormControlLabel key={standard.id} onChange={handleChange} checked={_.findIndex(selected_standards, id => id == standard.id) < 0 ? false : true} control={<Checkbox value={standard.id} />} label={standard.name} />
                                        )
                                    })
                                }
                            </FormGroup> */}

                            {
                                _.map(standards, standard => {
                                    return (
                                        <Box key={standard.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <Typography sx={{ flex: '0.7' }} variant='h6'>{standard.name}</Typography>

                                            {
                                                standard.build_ready == 1 ? <LoadingButton
                                                    sx={{paddingLeft: '50px', paddingRight: '50px'}}
                                                    onClick={() => startBuild(standard.id)}
                                                    loading={loading && build_standard_id == standard.id}
                                                    loadingIndicator="Processing..." variant="contained"
                                                    size='large'
                                                >Build</LoadingButton> : <LoadingButton
                                                    sx={{paddingLeft: '15px', paddingRight: '15px'}}
                                                    disabled
                                                    loading={loading && build_standard_id == standard.id}
                                                    loadingIndicator="Processing..." variant="outlined"
                                                    size='large'
                                                >Coming soon</LoadingButton>
                                            }

                                        </Box>
                                    )
                                })
                            }


                        </Box>
                        <div className="mt-3">
                            <Button onClick={handleBack} variant="outlined" size='large' sx={{ marginRight: '15px' }}>Back</Button>
                            {/* <LoadingButton className='ml-2' loading={loading} size='large' onClick={startBuild} loadingIndicator="Processing..." variant="contained">
                                Continue
                            </LoadingButton> */}
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    </>);
}

export default SelectCompailance;