import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setControlDocuments, setDomainDocuments, setRenameDocument } from '../../../../actions';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../../../api/api';

export default function RenameDocument() {

    const dispatch = useDispatch();

    const { domain_documents, control_documents, rename_document, details_panel_type, standard, control, parent_domain, sub_domain } = useSelector((state) => ({
        domain_documents: state.compliance.domain_documents,
        control_documents: state.compliance.control_documents,
        rename_document: state.compliance.rename_document,
        details_panel_type: state.compliance.details_panel_type,
        control: state.compliance.control,
        standard: state.leftnav.standard,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
    }));

    const [open, setOpen] = useState(false);
    const [document_name, setDocumentName] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setDocumentName(rename_document?.document?.name);
        setOpen(rename_document?.open);
    }, [rename_document]);

    const handleChange = event => {
        setDocumentName(event.target.value);
        let copy_errors = [...errors];
        if (copy_errors.length > 0 && copy_errors[0].hasOwnProperty(event.target.name)) {
            delete copy_errors[0][event.target.name];
            setErrors(copy_errors);
        }
    };

    const handlerInputError = () => {
        return errors.some(error => error.hasOwnProperty('document_name')) ? true : false;
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            dispatch(setRenameDocument({
                open: false,
                document: {},
                from: ''
            }));
        }, 100);
    };

    const handleRenameDocument = () => {

        let activity_object = {
            page: 'Compliance',
            standard_id: null,
            section_id: null,
            control_id: null
        };

        if (details_panel_type === 'standard') {
            activity_object.standard_id = standard.standard_id;
            activity_object.page = 'standard';
        }
        else if (details_panel_type === 'domain') {
            activity_object.standard_id = standard.standard_id;
            activity_object.section_id = parent_domain.id;
            activity_object.page = 'domain';
        }
        else if (details_panel_type === 'sub_domain') {
            activity_object.standard_id = standard.standard_id;
            activity_object.section_id = sub_domain.id;
            activity_object.page = 'sub_domain';
        }
        else if (details_panel_type === 'control') {
            activity_object.control_id = control.id;
            activity_object.section_id = control.standard_section_id;
            activity_object.standard_id = standard.standard_id;
            activity_object.page = 'control';
        }

        setLoading(true);
        axiosInstance.post(`/api/user/cjfm/rename-document`, {
            document_id: rename_document.document.enc_id,
            document_name: document_name,
            ...activity_object
        }).then(e => {
            if (rename_document.from == 'domain') {
                let copy_domain_documents = [...domain_documents];
                let index = _.findIndex(domain_documents, doc => {
                    return doc.document.id === rename_document.document.id;
                });
                copy_domain_documents[index].document.name = e.data.document.name;
                copy_domain_documents[index].document.updated_at = e.data.document.updated_at;
                dispatch(setDomainDocuments(copy_domain_documents));
            }
            else {
                let copy_control_documents = [...control_documents];
                let index = _.findIndex(control_documents, doc => {
                    return doc.document.id === rename_document.document.id;
                });
                copy_control_documents[index].document.name = e.data.document.name;
                copy_control_documents[index].document.updated_at = e.data.document.updated_at;
                dispatch(setControlDocuments(copy_control_documents));
            }

            handleClose();
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors.document_name[0], 'Error');
            }
            if (err.response.status === 500) {
                setErrors([]);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Rename Document</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="document_name"
                        name="document_name"
                        label="Document Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={document_name}
                        onChange={handleChange}
                        error={handlerInputError()}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRenameDocument}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}