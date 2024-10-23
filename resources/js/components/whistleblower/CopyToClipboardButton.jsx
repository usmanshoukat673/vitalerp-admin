import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const CopyToClipboardButton = ({link}) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(link).then(function() {
            console.log('URL copied to clipboard');
          }).catch(function(err) {
            console.error('Could not copy URL to clipboard: ', err);
          });
    }

    return (
        <>
            <IconButton aria-label="Copy" onClick={handleClick}>
                <ContentCopyIcon />
            </IconButton>

            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    );
}

export default CopyToClipboardButton;