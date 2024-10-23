// @flow
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../../../../api/api';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';

const EditCommentForm = ({ comment_object, updated, showCancel, cancel }) => {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        setComment(comment_object.comment);
    }, [comment_object]);

    const handleChange = event => {
        setComment(event.target.value);
        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            setErrors(errors);
        }
    }

    const handlerInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    /**
     * Adds a comment to the server.
     *
     * @return {Promise<void>} A promise that resolves when the comment is added.
     */
    const updateComment = () => {
        setErrors([]);
        setLoading(true);
        axiosInstance.post(`/api/user/compliance/company-control-question/comments/update`, {
            comment: comment,
            comment_id: comment_object.id
        }).then(e => {
            setLoading(false);
            updated(e.data.comment);
            NotificationManager.success(e.data.message, 'Success');
            setComment('');
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
            }
        });
    }

    return (
        <form className="comment-area-box">
            <div>

                <textarea
                    rows="3"
                    name="comment"
                    className={`form-control form-control-light mb-2 resize-none ${handlerInputError('comment')}`}
                    placeholder="Your comment..."
                    onChange={handleChange}
                    value={comment}
                />

                {displayInputError('comment')}
            </div>

            <Box sx={{ display: 'flex', justifyItems: 'right', justifyContent: 'flex-end' }}>
                <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2, mr: 2 }} >
                    {
                        showCancel && <button onClick={cancel} type="button" className="btn btn-sm btn-default">
                            <i className="uil uil-times me-1"></i> Cancel
                        </button>
                    }
                    <Button onClick={updateComment} size='small' color="success" startIcon={<DoneAllTwoToneIcon />} variant="contained">Save</Button>
                </Stack>
            </Box>
        </form>
    );
}

export default EditCommentForm;
