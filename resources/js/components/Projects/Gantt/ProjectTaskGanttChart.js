// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, ButtonGroup, Table } from 'react-bootstrap';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import Gantt from 'frappe-gantt/src/';
import { setSelectedTask, setAllProjects, setCompanyUsers, setBackPageURL, setTaskToEdit } from '../../../actions';
import { withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

// components
import PageTitle from '../../sub-components/PageTitle';
import RightDrawer from '../../../layouts/RightDrawer';
import axiosInstance from '../../../api/api';

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}

const Project = ({ project, onSelectProject, selectedProject }) => {
    return (
        <Link to="#" className="text-body" onClick={(e) => onSelectProject(project)}>
            <div
                className={classNames('d-flex', 'p-2', {
                    'bg-light': selectedProject && selectedProject.id === project.id,
                })}>
                <div className="avatar-sm">
                    {project.status === 'On-Track' && (
                        <span className="avatar-title bg-success-lighten rounded-circle text-success">
                            <i className={classNames(project.icon, 'font-24')}></i>
                        </span>
                    )}

                    {project.status === 'Locked' && (
                        <span className="avatar-title bg-warning-lighten rounded-circle text-warning">
                            <i className={classNames(project.icon, 'font-24')}></i>
                        </span>
                    )}

                    {project.status === 'Delayed' && (
                        <span className="avatar-title bg-danger-lighten rounded-circle text-danger">
                            <i className={classNames(project.icon, 'font-24')}></i>
                        </span>
                    )}
                </div>
                <div className="ms-2">
                    <h5 className="mt-0 mb-0">
                        {project.title}
                        <span
                            className={classNames('badge', 'ms-1', {
                                'badge-success-lighten': project.status === 'On-Track',
                                'badge-warning-lighten': project.status === 'Locked',
                                'badge-danger-lighten': project.status === 'Delayed',
                            })}>
                            {project.status}
                        </span>
                    </h5>
                    <p className="mt-1 mb-0 text-muted">ID: {project.id}</p>
                </div>
            </div>
        </Link>
    );
};

const ProjectTaskGanttChart = ({ setAllProjects, company, token, projects, history, setBackPageURL }) => {

    const params = useParams();;
    const [selectedProject, setSelectedProject] = useState({});
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState('Week');
    const [gantt, setGantt] = useState(null);
    const [project_id, setPorojectId] = useState('all');

    const modes = ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'];

    const [project_options, setProjectOptions] = useState([
        {
            key: 'all',
            text: `All Projects`,
            value: 'all',
        },
        {
            key: '0',
            text: `Unassigned`,
            value: '0',
        }
    ]);

    useEffect(() => {
        setPorojectId(params.selected_project);
    }, [params]);

    // load projects  
    useEffect(() => {
        axiosInstance.get(`/api/user/projects/all/${company.id}`).then(e => {
            setAllProjects(e.data.projects);
            if (_.size(e.data.projects) > 0) {
                setSelectedProject(e.data.projects[0]);
            }
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }, [company, token]);

    const getTasks = () => {
        axiosInstance.post(`/api/user/projects/tasks`, {
            project_id: project_id
        }).then(e => {
            setTasks(e.data.tasks);
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    useEffect(() => {
        if (projects) {
            let options = _.map(projects, (pr, index) => ({
                key: `${pr.id}`,
                text: `${pr.title}`,
                value: `${pr.id}`,
            }));

            options.push({
                key: 'all',
                text: `All Projects`,
                value: 'all',
            });

            options.push({
                key: '0',
                text: `Unassigned`,
                value: '0',
            });

            setProjectOptions(
                _.sortBy(options, ['text'])
            );
        }
    }, [projects]);

    useEffect(() => {
        getTasks();
    }, [company, token, project_id]);

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        getTasks(project.id);
    }

    useEffect(() => {
        if (_.size(tasks) > 0) {
            // create gantt
            const gantt = new Gantt('#tasks-gantt', [...tasks], {
                view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
                bar_height: 20,
                padding: 18,
                view_mode: 'Week',
                custom_popup_html(task) {
                    return (
                        '<div class="popover fade show bs-popover-right gantt-task-details" role="tooltip">' +
                        '<div class="arrow"></div><div class="popover-body">' +
                        `<h5>${task.title}</h5><p class="mb-2">Expected to finish by ${task.end}</p>` +
                        '<div class="progress mb-2" style="height: 10px;">' +
                        `<div class="progress-bar" role="progressbar" style="width: ${task.progress}%;" aria-valuenow="${task.progress}"` +
                        ` aria-valuemin="0" aria-valuemax="100">${task.progress}%</div>` +
                        '</div></div></div>'
                    );
                },
            });
            setGantt(gantt);
        }

    }, [projects, tasks]);

    /**
     * On mode change
     * @param {*} mode
     */
    const changeMode = (mode) => {
        setMode(mode);
        if (gantt) {
            gantt.change_view_mode(mode);
        }
    };

    const newTask = () => {
        let url = `/${company.slug}/workbench/projects/gantt/${project_id}`;
        setBackPageURL(url);
        history.push(`/${company.slug}/workbench/task/add`);
    }

    const handleProjectChange = (event, { value }) => {
        setPorojectId(value);
        history.push(`/${company.slug}/workbench/projects/gantt/${value}`);
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Projects', path: '/apps/projects' },
                    { label: 'Gantt', path: '/apps/projects/gantt', active: true },
                ]}
                
                component={ <Dropdown
                    options={project_options}
                    selection
                    onChange={handleProjectChange}
                    value={project_id}
                    placeholder="Project"
                    className='__board__projects__dd'
                />}
            />

            <Card>
                <Card.Body>
                    <Row>
                        <Col xxl={3} lg={4}>
                            <div className="pe-xl-3">
                                <Row>
                                    <Col>
                                        <SimpleBar style={{ maxHeight: '650px', width: '100%' }}>
                                            <Table className="mb-0" size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Task</th>
                                                        <th>Start</th>
                                                        <th>End</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tasks.map((task, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{task.id}</th>
                                                                <td>{task.title}</td>
                                                                <td>{task.start}</td>
                                                                <td>{task.end}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </SimpleBar>
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                        <Col xxl={9} lg={8} className="mt-4 mt-xl-0">
                            <div className="ps-xl-3">
                                <Row>
                                    <Col className="col-auto">
                                        <a onClick={newTask} className="btn btn-success btn-sm mb-2">
                                            Add New Task
                                        </a>
                                    </Col>
                                    <Col className="text-sm-end">
                                        <ButtonGroup>
                                            {modes.map((m, idx) => {
                                                return (
                                                    <Button
                                                        variant="primary"
                                                        size={'sm'}
                                                        key={idx}
                                                        onClick={() => changeMode(m)}
                                                        active={mode === m}>
                                                        {m}
                                                    </Button>
                                                );
                                            })}
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-3">
                                        <svg id="tasks-gantt"></svg>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <RightDrawer title="Gantt Chart" component={<RightSidebar />} />
        </>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects.projects,
});

export default withRouter(connect(mapStateToProps, { setSelectedTask, setAllProjects, setCompanyUsers, setBackPageURL, setTaskToEdit })(ProjectTaskGanttChart));
