import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, DialogActions, IconButton } from '@mui/material';
import _ from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import DownloadPDFButton from './DownloadPDFButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ViewPDFDocument = ({ name, document_id, supplier_id, open, close }) => {

    const [path, setPath] = useState('');

    useEffect(() => {
        if (open) {
            setPath(`${window.location.origin}/view-pdf/${document_id}/${supplier_id}`);
        }
    }, [document_id, supplier_id, open]);

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
                aria-describedby="View PDF Document"
            >
                <DialogTitle>{`${name}`}</DialogTitle>
                <Box sx={{
                    position: 'absolute',
                    right: '50px',
                    top: 8,
                }}>
                    <DownloadPDFButton 
                        document_id={document_id} 
                        supplier_id={supplier_id} 
                        name={name}
                    />
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={close}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Box sx={{ maxHeight: '21cm', overflow: 'scroll' }}>

                        <iframe style={{ minHeight: '21cm', border: '0px', width: '100%' }} src={path}></iframe>

                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default ViewPDFDocument;