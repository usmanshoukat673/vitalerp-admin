import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Document from './Document';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import portalAxiosInstance from '../../../../api/portalApi';
import './StandardDocuments.scss';
import OpenDocument from './OpenDocument';

const StandardDocuments = () => {

    const { active_standard } = useSelector((state) => ({
        active_standard: state.policyportal.active_standard
    }));

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [next_page_url, setNextPageUrl] = useState(null);
    const [prev_page_url, setPrevPageUrl] = useState(null);

    const [active_document, setActiveDocument] = useState({});

    const fetchDocuments = (page) => {
        portalAxiosInstance.get(`/standard-artifacts/${active_standard.id}?page=${page}`)
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
    }, [active_standard]);

    const prev = () => {
        fetchDocuments(activePage - 1);
    }

    const next = () => {
        fetchDocuments(activePage + 1);
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
            <Grid container className='__standard_documents__list' style={{marginBottom: '20px'}}>
                {
                    _.map(documents, document => (
                        <Grid key={document.id} spacing={2} sx={{ maxWidth: 259 }} className='__Document'>
                            <Document document={document} open={setActiveDocument} />
                        </Grid>
                    ))
                }
            </Grid>

            {
                !_.isEmpty(active_document) && <OpenDocument document={active_document} close={() => setActiveDocument({})} /> 
            }
        </>
    )
}

export default StandardDocuments;