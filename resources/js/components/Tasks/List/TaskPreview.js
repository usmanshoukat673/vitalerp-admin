// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, OverlayTrigger, Dropdown } from 'react-bootstrap';
import prettyBytes from 'pretty-bytes';
import _ from 'lodash';

// component
import getInitial from '../../../utils/getInitial';

// Form Editor
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DownloadDocumentButton from '../DownloadDocumentButton';
import DeleteDocumentButton from '../DeleteDocumentButton';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';
import CommentForm from '../Details/CommentForm';
import { useSelector } from 'react-redux';

const TaskPreview = ({ task, attachmentDeleted, handleCreated, editTask }) => {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);


    const [completed, setCompleted] = useState(task.stage === 'Done');

    const [editorState, setEditorState] = useState();

    const { token } = useSelector((state) => ({
        token: state.token.activeToken
    }));

    useEffect(() => {
        const html = (task.description != null ? `<p class="m-0">${task.description}</p>` : '');
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [task]);

    /**
     * On editor body change
     */
    const onEditorStateChange = (editorStates) => {
        setEditorState(editorStates);
    };

    /*
     * mark completd on selected task
     */
    const markCompleted = (e) => setCompleted(e.target.checked);

    return (
        <div className='__Task'>
            <Card>
                <Card.Body>

                    <div className="d-flex align-items-center justify-content-between">

                        <div className="form-check float-start">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="completedCheck"
                                checked={completed}
                                onChange={markCompleted}
                            />
                            <label className="form-check-label" htmlFor="completedCheck">
                                Mark as completed
                            </label>
                        </div>

                        <Dropdown>
                            <Dropdown.Toggle as={Link} to="#" className="arrow-none card-drop">
                                <i className="mdi mdi-dots-horizontal" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={editTask}>
                                    <i className="mdi mdi-pencil me-1"></i>Edit
                                </Dropdown.Item>

                                <Dropdown.Divider as="div" />
                                <Dropdown.Item className='text-danger' >
                                    <i className="mdi mdi-delete me-1"></i>Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>



                    <hr className="mt-1 mb-2" />

                    <Row>
                        <Col>
                            <h4>{task.title}</h4>

                            <Row>
                                <Col>
                                    <p className="mt-2 mb-1 text-muted">Assigned To</p>

                                    <div className="d-flex">
                                        {
                                            _.map(task.assign_to, user => {
                                                return (
                                                    <div key={user.id}>
                                                        <div className="userInitials">{getInitial(`${user.user.first_name} ${user.user.last_name}`)}</div>
                                                        <div>
                                                            <h5 className="mt-1 font-14">{`${user.user.first_name} ${user.user.last_name}`}</h5>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>

                                </Col>

                                <Col>
                                    <p className="mt-2 mb-1 text-muted">Due Date</p>
                                    <div className="d-flex">
                                        <i className="uil uil-schedule font-18 text-success me-1"></i>
                                        <div>
                                            <h5 className="mt-1 font-14"><ShowCurrentTZDateMoment date={task.due_date} /></h5>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col>
                                    <Editor
                                        toolbarHidden
                                        toolbarClassName="draft-toolbar"
                                        wrapperClassName="react-draft-wrapper border px-2"
                                        editorStyle={{ minHeight: '150px' }}
                                        editorState={editorState}
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                </Col>
                            </Row>

                            <h5 className="mt-4 mb-2 font-16">Sub-tasks</h5>

                            {task.sub_tasks.map((checklist, index) => (
                                <div className="form-check mt-1" key={index}>
                                    <label
                                        htmlFor={`checklist-${checklist.id}`}>
                                        {checklist.title}
                                    </label>
                                </div>
                            ))}


                            <h5 className="mt-4 mb-2 font-16">Attachments</h5>

                            {/* attachments */}
                            {task.documents.map((f, index) => {
                                return (
                                    <Card key={index} className="mb-2 shadow-none border">
                                        <div className="p-1">
                                            <Row className="align-items-center">
                                                <Col className="col-auto">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title rounded">.{f.document ? f.document.ext : 'Doc'}</span>
                                                    </div>
                                                </Col>
                                                <Col className="ps-0">
                                                    <Link to="#" className="text-muted fw-bold">
                                                        {f.document ? f.document.name : ''}
                                                    </Link>
                                                    <p className="mb-0">{f.document.size ? prettyBytes(f.document.size) : ''}</p>
                                                </Col>
                                                <Col className="col-auto">
                                                    <DownloadDocumentButton document={f.document} />
                                                    <DeleteDocumentButton task_document={f} deleted={attachmentDeleted} />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                );
                            })}

                            <div className="row mt-3">
                                <div className="col">
                                    <h5 className="mb-2 font-16">Comments</h5>

                                    {/* comments */}
                                    {task.comments.map((cmt, idx) => (
                                        <React.Fragment key={idx}>
                                            <div key={idx} className="d-flex mt-3 p-1">
                                                <div className="userInitials">{getInitial(`${cmt.user.first_name} ${cmt.user.last_name}`)}</div>
                                                <div className="w-100">
                                                    <h5 className="mt-0 mb-0">
                                                        <span className="float-end text-muted font-12">
                                                            <ShowCurrentTZDateMoment date={cmt.created_at} />
                                                        </span>
                                                        {`${cmt.user.first_name} ${cmt.user.last_name}`}
                                                    </h5>
                                                    <p className="mt-1 mb-0 text-muted">{cmt.comment}</p>
                                                </div>
                                            </div>
                                            <hr />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* add comments */}
                            <Row className="mt-2">
                                <Col>
                                    <div className="border rounded">

                                        <CommentForm task={task} created={handleCreated} showCancel={false} parent={null} />

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TaskPreview;
