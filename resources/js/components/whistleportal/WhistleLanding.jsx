import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TryIcon from '@mui/icons-material/Try';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Notice from './Notice';

const WhistleLanding = ({ history }) => {

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [whistle, setWhistle] = useState({});

    useEffect(() => {
        axios.get('/whistleblows/index', {
            headers: {
                'Custom-Whistle-Report-Link': params.id
            }
        })
            .then(e => {
                setWhistle(e.data);
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

    return (
        loading ? <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box> :
            <div className='__whistle_container'>

                <h2>Whistleblower Reporting Portal</h2>

                <p>Have concerns about potential misconduct within our organization or wish to share your insights? Turn to our Integrity Reporting Portal.</p>

                <p>At {whistle.company.name}, we prioritize a culture of transparency, ethics, and mutual respect. If you encounter practices or behavior that raises concerns and are challenging to address directly, our Integrity Reporting Portal is here for you. This platform is designed for you to securely submit concerns about unlawful or unethical actions, offer suggestions for improvement, pose questions, or share general feedback.</p>

                <p>Dedicated teams within our organization handle all submissions, ensuring every piece of information shared through the portal remains confidential. Rest assured, using this platform carries no risk of repercussions.</p>

                <p>Guidelines for Effective Reporting:</p>

                <ul>
                    <li>
                        Ensure the accuracy of your information.
                    </li>
                    <li>Provide detailed descriptions - outline the situation and identify any parties involved.</li>
                    <li>Include any relevant attachments as required.</li>
                    <li>Stay engaged.</li>
                </ul>

                <p>We highly encourage maintaining communication with us. After submitting, you'll receive a unique report identifier. Safeguard this identifier, as it allows you to revisit and get updates on your report anytime.</p>

                <Divider sx={{ margin: '20px 0px' }} />

                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => history.push(`/whistle/r/${params.id}`)}>
                        Create a Report
                    </Button>
                    <Button variant="outlined" startIcon={<TryIcon />} onClick={() => history.push(`/whistle/c/${params.id}`)}>
                        Check a Report
                    </Button>
                </Stack>

                <br />
                <br />

                <Notice />
            </div>)
}

export default WhistleLanding;
