import React, { Component } from 'react';
import { Modal, Image, Button, Header, Form, Dropdown, Checkbox } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { GlobalAppName } from '../..';
import axiosInstance from '../../api/api';

class IssueTicket extends Component {

    state = {
        loading: false,
        errors: [],
        open: true,
        subject: '',
        description: '',
        cc_admins: false,
        all_tags: [{
            name: 'Freshdesk',
        }],
        tags: ['Freshdesk'],
        type: '',
        priority: ''
    };

    componentDidMount() {
        const { agent } = this.props;

        this.setState({
            subject: `${GlobalAppName} Identified Issue : [${agent.name}]`
        });
    }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleTypeChange = (event, { value }) => {
        this.setState({ type: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(type)) {
            delete errors[0][type];
            this.setState({ errors: errors });
        }
    }

    handlePriorityChange = (event, { value }) => {
        this.setState({ priority: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(priority)) {
            delete errors[0][priority];
            this.setState({ errors: errors });
        }
    }

    handleTagChange = (event, { value }) => {

        let items = value.filter(e => typeof e === "string");

        this.setState({ tags: items });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(tags)) {
            delete errors[0][tags];
            this.setState({ errors: errors });
        }
    }

    handleTagAddition = (e, { value }) => {
        e.preventDefault();
        this.setState((prevState) => ({
            all_tags: [{ name: value }, ...prevState.all_tags],
            // tags: [value, ...prevState.tags],
        }));
    }

    toggle = () => {
        this.setState((prevState) => {
            return ({ cc_admins: !prevState.cc_admins });
        });
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        const { app, agent } = this.props;

        const { cc_admins, tags, type, subject, description, priority } = this.state;

        axiosInstance.post('/api/user/applications/freshdesk/create/ticket', {
            cc_admins: cc_admins,
            app_id: app.id,
            comp_id: app.comp_id,
            tags: tags,
            type: type,
            subject: subject,
            description: description,
            priority: priority,
        })
            .then(e => {
                this.setState({
                    open: false,
                    errors: [],
                    loading: false
                });
                NotificationManager.success('Ticket has been successfully created!', 'Success');

                this.props.created(e.data.tickets);

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {

                    const errors = err.response.data.errors;

                    this.setState({ errors: this.state.errors.concat(errors), loading: false });

                }

                if (err.response.status === 400) {

                    const errors = err.response.data.errors;

                    if (errors.hasOwnProperty('email')) {
                        NotificationManager.warning(errors.email[0], 'Error');
                        this.setState({ loading: false, errors: [] });
                    }
                    else {
                        this.setState({ errors: this.state.errors.concat(errors), loading: false });
                    }

                }

                if (err.response.status === 401) {

                    this.setState({
                        errors: [], loading: false

                    });

                    NotificationManager.error('Invalid API Details, please verify and enter correct information.', 'Error');

                }
                if (err.response.status === 404) {

                    this.setState({
                        errors: [], loading: false

                    });

                    NotificationManager.error('Invalid Domain Name, please verify domain name is correct.', 'Error');

                }
                if (err.response.status === 403) {

                    this.setState({
                        errors: [], loading: false
                    });

                    NotificationManager.error('Forbidden: Your account has been suspended, Please contact Freshdesk Support.', 'Error');

                }
            });
    }

    close = () => {
        this.setState({ open: false });
        this.props.cancel();
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { open, errors, loading, cc_admins, tags, all_tags, type, subject, description, priority } = this.state;

        const TypeOptions = [{
            key: 'Question',
            text: 'Question',
            value: 'Question',
        },
        {
            key: 'Incident',
            text: 'Incident',
            value: 'Incident',
        },
        {
            key: 'Problem',
            text: 'Problem',
            value: 'Problem',
        },
        {
            key: 'Feature Request',
            text: 'Feature Request',
            value: 'Feature Request',
        },
        {
            key: 'Refund',
            text: 'Refund',
            value: 'Refund',
        }
        ];

        const priorityOptions = [
            {
                key: 1,
                text: 'Low',
                value: 1,
            },
            {
                key: 2,
                text: 'Medium',
                value: 2,
            },
            {
                key: 3,
                text: 'High',
                value: 3,
            },
            {
                key: 4,
                text: 'Urgent',
                value: 4,
            },
        ];

        const TagsOptions = _.map(all_tags, (tag, index) => ({
            key: tag.name,
            text: tag.name,
            value: tag.name,
        }));

        return (
            <Modal
                dimmer="inverted"
                open={open} onClose={this.close}
                className="semtic__modal"
                size="small"
            >
                <Modal.Header>Issue Ticket</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Subject:</label>
                            <Form.Input
                                className={this.handlerInputError(errors, 'subject')}
                                onChange={this.handleChange}
                                fluid icon='ticket'
                                iconPosition='left'
                                placeholder='Subject'
                                name="subject"
                                value={subject}
                            />
                            {this.displayInputError(errors, 'subject')}
                        </Form.Field>
                        <label>Description:</label>
                        <Form.TextArea
                            className={this.handlerInputError(errors, 'description')}
                            onChange={this.handleChange}
                            placeholder='Tell us more'
                            name="description"
                            value={description}
                        />
                        {this.displayInputError(errors, 'description')}
                        <Form.Field>
                            <label>Type:</label>
                            <Dropdown className={this.handlerInputError(errors, 'type')}
                                placeholder='Type'
                                onChange={this.handleTypeChange}
                                search selection fluid
                                value={type}
                                options={TypeOptions}
                            />
                            {this.displayInputError(errors, 'type')}
                        </Form.Field>
                        <Form.Field>
                            <label>Priority:</label>
                            <Dropdown className={this.handlerInputError(errors, 'priority')}
                                placeholder='Priority'
                                onChange={this.handlePriorityChange}
                                search selection fluid
                                value={priority}
                                options={priorityOptions}
                            />
                            {this.displayInputError(errors, 'priority')}
                        </Form.Field>

                        <Form.Field>
                            <Checkbox onChange={this.toggle} checked={cc_admins} toggle label="CC Admins" />
                        </Form.Field>
                        <Form.Field>
                            <label>Tags:</label>
                            <Dropdown
                                options={TagsOptions}
                                placeholder='Choose Tags'
                                search
                                selection
                                fluid
                                multiple
                                allowAdditions
                                value={tags}
                                onAddItem={this.handleTagAddition}
                                onChange={this.handleTagChange}
                            />
                            {this.displayInputError(errors, 'tags')}
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.close}>
                        Cancel
                    </Button>
                    <Button
                        content="Submit"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.handleSubmit}
                        positive
                        disabled={loading}
                        className={loading ? 'loading' : ''}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default IssueTicket;
