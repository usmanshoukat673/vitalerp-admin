// @flow
import React, {useState} from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { NotificationManager } from 'react-notifications';
import Axios from 'axios';
import axiosInstance from '../../api/api';


const DeleteDocumentButton = ({task_document, deleted}) => {
    const [loading, setLoading] = useState(false);

    const deleteDocument = () => {
        axiosInstance.post(`/api/user/tasks/delete/attachment`, {
            document_id: task_document.document_id,
            comp_id: task_document.comp_id,
            task_id: task_document.task_id,
        }).then(e => {
            setLoading(false);
            deleted(task_document);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 422) {
                NotificationManager.error(err.response.data.errors[0].document, 'Error');
            }
        });
    }


    return (
        <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Delete</Tooltip>}>
            <a
                id="btn-Delete"
                onClick={deleteDocument}
                className="btn btn-link text-danger btn-lg p-0">
                <i className="uil uil-multiply"></i>
            </a>
        </OverlayTrigger>
    );
}

export default DeleteDocumentButton;
