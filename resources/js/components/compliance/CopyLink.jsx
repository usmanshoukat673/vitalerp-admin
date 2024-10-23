import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Snackbar } from '@mui/material';


const CopyLink = ({ link, title }) => {

    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleInputClick = () => {

        inputRef.current.select();

        try {
            document.execCommand('copy');
            // console.log('Text copied to clipboard');
            setOpen(true);
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
        }

        // window.getSelection().removeAllRanges();
    };

    return (
        <React.Fragment>
            <Typography variant="overline" display="block">
                {title}
            </Typography>
            <TextField fullWidth
                id="outlined-basic"
                type="text"
                value={link}
                inputRef={inputRef}
                variant="outlined"
                onClick={handleInputClick}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <ContentCopyIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <Snackbar
                severity="success"
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </React.Fragment>
    );
}

export default CopyLink;