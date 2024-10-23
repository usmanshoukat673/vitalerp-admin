// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, InputGroup, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import TaskSection from './TaskSection';
import { connect } from 'react-redux';
import { clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedTask, setAllProjects, setBackPageURL, setTaskToEdit } from '../../../actions';
import TaskPreview from './TaskPreview';
import _ from 'lodash';
import ProjectList from '../../projects/ProjectList';
import axiosInstance from '../../../api/api';

// Task List
const TaskList = ({company, setCompanyUsers, clearUser, clearToken, history, token, selectedTask, setSelectedTask, setAllProjects, setBackPageURL, setTaskToEdit}) => {
    const [todays_tasks, setTodaysTasks] = useState([]);
    const [this_weeks_tasks, setThisWeekTasks] = useState([]);
    const [next_weeks_tasks, setNextWeekTasks] = useState([]);
    const [dues_tasks, setDueTasks] = useState([]);
    const [upcomingTask, setUpcomingTasks] = useState([]);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/api/user/projects/all/${company.id}`).then(e => {
            setAllProjects(e.data.projects);
        }).catch(err => {
            if (err.response.status === 401) {
                clearUser();
                clearToken();
                clearPWDRotation();
                history.push('/login');
            }
        });

        axiosInstance.get(`/api/user/teams/all-users/${company.id}`).then(e => {
            setCompanyUsers(e.data.users);
        }).catch(err => {
            if (err.response.status === 401) {
                clearUser();
                clearToken();
                clearPWDRotation();
               history.push('/login');
            }
        });


        axiosInstance.get(`/api/user/tasks/list/${company.id}`).then(e => {
            setTodaysTasks(e.data.todays);
            setThisWeekTasks(e.data.this_weeks);
            setNextWeekTasks(e.data.next_weeks);
            setDueTasks(e.data.dues);
            setUpcomingTasks(e.data.upcomming);

            if(_.size(e.data.todays) > 0)
            {
               return setSelectedTask(e.data.todays[0]);
            }
            else if(_.size(e.data.this_weeks) > 0)
            {
                return setSelectedTask(e.data.this_weeks[0]);
            }
            else if(_.size(e.data.next_weeks) > 0)
            {
                return setSelectedTask(e.data.next_weeks[0]);
            }
            else if(_.size(e.data.upcomming) > 0)
            {
                return setSelectedTask(e.data.upcomming[0]);
            }
            else if(_.size(e.data.dues) > 0)
            {
                return setSelectedTask(e.data.dues[0]);
            }

        }).catch(err => {
            if (err.response.status === 401) {
                clearUser();
                clearToken();
                clearPWDRotation();
               history.push('/login');
            }
        });

    }, [company, token]);

    /**
     * Toggle sort
     */
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    /**
     * Selects the task
     * @param {*} taks
     */
    const handleSelectTask = (task) => {
        setSelectedTask(task);
        let url = `/${company.slug}/workbench/list`;
        setBackPageURL(url);
    };

    const handleOnDelete = task_document => {
        let the_task = JSON.parse(JSON.stringify(selectedTask));

        _.remove(the_task.documents, (doc) => {
            return doc.id === task_document.id
        });
        setSelectedTask(the_task);
    }

    const handleCreated = comment => {
        let the_task = JSON.parse(JSON.stringify(selectedTask));
        the_task.comments.push(comment);
        the_task.total_comments = the_task.total_comments + 1;
        setSelectedTask(the_task);
    }

    const handleEditTask = () => {
        setTaskToEdit(selectedTask);
        let url = `/${company.slug}/workbench/list`;
        history.push(`/${company.slug}/workbench/task/modify/${selectedTask.id}?back=${url}`);
    }

    return (
        <div className='__items__list'>
            <Row>
                <Col xl={8}>
                    <div className="page-title-box">
                        <div className="page-title-right">

                        </div>
                        <h4 className="page-title">
                            Projects{' '}
                            {
                                /**
                                 * <Link to="#" className="btn btn-success btn-sm ms-3">
                                Add New
                            </Link>
                                 */
                            }
                        </h4>
                    </div>

                    <ProjectList />
                </Col>
            </Row>

            <Row>
                <Col xl={8}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                           {
                               /**
                                *  <div className="app-search">
                                <InputGroup>
                                    <Form.Control placeholder="Search..." />
                                    <span className="mdi mdi-magnify search-icon"></span>
                                    <Dropdown
                                        addonType="append"
                                        isOpen={isSortDropdownOpen}
                                        toggle={toggleSortDropDown}
                                        align="end">
                                        <Dropdown.Toggle variant="secondary">
                                            <i className="uil uil-sort-amount-down"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Due Date</Dropdown.Item>
                                            <Dropdown.Item>Added Date</Dropdown.Item>
                                            <Dropdown.Item>Assignee</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup>
                            </div>
                                */
                           }
                        </div>
                        <h4 className="page-title">
                            Tasks{' '}
                           {
                               /**
                                *  <Link to="/tasks/list/add" className="btn btn-success btn-sm ms-3">
                                Add New
                            </Link>
                                */
                           }
                        </h4>
                    </div>

                    {/* tasks */}
                    {
                        _.size(dues_tasks) > 0 && <div className="mt-2">
                            <TaskSection title="Overdue" tasks={dues_tasks} selectTask={handleSelectTask}></TaskSection>
                        </div>
                    }

                    <div className="mt-2">
                        <TaskSection title="Today" tasks={todays_tasks} selectTask={handleSelectTask}></TaskSection>
                    </div>
                    <div className="mt-2">
                        <TaskSection title="This Week" tasks={this_weeks_tasks} selectTask={handleSelectTask}></TaskSection>
                    </div>
                    <div className="mt-2">
                        <TaskSection title="Next Week" tasks={next_weeks_tasks} selectTask={handleSelectTask}></TaskSection>
                    </div>
                    <div className="mt-2">
                        <TaskSection title="Scheduled" tasks={upcomingTask} selectTask={handleSelectTask}></TaskSection>
                    </div>


                   {
                       /**
                        *  <div className="mt-2">
                            <TSection title="Today" company={company} tasks={todayTask} selectTask={handleSelectTask}></TSection>
                        </div>
                        *  <div className="mt-4">
                        <TSection title="Upcoming" tasks={upcomingTask} selectTask={handleSelectTask}></TSection>
                    </div>
                    <div className="mt-4 mb-4">
                        <TSection title="Other" tasks={otherTask} selectTask={handleSelectTask}></TSection>
                    </div>
                        */
                   }
                </Col>

                <Col>
                   { !_.isEmpty(selectedTask) && <TaskPreview task={selectedTask} editTask={handleEditTask} handleCreated={handleCreated} attachmentDeleted={handleOnDelete} />}
                </Col>
            </Row>
        </div>
    );
};


const mapStateToProps = (state) => ({
    selectedTask: state.tasks.task,
});

export default withRouter(connect(mapStateToProps, {clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedTask, setAllProjects, setBackPageURL, setTaskToEdit})(TaskList));

