import React, { useState } from "react";
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import ConfirmSharing from "./ConfirmSharing";
import SharedStandard from "./SharedStandard";

const ShareStandard = ({ standard }) => {

    const [open, setOpen] = useState(false);

    const share = () => {
        setOpen(true);
    }

    return (
        <>
            <div className='__share'>
                <Button size="medium" sx={{ textTransform: 'capitalize' }} onClick={share} variant="outlined" startIcon={< ShareIcon />}> Share</Button>
            </div>

            {
                open && <SharedStandard close={() => setOpen(false)} open={open} standard={standard} />
            }
        </>
    )
}

export default ShareStandard;