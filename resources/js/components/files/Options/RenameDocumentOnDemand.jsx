import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import './RenameDoc.scss';
import { Box, TextField, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/api';

const RenameDocumentOnDemand = ({ document, renamed, cancled }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name_changed, setNameChanged] = useState(false);
    const [document_name, setDocumentName] = useState('');

    const {token, company} = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company
    }));

    useEffect(() => {
        setDocumentName(document.name);
    }, [document]);

    const handleChange = event => {
        setDocumentName(event.target.value);
        setNameChanged(true);
        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            setErrors(errors);
        }
    };

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'create__input error' : 'create__input';
    };

    const saveRenameDocument = () => {
        setLoading(true);
        setNameChanged(false);

        axiosInstance.post(`/api/user/cjfm/rename-document`, {
            document_id: document.enc_id,
            document_name: document_name
        }).then(e => {
            setLoading(false);
            renamed(e.data.document);
        }).catch(err => {
            if (err.response.status === 422) {
                setLoading(false);
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors.document_name[0], 'Error');
            }
            if (err.response.status === 500) {
                setLoading(false);
                setErrors([]);
            }
        });
    }

    return (
        <div className='_drawer_box'>
            <Typography variant='h6' sx={{mb: '10px'}} gutterBottom>Rename</Typography>

            <TextField id="document_name" name='document_name' fullWidth value={document_name}
                onChange={handleChange} label="Document Name" variant="outlined" className={handlerInputError('document_name')} />

            <Stack spacing={2} direction="row" sx={{mt: '10px'}}>
                <Button size="medium" color="success" disabled={!name_changed} onClick={saveRenameDocument} variant="contained">Save</Button>
                <Button size="medium" onClick={cancled} variant="outlined">Cancel</Button>
            </Stack>
        </div>
    );
}

export default RenameDocumentOnDemand;
