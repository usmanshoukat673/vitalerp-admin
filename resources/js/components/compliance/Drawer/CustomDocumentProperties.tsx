import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { BiRename } from "react-icons/bi";
import { Box, Divider, IconButton, Stack, Typography, TextField } from '@mui/material';
import RenameDocumentOnDemand from '../../files/Options/RenameDocumentOnDemand';
import { useSelector } from 'react-redux';
import AssignControlsOnDemand from '../../files/Options/AssignControlsOnDemand';
import showTZDate from '../../../utils/showTZDate';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import ReviewDates from './ReviewDates.tsx';
import _ from 'lodash';
import axiosInstance from '../../../api/api.jsx';


const CustomDocumentProperties = ({ document, renamed, documentUpdated }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [rename, setRename] = useState(false);
    const [doc, setDoc] = useState({});


    const { token, company, standards } = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company,
        standards: state.compliance.standards,
    }));

    useEffect(() => {
        setLoading(true);

        axiosInstance.get(`/api/user/cjfm/view-document/${document.id}`).then(e => {
            setDoc(e.data.document);
        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors[0].document_name, 'Error');
            }
        }).finally(() => {
            setLoading(false);
            setErrors([]);
        });

    }, []);

    const renameDocument = () => {
        setRename(true);
    }

    const cancelRename = () => {
        setRename(false);
    }

    const handleRenamed = document => {
        setRename(false);
        renamed(document);
    }

    return (
        <Box>
            <div className='_drawer_box'>
                <Typography gutterBottom sx={{ fontWeight: '500', fontSize: '18px', lineHeight: '15px' }}>Document Properties</Typography>
            </div>

            <div className='_drawer_box'>
                <IconButton color={rename ? 'secondary' : 'default'} onClick={renameDocument} aria-label="delete">
                    <BiRename />
                </IconButton>
                <AssignControlsOnDemand document={document} />
            </div>

            {rename && <RenameDocumentOnDemand document={document} renamed={handleRenamed} cancled={cancelRename} />}

            <div className='_drawer_box'>
                <ReviewDates document={document} saved={documentUpdated} />
            </div>

            <div className='_drawer_box'>
                <Typography sx={{ pl: '10px' }} gutterBottom>Owner</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', justifyItems: 'center', alignItems: 'center', pr: '10px' }}>
                    <Typography variant="overline" sx={{ pl: '15px' }} display="block" gutterBottom>
                        {!_.isEmpty(document.owner) ? `${document.owner.first_name} ${document.owner.last_name}` : 'Null'}
                    </Typography>

                    <IconButton aria-label="Change Owner" color="success" size="small">
                        <BorderColorSharpIcon fontSize="small" />
                    </IconButton>
                </Box>
            </div>

            <div className='_drawer_box'>
                <Typography sx={{ pl: '10px' }} gutterBottom>Date {document.type == 'document' ? 'Created' : 'Uploaded'}</Typography>

                <Typography variant="overline" sx={{ pl: '15px' }} display="block" gutterBottom>
                    {showTZDate(document.created_at, company.timezone)}
                </Typography>

            </div>

            {
                document.type == 'document' && <div className='_drawer_box'>
                    <Typography sx={{ pl: '10px' }} gutterBottom>Last Modified</Typography>

                    <Typography variant="overline" sx={{ pl: '15px' }} display="block" gutterBottom>
                        {showTZDate(document.updated_at, company.timezone)}
                    </Typography>
                </div>
            }

        </Box>
    );
}

export default CustomDocumentProperties;
