import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import _ from "lodash";
import { saveModuleDetails, setDeleteRecord } from '../../../actions';
import axiosInstance from '../../../api/api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteRecord = () => {

    const dispatch = useDispatch();

    const { delete_record, module_details } = useSelector((state) => ({
        delete_record: state.lanscape.delete_record,
        module_details: state.lanscape.module_details,
    }));

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setOpen(delete_record?.open)
    }, [delete_record]);

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(setDeleteRecord({
                open: false,
            }));
        }, 50);
    }

    const handleDelete = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/records/delete`, {
            record_id: delete_record.record?.id
        }).then(e => {

            let records_copy = [...module_details.records];

            _.remove(records_copy, rec => {
                return rec.id === delete_record.record?.id;
            });

            dispatch(saveModuleDetails({
                ...module_details,
                records: records_copy
            }));

            NotificationManager.success(`${delete_record?.record?.name} has been successfully remove`, 'Success');
            handleClose();
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
            }
            if (err.response.status === 500) {
                setErrors([]);
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-delete-document"
            >
                <DialogTitle>{"Delete Record"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-delete-document">
                        Do you really want to delete <b style={{ color: '#d50000' }}>{`${delete_record?.record?.name}`}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteRecord;