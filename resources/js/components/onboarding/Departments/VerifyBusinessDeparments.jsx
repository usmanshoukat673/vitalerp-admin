import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import BusinessDeparment from './BusinessDeparment';
import { LoadingButton } from '@mui/lab';
import CustomBusinessDeparment from './CustomBusinessDeparment';
import AddBusinessDeparment from './AddBusinessDeparment';
import _ from 'lodash';

const VerifyBusinessDeparments = ({ match, history }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const [custom_activities, setCustomActivities] = useState([]);
    const [build_id, setBuildID] = useState('');
    const [standard_id, setStandardId] = useState('');

    useEffect(() => {
        setBuildID(match.params.build_id);
        setStandardId(match.params.standard_id);
    }, [match.params]);

    useEffect(() => {
        if (!_.isEmpty(build_id)) {
            setLoading(true);
            axios.get(`/api/auth/onboarding/business-dept/${build_id}`)
                .then(e => {
                    setLoading(false);
                    setErrors([]);
                    setActivities(_.filter(e.data, activity => activity.custom == 0));
                    setCustomActivities(_.filter(e.data, activity => activity.custom == 1));
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

    const handleAddCustomActivity = (activity) => {
        setCustomActivities([...custom_activities, activity]);
    }

    const handleDeleteActivity = (activity) => {
        let the_custom_activities = JSON.parse(JSON.stringify(custom_activities));
        _.remove(the_custom_activities, act => act.id == activity.id);
        setCustomActivities(the_custom_activities);
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        axios.post(`/api/auth/onboarding/verify-departments`, {
            build_id: build_id,
            standard_id: standard_id,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                history.push(`/verify-department-functions/${build_id}/${standard_id}?page=1`);
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
        history.push(`/select-compailance/${build_id}`);
    }


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
                    <Typography variant="h4" sx={{marginBottom: '50px'}}>Verify Business Departments</Typography>
                    <form>
                        {
                            _.size(activities) > 0 && <Box sx={{ padding: '0px 10px 15px 10px' }}>
                                {
                                    _.map(activities, activity => (

                                        <BusinessDeparment key={activity.id} activity={activity} />

                                    ))
                                }
                            </Box>
                        }
                        <p style={{ paddingTop: '10px' }}>Please verify key business departments before continuing </p>
                        <Box sx={{ padding: '15px 10px' }}>
                            <Typography variant="h5" sx={{ color: '#000', paddingBottom: '10px' }}>Add Missing</Typography>
                            {
                                _.map(custom_activities, activity => (
                                    <CustomBusinessDeparment delete_activity={handleDeleteActivity} key={activity.id} activity={activity} />
                                ))
                            }
                            <AddBusinessDeparment added={handleAddCustomActivity} build_id={build_id} />
                        </Box>
                        <div className="mt-3">
                            <Button onClick={handleBack} variant="outlined" >Back</Button>
                            <LoadingButton sx={{ marginLeft: '15px' }} size='large' loading={loading} onClick={handleSubmit} loadingIndicator="Processing..." variant="contained">
                                Continue
                            </LoadingButton>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    </>);
}

export default VerifyBusinessDeparments;