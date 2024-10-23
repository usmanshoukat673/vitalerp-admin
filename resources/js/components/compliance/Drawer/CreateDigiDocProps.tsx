import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';
import axiosInstance from "../../../api/api";

const CreateDigiDocProps = ({cancled, newDocumentData, created}) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [document_name, setDocumentName] = useState('');

    const { company, last_active_section_id, standard } = useSelector(state => ({
        company: state.orgs.company,
        last_active_section_id: state.compliance.last_active_section_id,
        standard: state.leftnav.standard,
    }));

    const handleChange = event => {
        setDocumentName(event.target.value);
        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            setErrors(errors);
        }
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
    

        if(_.isEmpty(document_name))
        {
            setErrors([{'document_name' : ["Document Name is required"]}]);
            return;
        }

        setLoading(true);

        if(last_active_section_id > 0)
        {
            axiosInstance.post(`/api/user/compliance/create-digi-document`, {
                name: document_name,
                section_id: last_active_section_id,
                standard_id: standard.standard_id,
                document_id: company.document.id,
                content: newDocumentData // needs to validated after dicussion
            }).then(e => {
                // saved
                // close the new doc and save doc
                // reload docs for current active section
                setLoading(false);
                created(e.data.section_documents);
    
            }).catch(err => {
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
        else{
            NotificationManager.error('UI Error, section not found/active.', 'Error');
        }
    }

    return (
        <>
            <div className='_drawer_box'>
                <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>Create Document</Typography>
            </div>

            <div className="_drawer_box">
                <TextField id="document_name" name='document_name' fullWidth value={document_name}
                    onChange={handleChange} label="Document Name" variant="outlined" className={handlerInputError('document_name')} />
                    {displayInputError('document_name')}
                    {displayInputError('content')}

                <Stack spacing={2} direction="row" sx={{ mt: '10px' }}>
                    <Button size="medium" color="secondary" disabled={loading} onClick={handleSubmit} variant="contained">Submit</Button>
                    <Button size="medium" onClick={cancled} disabled={loading} variant="outlined">Cancel</Button>
                </Stack>
            </div>
        </>
    );
}

export default CreateDigiDocProps;