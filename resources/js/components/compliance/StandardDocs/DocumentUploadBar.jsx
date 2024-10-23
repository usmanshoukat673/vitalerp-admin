import React, { useRef, useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/api';
import { clearErrors } from '../../../api/errorUtils';
import { Button } from 'semantic-ui-react';

const DocumentUploadBar = ({uploaded}) => {

    const { standard, company } = useSelector((state) => ({
        standard: state.leftnav.standard,
        company: state.orgs.company,
    }));

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const onFileChange = event => {
        setFile(event.target.files[0]);
        setErrors([]);
        clearErrors(setErrors, 'file');
    };

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'file_input error' : 'file_input';
    };

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleSubmit = () => {

        setLoading(true);

        const formData = new FormData();

        formData.append('file', file);
        formData.append('comp_id', company.id);
        formData.append('document_id', company.document.id);
        formData.append('standard_id', standard.standard.id);

        axiosInstance.post(`/api/user/compliance/upload-standard-artifacts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(e => {
            setLoading(false);
            setFile(null);
            fileInputRef.current.value = '';
            setErrors([]);
            uploaded();
            // this.props.uploaded(e.data.section_documents, e.data.artifacts);
            NotificationManager.success(e.data.message, 'Success');
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 404) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors[0].file, 'Error');
            }

            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
            }
        });
    }

    return (
        <Row>
            <Col>
                <Card>
                    <input
                        className={handlerInputError('file')}
                        name="file"
                        type="file"
                        placeholder='Select File to Upload'
                        onChange={onFileChange}
                        ref={fileInputRef}
                    />
                    {displayInputError('file')}

                    {
                        file && <Button
                            positive
                            icon='cloud upload'
                            labelPosition='right'
                            content="Upload"
                            onClick={handleSubmit}
                            disabled={loading}
                        />
                    }
                </Card>
            </Col>
        </Row>
    )
}

export default DocumentUploadBar;