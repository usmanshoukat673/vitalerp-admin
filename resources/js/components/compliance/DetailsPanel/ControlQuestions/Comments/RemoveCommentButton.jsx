import React from "react";
import Button from '@mui/material/Button';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import axiosInstance from "../../../../../api/api";
import { NotificationManager } from "react-notifications";

const RemoveCommentButton = ({ question_id, comment_id, removed }) => {

    const handleClick = () => {
        axiosInstance
            .delete(`/api/user/compliance/company-control-question/comments/${question_id}/${comment_id}`)
            .then(res => {

                removed(res.data.comments);

                NotificationManager.success(res.data.message, 'Success', 3000);
            })
            .catch(err => {
                NotificationManager.error(err.response.data.message, 'Error', 3000);
            });
    }

    return (
        <Button sx={{ textTransform: 'capitalize' }} onClick={handleClick} variant="text" size='small'>
            Remove
        </Button>
    )
}

export default RemoveCommentButton;