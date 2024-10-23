import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { msFiles } from "../../../../utils";

const UploadedDocumentViewMode = ({ document }) => {

    const { open_document } = useSelector((state) => ({
        open_document: state.compliance.open_document,
    }));

    const [path, setPath] = useState('');

    useEffect(() => {
        if (msFiles.includes(open_document.document.ext)) {
            setPath(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURI(`${window.location.origin}/view-msfiles/${open_document.document.enc_id}/${open_document.document.name}`)}`)
        }
        else if (open_document.document.ext == 'pdf') {
            setPath(`${window.location.origin}/view-pdf/${open_document.document.enc_id}`);
        }
    }, [open_document]);

    return (
        <>
            <div style={{ maxHeight: 'calc(100vh - 73px)', overflow: 'scroll' }}>
                <iframe style={{ minHeight: 'calc(100vh - 73px)', border: '0px', width: '100%' }} src={path}></iframe>
            </div>
        </>
    )
}

export default UploadedDocumentViewMode;