import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { setCreateDocument, setLinkDocuments, setUploadDocument } from '../../../../actions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddLinkIcon from '@mui/icons-material/AddLink';

const DocumentProvider = () => {

    const dispatch = useDispatch();

    const handleCreateDocument = () => {
        dispatch(setCreateDocument({
            open: true,
            from: 'control',
            document: { id: 0, name: '--New Docoument--', content: '', type: 'document' }
        }));
    }

    const handleUploadDocument = () => {
        dispatch(setUploadDocument({
            open: true,
        }));
    }

    const handleLinkDocuments = () => {
        dispatch(setLinkDocuments({
            open: true,
        }));
    }

    return (
        <>
            <div className="__docs__buttons">
                <Stack direction="row" spacing={2}>
                    <Button onClick={handleUploadDocument} variant="contained" sx={{ height: '33.4375px' }} size='medium' startIcon={<CloudUploadIcon />}>
                        Upload Document
                    </Button>
                    <Button onClick={handleLinkDocuments} variant="contained" sx={{ height: '33.4375px' }} size='medium' startIcon={<AddLinkIcon />}>
                        Link Document
                    </Button>
                    <Button variant="contained" onClick={handleCreateDocument} sx={{ height: '33.4375px' }} size='medium' startIcon={<AddIcon />} >
                        Create Document
                    </Button>
                </Stack>
            </div>
        </>
    )
}

export default DocumentProvider;