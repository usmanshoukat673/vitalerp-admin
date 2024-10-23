import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { setControlDocuments, setDomainDocuments, setUnlinkDocument } from '../../../../actions';
import axiosInstance from '../../../../api/api';
import { NotificationManager } from 'react-notifications';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UnlinkDocument() {

    const dispatch = useDispatch();

    const { domain_documents, control_documents, unlink_document, details_panel_type, standard, control, parent_domain, sub_domain } = useSelector((state) => ({
        domain_documents: state.compliance.domain_documents,
        control_documents: state.compliance.control_documents,
        unlink_document: state.compliance.unlink_document,
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
        setOpen(unlink_document?.open);
    }, [unlink_document]);

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            dispatch(setUnlinkDocument({
                open: false,
                company_document: {},
                from: ''
            }));
        }, 100);
    };

    const handleUnlink = () => {
        setLoading(true);

        let activity_object = {
            page: 'control',
        };

        if (details_panel_type === 'standard') {
            activity_object.page = 'standard';
        }
        else if (details_panel_type === 'domain') {
            activity_object.page = 'domain';
        }
        else if (details_panel_type === 'sub_domain') {
            activity_object.page = 'sub_domain';
        }
        else if (details_panel_type === 'control') {
            activity_object.page = 'control';
        }

        axiosInstance.post(`/api/user/cjfm/unlink-document`, {
            company_document_id: unlink_document.company_document.id,
            ...activity_object
        }).then(e => {
            if (unlink_document.from == 'domain') {
                let copy_domain_documents = [...domain_documents];
                _.remove(copy_domain_documents, doc => {
                    return doc.id === unlink_document.company_document.id;
                });
                dispatch(setDomainDocuments(copy_domain_documents));
            }
            else {
                let copy_control_documents = [...control_documents];
                _.remove(copy_control_documents, doc => {
                    return doc.id === unlink_document.company_document.id;
                });
                dispatch(setControlDocuments(copy_control_documents));
            }
            NotificationManager.success("Your document has been successfully unlinked.", 'Success:');
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
                aria-describedby="alert-dialog-slide-unlink-document"
            >
                <DialogTitle>{"Unlink Document?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-unlink-document">
                        Do you really want to unlink <b style={{ color: '#d50000' }}>{`${unlink_document?.company_document?.document?.name}`}</b> document?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleUnlink}>Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}