// @flow
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import avatar3 from '../../../../images/users/avatar-8.jpg';
import getTheDate from '../../../utils/getTheDate';
import getInitial from '../../../utils/getInitial';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// task item
const TaskItem = (props) => {
    const task = props.task || {};

    return (
        <Card className={`mb-0 ${task.due_status}`}>
            <Card.Body className="p-3">
                <small className="float-end text-muted chand"
                    onClick={() => props.sortByDuedate(task.due_date, props.listType)}
                >{getTheDate(task.due_date)}</small>
                <span
                    onClick={() => props.sortByPriority(task.priority_text, props.listType)}
                    className={classNames('badge chand', {
                        'bg-danger': task.priority_text === 'High',
                        'bg-secondary': task.priority_text === 'Medium',
                        'bg-success': task.priority_text === 'Low',
                    })}>
                    {task.priority_text}
                </span>

                <h5 className="mt-2 mb-2">
                    <a onClick={() => props.viewTask(props.task)} className="text-body chand underline_on_hover title_text_bold">
                        {task.title}
                    </a>
                </h5>

                {/* <p className="mb-0">
                    <span className="pe-2 text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-briefcase-outline text-muted"></i> {task.project == null ? 'Unassigned' : task.project.title}
                    </span>
                    <span className="text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-comment-multiple-outline text-muted"></i> <b>{task.comments.length}</b>{' '}
                        Comments
                    </span>
                </p> */}

                {/* <p className='mb-1 mt-2'>
                    {task.description}
                </p> */}

                <br />

                {/* <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle
                        variant="link"
                        className="text-muted card-drop arrow-none cursor-pointer p-0 shadow-none">
                        <i className="mdi mdi-dots-vertical font-18"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => props.editTask(props.task)}>
                            <i className="mdi mdi-pencil me-1"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => props.deleteTask(props.task, props.listType)} >
                            <i className="mdi mdi-delete me-1"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-plus-circle-outline me-1"></i>Add People
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-exit-to-app me-1"></i>Leave
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>

                        <p className="mb-0">
                            {
                                _.map(task.assign_to, (u) => {
                                    return (
                                        <span key={u.user_id}>
                                            <span className="userInitials rounded-circle avatar-xs me-1">{getInitial(`${u.user.first_name} ${u.user.last_name}`)}</span>
                                        </span>
                                    )
                                })
                            }

                        </p>
                    </div>

                    <div>
                        <IconButton onClick={() => props.editTask(props.task)} aria-label="edit" size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => props.deleteTask(props.task, props.listType)} aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TaskItem;
