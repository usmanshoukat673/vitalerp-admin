// @flow
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card, Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';
import getInitial from '../../../utils/getInitial';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTask, setTaskToEdit, showRightSidebar, toggleTaskEditEModel } from '../../../actions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

const Task = ({ task, history }) => {

    const { company, selected_task } = useSelector((state) => ({
        company: state.orgs.company,
        selected_task: state.tasks.task,
    }));

    const dispatch = useDispatch();

    const [completed, setCompleted] = useState(task.stage === 'Done');

    const navigateToTaksDetails = () => {
        dispatch(setSelectedTask(task));
        // history.push(`/${company.slug}/workbench/tasks/details/${task.id}`);
        dispatch(showRightSidebar());
    }

    const handleTaskNameClick = () => {
        dispatch(setTaskToEdit(task));
        dispatch(setSelectedTask(task));
        dispatch(showRightSidebar());
        dispatch(toggleTaskEditEModel(true));
    }

    return (
        <Row className="justify-content-sm-between mt-2">
            <Col sm={6} className="mb-2 mb-sm-0">
                <div className="_task_view_and_name">

                    <IconButton aria-label="Preview" color={selected_task.id == task.id ? 'secondary' : 'default'} onClick={navigateToTaksDetails}>
                        <VisibilityIcon />
                    </IconButton>

                    <label className={classNames('form-check-label task-link', {'__active_task': selected_task.id == task.id})} htmlFor={`task-${task.id}`} onClick={handleTaskNameClick}>
                        {task.title}
                    </label>
                </div>
            </Col>
            <Col sm={6}>
                <div className="d-flex justify-content-between">
                    <div className='d-flex'>
                        {
                            _.map(task.assign_to, user => {
                                return (

                                    <OverlayTrigger key={user.id} placement="right" overlay={<Tooltip>{`${user.user.first_name} ${user.user.last_name}`}</Tooltip>}>
                                        <div className="userInitials rounded-circle avatar-xs">{getInitial(`${user.user.first_name} ${user.user.last_name}`)}</div>
                                    </OverlayTrigger>
                                )
                            })
                        }

                    </div>
                    <div>
                        <ul className="list-inline font-13 text-end">
                            <li className="list-inline-item">
                                <i className="uil uil-schedule font-16 me-1"></i> <ShowCurrentTZDateMoment date={task.due_date} />
                            </li>
                            {
                                /**
                                 *  <li className="list-inline-item ms-1">
                                 <i className="uil uil-align-alt font-16 me-1"></i>{' '}
                                 {task.checklists.filter((t) => t.completed).length} / {task.checklists.length}
                             </li>
 
                                 */
                            }
                            <li className="list-inline-item ms-1">
                                <i className="uil uil-comment-message font-16 me-1"></i> {task.total_comments}
                            </li>
                            <li className="list-inline-item ms-2">
                                <span
                                    className={classNames(
                                        'badge',
                                        {
                                            'badge-danger-lighten': task.priority_text === 'High',
                                            'badge-info-lighten': task.priority_text === 'Medium',
                                            'badge-success-lighten': task.priority_text === 'Low',
                                        },
                                        'p-1'
                                    )}>
                                    {task.priority_text}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

const TaskSection = ({ title, tasks, selectTask, history }) => {

    const [collapse, setCollapse] = useState(true);
    const [taskList] = useState(tasks);
    /*
     * toggle task-dropdown
     */
    const toggleTask = () => setCollapse(!collapse);

    return (
        <>
            <h5 className="m-0 pb-2">
                <Link className="text-dark" to="#" onClick={toggleTask}>
                    <i
                        className={classNames(
                            'uil',
                            { 'uil-angle-down': collapse, 'uil-angle-right': !collapse },
                            'font-18'
                        )}></i>
                    {title} <span className="text-muted">({tasks.length})</span>
                </Link>
            </h5>
            <Collapse in={collapse}>
                <Card className="mb-0">
                    <Card.Body className="pb-1 pt-2">
                        {tasks.map((task, idx) => (
                            <Task selectTask={selectTask} task={task} key={idx} history={history} />
                        ))}
                    </Card.Body>
                </Card>
            </Collapse>
        </>
    );
};

export default withRouter(TaskSection);
