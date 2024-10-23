// @flow
import React, {useState} from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../api/api';


const DeleteDocumentButton = ({project_document, deleted}) => {
    const [loading, setLoading] = useState(false);

    const deleteDocument = () => {
        axiosInstance.post(`/api/user/projects/delete/attachment`, {
            document_id: project_document.document_id,
            comp_id: project_document.comp_id,
            project_id: project_document.project_id,
        }).then(e => {
            setLoading(false);
            deleted(project_document);
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
