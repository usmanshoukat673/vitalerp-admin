import React from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import GppGoodIcon from '@mui/icons-material/GppGood';

const Notice = () => {
    return(
        <Alert icon={<GppGoodIcon fontSize="inherit" />} severity="success">All communication is anonymous and encrypted. </Alert>
    )
}

export default Notice;