import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';

const FileColoredIcon = ({ document }) => {

    const [color, setColor] = useState('#ccc');

    useEffect(() => {
        if (['ppt', 'pptx'].includes(document.ext)) {
            setColor("#d14628");
        }
        else if (['pdf'].includes(document.ext)) {
            setColor("#ed0008");
        }
        else if (['xls', 'xlsx', 'csv'].includes(document.ext)) {
            setColor("#1e6c3f");
        }
        else if (['doc', 'docx'].includes(document.ext)) {
            setColor("#325599");
        }
        else if (['odp'].includes(document.ext)) {
            setColor("#77e7fc");
        }
        else if (['ods'].includes(document.ext)) {
            setColor("#609ee8");
        }
        else if (['odt'].includes(document.ext)) {
            setColor("#0f8fd7");
        }
        else if (['rtf'].includes(document.ext)) {
            setColor("#f35244");
        }
        else {
            setColor("#34beef");
        }
    }, [document]);

    return (
        <Avatar sx={{ bgcolor: color }} aria-label="recipe">
            {`${document.ext}`}
        </Avatar>
    )
}

export default FileColoredIcon;