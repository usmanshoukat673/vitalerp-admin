import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ListItemButton from '@mui/material/ListItemButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import fileSaver from '../../utils/fileSaver';
import { NotificationManager } from 'react-notifications';

const Attachment = ({ file }) => {

    const params = useParams();
    const [loading, setLoading] = React.useState(false);

    const downloadAttachment = (e) => {
        setLoading(true);
        axios.get(`/whistleblows/report/attachment/${file.id}`, {
            responseType: "blob",
            headers: {
                'Custom-Whistle-Report-Link': params.id
            }
        }).then(e => {
            setLoading(false);
            fileSaver(e.data, file.name);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 404) {
                NotificationManager.error("404, File not not found.", 'Error');
            }
        });
    }   

    return (
        <ListItemButton
        onClick={downloadAttachment}
        disabled={loading}
    >
        <ListItemIcon>
            <AttachFileIcon />
        </ListItemIcon>
        <ListItemText
            primary={`${file.name}`}
        />
    </ListItemButton>
    )
}

export default Attachment;