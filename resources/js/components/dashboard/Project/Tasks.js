import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Card, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Dropdown, Form } from 'semantic-ui-react';
import { setBackPageURL, setTaskToEdit } from '../../../actions';
import CardTitle from '../../sub-components/CardTitle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';
import { connect } from 'react-redux';
import getInitial from '../../../utils/getInitial';
import classNames from 'classnames';
import { Box } from '@mui/material';
import axiosInstance from '../../../api/api';
// import {Company} from '../../../models/company';
// import {Token} from '../../../models/token';
// import { Project } from '../../../models/project';
// import { Task } from '../../../models/task';

// interface Props{
//     company: Company;
//     token: Token;
//     history: any;
//     projects: [Project];
//     setBackPageURL: (string);
//     setTaskToEdit: (Task);
//     root_project_id: any;
// }

const Tasks = ({ comp_id, token, history, projects, setBackPageURL, setTaskToEdit, root_project_id }) => {

    const MySwal = withReactContent(Swal);

    const [project_id, setPorojectId] = useState('all');

    useEffect(() => {
        setPorojectId(root_project_id);
    }, [root_project_id]);

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

    const [task_state, setTaskState] = useState({
        tasks: [],
    });

    const getTasks = () => {
        axiosInstance.post(`/api/user/projects/tasks`, {
            comp_id: comp_id,
            project_id: project_id
        }).then(e => {
            setTaskState({
                tasks: e.data.tasks,
            });
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    useEffect(() => {
        getTasks();
    }, [comp_id, token, project_id]);

    const handleProjectChange = (event, { value }) => {
        setPorojectId(value);
    }

    const navigateToTaksDetails = (task) => {
        selectTask(task);
        history.push(`/${company.slug}/workbench/tasks/details/${task.id}`);
    }

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setBackPageURL(`/${company.slug}/compliance-stack`); // it was /dashboard 
        history.push(`/${company.slug}/workbench/task/modify/${task.id}`);
    }

    const handleDeleteTask = (task) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You are attempting to delete the task.',
            icon: 'warning',
            confirmButtonText: 'Delete',
            showCancelButton: true,
        }).then((e) => {
            if (e.isConfirmed) {
                setTaskState({
                    ...task_state,
                    tasks: _.filter(task_state.tasks, (t) => t.id !== task.id)
                });

                axiosInstance.post(`/api/user/tasks/delete`, {
                    task_id: task.id
                }).then(e => {
                }).catch(err => {
                    if (err.response.status === 401) {
                        history.push('/login');
                    }
                });
            }
        });
    }

    const getStatus = (status) => {
        if(status == 'Pending')
        {
            return 'badge badge-warning-lighten';
        }
        else if(status == 'Done')
        {
            return 'badge badge-success-lighten';
        }
        else if(status == 'Inprogress')
        {
            return 'badge badge-warning-lighten';
        }
        else if(status == 'Review')
        {
            return 'badge badge-success-lighten';
        }
        else if(status == 'Waiting')
        {
            return 'badge badge-danger-lighten';
        }
        else{
            return 'badge badge-warning-lighten';
        }
    }

    const newTask = () => {
        setBackPageURL(`/${company.slug}/compliance-stack`); // it was /dashboard 
        history.push(`/${company.slug}/workbench/task/add/Pending`);
    };

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="Tasks"
                    menuItems={[
                        { label: 'Weekly Report' },
                        { label: 'Monthly Report' },
                        { label: 'Action' },
                        { label: 'Settings' },
                    ]}
                />

                <Box sx={{pt: 2, mb: 2}}>
                    <Dropdown
                        options={project_options}
                        selection
                        onChange={handleProjectChange}
                        value={project_id}
                        placeholder="Select Project"
                        className='__board__projects__dd'
                    />
                </Box>

                <Table responsive hover className="table-centered table-nowrap mb-0">
                    <tbody>
                        {
                            _.map(task_state.tasks, (task) => (
                                <tr key={task.id}>
                                    <td>
                                        <h5 className="font-14 my-1">
                                            <a onClick={() => navigateToTaksDetails(task)} className="text-body">
                                                {task.title}
                                            </a>
                                        </h5>
                                        <span className="text-muted font-13">Due in <ShowCurrentTZDateMoment date={task.due_date} /></span>
                                    </td>
                                    <td>
                                        <span className="text-muted font-13">Status</span> <br />
                                        <span className={getStatus(task.status)}>{task.status}</span>
                                    </td>
                                    <td>
                                        <span className="text-muted font-13">Assigned to</span>
                                        <div className='d-flex'>
                                            {
                                                _.map(task.assign_to, user => (
                                                    <OverlayTrigger key={user.id} placement="right" overlay={<Tooltip>{`${user.user.first_name} ${user.user.last_name}`}</Tooltip>}>
                                                        <div className="userInitials rounded-circle avatar-xs">{getInitial(`${user.user.first_name} ${user.user.last_name}`)}</div>
                                                    </OverlayTrigger>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-muted font-13">Total time spend</span>
                                        <h5 className="font-14 mt-1 fw-normal">TODO</h5>
                                    </td>
                                    <td className="table-action" style={{ width: '90px' }}>
                                        <a className="action-icon" onClick={() => handleEditTask(task)}>
                                            {' '}
                                            <i className="mdi mdi-pencil"></i>
                                        </a>
                                        <a className="action-icon" onClick={() => handleDeleteTask(task)}>
                                            {' '}
                                            <i className="mdi mdi-delete"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }

                       
                    </tbody>
                </Table>

                 {
                            _.size(task_state.tasks) == 0 &&  <Card className={classNames('border', [`border-primary`])}>
                            <Card.Body>
                                <Card.Title as="h5">0 Tasks</Card.Title>
                            </Card.Body>
                        </Card>
                        }
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects.projects,
});

export default withRouter(connect(mapStateToProps, {setBackPageURL, setTaskToEdit })(Tasks));