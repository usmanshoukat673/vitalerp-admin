import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DocumentMetaData from '../../files/Document/DocumentMetaData';

function findDocumentObject(objects) {

    let foundObject = _.find(objects, (object) => {
        return object.document.type === 'document';
    });

    return foundObject || {}; // Return the found object or null if not found
}

const DefaultDocument = ({ artifacts, openDocument }) => {

    const [document, setDocument] = useState({});

    useEffect(() => {
        setDocument(findDocumentObject(artifacts));
    }, [artifacts]);

    const sanitizedHtml = () => {
        if (!_.isEmpty(document)) {
            return DOMPurify.sanitize(document.document.content);
        }
        return '<p>Empty Document.</p>';
    }

    const edit = () => {
        openDocument(document.document, true);
    }

    return (
        <>
            <Card>
                <Card.Body>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {!_.isEmpty(document) && <h1 style={{ color: 'rgb(32, 33, 36)', fontSize: '32px', marginBottom: '24px', letterSpacing: 'normal' }}>{document.document.name}</h1>}

                        {
                            !_.isEmpty(document) && <IconButton color="primary" onClick={edit} aria-label="edit document" >
                                <EditIcon />
                            </IconButton>
                        }
                    </div>

                    {
                        !_.isEmpty(document) && <DocumentMetaData document={document.document} /> 
                    }

                    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml() }}></div>
                </Card.Body>
            </Card>
        </>

    );
}

export default DefaultDocument;