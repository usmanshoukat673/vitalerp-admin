import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';

import { Dropdown, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import formatDate from "../../../utils/formatDate";
import getFormatedDate from '../../../utils/getFormatedDate';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FileUploader from '../../sub-components/FileUploader';
import { Editor } from '@tinymce/tinymce-react';

import './AddProject.scss';
import axiosInstance from '../../../api/api';

class AddProject extends Component {

    state = {
        errors: [],
        loading: false,
        title: '',
        url: '',
        start_date: new Date(),
        end_date: new Date(),
        priority: '1',
        assign_to: [],
        files: null,
        documents: [],
        all_documents: [],
        category_id: '0'
    }

    constructor(props) {
        super(props);
        this.editorRef = React.createRef(null);
    }

    componentDidMount() {
        const { token, company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/projects/documents/${company.id}/${company.document.id}`).then(e => {
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

        if (errors.length > 0 && errors[0].hasOwnProperty(priority)) {
            delete errors[0][priority];
            this.setState({ errors: errors });
        }
    };

    handleCategoryChange = (event, { value }) => {

        this.setState({ category_id: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(category_id)) {
            delete errors[0][category_id];
            this.setState({ errors: errors });
        }
    };

    handleDuDateChange = (start_date) => {

        if (start_date instanceof Date && !isNaN(start_date) && this.isValidDate(formatDate(start_date))) {
            this.setState({ start_date });
        }


        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(start_date)) {
            delete errors[0][start_date];
            this.setState({ errors: errors });
        }
    };

    handleDuDateTimeChange = (start_date) => {

        this.setState({ start_date });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('start_date')) {
            delete errors[0]['start_date'];
            this.setState({ errors: errors });
        }
    };

    handleEndDateTimeChange = (end_date) => {

        this.setState({ end_date });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('end_date')) {
            delete errors[0]['end_date'];
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

        const { token, company } = this.props;

        const { title, url, start_date, end_date, priority, assign_to, files, documents, category_id } = this.state;

        const formData = new FormData();

        formData.append('comp_id', company.id);
        formData.append('title', title);
        formData.append('url', url);
        formData.append('overview', this.editorRef.current.getContent());
        formData.append('priority', priority);
        formData.append('assign_to', assign_to);
        formData.append('start_date', getFormatedDate(start_date));
        formData.append('end_date', getFormatedDate(end_date));
        formData.append('project_folder_id', company.project_folder.id);
        formData.append('documents', documents);
        formData.append('category_id', category_id);

        if (_.size(files) > 0) {
            _.forEach(files, (file, index) => {
                formData.append(`file_${index}`, file);
            });
        }

        axiosInstance.post('/api/user/projects/create', formData)
            .then(e => {
                this.setState({
                    errors: [],
                    finishing: false,
                    touched: false,
                });

                NotificationManager.success('New Projet has been successfully created!', 'Success');
                this.props.close();
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
        this.setState({ start_date: date })
    };

    render() {

        const { users } = this.props;
        const { title, url, errors, loading, overview, start_date, end_date, priority, assign_to, all_documents, documents, category_id } = this.state;


        const priorityOptions = [
            { key: 1, text: 'Low', value: '1' },
            { key: 2, text: 'Medium', value: '2' },
            { key: 3, text: 'High', value: '3' },
        ];

        const categoryOptions = [
            { key: 0, text: 'Uncategorized', value: '0' },
            { key: 1, text: 'Corrective Actions ', value: '1' },
            { key: 2, text: 'Document Updates ', value: '2' },
            { key: 3, text: 'Policy', value: '3' },
            { key: 4, text: 'Document Updates', value: '4' },
        ]

        const userOptions = _.map(users, (us, index) => ({
            key: us.user.id,
            text: `${us.user.first_name} ${us.user.last_name}`,
            value: us.user.id,
        }));

        const documentsOptions = _.map(all_documents, (doc, index) => ({
            key: doc.id,
            text: doc.name,
            value: doc.id,
        }));

        return (
            <div className='__Details'>

                <Row>
                    <Col xxl={8} xl={7}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>

                                        <Form>
                                            <Form.Field>
                                                <label>Title <sup className='motion__required_field'>*</sup></label>
                                                <Form.Input className={this.handlerInputError(errors, 'title')} placeholder="Project Name" onChange={this.handleChange} fluid type='text' name="title" value={title} />
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
                                                    <label>Start Date <sup className='motion__required_field'>*</sup></label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            label="mm/dd/yyyy"
                                                            value={start_date}
                                                            onChange={this.handleDuDateTimeChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                    {this.displayInputError(errors, 'start_date')}

                                                </Form.Field>
                                                <Form.Field width={8}>
                                                    <label>End Date <sup className='motion__required_field'>*</sup></label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            label="mm/dd/yyyy"
                                                            value={end_date}
                                                            onChange={this.handleEndDateTimeChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                    {this.displayInputError(errors, 'end_date')}
                                                </Form.Field>
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Field width={8}>
                                                    <label>Category <sup className='motion__required_field'>*</sup></label>
                                                    <Dropdown
                                                        clearable
                                                        options={categoryOptions}
                                                        selection
                                                        onChange={this.handleCategoryChange}
                                                        value={category_id}
                                                        placeholder="Select"
                                                    />
                                                    {this.displayInputError(errors, 'category_id')}
                                                </Form.Field>
                                                <Form.Field width={8}>
                                                    <label>URL</label>
                                                    <Form.Input className={this.handlerInputError(errors, 'url')} placeholder="www.example.com" onChange={this.handleChange} fluid type='text' name="url" value={url} />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Field >
                                                <label>Overview</label>
                                                <Editor
                                                    tinymceScriptSrc='/tinymce/tinymce.min.js'
                                                    onInit={(evt, editor) => this.editorRef.current = editor}
                                                    initialValue={overview}
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


            </div>

        );
    }
}

export default withRouter(AddProject);

