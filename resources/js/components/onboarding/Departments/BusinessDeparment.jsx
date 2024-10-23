import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import classNames from 'classnames';

const BusinessProcess = ({ activity }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responded, setResponded] = useState(false);
    const [included, setIncluded] = useState(false);
    const [owner, setOwner] = useState('');

    useEffect(() => {
        if (!_.isEmpty(activity)) {
            setIncluded(activity.included)
            setResponded(activity.responded);
            setOwner(_.isEmpty(activity.owner) ? '' : activity.owner);
        }
    }, [activity]);

    const handleOwnerChange = event => {
        setOwner(event.target.value);
        clearErrors(event.target.name);
    }

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    const handleChange = (event) => {
        let status = event.target.checked;

        setResponded(true);
        setLoading(true);
        axios.post(`/api/auth/onboarding/business-dept`, {
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

    const updateBusinessOwner = () => {
        axios.post(`/api/auth/onboarding/business-dept-owner`, {
            id: activity.id,
            owner: owner,
        })
            .then(e => {
                setLoading(false);
                setErrors([]);
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
        <Box sx={{ marginBottom: '10px' }}>
            <Box>
                <FormControlLabel sx={{ color: '#000' }} onChange={handleChange} checked={included && responded} 
                className={classNames('build__label', (included && responded ? 'checkbox__selected' : 'checkbox__unselected'))} 
                control={<Checkbox />} label={activity.name} />
            </Box>

            {
                (included && responded) && <Box sx={{ marginLeft: '30px' }}>
                <TextField
                    label="Department Owner"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={owner}
                    className="build__input"
                    onChange={handleOwnerChange}
                    onBlur={updateBusinessOwner}
                />
            </Box>
            }
            
        </Box>
    )
}

export default BusinessProcess;