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
import { saveRecordDetails, setDeleteRelatedRecord } from '../../../actions';
import axiosInstance from '../../../api/api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteRelatedRecord = () => {

    const dispatch = useDispatch();

    const { delete_related_record, record_details } = useSelector((state) => ({
        delete_related_record: state.lanscape.delete_related_record,
        record_details: state.lanscape.record_details,
    }));

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setOpen(delete_related_record?.open)
    }, [delete_related_record]);

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(setDeleteRelatedRecord({
                open: false,
            }));
        }, 50);
    }

    const handleDelete = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/records/related/delete`, {
            record_id: delete_related_record?.record?.record_id,
            related_record_id: delete_related_record?.record?.related_record_id
        }).then(e => {

            let relatedrecords_copy = [...record_details.relatedrecords];

            _.remove(relatedrecords_copy, rec => {
                return rec.record_id === delete_related_record?.record?.record_id && rec.related_record_id === delete_related_record?.record?.related_record_id;
            });

            dispatch(saveRecordDetails({
                ...record_details,
                relatedrecords: relatedrecords_copy
            }));

            NotificationManager.success(`${delete_related_record?.name} has been successfully remove`, 'Success');
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
                <DialogTitle>{"Remove Record"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-delete-document">
                        Do you really want to remove <b style={{ color: '#d50000' }}>{`${delete_related_record?.name}`}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Remove</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteRelatedRecord;