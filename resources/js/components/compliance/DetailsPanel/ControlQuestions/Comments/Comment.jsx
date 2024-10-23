// @flow
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import ShowCurrentTZDateMoment from '../../../../../utils/showCurrentTZDateMoment';
import ShowCurrentTZDate from '../../../../../utils/showCurrentTZDate';
import getInitial from '../../../../../utils/getInitial';
import CommentForm from './CommentForm';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveCommentButton from './RemoveCommentButton';
import EditCommentForm from './EditCommentForm';
import { Box, Typography } from '@mui/material';

const Comment = ({ comment, question, newCommentAdded, removed, updated }) => {

    const [the_comment, setComment] = useState({});
    const [replay, setReplay] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setComment({...comment});
    }, [comment]);

    const handleOnCancel = () => setReplay(false);

    const handleCreated = cmt => {
        let temp_comment = JSON.parse(JSON.stringify(the_comment));
        temp_comment.replies.push(cmt);
        setComment(temp_comment);
        setReplay(false);
        newCommentAdded(1);
    }

    const handleUpdated = (comment) => {
        setComment(comment);
        setEdit(false);
    }

    return (
        <div className="d-flex align-items-start mt-2">
            <div className="userInitials">{getInitial(`${the_comment?.commented_by?.first_name} ${the_comment?.commented_by?.last_name}`)}</div>
            <div className="w-100 overflow-hidden">
                <Box sx={{ backgroundColor: '#f2f2f2', borderRadius: '5px', padding: '5px 12px 12px 12px', mb: 2 }}>
                    <Typography variant='h6' sx={{ fontSize: '14px', pb: 1 }}>
                        {`${the_comment?.commented_by?.first_name} ${the_comment?.commented_by?.last_name}:`} <small className="text-muted float-end"><ShowCurrentTZDate date={the_comment?.date_commented} /></small>
                    </Typography>
                    <Box>{!edit && the_comment?.comment}</Box>
                    {
                        edit && <EditCommentForm comment_object={the_comment} updated={handleUpdated} showCancel={true} cancel={() => setEdit(false)} />
                    }
                    {
                        !replay && !edit && <Stack direction="row" spacing={1}>

                            <Button sx={{ textTransform: 'capitalize' }} onClick={() => setReplay(true)} variant="text" size='small' startIcon={<ReplyTwoToneIcon />}>
                                Reply
                            </Button>
                            <Button sx={{ textTransform: 'capitalize' }} onClick={() => setEdit(true)} variant="text" size='small'>
                                Edit
                            </Button>
                            <RemoveCommentButton question_id={question.id} comment_id={the_comment?.id} removed={removed} />
                        </Stack>
                    }
                </Box>

                {
                    _.size(the_comment.replies) > 0 && _.map(the_comment.replies, reply => {
                        return (<Comment comment={reply} question={question} key={reply.id} newCommentAdded={newCommentAdded} removed={removed} updated={updated} />)
                    })
                }

                {
                    replay && <div className="border rounded mt-4">
                        <CommentForm question={question} created={handleCreated} parent={the_comment.id} showCancel={true} cancel={handleOnCancel} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Comment;
