import React from 'react';
import DigitalDocument from '../DigitalDocument';
import PDFFile from '../PDFFile';
import MSDocument from '../MSDocument';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { msFiles } from '../../../../utils';

const OpenDocument = ({ document, close }) => {

    return (
        <>

            <Dialog
                onClose={close}
                aria-labelledby="customized-dialog-title"
                open={true}
                scroll="paper"
                maxWidth="xl"
                fullWidth={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {document.document.name}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={close}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {(document.document.type == "document") && <DigitalDocument key={`digital_document_${document.id}`} document={document} />}
                    {(document.document.type == 'file' && document.document.ext == 'pdf') && <PDFFile key={`digital_document_${document.id}`} document={document} />}
                    {(document.document.type == 'file' && msFiles.includes(document.document.ext)) && <MSDocument key={`digital_document_${document.id}`} document={document} />}
                </DialogContent>

            </Dialog>
        </>
    );
}

export default OpenDocument;