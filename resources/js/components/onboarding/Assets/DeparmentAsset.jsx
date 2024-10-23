import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, TextField, useTheme } from '@mui/material';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import classNames from 'classnames';
import { Dropdown } from 'semantic-ui-react';
import AssetExample from './AssetExample';

const DeparmentAsset = ({ activity }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responded, setResponded] = useState(false);
    const [included, setIncluded] = useState(false);

    useEffect(() => {
        if (!_.isEmpty(activity)) {
            setIncluded((activity.included == 1 ? true : false));
            setResponded(activity.responded);
        }
    }, [activity]);



    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
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
        axios.post(`/api/auth/onboarding/select-business-asset`, {
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
        <Box sx={{ marginBottom: '10px' }}>
            <Box>
                <FormControlLabel
                    sx={{ color: '#000' }}
                    onChange={handleChange} checked={included && responded} className={classNames('build__label', (included && responded ? 'checkbox__selected' : 'checkbox__unselected'))}
                    control={<Checkbox />} label={`${activity.name}`} />
            </Box>
            {
                (included && responded) &&  <AssetExample asset={activity} />
            }
        </Box>
    )
}

export default DeparmentAsset;