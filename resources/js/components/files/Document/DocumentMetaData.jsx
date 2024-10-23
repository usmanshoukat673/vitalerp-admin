import React, { useEffect, useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Col, Row } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axiosInstance from "../../../api/api";
import getFormatedDate from "../../../utils/getFormatedDate";
import { useSelector } from "react-redux";
import _ from "lodash";

const DocumentMetaData = ({ document }) => {

    const [version, setVersion] = useState('');
    const [classification, setClassification] = useState('');
    const [doc_owner, setOwner] = useState('');
    const [created, setCreated] = useState('');
    const [modified, setModified] = useState('');

    const { users } = useSelector((state) => ({
        users: state.orgs.company_users,
    }));

    useEffect(() => {
        if (!_.isEmpty(document)) {
            setVersion(document.version);
            setClassification(document.classification);
            setCreated(document.created_at);
            setModified(document.modified);
            setOwner(document.doc_owner);
        }
        else {
            setVersion('');
            setClassification('');
            setCreated('');
            setModified('');
            setOwner('');
        }
    }, [document]);

    const handleCreated = (value) => {
        setCreated(value);
        saveMetaData('created', getFormatedDate(value));
    }

    const handleModified = (value) => {
        setModified(value);
        saveMetaData('modified', getFormatedDate(value));
    }

    const handleVersion = (event) => {
        setVersion(event.target.value);
        saveMetaData('version', event.target.value);
    }

    const handleClassification = (event) => {
        setClassification(event.target.value);
        saveMetaData('classification', event.target.value);
    }

    const handleOwner = (event) => {
        setOwner(event.target.value);
        saveMetaData('doc_owner', event.target.value);
    }

    const saveMetaData = (field, value) => {
        axiosInstance.post(`/api/user/cjfm/save-meta-data`, {
            document_id: document.enc_id,
            field,
            value
        }).then(e => {

        }).catch(err => {

        });
    }

    return (
        <>
            <Row>
                <Col xs={4} md={4}>
                    <div>Document Verison</div>
                    <div>
                        <TextField value={version} onChange={handleVersion} size="small" fullWidth variant="outlined" />
                    </div>
                </Col>
                <Col xs={4} md={4}>
                    <div>Document Owner</div>
                    <div>
                        <FormControl fullWidth>
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
                    </div>
                </Col>
                <Col xs={4} md={4}>
                    <div>Document Classification</div>
                    <FormControl fullWidth>
                        <Select
                            labelId="Classification_level"
                            id="Classification_level"
                            size="small"
                            value={classification}
                            onChange={handleClassification}
                        >
                            <MenuItem value={`Level 1`}>Level 1</MenuItem>
                            <MenuItem value={`Level 2`}>Level 2</MenuItem>
                            <MenuItem value={`Level 3`}>Level 3</MenuItem>
                            <MenuItem value={`Level 4`}>Level 4</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
            </Row>
            <Row style={{ marginBottom: '15px' }}>
                <Col xs={4} md={4}>
                    <div>Document Created</div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                value={created}
                                renderInput={(params) => <TextField size="small" {...params} />}
                                onChange={handleCreated}
                            />
                        </LocalizationProvider>
                    </div>
                </Col>
                <Col xs={4} md={4}>
                    {
                        document.type === 'document' && <>
                            <div>Document Modified</div>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        value={modified}
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                        onChange={handleModified}
                                    />
                                </LocalizationProvider>
                            </div>
                        </>
                    }

                </Col>
            </Row>
        </>
    )
}

export default DocumentMetaData;