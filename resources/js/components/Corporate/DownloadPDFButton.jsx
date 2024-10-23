// @flow
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import fileSaver from '../../utils/fileSaver';
import axiosInstance from '../../api/api';
import { Box, Button, IconButton, Stack } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


const DownloadPDFButton = ({ name, document_id, supplier_id }) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const downloadFile = () => {
        axiosInstance.get(`/api/user/corporate-profile/corporate-information/download-brochure/${supplier_id}/${document_id}`, {
            responseType: "blob",
        }).then(e => {

            fileSaver(e.data, name);

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
        <Box>
            <Stack direction="row" spacing={2}>
                <IconButton onClick={downloadFile} disabled={loading}>
                    <CloudDownloadIcon />
                </IconButton>
            </Stack>
        </Box>
    );
}

export default DownloadPDFButton;
