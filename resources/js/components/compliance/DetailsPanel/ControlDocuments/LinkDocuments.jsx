import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setControlDocuments, setLinkDocuments } from '../../../../actions';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axiosInstance from '../../../../api/api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const LinkDocuments = () => {

    const dispatch = useDispatch();

    const { link_documents, control_info } = useSelector((state) => ({
        company: state.orgs.company,
        link_documents: state.compliance.link_documents,
        control_info: state.compliance.control_info,
    }));

    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [all_documents, setAllDocuments] = React.useState([]);
    const [documents, setDocuments] = React.useState([]);

    React.useEffect(() => {
        setOpen(link_documents?.open)
    }, [link_documents]);

    React.useEffect(() => {
        axiosInstance.post(`/api/user/compliance/documents/to/link`).then(e => {
            setAllDocuments(e.data.documents);
        }).catch(err => {
        });
    }, [link_documents]);

    const handleChange = (event) => {
        setDocuments(event.target.value);
        setErrors([]);
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
            dispatch(setLinkDocuments({
                open: false,
            }));
        }, 100);
    }

    const handleSubmit = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/compliance/link/documents`, {
            control_id: control_info.control.control_id,
            standard_id: control_info.control.standard_id,
            standard_section_id: control_info.control.section_id,
            documents: documents,
        }).then(e => {
            setDocuments([]);
            dispatch(setControlDocuments(e.data.artifacts));
            handleClose();
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors([err.response.data.errors]);
            }
        }).finally(() => {
            setLoading(false);
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
                scroll='body'
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Link Documents
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
                    <FormControl sx={{ m: 1, width: 450 }}>
                        <InputLabel id="select-documents-field">Documents</InputLabel>
                        <Select
                            labelId="select-documents-field"
                            id="select-control-documents"
                            multiple
                            value={documents}
                            onChange={handleChange}
                            input={<OutlinedInput label="Document" />}
                            renderValue={(selected) => selected.map(id => all_documents.find(doc => doc.id === id).name).join(', ')}
                            // Render each MenuItem with the name property
                            MenuProps={MenuProps}
                        >
                            {all_documents.map((doc) => (
                                <MenuItem key={doc.id} value={doc.id}>
                                    <Checkbox checked={documents.indexOf(doc.id) > -1} />
                                    <ListItemText primary={doc.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {displayInputError('documents')}
                </DialogContent>
                <DialogActions>
                    <Button disabled={loading} onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogActions>


            </Dialog>
        </React.Fragment>
    );
}

export default LinkDocuments;