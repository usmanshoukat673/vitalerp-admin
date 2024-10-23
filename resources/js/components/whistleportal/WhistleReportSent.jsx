import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Notice from './Notice';

const WhistleReportSent = ({ history }) => {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState({});

    useEffect(() => {
        axios.get(`/whistleblows/report/code/${params.report_id}`, {
            headers: {
                'Custom-Whistle-Report-Link': params.id
            }
        })
            .then(e => {
                setCode(e.data.code);
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }

                if (err.response.status === 404) {
                    history.push('/404')
                }
            });
    }, [params]);

    return (loading ? <Box sx={{ display: 'flex' }}>
        <CircularProgress />
    </Box> : <div className='__whistle_container'>

        <div style={{ display: 'flex', justifyContent: 'center' }}><CheckCircleOutlineIcon style={{ fontSize: '40px' }} /></div>

        <h2 style={{ textAlign: 'center' }}>Report was sent</h2>


        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='__report_sent_box'>
                <p className='__text'>Save this code for future reference; without it, you won't be able to access the report or continue communicating with your organization.</p>

                <p className='__code_box'>
                    {code}
                </p>
            </div>
        </div>

        <Stack sx={{ mb: '20px', display: 'flex', justifyContent: 'center' }} spacing={2}>
            <Alert variant="outlined" severity="info" sx={{border: 'none'}}>
                We received the report in order. We will investigate it as soon as possible and respond to you.
            </Alert>
        </Stack>


        <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => history.push(`/whistle/${params.id}`)} variant="outlined">Back to Home</Button>
        </Stack>


        <Divider sx={{ margin: '20px 0px' }} />

        <Notice />
    </div>)
}

export default WhistleReportSent;
