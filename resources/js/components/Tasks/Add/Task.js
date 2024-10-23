import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Button as MUIButton } from '@mui/material';
import PageTitle from '../../sub-components/PageTitle';
import { NotificationManager } from 'react-notifications';

import { Dropdown, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSubTasks } from '../../../actions';

import formatDate from "../../../utils/formatDate";
import getFormatedDate from '../../../utils/getFormatedDate';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FileUploader from '../../sub-components/FileUploader';

import './Details.scss';
import SubTask from './SubTask';
import axiosInstance from '../../../api/api';

class Task extends Component {

    state = {
        errors: [],
        loading: false,
        title: '',
        due_date: new Date(),
        overview: '',
        priority: '1',
        assign_to: [],
        files: null,
        controls: [],
        all_controls: [],
        documents: [],
        all_documents: [],
        subTasksOptions: [],
        add_sub_task: false,
        project_id: null,
    }

    componentDidMount() {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/tasks/get-controls/${company.id}`).then(e => {

            this.setState({ loading: false, all_controls: e.data.controls });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });

        axiosInstance.get(`/api/user/tasks/documents/${company.id}/${company.document.id}`).then(e => {
            this.setState({ loading: false, all_documents: e.data.documents });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });
    }

    handleAttachments = files => {
        this.setState({ files });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ touched: true });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handlePriorityChange = (event, { value }) => {

        this.setState({ priority: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('priority')) {
            delete errors[0]['priority'];
            this.setState({ errors: errors });
        }
    };

    handleDuDateChange = (due_date) => {

        if (due_date instanceof Date && !isNaN(due_date) && this.isValidDate(formatDate(due_date))) {
            this.setState({ due_date });
        }


        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('due_date')) {
            delete errors[0]['due_date'];
            this.setState({ errors: errors });
        }
    };

    handleDuDateTimeChange = (due_date) => {

        this.setState({ due_date });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('due_date')) {
            delete errors[0]['due_date'];
            this.setState({ errors: errors });
        }
    };

    isValidDate = (dateString) => {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }


    handleOwnerChange = (event, { value }) => {

        this.setState({ assign_to: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('assign_to')) {
            delete errors[0]['assign_to'];
            this.setState({ errors: errors });
        }
    }

    handleProjectChange = (event, { value }) => {

        this.setState({ project_id: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('project_id')) {
            delete errors[0]['project_id'];
            this.setState({ errors: errors });
        }
    }

    handleControlChange = (event, { value }) => {

        this.setState({ controls: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('controls')) {
            delete errors[0]['controls'];
            this.setState({ errors: errors });
        }
    }

    handleDocumentChange = (event, { value }) => {

        this.setState({ documents: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('documents')) {
            delete errors[0]['documents'];
            this.setState({ errors: errors });
        }
    }

    handleSubmit = () => {
        this.setState({ errors: [], loading: true });

        const { token, company, sub_tasks } = this.props;

        const { title, overview, due_date, priority, assign_to, files, controls, documents, project_id } = this.state;

        const formData = new FormData();

        formData.append('comp_id', company.id);
        formData.append('title', title);
        formData.append('project_id', project_id);
        formData.append('overview', overview);
        formData.append('priority', priority);
        formData.append('assign_to', assign_to);
        formData.append('due_date', getFormatedDate(due_date));
        formData.append('task_folder_id', company.task_folder.id);
        formData.append('controls', controls);
        formData.append('documents', documents);

        if (_.size(files) > 0) {
            _.forEach(files, (file, index) => {
                formData.append(`file_${index}`, file);
            });
        }

        axiosInstance.post('/api/user/tasks/create', formData)
            .then(e => {
                this.setState({
                    errors: [],
                    finishing: false,
                    touched: false,
                });

                if (_.size(sub_tasks) > 0) {
                    this.createSubTasks(e.data.task.id);
                }
                else {
                    NotificationManager.success('New Task has been successfully created!', 'Success');
                    this.props.setSubTasks([]);
                    this.props.history.push(`/${company.slug}/workbench/list`);
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], finishing: false, touched: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), finishing: false, touched: false });
                }
            });
    }

    createSubTasks = (task_id) => {
        this.setState({ errors: [], loading: true });

        const { token, company, sub_tasks } = this.props;


        axiosInstance.post('/api/user/tasks/create-sub-task', {
            sub_tasks: sub_tasks,
            task_id: task_id,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    finishing: false,
                    touched: false,
                }, () => {
                    NotificationManager.success('New Task has been successfully created!', 'Success');
                    this.props.setSubTasks([]);
                    this.props.history.push(`/${company.slug}/workbench/list`);
                });
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], finishing: false, touched: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), finishing: false, touched: false });
                }
            });
    }

    handleDateChange = (date) => {
        this.setState({ due_date: date })
    };

    handleTaskAddition = (e, { value }) => {
        this.setState((prevState) => ({
            subTasksOptions: [{ text: value, value }, ...prevState.subTasksOptions],
        }))
    }

    handleAddSubTask = () => {
        this.setState({ add_sub_task: true });
    }

    handleSubTaskAdded = (task) => {
        this.props.sub_tasks.push(task);
        this.props.setSubTasks(this.props.sub_tasks);
        this.setState({ add_sub_task: false })
    }

    deleteSubTask = (task) => {
        let index = _.findIndex(this.props.sub_tasks, task);
        this.props.sub_tasks.splice(index, 1);
        this.props.setSubTasks(this.props.sub_tasks);
    }

    render() {

        const { users, company, sub_tasks, projects } = this.props;
        const { title, errors, all_controls, loading, overview, due_date, priority, assign_to, controls, all_documents, documents, add_sub_task, project_id } = this.state;


        const priorityOptions = [
            { key: 1, text: 'Low', value: '1' },
            { key: 2, text: 'Medium', value: '2' },
            { key: 3, text: 'High', value: '3' },
        ];

        const userOptions = _.map(users, (us, index) => ({
            key: us.user.id,
            text: `${us.user.first_name} ${us.user.last_name}`,
            value: us.user.id,
        }));


        const projectOptions = _.map(projects, (pr, index) => ({
            key: pr.id,
            text: `${pr.title}`,
            value: pr.id,
        }));

        projectOptions.push({
            key: 0,
            text: `Unassigned`,
            value: 0,
        });

        const controlsOptions = _.map(all_controls, (sec, index) => ({
            key: sec.id,
            text: `${sec.number} ${sec.name} (${sec.standard.name})`,
            value: sec.id,
        }));

        const documentsOptions = _.map(all_documents, (doc, index) => ({
            key: doc.id,
            text: doc.name,
            value: doc.id,
        }));

        return (
            <div className='__Details'>
                <PageTitle
                    breadCrumbItems={[
                        { label: 'WorkBench', path: `/${company.slug}/workbench/list` },
                        { label: 'Add', path: '/workbench/list/add', active: true },
                    ]}
                    title={'Add/Assign Task'}
                />
                <Row>
                    <Col xxl={8} xl={7}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>

                                        <Form>
                                            <Form.Field>
                                                <label>Project</label>
                                                <Dropdown
                                                    clearable
                                                    options={projectOptions}
                                                    selection
                                                    onChange={this.handleProjectChange}
                                                    value={project_id}
                                                    placeholder="Project"
                                                />
                                                {this.displayInputError(errors, 'project_id')}
                                            </Form.Field>
                                            <Form.Field>
                                                <label>Title <sup className='motion__required_field'>*</sup></label>
                                                <Form.Input className={this.handlerInputError(errors, 'title')} placeholder="Task" onChange={this.handleChange} fluid type='text' name="title" value={title} />
                                                {this.displayInputError(errors, 'title')}
                                            </Form.Field>
                                            <Form.Group>
                                                <Form.Field width={8}>
                                                    <label>Assign To <sup className='motion__required_field'>*</sup></label>
                                                    <Dropdown
                                                        clearable
                                                        options={userOptions}
                                                        selection
                                                        onChange={this.handleOwnerChange}
                                                        value={assign_to}
                                                        placeholder="Select User"
                                                        multiple
                                                    />
                                                    {this.displayInputError(errors, 'assign_to')}
                                                </Form.Field>
                                                <Form.Field width={8}>
                                                    <label>Priority <sup className='motion__required_field'>*</sup></label>
                                                    <Dropdown
                                                        clearable
                                                        options={priorityOptions}
                                                        selection
                                                        onChange={this.handlePriorityChange}
                                                        value={priority}
                                                        placeholder="Select"
                                                    />
                                                    {this.displayInputError(errors, 'priority')}
                                                </Form.Field>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Field width={8}>
                                                    <label>Due Date <sup className='motion__required_field'>*</sup></label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            label="mm/dd/yyyy"
                                                            value={due_date}
                                                            onChange={this.handleDuDateTimeChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                    {this.displayInputError(errors, 'due_date')}

                                                </Form.Field>

                                                <Form.Field width={8}>
                                                    <label>Options (Controls):</label>
                                                    <Dropdown disabled={loading} placeholder='Options (Controls)' onChange={this.handleControlChange} fluid value={controls} multiple search selection options={controlsOptions} />
                                                </Form.Field>

                                            </Form.Group>

                                            <Form.Field>
                                                <div className='sub__task__container'>
                                                    <label>Sub Tasks</label> <MUIButton onClick={this.handleAddSubTask} color="success" variant="text">Add Sub Task</MUIButton>
                                                </div>
                                                <div className='sub_task__field'>
                                                    {
                                                        _.map(sub_tasks, (task) => {
                                                            return (
                                                                <div className='a__sub_task' key={task.title}>
                                                                    <div>{task.title}</div>
                                                                    <div onClick={() => this.deleteSubTask(task)}>Delete</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Form.Field>

                                            <Form.Field >
                                                <label>Overview</label>
                                                <Form.TextArea className={this.handlerInputError(errors, 'overview')} rows={12} onChange={this.handleChange} placeholder='Overview' name="overview" value={overview} />
                                                {this.displayInputError(errors, 'overview')}
                                            </Form.Field>


                                            <Form.Group>

                                                <Form.Field>
                                                    <Button type='button' onClick={this.handleSubmit} className='btn btn-success btn-md mt-2'>Submit</Button>
                                                </Form.Field>

                                            </Form.Group>
                                        </Form>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xxl={4} xl={5}>
                        <Card>
                            <Card.Body>
                                <h5 className="card-title mb-3">Attachments</h5>
                                <FileUploader
                                    onFileUpload={(files) => {
                                        this.handleAttachments(files);
                                    }}
                                    onFileRemove={(files) => {
                                        this.handleAttachments(files);
                                    }}
                                />

                                <h5>OR</h5>

                                <Form.Field width={8}>
                                    <label>Existing Documents:</label>
                                    <Dropdown disabled={loading} placeholder='Documents' onChange={this.handleDocumentChange} fluid value={documents} multiple search selection options={documentsOptions} />
                                </Form.Field>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>

                {
                    add_sub_task && <SubTask priorityOptions={priorityOptions} added={this.handleSubTaskAdded} close={() => { this.setState({ add_sub_task: false }) }} users={users} open={add_sub_task} />
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    users: state.orgs.company_users,
    token: state.token.activeToken,
    company: state.orgs.company,
    sub_tasks: state.tasks.sub_tasks,
    projects: state.projects.projects,
});

export default withRouter(connect(mapStateToProps, { setSubTasks })(Task));

