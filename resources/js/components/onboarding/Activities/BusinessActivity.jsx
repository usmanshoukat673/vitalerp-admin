import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';

const BusinessActivity = ({ activity }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responded, setResponded] = useState(false);
    const [included, setIncluded] = useState(false);

    useEffect(() => {
        if (!_.isEmpty(activity)) {
            setIncluded(activity.included)
            setResponded(activity.responded);
        }
    }, [activity]);


    const handleResponse = (status) => {
        setResponded(true);
        setLoading(true);
        axios.post(`/api/auth/onboarding/business-activities`, {
            id: activity.id,
            included: status,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                setIncluded(status)
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
    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Box sx={{ flex: '1', marginRight: '15px' }}>
                <TextField fullWidth variant="outlined" value={activity.name} />
            </Box>
            <Box sx={{ flex: '0.5' }}>
                <Button size='large' disabled={included && loading} variant={included && responded ? 'contained' : 'outlined'} color={included && responded ? 'success' : 'primary'} onClick={() => handleResponse(true)} sx={{ marginRight: '10px' }}>
                    We do this
                </Button>
                <Button size='large' disabled={!included && loading} onClick={() => handleResponse(false)} color={!included && responded ? 'error' : 'primary'} variant={!included && responded ? 'contained' : 'outlined'}>
                    We Don't
                </Button>
            </Box>
        </Box>
    )
}

export default BusinessActivity;