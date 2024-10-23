import React, { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { setControlDocuments, setDomainDocuments, setOpenDocument } from '../../../actions';
import axiosInstance from '../../../api/api';
import getFormatedDate from '../../../utils/getFormatedDate';

const DocumentMeta = () => {

    const { users, open_document, domain_documents, control_documents } = useSelector((state) => ({
        users: state.orgs.company_users,
        open_document: state.compliance.open_document,
        domain_documents: state.compliance.domain_documents,
        control_documents: state.compliance.control_documents,
    }));

    const dispatch = useDispatch();

    const [classification, setClassification] = useState('');
    const [doc_owner, setOwner] = useState('');
    const [created, setCreated] = useState('');
    const [version, setVersion] = useState('');
    const [modified, setModified] = useState('');

    useEffect(() => {
        if (!_.isEmpty(open_document.document)) {
            setVersion((open_document.document.version == null ? '' : open_document.document.version));
            setClassification((open_document.document.classification == null ? '' : open_document.document.classification));
            setModified((open_document.document.modified == null ? '' : open_document.document.modified));
            setOwner((open_document.document.doc_owner == null ? '' : open_document.document.doc_owner));
        }
        else {
            setVersion('');
            setClassification('');
            setCreated('');
            setModified('');
            setOwner('');
        }
    }, [open_document]);

    const handleClassification = (event) => {
        setClassification(event.target.value);
        saveMetaData('classification', event.target.value);
    }

    const handleOwner = (event) => {
        setOwner(event.target.value);
        saveMetaData('doc_owner', event.target.value);
    }

    const handleCreated = (value) => {
        setCreated(value);
        saveMetaData('created', getFormatedDate(value));
    }

    const handleVersion = (event) => {
        setVersion(event.target.value);
        saveMetaData('version', event.target.value);
    }

    const handleModified = (value) => {
        setModified(value);
        saveMetaData('modified', getFormatedDate(value));
    }

    const saveMetaData = (field, value) => {
        axiosInstance.post(`/api/user/cjfm/save-meta-data`, {
            document_id: open_document.document.enc_id,
            field,
            value
        }).then(e => {
            if (open_document.from == 'domain') {
                let copy_domain_documents = [...domain_documents];
                let index = _.findIndex(domain_documents, doc => {
                    return doc.document.id === open_document.document.id;
                });

                copy_domain_documents[index].document.version = e.data.version;
                copy_domain_documents[index].document.classification = e.data.classification;
                copy_domain_documents[index].document.modified = e.data.modified;
                copy_domain_documents[index].document.updated_at = e.data.updated_at;
                copy_domain_documents[index].document.created_at = e.data.created_at;
                copy_domain_documents[index].document.doc_owner = e.data.doc_owner;
                copy_domain_documents[index].document.docowner = e.data.docowner;
                dispatch(setDomainDocuments(copy_domain_documents));
            }
            else {
                let copy_control_documents = [...control_documents];
                let index = _.findIndex(control_documents, doc => {
                    return doc.document.id === open_document.document.id;
                });

                copy_control_documents[index].document.version = e.data.version;
                copy_control_documents[index].document.classification = e.data.classification;
                copy_control_documents[index].document.modified = e.data.modified;
                copy_control_documents[index].document.updated_at = e.data.updated_at;
                copy_control_documents[index].document.created_at = e.data.created_at;
                copy_control_documents[index].document.doc_owner = e.data.doc_owner;
                copy_control_documents[index].document.docowner = e.data.docowner;
                dispatch(setControlDocuments(copy_control_documents));
            }

            let copy_open_document = [...open_document];
            open_document.document.version = e.data.version;
            open_document.document.classification = e.data.classification;
            open_document.document.created_at = e.data.created_at;
            open_document.document.modified = e.data.modified;
            open_document.document.doc_owner = e.data.doc_owner;
            open_document.document.docowner = e.data.docowner;
            dispatch(setOpenDocument(copy_open_document));

        }).catch(err => {

        });
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl>
                <label>Owner:</label>
                <Select
                    labelId="document_owner"
                    id="document_owner"
                    size="small"
                    value={doc_owner}
                    onChange={handleOwner}
                >
                    {
                        _.map(users, user => <MenuItem key={user.id} value={user.user.id}>{`${user.user.first_name} ${user.user.last_name}`}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl>
                <label>Verison:</label>
                <TextField value={version} onChange={handleVersion} size="small" fullWidth variant="outlined" />
            </FormControl>
            <FormControl>
                <label>Classification:</label>
                <Select
                    labelId="Classification_level"
                    id="Classification_level"
                    size="small"
                    value={classification}
                    onChange={handleClassification}
                >
                    <MenuItem value={`Level 1 - Public`}>Level 1 - Public</MenuItem>
                    <MenuItem value={`Level 2 - Internal`}>Level 2 - Internal</MenuItem>
                    <MenuItem value={`Level 3 - Confidential`}>Level 3 - Confidential</MenuItem>
                </Select>
            </FormControl>

            {/* <FormControl>
                <label>Created:</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        value={created}
                        renderInput={(params) => <TextField size="small" {...params} />}
                        onChange={handleCreated}
                    />
                </LocalizationProvider>
            </FormControl> */}

            <FormControl>
                <label>Date:</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        value={modified}
                        renderInput={(params) => <TextField size="small" {...params} />}
                        onChange={handleModified}
                    />
                </LocalizationProvider>
            </FormControl>
        </Box>
    );
}

export default DocumentMeta;