import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import BButton from 'react-bootstrap/Button';
import { NotificationManager } from 'react-notifications';
import { Editor } from '@tinymce/tinymce-react';
import { Dropdown, Form } from 'semantic-ui-react';
import { useParams, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTask, setSubTasks, toggleTaskEditEModel } from '../../../actions';
import formatDate from "../../../utils/formatDate";
import getFormatedDate from '../../../utils/getFormatedDate';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FileUploader from '../../sub-components/FileUploader';

import DocumentListing from '../Board/DocumentListing';
import EditListTypes from '../Board/EditListTypes';
import _ from 'lodash';
import axiosInstance from '../../../api/api';

const ModifyTask = ({ history, location }) => {

    const params = useParams();

    const editorRef = useRef(null);

    const dispatch = useDispatch();

    const { users, token, company, projects, sub_tasks, task } = useSelector((state) => ({
        users: state.orgs.company_users,
        token: state.token.activeToken,
        company: state.orgs.company,
        projects: state.projects.projects,
        sub_tasks: state.tasks.sub_tasks,
        task: state.tasks.edit_task,
        leftnav: state.leftnav,
    }));

    const [task_state, setTaskState] = useState({
        errors: [],
        loading: false,
        title: task.title,
        due_date: new Date(task.due_date),
        overview: (task.description == null ? '' : task.description),
        priority: `${task.priority}`,
        assign_to: _.map(task.assign_to, (u) => u.user_id),
        files: null,
        controls: _.map(task.controls, (c) => c.control_id),
        all_controls: [],
        documents: [],
        subTasksOptions: [],
        add_sub_task: false,
        project_id: task.project_id,
        list_types: task.list_types,
        deleted_items: []
    });

    const [all_documents, setAllDocuments] = useState({
        documents: [],
        loading: false,
        errors: []
    });

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
            setAllDocuments(
                {
                    loading: false,
                    errors: [],
                    documents: e.data.documents
                }
            );
        }).catch(err => {
            if (err.response.status === 500) {
                setAllDocuments(
                    {
                        ...all_documents,
                        loading: false,
                        errors: []
                    }
                );
            }
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }, [token, company]);

    useEffect(() => {
        setTaskState({
            ...task_state,
            title: task.title,
            due_date: new Date(task.due_date),
            overview: (task.description == null ? '' : task.description),
            priority: `${task.priority}`,
            assign_to: _.map(task.assign_to, (u) => u.user_id),
            controls: _.map(task.controls, (c) => c.control_id),
            project_id: task.project_id,
            list_types: task.list_types,
        });
    }, [task]);

    const handleAttachments = files => {
        setTaskState(
            {
                ...task_state,
                files: files
            }
        );
    }

    const handleListTypeItemDeleted = id => {
        setTaskState(
            {
                ...task_state,
                deleted_items: task_state.deleted_items.push(id)
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

    const handleTaskChange = (list_types) => {
        setTaskState(
            {
                ...task_state,
                list_types
            }
        );
    }

    const handleAddListType = () => {

        let listTypes = [...task_state.list_types];

        listTypes.push({
            id: 0,
            new: true,
            title: '',
            type: '',
            list_items: [],
        });

        setTaskState(
            {
                ...task_state,
                list_types: listTypes
            }
        );
    }

    const handleSubmit = () => {

        setTaskState(
            {
                ...task_state,
                errors: [],
                loading: true
            }
        );

        const { title, overview, due_date, priority, assign_to, files, controls, documents, project_id, deleted_items } = task_state;

        const formData = new FormData();

        formData.append('task_id', task.id);
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
        formData.append('deleted_items', deleted_items);

        if (_.size(files) > 0) {
            _.forEach(files, (file, index) => {
                formData.append(`file_${index}`, file);
            });
        }

        axiosInstance.post('/api/user/tasks/update', formData)
            .then(e => {


                setTaskState(
                    {
                        ...task_state,
                        finishing: false,
                        touched: false,
                        errors: []
                    }
                );

                if (_.size(task_state.list_types) > 0) {
                    updateListTypes();
                }

                if (_.size(sub_tasks) > 0) {
                    createSubTasks(e.data.task.id);
                }
                else {
                    NotificationManager.success('Task has been updated successfully!', 'Success');
                    dispatch(setSubTasks([]))
                    dispatch(setSelectedTask(e.data.task));
                    dispatch(toggleTaskEditEModel(false));
                    // closeTDetails();
                    // update the selected task 
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

    const updateListTypes = () => {
        axiosInstance.post('/api/user/tasks/update-list-types', {
            list_types: task_state.list_types,
            task_id: task.id,
        })
            .then(e => {

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

                NotificationManager.success('New Task has been successfully created!', 'Success');
                dispatch(setSubTasks([]));
                // closeTDetails();
                dispatch(toggleTaskEditEModel(false));
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

    const handleSubTaskAdded = (task) => {
        sub_tasks.push(task);
        dispatch(setSubTasks(sub_tasks));
        setTaskState(
            {
                ...task_state,
                add_sub_task: false
            }
        );


    }

    const deleteSubTask = (task) => {
        let index = _.findIndex(sub_tasks, task);
        sub_tasks.splice(index, 1);
        dispatch(setSubTasks(sub_tasks));
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

    const controlsOptions = _.map(task_state.all_controls, (sec, index) => ({
        key: sec.id,
        text: `${sec.number} ${sec.name} (${sec.standard.name})`,
        value: sec.id,
    }));

    const documentsOptions = _.map(all_documents.documents, (doc, index) => ({
        key: doc.id,
        text: doc.name,
        value: doc.id,
    }));

    const closeTDetails = () => {
        const params = new URLSearchParams(location.search);
        const back = params.get('back');
        if (!_.isEmpty(back)) {
            history.push(back);
        }
        else {
            history.push(leftnav.back_url);
        }
    }

    return (
        <>
            <Row className='__ModifyTask'>
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

                                        <EditListTypes list_types={task_state.list_types} handle_change={handleTaskChange} handle_deleted={handleListTypeItemDeleted} />

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
                                                <Button type='button' size="lg" onClick={handleSubmit} className='btn btn-success btn-md mt-2'>Save Changes</Button>
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

                            <DocumentListing documents={task.documents} token={token} />
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </>

    );
}

export default withRouter(ModifyTask);
