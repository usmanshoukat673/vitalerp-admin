import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import BButton from 'react-bootstrap/Button';
import { NotificationManager } from 'react-notifications';

import { Dropdown, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSubTasks, setTaskListTypes, toggleTslAddEModel } from '../../../actions';

import formatDate from "../../../utils/formatDate";
import getFormatedDate from '../../../utils/getFormatedDate';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FileUploader from '../../sub-components/FileUploader';
import SubTask from './SubTask';

import CreateList from './CreateList';

import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from '../../../api/api';

const AddNewTask = ({ history }) => {

    const dispatch = useDispatch();

    const { users, company, projects, sub_tasks, list_types, project_profile } = useSelector((state) => ({
        users: state.orgs.company_users,
        token: state.token.activeToken,
        company: state.orgs.company,
        projects: state.projects.projects,
        sub_tasks: state.tasks.sub_tasks,
        leftnav: state.leftnav,
        list_types: state.tasks.list_types,
        project_profile: state.projects.profile
    }));

    const [task_state, setTaskState] = useState({
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
        finishing: false,
        touched: false
    });

    const editorRef = useRef(null);

    useEffect(() => {

        setTaskState(
            {
                ...task_state,
                loading: true
            }
        );

        axiosInstance.get(`/api/user/tasks/get-controls/${company.id}`).then(e => {

            setTaskState(
                {
                    ...task_state,
                    loading: false,
                    all_controls: e.data.controls
                }
            );

        }).catch(err => {
            if (err.response.status === 500) {

                setTaskState(
                    {
                        ...task_state,
                        loading: false,
                        errors: []
                    }
                );
            }
            if (err.response.status === 401) {
                history.push('/login');
            }
        });

        axiosInstance.get(`/api/user/tasks/documents/${company.id}/${company.document.id}`).then(e => {

            setTaskState(
                {
                    ...task_state,
                    loading: false,
                    all_documents: e.data.documents
                }
            );
        }).catch(err => {
            if (err.response.status === 500) {
                setTaskState(
                    {
                        ...task_state,
                        loading: false,
                        errors: []
                    }
                );
            }
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }, []);

    const handleAttachments = files => {
        setTaskState(
            {
                ...task_state,
                files: files
            }
        );
    }

    const handleChange = event => {

        setTaskState(
            {
                ...task_state,
                [event.target.name]: event.target.value,
                touched: true
            }
        );

        clearErrors(event.target.name);
    }

    const clearErrors = (name) => {
        const { errors } = task_state;

        if (errors.length > 0 && errors[0].hasOwnProperty(name)) {
            delete errors[0][name];
            setTaskState(
                {
                    ...task_state,
                    errors: errors
                }
            );
        }
    }

    const handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handlePriorityChange = (event, { value }) => {

        setTaskState(
            {
                ...task_state,
                priority: value
            }
        );

        clearErrors('priority');

    };

    const handleDuDateChange = (due_date) => {

        if (due_date instanceof Date && !isNaN(due_date) && isValidDate(formatDate(due_date))) {
            setTaskState(
                {
                    ...task_state,
                    due_date: due_date
                }
            );
        }

        clearErrors('due_date');
    };

    const handleDuDateTimeChange = (due_date) => {

        setTaskState(
            {
                ...task_state,
                due_date: due_date
            }
        );

        clearErrors('due_date');
    };

    const isValidDate = (dateString) => {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }


    const handleOwnerChange = (event, { value }) => {

        setTaskState(
            {
                ...task_state,
                assign_to: value
            }
        );

        clearErrors('assign_to');
    }

    const handleProjectChange = (event, { value }) => {

        setTaskState(
            {
                ...task_state,
                project_id: value
            }
        );

        clearErrors('project_id');
    }

    const handleControlChange = (event, { value }) => {

        setTaskState(
            {
                ...task_state,
                controls: value
            }
        );

        clearErrors('controls');
    }

    const handleDocumentChange = (event, { value }) => {

        setTaskState(
            {
                ...task_state,
                documents: value
            }
        );

        clearErrors('documents');
    }

    const handleSubmit = () => {

        setTaskState(
            {
                ...task_state,
                errors: [],
                loading: true
            }
        );

        const { title, due_date, priority, assign_to, files, controls, documents, project_id } = task_state;

        const formData = new FormData();

        formData.append('comp_id', company.id);
        formData.append('title', title);
        formData.append('project_id', project_id);
        formData.append('overview', editorRef.current.getContent());
        formData.append('priority', priority);
        formData.append('assign_to', assign_to);
        formData.append('due_date', getFormatedDate(due_date));
        formData.append('task_folder_id', company.task_folder.id);
        formData.append('controls', controls);
        formData.append('documents', documents);
        formData.append('status', 'Pending');

        if (_.size(files) > 0) {
            _.forEach(files, (file, index) => {
                formData.append(`file_${index}`, file);
            });
        }

        axiosInstance.post('/api/user/tasks/create', formData)
            .then(e => {

                setTaskState(
                    {
                        ...task_state,
                        finishing: false,
                        touched: false,
                        errors: []
                    }
                );

                if (_.size(sub_tasks) > 0) {
                    createSubTasks(e.data.task.id);
                }
                else {

                    if (_.size(list_types) > 0) {
                        createListTypes(e.data.task.id);
                    }


                    NotificationManager.success('New Task has been successfully created!', 'Success');
                    dispatch(setSubTasks([]));
                    // closeTDetails();
                    dispatch(toggleTslAddEModel(false));
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setTaskState(
                        {
                            ...task_state,
                            finishing: false,
                            touched: false,
                            errors: []
                        }
                    );
                }
                if (err.response.status === 422) {
                    setTaskState(
                        {
                            ...task_state,
                            finishing: false,
                            touched: false,
                            errors: task_state.errors.concat(err.response.data.errors)
                        }
                    );
                }
            });
    }

    const createListTypes = (task_id) => {
        axiosInstance.post('/api/user/tasks/create-list-types', {
            list_types: list_types,
            task_id: task_id,
        })
            .then(e => {
                dispatch(setTaskListTypes([]));
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setTaskState(
                        {
                            ...task_state,
                            finishing: false,
                            loading: false,
                            touched: false,
                            errors: []
                        }
                    );
                }
                if (err.response.status === 422) {
                    setTaskState(
                        {
                            ...task_state,
                            finishing: false,
                            touched: false,
                            loading: false,
                            errors: task_state.errors.concat(err.response.data.errors)
                        }
                    );
                }
            });
    }

    const createSubTasks = (task_id) => {

        setTaskState(
            {
                ...task_state,
                loading: false,
                errors: []
            }
        );

        axiosInstance.post('/api/user/tasks/create-sub-task', {
            sub_tasks: sub_tasks,
            task_id: task_id,
        })
            .then(e => {

                setTaskState(
                    {
                        ...task_state,
                        finishing: false,
                        loading: false,
                        touched: false,
                        errors: []
                    }
                );

                if (_.size(list_types) > 0) {
                    createListTypes(task_id);
                }

                NotificationManager.success('New Task has been successfully created!', 'Success');
                dispatch(setSubTasks([]));
                dispatch(setTaskListTypes([]));
                // closeTDetails();
                dispatch(toggleTslAddEModel(false));
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setTaskState(
                        {
                            ...task_state,
                            finishing: false,
                            loading: false,
                            touched: false,
                            errors: []
                        }
                    );
                }
                if (err.response.status === 422) {
                    setTaskState(
                        {
                            ...task_state,
                            finishing: false,
                            touched: false,
                            loading: false,
                            errors: task_state.errors.concat(err.response.data.errors)
                        }
                    );
                }
            });
    }

    const handleDateChange = (date) => {

        setTaskState(
            {
                ...task_state,
                due_date: date,
            }
        );
    };

    const handleTaskAddition = (e, { value }) => {
        setTaskState(
            {
                ...task_state,
                subTasksOptions: [{ text: value, value }, ...task_state.subTasksOptions],
            }
        );
    }

    const handleAddSubTask = () => {
        setTaskState(
            {
                ...task_state,
                add_sub_task: true
            }
        );
    }

    const handleCloseSubTask = () => {
        setTaskState(
            {
                ...task_state,
                add_sub_task: false
            }
        );
    }

    const handleSubTaskAdded = (task, option) => {
        sub_tasks.push(task);
        dispatch(setSubTasks(sub_tasks));
        setTaskState(
            {
                ...task_state,
                add_sub_task: option
            }
        );
    }

    const deleteSubTask = (task) => {
        let index = _.findIndex(sub_tasks, task);
        sub_tasks.splice(index, 1);
        dispatch(setSubTasks(sub_tasks));
    }

    const handleAddListType = () => {
        list_types.push({
            title: '',
            type: '',
            items: []
        });
        dispatch(setTaskListTypes(list_types));
    }

    const handleRemoveListType = (index) => {
        const listTypes = [...list_types];
        listTypes.splice(index, 1);
        dispatch(setTaskListTypes(listTypes));
    }

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

    useEffect(() => {
        setTaskState(
            {
                ...task_state,
                project_id: project_profile.id
            }
        );
    }, [project_profile]);

    const controlsOptions = _.map(task_state.all_controls, (sec, index) => ({
        key: sec.id,
        text: `${sec.number} ${sec.name} (${sec.standard.name})`,
        value: sec.id,
    }));

    const documentsOptions = _.map(task_state.all_documents, (doc, index) => ({
        key: doc.id,
        text: doc.name,
        value: doc.id,
    }));

    // const closeTDetails = () => {
    //     const params = new URLSearchParams(location.search);
    //     const back = params.get('back');
    //     if (!_.isEmpty(back)) {
    //         s
    //         history.push(back);
    //     }
    //     else {
    //         history.push(leftnav.back_url);
    //     }
    // }

    return (
        <>

            <Row className='__AddNewTask'>
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
                                                onChange={handleProjectChange}
                                                value={task_state.project_id}
                                                placeholder="Project"
                                            />
                                            {displayInputError(task_state.errors, 'project_id')}
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Title <sup className='motion__required_field'>*</sup></label>
                                            <Form.Input className={handlerInputError(task_state.errors, 'title')} placeholder="Task" onChange={handleChange} fluid type='text' name="title" value={task_state.title} />
                                            {displayInputError(task_state.errors, 'title')}
                                        </Form.Field>
                                        <Form.Group>
                                            <Form.Field width={8}>
                                                <label>Assign To <sup className='motion__required_field'>*</sup></label>
                                                <Dropdown
                                                    clearable
                                                    options={userOptions}
                                                    selection
                                                    onChange={handleOwnerChange}
                                                    value={task_state.assign_to}
                                                    placeholder="Select User"
                                                    multiple
                                                />
                                                {displayInputError(task_state.errors, 'assign_to')}
                                            </Form.Field>
                                            <Form.Field width={8}>
                                                <label>Priority <sup className='motion__required_field'>*</sup></label>
                                                <Dropdown
                                                    clearable
                                                    options={priorityOptions}
                                                    selection
                                                    onChange={handlePriorityChange}
                                                    value={task_state.priority}
                                                    placeholder="Select"
                                                />
                                                {displayInputError(task_state.errors, 'priority')}
                                            </Form.Field>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Field width={8}>
                                                <label>Due Date <sup className='motion__required_field'>*</sup></label>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="mm/dd/yyyy"
                                                        value={task_state.due_date}
                                                        onChange={handleDuDateTimeChange}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                {displayInputError(task_state.errors, 'due_date')}

                                            </Form.Field>

                                            <Form.Field width={8}>
                                                <label>Options (Controls):</label>
                                                <Dropdown disabled={task_state.loading} placeholder='Options (Controls)' onChange={handleControlChange} fluid value={task_state.controls} multiple search selection options={controlsOptions} />
                                            </Form.Field>

                                        </Form.Group>

                                        <Form.Field>
                                            <div className='sub__task__container'>
                                                <label>Sub Tasks</label>  <BButton size="sm" onClick={handleAddSubTask} variant="secondary">Add Sub Task</BButton>
                                            </div>
                                            <div className='sub_task__field'>
                                                {
                                                    _.map(sub_tasks, (task) => {
                                                        return (
                                                            <div className='a__sub_task' key={task.title}>
                                                                <div>{task.title}</div>
                                                                <div className='chand' onClick={() => deleteSubTask(task)}>Delete</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Form.Field>

                                        {
                                            task_state.add_sub_task && <SubTask added={handleSubTaskAdded} priorityOptions={priorityOptions} close={handleCloseSubTask} users={users} />
                                        }

                                        <Form.Field>
                                            <div className='sub__task__container'>
                                                <label>Lists:</label>
                                            </div>
                                        </Form.Field>

                                        {
                                            _.map(list_types, (list, index) => {
                                                return <CreateList key={index} index={index} close={handleRemoveListType} list={list} />
                                            })
                                        }

                                        <Form.Field>
                                            <BButton size="sm" onClick={handleAddListType} variant="secondary">Add List Type</BButton>
                                        </Form.Field>

                                        <Form.Field >
                                            <label>Overview</label>
                                            <Editor
                                                tinymceScriptSrc='/tinymce/tinymce.min.js'
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue={task_state.overview}
                                                init={{
                                                    height: 200,
                                                    menubar: false, 
                                                    plugins: [
                                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                        'insertdatetime', 'media', 'table', 'preview', 'wordcount'
                                                    ],
                                                    toolbar: 'undo redo | blocks | ' +
                                                        'bold italic forecolor | alignleft aligncenter ' +
                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                        'removeformat',
                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                }}
                                            />

                                            {displayInputError(task_state.errors, 'overview')}
                                        </Form.Field>


                                        <Form.Group>

                                            <Form.Field>
                                                <Button type='button' size="lg" onClick={handleSubmit} className='btn btn-success btn-md mt-2'>Submit</Button>
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
                                    handleAttachments(files);
                                }}
                                onFileRemove={(files) => {
                                    handleAttachments(files);
                                }}
                            />

                            <h5>OR</h5>

                            <Form.Field width={8}>
                                <label>Existing Documents:</label>
                                <Dropdown disabled={task_state.loading} placeholder='Documents' onChange={handleDocumentChange} fluid value={task_state.documents} multiple search selection options={documentsOptions} />
                            </Form.Field>

                        </Card.Body>
                    </Card>

                </Col>

            </Row>

        </>

    );
}

export default withRouter(AddNewTask);
