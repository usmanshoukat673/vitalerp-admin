// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const FileUploader = (props) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    /**
     * Handled the accepted files and shows the preview
     */
    const handleAcceptedFiles = (files) => {
        var allFiles = files;

        if (props.showPreview) {
            files.map((file) =>
                Object.assign(file, {
                    preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
                    formattedSize: formatBytes(file.size),
                })
            );

            allFiles = [...selectedFiles];
            allFiles.push(...files);
            setSelectedFiles(allFiles);
        }

        if (props.onFileUpload) props.onFileUpload(allFiles);
    };

    /**
     * Formats the size
     */
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    /*
     * Removes the selected file
     */
    const removeFile = (file) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(newFiles.indexOf(file), 1);
        setSelectedFiles(newFiles);

        if (props.onFileUpload) props.onFileRemove(newFiles);
    };

    return (
        <>
            <Dropzone {...props} onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                        <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <i className="h3 text-muted dripicons-cloud-upload"></i>
                            <h5>Drop files here or click to upload.</h5>
                        </div>
                    </div>
                )}
            </Dropzone>

            {props.showPreview && selectedFiles.length > 0 && (
                <div className="dropzone-previews mt-3" id="uploadPreviewTemplate">
                    {(selectedFiles || []).map((f, i) => {
                        return (
                            <Card className="mt-1 mb-0 shadow-none border" key={i + '-file'}>
                                <div className="p-2">
                                    <Row className="align-items-center">
                                        {f.preview && (
                                            <Col className="col-auto">
                                                <img
                                                    data-dz-thumbnail=""
                                                    className="avatar-sm rounded bg-light"
                                                    alt={f.name}
                                                    src={f.preview}
                                                />
                                            </Col>
                                        )}
                                        {!f.preview && (
                                            <Col className="col-auto">
                                                <div className="avatar-sm">
                                                    <span className="avatar-title bg-primary rounded">
                                                        {f.type.split('/')[0]}
                                                    </span>
                                                </div>
                                            </Col>
                                        )}
                                        <Col className="ps-0">
                                            <Link to="#" className="text-muted fw-bold">
                                                {f.name}
                                            </Link>
                                            <p className="mb-0">
                                                <strong>{f.formattedSize}</strong>
                                            </p>
                                        </Col>
                                        <Col className="text-end">
                                            <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                                                <i className="dripicons-cross" onClick={() => removeFile(i)}></i>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </>
    );
};

FileUploader.defaultProps = {
    showPreview: true,
};

export default FileUploader;
