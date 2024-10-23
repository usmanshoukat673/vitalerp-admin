import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import { NotificationManager } from 'react-notifications';
// import fileSaver from '../../utils/fileSaver';
// import axiosInstance from '../../api/api';

const SharedWithUser = ({ user }) => {

    const [loading, setLoading] = React.useState(false);

    // const downloadAttachment = (e) => {
    //     setLoading(true);
    //     axiosInstance.get(`/api/user/whistleblows/reports/attachment/${file.id}`, {
    //         responseType: "blob"
    //     }).then(e => {
    //         setLoading(false);
    //         fileSaver(e.data, file.name);
    //     }).catch(err => {
    //         setLoading(false);
    //         if (err.response.status === 404) {
    //             NotificationManager.error("404, File not not found.", 'Error');
    //         }
    //     });
    // }   

    return (
        <ListItem>
            <ListItemText primary={`${user.email}`} />
        </ListItem>
    )
}

export default SharedWithUser;