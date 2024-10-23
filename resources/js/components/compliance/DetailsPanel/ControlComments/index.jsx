import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import axiosInstance from '../../../../api/api';
import LoadingBackgrop from '../../../LoadingBackgrop';
import CommentForm from './CommentForm';
import Comment from './Comment';
import CommentCounter from '../../ControlDrawer/CommentCounter';

const ControlComments = () => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const { control } = useSelector((state) => ({
        control: state.compliance.control,
    }));

    useEffect(() => {
        featchComments();
    }, [control]);

    const featchComments = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/compliance/control-profile/comments/list`, {
            control_id: control.id,
        }).then(e => {
            setLoading(false);
            setComments(e.data);
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
        newCommentAdded(comment);
    }

    return (
        <>
            <LoadingBackgrop open={loading} />
            {
                !loading && <Card>
                    <Card.Body>
                        <h4 className="mt-0 mb-3"><CommentCounter comments={comments} /></h4>

                        <CommentForm control={control} created={handleCreated} showCancel={false} parent={null} />

                        {
                            _.map(comments, comment => {
                                return (
                                    <Comment comment={comment} control={control} key={comment.id} newCommentAdded={newCommentAdded} />
                                )
                            })
                        }
                    </Card.Body>
                </Card>
            }
        </>
    );
}

export default ControlComments;