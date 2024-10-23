// @flow
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../../../api/api';


const CommentForm = ({ control, created, parent, showCancel, cancel }) => {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');

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

    const addComment = () => {
        setErrors([]);
        setLoading(true);
        axiosInstance.post(`/api/user/compliance/control-profile/comments/add`, {
            control_id: control.id,
            comment: comment,
            parent: parent
        }).then(e => {
            setLoading(false);
            created(e.data.comment);
            NotificationManager.success('Your Comment has been submitted!', 'Success');
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

            <div className="text-end">
                    {/* <div className="btn-group mb-2">
                        <button type="button" className="btn btn-link btn-sm text-muted font-18">
                            <i className="dripicons-paperclip"></i>
                        </button>
                    </div> */}

                    {
                        showCancel && <button onClick={cancel} type="button" className="btn btn-sm btn-default">
                            <i className="uil uil-times me-1"></i> Cancel
                        </button>
                    }

                    <div className="btn-group mb-2 ms-2">
                        <button type="button" onClick={addComment} className="btn btn-success btn-sm">
                            <i className="uil uil-message me-1"></i>Submit
                        </button>
                    </div>
            </div>
        </form>
    );
}

export default CommentForm;
