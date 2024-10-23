import React, { useEffect, useState } from 'react';
import { TextField as MUITextField } from '@mui/material';
import axiosInstance from '../../api/api';

const TextField = ({ field }) => {

    const [value, setValue] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (field.value != null) setValue(field.value);
    }, [field.value]);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSave = () => {
        axiosInstance.post(`/api/user/subjects/update-textfield`, {
            id: field.id,
            value: value
        })
            .then(e => {
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }

    return (
        <div className='sb__column_record'>
            <MUITextField sx={{ minWidth: '100px' }} onBlur={handleSave} onChange={handleChange} fullWidth value={value} />
        </div>
    )
}

export default TextField;