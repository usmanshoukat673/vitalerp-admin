import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import CommentForm from './CommentForm';
import axiosInstance from '../../../../../api/api';
import LoadingBackgrop from '../../../../LoadingBackgrop';
import CommentCounter from '../../../ControlDrawer/CommentCounter';
import Comment from './Comment';

const ControlQuestionsComments = ({ expanded, question }) => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (expanded) {
            featchComments();
        }
    }, [question, expanded]);

    /**
     * Function to fetch comments for a specific company control question.
     *
     */
    const featchComments = () => {
        setLoading(true);
        axiosInstance.get(`/api/user/compliance/company-control-question/comments/${question.id}`).then(e => {
            setLoading(false);
            setComments(e.data.comments);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
            }
        });
    }

    const handleCreated = comment => {
        if (comment != 1) {
            let the_comments = JSON.parse(JSON.stringify(comments));
            the_comments.push(comment);
            setComments(the_comments);
        }
    }

    const newCommentAdded = (comment) => {
        // newCommentAdded(comment);
    }

    return (
        <>
            <LoadingBackgrop open={loading} />
            {
                !loading && <Card>
                    <Card.Body>
                        <h4 className="mt-0 mb-3"><CommentCounter comments={comments} /></h4>

                        <CommentForm question={question} created={handleCreated} showCancel={false} parent={null} />

                        {
                            _.map(comments, comment => {
                                return (
                                    <Comment
                                        comment={comment}
                                        question={question}
                                        key={comment.id}
                                        newCommentAdded={newCommentAdded}
                                        removed={(c) => setComments(c)}
                                        updated={(c) => setComments(c)}
                                    />
                                )
                            })
                        }
                    </Card.Body>
                </Card>
            }
        </>
    );
}

export default ControlQuestionsComments;