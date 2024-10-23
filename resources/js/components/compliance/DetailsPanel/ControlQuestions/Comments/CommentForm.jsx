// @flow
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../../../../api/api';
import { MentionsInput, Mention } from 'react-mentions';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

const CommentForm = ({ question, created, parent, showCancel, cancel }) => {
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

    /**
     * Adds a comment to the server.
     *
     * @return {Promise<void>} A promise that resolves when the comment is added.
     */
    const addComment = () => {
        setErrors([]);
        setLoading(true);
        axiosInstance.post(`/api/user/compliance/company-control-question/comments`, {
            company_control_question_id: question.id,
            comment: comment,
            parent_id: parent
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

    const [suggestions, setSuggestions] = useState([]);

    const fetchUsers = async (query) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;
        return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
    };


    const users = [
        { id: '1', display: 'John Doe' },
        { id: '2', display: 'Jane Smith' },
        { id: '3', display: 'Alice Johnson' },
    ];

    const handleFetchSuggestions = async (query, callback) => {
        const users = await fetchUsers(query);
        callback(users.map(user => ({ id: user.id, display: user.name })));
    };

    return (
        <form className="comment-area-box">
            <div>

                {/* <textarea
                        rows="3"
                        name="comment"
                        className={`form-control form-control-light mb-2 resize-none ${handlerInputError('comment')}`}
                        placeholder="Your comment..."
                        onChange={handleChange}
                        value={comment}
                    /> */}

                <MentionsInput
                    value={comment}
                    onChange={handleChange}
                    placeholder="Type your comment and use @ to mention someone"
                    style={{ height: '100px', margin: '10px 0px', input: { padding: '10px', width: '100%' } }}
                >
                    <Mention
                        trigger="@"
                        data={users}
                        displayTransform={(id, display) => `@${display}`}
                        style={{
                            mention: { backgroundColor: '#daf4fa' },
                            suggestions: { list: { backgroundColor: 'white', border: '1px solid #ddd', margin: '10px' }, item: { padding: '15px 10px', borderBottom: '1px solid #ddd', cursor: 'pointer' } },
                        }}
                    />
                </MentionsInput>


                {/* <MentionsInput
                    id="comment"
                    value={comment}
                    onChange={handleChange}
                    placeholder="Type your comment and use @ to mention someone"
                    style={{ input: { border: '1px solid #ddd', padding: '10px', width: '400px' } }}
                >
                    <Mention
                        trigger="@"
                        data={handleFetchSuggestions}
                        displayTransform={(id, display) => `@${display}`}
                        style={{
                            mention: { backgroundColor: '#daf4fa' },
                            suggestions: { list: { backgroundColor: 'white', border: '1px solid #ddd' }, item: { padding: '5px 10px', borderBottom: '1px solid #ddd', cursor: 'pointer' } },
                        }}
                        className={`form-control form-control-light mb-2 resize-none ${handlerInputError('comment')}`}
                    />
                </MentionsInput> */}

                {displayInputError('comment')}
            </div>

            <Box sx={{ display: 'flex', justifyItems: 'right', justifyContent: 'flex-end' }}>
                <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2, mr: 2 }} >
                    {
                        showCancel && <button onClick={cancel} type="button" className="btn btn-sm btn-default">
                            <i className="uil uil-times me-1"></i> Cancel
                        </button>
                    }
                    <Button onClick={addComment} size='small' startIcon={<SendTwoToneIcon />} variant="contained">Submit</Button>
                </Stack>
            </Box>
        </form>
    );
}

export default CommentForm;
