// @flow
import React, {useState} from 'react';
import _ from 'lodash';
import getInitial from '../../../utils/getInitial';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';
import CommentForm from './CommentForm';

const ProjectComment = ({comment, project, newCommentAdded}) => {

    const [the_comment, setComment] = useState(JSON.parse(JSON.stringify(comment)));
    const [replay, setReplay] = useState(false);

    const handleOnCancel = () => setReplay(false);

    const handleCreated = cmt => {
        let temp_comment = JSON.parse(JSON.stringify(the_comment));
        temp_comment.replies.push(cmt);
        setComment(temp_comment);
        setReplay(false);
        newCommentAdded(1);
    }

    return (
        <div className="d-flex mt-3">
        <div className="userInitials">{getInitial(`${the_comment.user.first_name} ${the_comment.user.last_name}`)}</div>
        <div className="w-100">
            <h5 className="mt-0">
                {`${the_comment.user.first_name} ${the_comment.user.last_name}`} <small className="text-muted float-end"><ShowCurrentTZDateMoment date={the_comment.created_at} /></small>
            </h5>
            {the_comment.comment}
            <br />
            {
                !replay && <a onClick={() => setReplay(true)} className="text-muted btn font-13 d-inline-block mt-2">
                <i className="mdi mdi-reply"></i> Reply
                </a>
            }

            {
                _.size(the_comment.replies) > 0 && _.map(the_comment.replies, reply => {
                    return (<ProjectComment comment={reply} project={project} key={reply.id} newCommentAdded={newCommentAdded} />)
                })
            }

            {
                replay && <div className="border rounded mt-4">
                    <CommentForm project={project} created={handleCreated} parent={the_comment.id} showCancel={true} cancel={handleOnCancel} />
                </div>
            }
        </div>
    </div>
    );
};

export default ProjectComment;
