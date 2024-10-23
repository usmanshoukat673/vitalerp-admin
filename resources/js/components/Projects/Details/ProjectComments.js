// @flow
import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import CommentForm from './CommentForm';
import ProjectComment from './ProjectComment';

const ProjectComments = ({comments, project, handleCreated, newCommentAdded}) => {

    return (
        <Card>
            <Card.Header>
                <h4 className="my-1">Comments ({project.total_comments})</h4>
            </Card.Header>
            <Card.Body>

            <div className="border rounded mt-4">
                <CommentForm project={project} created={handleCreated} showCancel={false} parent={null} />
            </div>

                {
                    _.map(comments, comment => {
                        return(
                             <ProjectComment comment={comment} project={project} key={comment.id} newCommentAdded={newCommentAdded}  />
                        )
                    })
                }

                
            </Card.Body>
        </Card>
    );
};

export default ProjectComments;
