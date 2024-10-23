// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, InputGroup, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import ProjectSection from './ProjectSection';
import { connect, useDispatch } from 'react-redux';
import { clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedProject } from '../../../actions';
import ProjectPreview from './ProjectPreview';
import _ from 'lodash';
import axiosInstance from '../../../api/api';

const ProjectsList = ({company, setCompanyUsers, clearUser, clearToken, history, token, selectedProject, setSelectedProject}) => {
    const [todays_tasks, setTodaysTasks] = useState([]);
    const [this_weeks_tasks, setThisWeekTasks] = useState([]);
    const [next_weeks_tasks, setNextWeekTasks] = useState([]);
    const [dues_tasks, setDueTasks] = useState([]);
    const [upcomingTask, setUpcomingTasks] = useState([]);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // TODO: can be removed 
        axiosInstance.get(`/api/user/teams/all-users/${company.id}`).then(e => {
            setCompanyUsers(e.data.users);
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                clearUser();
                clearToken();
                clearPWDRotation();
               history.push('/login');
            }
        });


        axiosInstance.get(`/api/user/projects/list/${company.id}`).then(e => {
            setTodaysTasks(e.data.todays);
            setThisWeekTasks(e.data.this_weeks);
            setNextWeekTasks(e.data.next_weeks);
            setDueTasks(e.data.dues);
            setUpcomingTasks(e.data.upcomming);

            if(_.size(e.data.todays) > 0)
            {
               return setSelectedProject(e.data.todays[0]);
            }
            else if(_.size(e.data.this_weeks) > 0)
            {
                return setSelectedProject(e.data.this_weeks[0]);
            }
            else if(_.size(e.data.next_weeks) > 0)
            {
                return setSelectedProject(e.data.next_weeks[0]);
            }
            else if(_.size(e.data.upcomming) > 0)
            {
                return setSelectedProject(e.data.upcomming[0]);
            }
            else if(_.size(e.data.dues) > 0)
            {
                return setSelectedProject(e.data.dues[0]);
            }

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                clearUser();
                clearToken();
                clearPWDRotation();
               history.push('/login');
            }
        });

    }, [company]);

    /**
     * Toggle sort
     */
    const toggleSortDropDown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };
    /**
     * Selects the project
     * @param {*} project
     */
    const handleSelectProject = (project) => {
        dispatch(setSelectedProject(project));
    };

    const handleOnDelete = project_document => {
        let the_project = JSON.parse(JSON.stringify(selectedProject));

        _.remove(the_project.documents, (doc) => {
            return doc.id === project_document.id
        });
        dispatch(setSelectedProject(the_project));
    }

    const handleCreated = comment => {
        let the_project = JSON.parse(JSON.stringify(selectedProject));
        the_project.comments.push(comment);
        the_project.total_comments = the_project.total_comments + 1;
        dispatch(setSelectedProject(the_project));
    }

    return (
        <div className='__items__list'>


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
                        Projects{' '}
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
                            <ProjectSection title="Overdue" company={company} projects={dues_tasks} selectProject={handleSelectProject}></ProjectSection>
                        </div>
                    }

                    <div className="mt-2">
                        <ProjectSection title="Today" company={company} projects={todays_tasks} selectProject={handleSelectProject}></ProjectSection>
                    </div>
                    <div className="mt-2">
                        <ProjectSection title="This Week" company={company} projects={this_weeks_tasks} selectProject={handleSelectProject}></ProjectSection>
                    </div>
                    <div className="mt-2">
                        <ProjectSection title="Next Week" company={company} projects={next_weeks_tasks} selectProject={handleSelectProject}></ProjectSection>
                    </div>
                    <div className="mt-2">
                        <ProjectSection title="Upcoming" company={company} projects={upcomingTask} selectProject={handleSelectProject}></ProjectSection>
                    </div>

                </Col>

                <Col>
                   { !_.isEmpty(selectedProject) && <ProjectPreview project={selectedProject} token={token} handleCreated={handleCreated} attachmentDeleted={handleOnDelete} />}
                </Col>
            </Row>
        </div>
    );
};


const mapStateToProps = (state) => ({
    selectedProject: state.projects.project,
});

export default withRouter(connect(mapStateToProps, {clearUser, clearToken, setCompanyUsers, clearPWDRotation, setSelectedProject})(ProjectsList));

