import React, { useEffect, useState } from 'react';
import EmailRecipent from './EmailRecipent';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Recipient from './Recipient';
import CopyLink from '../compliance/CopyLink';

const WhiltleConfiguration = ({ whistle, recipent_added, updatedWhistle }) => {

    const [link, setLink] = useState('');

    useEffect(() => {
        setLink(`${window.location.origin}/whistle/${whistle.report_link}`)
    }, [whistle]);

    const onRecipientRemoved = (recipent) => {
        let recipients_copy = [...whistle.recipients];
        _.remove(recipients_copy, (rept) => {
            return rept.id === recipent.id;
        });
        updatedWhistle(recipients_copy);
    }

    return (
        <div className="activity__bucket">
            <div className="at__bucket__header">
                Configuration
            </div>
            <div className="at__bucket__body">
 
                <Stack sx={{ width: '70ch'}} spacing={2}>
                 <CopyLink link={link} title="Portal Link" />
                </Stack>

                <h3>Recipient(s):</h3>

                <Stack direction="row" spacing={1} sx={{ marginBottom: '15px' }}>
                    {
                        _.map(whistle.recipients, (rcpt, index) => (
                            <Recipient key={index} recipent={rcpt} removed={onRecipientRemoved} />
                        ))
                    }
                </Stack>

                {
                    _.size(whistle.recipients) === 0 && <Stack sx={{ width: '75ch', mb: '15px' }} spacing={2}>
                        <Alert variant="outlined" severity="error">
                            To receive reporting emails, you must have at least one recipient.
                        </Alert>
                    </Stack>
                }

                <EmailRecipent whistle={whistle} added={recipent_added} />
            </div>
        </div>
    );
}

export default WhiltleConfiguration;