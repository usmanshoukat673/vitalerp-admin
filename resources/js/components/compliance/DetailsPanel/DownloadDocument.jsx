// @flow
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { NotificationManager } from 'react-notifications';
import fileSaver from '../../../utils/fileSaver';
import axiosInstance from '../../../api/api';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[900],
    },
}));


const DownloadDocument = ({ document, title }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const downloadFile = () => {
        axiosInstance.get(`/api/user/cjfm/download-file/${document.enc_id}`, {
            responseType: "blob"
        }).then(e => {

            fileSaver(e.data, document.name);

        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors[0].folder_name, 'Error');
            }

            if (err.response.status === 500) {
                setErrors([]);
                setLoading(false);
            }
        });
    }


    return (
        <CustomButton onClick={downloadFile}>{title}</CustomButton>
    );
}

export default DownloadDocument;
