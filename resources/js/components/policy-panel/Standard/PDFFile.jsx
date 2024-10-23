import React from 'react';
import { Card } from 'react-bootstrap';

const PDFFile = ({ document }) => {
    let path = `${window.location.origin}/view-pdf/${document.document.enc_id}`;
    return (
        <Card className="m-1 shadow-none">
            <Card.Body>
                <div style={{ maxHeight: '21cm', overflow: 'scroll' }}>

                <iframe style={{ minHeight: '21cm', border: '0px', width: '100%' }} src={path}></iframe>
                </div>
            </Card.Body>
        </Card>
    )
}

export default PDFFile;