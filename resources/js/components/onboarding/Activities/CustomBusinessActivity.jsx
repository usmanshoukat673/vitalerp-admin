import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';

const CustomBusinessActivity = ({ activity, delete_activity }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (!_.isEmpty(activity)) {
            setName(activity.name);
        }
    }, [activity]);

    const handleNameChange = event => {
        setName(event.target.value);
        setTouched(true);
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

    const handleUpdate = () => {
        setLoading(true);
        axios.post(`/api/auth/onboarding/update-business-activity`, {
            id: activity.id,
            name: name,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                setTouched(true);
            })
            .catch(err => {
                setLoading(false);
                setTouched(true);
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    };

    const handleDelete = () => {
        setLoading(true);
        axios.post(`/api/auth/onboarding/delete-business-activity`, {
            id: activity.id,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                delete_activity(activity);
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


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Box sx={{ flex: '1', marginRight: '15px' }}>
                <TextField fullWidth variant="outlined" value={name} className={handlerInputError('name')} onChange={handleNameChange} />
                {displayInputError('name')}
            </Box>
            <Box sx={{ flex: '0.5' }}>
                <Button size='large' disabled={loading || !touched} variant='contained' color='success' onClick={handleUpdate} sx={{ marginRight: '10px' }}>
                    Update
                </Button>
                <Button size='large' disabled={loading} onClick={handleDelete} color='error' variant='contained'>
                    Delete
                </Button>
            </Box>
        </Box>
    )
}

export default CustomBusinessActivity;