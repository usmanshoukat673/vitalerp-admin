import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { setControlDocuments, setDeleteDocument, setDomainDocuments } from '../../../../actions';
import axiosInstance from '../../../../api/api';
import { NotificationManager } from 'react-notifications';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDocument() {

    const dispatch = useDispatch();

    const { domain_documents, control_documents, delete_document, details_panel_type, standard, control, parent_domain, sub_domain } = useSelector((state) => ({
        domain_documents: state.compliance.domain_documents,
        control_documents: state.compliance.control_documents,
        delete_document: state.compliance.delete_document,
        details_panel_type: state.compliance.details_panel_type,
        control: state.compliance.control,
        standard: state.leftnav.standard,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
    }));

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setOpen(delete_document?.open);
    }, [delete_document]);

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            dispatch(setDeleteDocument({
                open: false,
                document: {},
                from: ''
            }));
        }, 100);
    };

    const handleDelete = () => {
        setLoading(true);

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

        axiosInstance.post(`/api/user/cjfm/delete-document`, {
            document_id: delete_document.document.enc_id,
            ...activity_object
        }).then(e => {
            if (delete_document.from == 'domain') {
                let copy_domain_documents = [...domain_documents];
                _.remove(copy_domain_documents, doc => {
                    return doc.document.id === delete_document.document.id;
                });
                dispatch(setDomainDocuments(copy_domain_documents));
            }
            else {
                let copy_control_documents = [...control_documents];
                _.remove(copy_control_documents, doc => {
                    return doc.document.id === delete_document.document.id;
                });
                dispatch(setControlDocuments(copy_control_documents));
            }
            NotificationManager.success("Your document has been successfully deleted.", 'Deletion Successful');
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
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-delete-document"
            >
                <DialogTitle>{"Delete Document?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-delete-document">
                        Do you really want to delete <b style={{color: '#d50000'}}>{`${delete_document?.document?.name}`}</b>, you won't be able to recover?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}