import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';

const AddBusinessActivity = ({ build_id, added }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const handleNameChange = event => {
        setName(event.target.value);
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

    const handleSubmit = () => {
        setLoading(true);
        axios.post(`/api/auth/onboarding/add-business-activity`, {
            build_id: build_id,
            name: name,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                added(e.data);
                setName('');
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
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Box sx={{ flex: '1', marginRight: '15px' }}>
                    <TextField fullWidth variant="outlined" value={name} className={handlerInputError('name')} onChange={handleNameChange} />
                </Box>
                <Box sx={{ flex: '0.5' }}>
                    <Button variant="outlined" disabled={loading} size='large' onClick={handleSubmit}>
                        Save
                    </Button>
                </Box>
            </Box>
            <div>
                {displayInputError('name')}
            </div>
        </>
    )
}

export default AddBusinessActivity;