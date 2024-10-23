import React from 'react';
import { Card } from 'react-bootstrap';

const MSDocument = ({ document }) => {

    let path = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURI(`${window.location.origin}/view-msfiles/${document.document.enc_id}/${document.document.name}`)}`;

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

export default MSDocument;