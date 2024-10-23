import * as React from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import IconButton from '@mui/material/IconButton';

export default function ActionAlert() {
    return (
        <Stack spacing={2}>
            <div className='__alert'>
                <p style={{ fontSize: '14px', textAlign: 'center' }}>
                Join our policy review panel: <Link href="#" color="inherit">Policies are now open</Link> for your comments – Your feedback is not just welcomed, it's essential.
                </p>
                <IconButton aria-label="Action" size="large" color='inherit'>
                    <ArrowCircleRightIcon fontSize="inherit" />
                </IconButton>
            </div>
        </Stack>
    );
}