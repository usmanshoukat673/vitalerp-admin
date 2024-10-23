// @flow
import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import _ from 'lodash';

// components
import FileUploader from '../../sub-components/FileUploader';

const Uploads = ({handleUpload}) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <h5 className="card-title mb-3">Attachments</h5>
                    <FileUploader
                        onFileUpload={(files) => {
                            handleUpload(files);
                        }}
                    />
                </Card.Body>
            </Card>
        </>
    );
};

export default Uploads;
