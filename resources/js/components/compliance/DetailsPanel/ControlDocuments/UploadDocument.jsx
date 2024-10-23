import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setControlDocuments, setUploadDocument } from '../../../../actions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { Form } from 'semantic-ui-react';
import axiosInstance from '../../../../api/api';
import { NotificationManager } from 'react-notifications';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UploadDocument = () => {

    const dispatch = useDispatch();

    const { company, control_documents, upload_document, control_info } = useSelector((state) => ({
        company: state.orgs.company,
        control_documents: state.compliance.control_documents,
        upload_document: state.compliance.upload_document,
        control_info: state.compliance.control_info,
    }));

    const [errors, setErrors] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);

    React.useEffect(() => {
        setOpen(upload_document?.open)
    }, [upload_document]);

    const onFileChange = event => {
        setFile(event.target.files[0]);
        setErrors([]);
    };

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'file_input error' : 'file_input';
    };


    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(setUploadDocument({
                open: false,
            }));
        }, 100);
    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comp_id', company.id);
        formData.append('document_id', company.document.id);
        formData.append('control_id', control_info.control.control_id);
        formData.append('standard_id', control_info.control.standard_id);
        formData.append('standard_section_id', control_info.control.section_id);

        axiosInstance.post(`/api/user/compliance/upload-artifacts`, formData).then(e => {
            // load artifacts if needed
            let copy_control_documents = [...control_documents];
            copy_control_documents.push(e.data.control_artifact);
            dispatch(setControlDocuments(copy_control_documents));
            NotificationManager.success(e.data.message, 'Success');
            handleClose();
        }).catch(err => {
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
        <React.Fragment>
            <Dialog
                fullWidth
                size="md"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-describedby="Upload document"
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Upload Document
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Form>
                        <Form.Field>
                            <input
                                className={handlerInputError('file')}
                                name="file" onChange={onFileChange} type="file" placeholder='File to Upload' />
                            {displayInputError('file')}
                        </Form.Field>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button disabled={!file} onClick={handleUpload} startIcon={<CloudUploadIcon />}>
                        Upload
                    </Button>
                </DialogActions>


            </Dialog>
        </React.Fragment>
    );
}

export default UploadDocument;