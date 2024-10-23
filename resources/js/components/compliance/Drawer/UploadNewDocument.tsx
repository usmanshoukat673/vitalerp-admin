import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { Form } from "semantic-ui-react";
import classNames from 'classnames';
import axiosInstance from "../../../api/api";

const UploadNewDocument = ({ cancled, created }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [file, setFile] = useState(null);

    const { token, company, last_active_section_id, standard } = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company,
        last_active_section_id: state.compliance.last_active_section_id,
        standard: state.leftnav.standard,
    }));

    const onFileChange = event => {
        setFile(event.target.files[0]);
        setErrors([]);
    };


    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'create__input error' : 'create__input';
    };

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleSubmit = () => {

        setLoading(true);

        const formData = new FormData();

        formData.append('file', file);
        formData.append('comp_id', company.id);
        formData.append('document_id', company.document.id);
        formData.append('standard_id', standard.standard_id);
        formData.append('section_id', last_active_section_id);

        axiosInstance.post(`/api/user/compliance/uplaod-document`, formData).then(e => {
            setLoading(false);
            created(e.data.section_documents);
            NotificationManager.success(e.data.message, 'Success');
        }).catch(err => {

            if (err.response.status === 404) {
                setLoading(false);
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors[0].file, 'Error');
            }

            if (err.response.status === 422) {
                setLoading(false);
                setErrors(errors.concat(err.response.data.errors));
            }

            if (err.response.status === 500) {
                setLoading(false);
                setErrors([]);
            }
        });
    }

    return (
        <>
            <div className='_drawer_box'>
                <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>Upload Document</Typography>
            </div>

            <div className="_drawer_box">
                <Form>
                    <Form.Field>
                        <input className={classNames(handlerInputError('file'))} disabled={loading} name="file" onChange={onFileChange} type="file" placeholder='File to Upload' />
                        {displayInputError('file')}
                    </Form.Field>
                </Form>
                <Stack spacing={2} direction="row" sx={{ mt: '10px' }}>
                    <Button size="medium" disabled={loading} color="secondary" onClick={handleSubmit} variant="contained">Upload</Button>
                    <Button size="medium" onClick={cancled} disabled={loading} variant="outlined">Cancel</Button>
                </Stack>
            </div>
        </>
    );
}

export default UploadNewDocument;