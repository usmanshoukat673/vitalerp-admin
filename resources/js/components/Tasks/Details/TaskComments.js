// @flow
import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import CommentForm from './CommentForm';
import TaskComment from './TaskComment';

const TaskComments = ({comments, task, token, handleCreated, newCommentAdded}) => {

    return (
        <Card>
            <Card.Header>
                <h4 className="my-1">Comments ({task.total_comments})</h4>
            </Card.Header>
            <Card.Body>
                {
                    _.map(comments, comment => {
                        return(
                             <TaskComment comment={comment} task={task} key={comment.id} newCommentAdded={newCommentAdded}  />
                        )
                    })
                }

               {
                   /**
                    *  <div className="text-center mt-2">
                    <Link to="#" className="text-danger">
                        <i className="mdi mdi-spin mdi-loading me-1"></i> Load more
                    </Link>
                </div>
                    */
               }

                <div className="border rounded mt-4">
                    <CommentForm task={task} created={handleCreated} showCancel={false} parent={null} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default TaskComments;
