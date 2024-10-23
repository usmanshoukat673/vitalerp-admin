import React, { useEffect, useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import DocumentUploadBar from './DocumentUploadBar';
import Document from './Document';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './StandardDocuments.scss';
import axiosInstance from '../../../api/api';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

const StandardDocuments = () => {

    const { standard } = useSelector((state) => ({
        standard: state.leftnav.standard,
    }));

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [next_page_url, setNextPageUrl] = useState(null);
    const [prev_page_url, setPrevPageUrl] = useState(null);

    const fetchDocuments = (page) => {
        axiosInstance.get(`/api/user/compliance/standard-artifacts/${standard.standard.id}?page=${page}`)
            .then(e => {
                setErrors([]);
                setLoading(false);
                setDocuments(e.data.data);
                setActivePage(e.data.current_page);
                setNextPageUrl(e.data.next_page_url);
                setPrevPageUrl(e.data.prev_page_url);
            });
    }

    useEffect(() => {
        fetchDocuments(activePage);
    }, [standard]);

    const prev = () => {
        fetchDocuments(activePage - 1);
    }

    const next = () => {
        fetchDocuments(activePage + 1);
    }

    const handleUpload = () => {
        fetchDocuments(activePage);
    }

    return (
        <>
            <Row>
                <Col className='standard_documents__header'>
                    <Typography variant="overline" display="block" gutterBottom>
                        Documents
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <IconButton aria-label="Previous" disabled={prev_page_url == null} onClick={prev}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton aria-label="Next" disabled={next_page_url === null} onClick={next}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Stack>
                </Col>
            </Row>
            <Grid container className='__standard_documents__list'>
                {
                    _.map(documents, document => (
                        <Grid key={document.id} spacing={2} sx={{ maxWidth: 259 }} className='__Document'>
                            <Document document={document} />
                        </Grid>
                    ))
                }

            </Grid>
            <Row>
                <Col className='mt-1'>
                    <DocumentUploadBar uploaded={handleUpload} />
                </Col>
            </Row>
        </>
    )
}

export default StandardDocuments;