import React from 'react';
import _ from 'lodash';
import DownloadDocumentButton from '../DownloadDocumentButton';
import prettyBytes from 'pretty-bytes';
import { Link } from 'react-router-dom';
import { Card, Row} from 'react-bootstrap';

const DocumentListing = ({ documents, token }) => {
    return (
        _.size(documents) > 0 && _.map(documents, file => {
            return (
                <Card className="my-1 shadow-none border" key={file.document_id}>
                    <div className="p-2">
                        <Row className="align-items-center">
                            <div className="col-auto">
                                <div className="avatar-sm">
                                    <span className="avatar-title rounded">{file.document.ext}</span>
                                </div>
                            </div>
                            <div className="col ps-0">
                                <Link to="#" className="text-muted fw-bold">
                                    {file.document.name}
                                </Link>
                                <p className="mb-0">{file.document.size ? prettyBytes(file.document.size) : ''}</p>
                            </div>
                            <div className="col-auto">
                                <DownloadDocumentButton document={file.document} />
                            </div>
                        </Row>
                    </div>
                </Card>
            )
        })
    )
}

export default DocumentListing;
