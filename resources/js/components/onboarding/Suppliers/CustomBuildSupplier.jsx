import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import classNames from 'classnames';
import BuildSupplierExample from './BuildSupplierExample';

const CustomBuildSupplier = ({ asset, delete_asset }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (!_.isEmpty(asset)) {
            setName(asset.name);
        }
    }, [asset]);

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
        axios.post(`/api/auth/onboarding/update-build-supplier`, {
            id: asset.id,
            name: name,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                setTouched(false);
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
        axios.post(`/api/auth/onboarding/delete-build-supplier`, {
            id: asset.id,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
                delete_asset(asset);
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
        <Box sx={{padding: '10px', border: '1px solid #ccc', marginBottom: '10px', borderRadius: '6px'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Box sx={{ flex: '0.8', marginRight: '15px' }}>
                    <TextField label="Asset Type" fullWidth size="small" variant="outlined" value={name} className={classNames(handlerInputError('name'), 'build__input')} onChange={handleNameChange} />
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

            <BuildSupplierExample asset={asset} />
        </Box>
    )
}

export default CustomBuildSupplier;