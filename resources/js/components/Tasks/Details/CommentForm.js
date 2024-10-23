// @flow
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../api/api';


const CommentForm = ({ task, created, parent, showCancel, cancel }) => {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');

    const { token } = useSelector((state) => ({
        token: state.token.activeToken
    }));

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
        axiosInstance.post(`/api/user/tasks/comments/add`, {
            comp_id: task.comp_id,
            task_id: task.id,
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
            <textarea
                rows="3"
                name="comment"
                className={`form-control border-0 resize-none ${handlerInputError('comment')}`}
                placeholder="Your comment..."
                onChange={handleChange}
                value={comment}
            />
            {displayInputError('comment')}
            <div className="p-2 bg-light d-flex justify-content-between align-items-center">
                <div>
                    {
                        /**
                         * <Link to="#" className="btn btn-sm px-1 btn-light">
                        <i className="uil uil-cloud-upload"></i>
                    </Link>
                    <Link to="#" className="btn btn-sm px-1 btn-light">
                        <i className="uil uil-at"></i>
                    </Link>
                         */
                    }
                </div>
                <div>
                    {
                        showCancel && <button onClick={cancel} type="button" className="btn btn-sm btn-default">
                            <i className="uil uil-times me-1"></i> Cancel
                        </button>
                    }

                    <button onClick={addComment} type="button" className="btn btn-sm btn-success">
                        <i className="uil uil-message me-1"></i>Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CommentForm;
