// @flow
import React, {useState} from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { NotificationManager } from 'react-notifications';
import fileSaver from '../../utils/fileSaver';
import axiosInstance from '../../api/api';


const DownloadDocumentButton = ({document}) => {

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const downloadFile = (document) => {
        axiosInstance.get(`/api/user/cjfm/download-file/${document.enc_id}`, {
            responseType: "blob",
        }).then(e => {

            fileSaver(e.data, document.name);

        }).catch(err => {
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
                NotificationManager.error(err.response.data.errors[0].folder_name, 'Error');
            }

            if (err.response.status === 500) {
                setErrors([]);
                setLoading(false);
            }
        });
    }


    return (
        <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Download</Tooltip>}>
            <a
                onClick={() => {downloadFile(document)}}
                id="btn-download"
                className="btn btn-link text-muted btn-lg p-0 me-1">
                <i className="uil uil-cloud-download"></i>
            </a>
        </OverlayTrigger>
    );
}

export default DownloadDocumentButton;
