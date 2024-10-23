import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TryIcon from '@mui/icons-material/Try';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Notice from '../whistleportal/Notice';

const WhiltleContent = () => {

    const [link, setLink] = useState(window.location.origin);

    const { leftnav, company, user } = useSelector((state) => ({
        leftnav: state.leftnav,
        company: state.orgs.company,
        user: state.user.activeUser,
    }));

    return (
        <div className="activity__bucket">
            <div className="at__bucket__header">
                Portal Content/Look:
            </div>
            <div className="at__bucket__body" style={{ width: '800px', margin: '0 auto' }}>
                <h2>Whistleblower Portal</h2>

                <p>Have concerns about potential misconduct within our organization or wish to share your insights? Turn to our Integrity Reporting Portal.</p>

                <p>At {company.name}, we prioritize a culture of transparency, ethics, and mutual respect. If you encounter practices or behavior that raises concerns and are challenging to address directly, our Integrity Reporting Portal is here for you. This platform is designed for you to securely submit concerns about unlawful or unethical actions, offer suggestions for improvement, pose questions, or share general feedback.</p>

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

                <Divider sx={{margin: '20px 0px'}} />

                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" startIcon={<AddIcon />}>
                        Create a Report
                    </Button>
                    <Button variant="outlined" startIcon={<TryIcon />}>
                        Check a Report
                    </Button>
                </Stack>

                <br />
                <br />
                
                <Notice />
            </div>
        </div>
    );
}

export default WhiltleContent;