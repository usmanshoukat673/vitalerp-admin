import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../api/api';

const EmailRecipent = ({whistle, added}) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
        clearErrors(event.target.name);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        clearErrors(event.target.name);
    }

    const clearErrors = (field) => {
        let errors_copy = [...errors];
        if (errors_copy.length > 0 && errors_copy[0].hasOwnProperty(field)) {
            delete errors_copy[0][field];
            setErrors(errors_copy);
        }
    }

    const addRecipent = (e) => {

        e.preventDefault();

        setLoading(true);
        setErrors([]);

        axiosInstance.post('/api/user/whistleblows/recipients/add', {
            email,
            name,
            whistle_id: whistle.id
        })
        .then(e => {

            setLoading(false);
            setErrors([]);
            setName('');
            setEmail('');
            added(e.data);
        })
        .catch(err => {
            setLoading(false);
            if (err.response.status === 500) {
                setErrors([]);
            }
            if (err.response.status === 422) {
                setErrors([err.response.data.errors]);
            }
        });

    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const validate = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    return (
        <>
            <div style={{display: 'flex'}}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                    error={validate('name')}
                    onChange={handleNameChange} 
                    className={handlerInputError('name')}
                    id="name" 
                    label="Name" 
                    name="name"
                    value={name}
                    variant="outlined" sx={{ marginRight: '10px' }} />

                    <TextField 
                     error={validate('email')}
                     className={handlerInputError('email')}
                     id="email" onChange={handleEmailChange} 
                     label="Email" 
                     name="email"
                     variant="outlined"
                     value={email}
                     />

                {displayInputError('name')}
                {displayInputError('email')}
                </Box>
                <IconButton disabled={loading} onClick={addRecipent} color="primary" aria-label="Add">
                    <AddIcon />
                </IconButton>
                
            </div>
        </>
    );
}

export default EmailRecipent;
