// @flow
import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import prettyBytes from 'pretty-bytes';

// components
import FileUploader from '../../sub-components/FileUploader';
import DownloadDocumentButton from '../DownloadDocumentButton';
import _ from 'lodash';

const TaskAttachments = ({documents, handleUpload, token}) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <h5 className="card-title mb-3">Attachments</h5>
                    <FileUploader
                        onFileUpload={(files) => {
                            handleUpload(files);
                        }}
                        showPreview={false}
                    />

                    {/* Files */}
                    {
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
                    }


                </Card.Body>
            </Card>
        </>
    );
};

export default TaskAttachments;
