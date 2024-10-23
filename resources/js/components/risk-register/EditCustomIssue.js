import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Modal, Button, Form, Input, Dropdown } from 'semantic-ui-react';
import './EditCustomIssue.scss';
import axiosInstance from '../../api/api';

class EditCustomIssue extends Component {

    state = {
        errors: [],
        loading: false,
        risk_action: '',
        severity: '',
        probabaility: '',
        risk_owner_id: '',
        issue_id: '',
        standard_name: '',
        domain_name: '',
        risk_control: '',
        question: '',
        comp_id: '',
        question_id: '',
    }

    componentDidMount() {
        const { company, question } = this.props;

        this.setState({
            comp_id: company.id,
            question_id: question.id,
            issue_id: (question.risk_id != null ? question.risk_id : ''),
            risk_action: (question.risk_action != null ? question.risk_action : ''),
            severity: (question.severity != null ? question.severity : ''),
            probabaility: (question.probabaility != null ? question.probabaility : ''),
            risk_owner_id: (question.risk_owner_id != null ? question.risk_owner_id : ''),
            standard_name: (question.standard != null ? question.standard : ''),
            domain_name: (question.section != null ? question.section : ''),
            risk_control: (question.control != null ? question.control : ''),
            question: (question.question != null ? question.question : ''),
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

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    handlerCustomInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSeverityChange = (event, { value }) => {

        this.setState({ severity: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(severity)) {
            delete errors[0][severity];
            this.setState({ errors: errors });
        }
    };


    handleProbabailityChange = (event, { value }) => {

        this.setState({ probabaility: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(probabaility)) {
            delete errors[0][probabaility];
            this.setState({ errors: errors });
        }
    };

    handleRiskActionChange = (event, { value }) => {

        this.setState({ risk_action: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(risk_action)) {
            delete errors[0][risk_action];
            this.setState({ errors: errors });
        }
    };

    handleRiskOwnerChange = (event, { value }) => {

        this.setState({ risk_owner_id: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(risk_owner_id)) {
            delete errors[0][risk_owner_id];
            this.setState({ errors: errors });
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        axiosInstance.post('/api/user/riskregister/update/custom/issue', this.state)
            .then(e => {
                this.setState({
                    errors: [],
                    loading: false
                });
                this.props.handleUpdateIssue(e.data.issue);
                NotificationManager.success('New issue has been added successfully!', 'Success');
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

                    this.setState({ errors: this.state.errors.concat(errors), loading: false });

                }
            });
    }

    render() {

        const { open, users } = this.props;
        const { errors, loading, severity, probabaility, risk_action, risk_owner_id, issue_id, standard_name, domain_name, risk_control, question } = this.state;

        const spOptions = [
            { key: 1, text: '1', value: 1 },
            { key: 2, text: '2', value: 2 },
            { key: 3, text: '3', value: 3 },
        ];
        const riskActionOptions = [
            { key: 1, text: 'Avoid', value: 'Avoid' },
            { key: 2, text: 'Mitigate', value: 'Mitigate' },
            { key: 3, text: 'Transfer', value: 'Transfer' },
            { key: 4, text: 'Accept', value: 'Accept' },
        ];

        const usersOptions = _.map(users, (user, index) => ({
            key: user.id,
            text: `${user.user.first_name} ${user.user.last_name} (${user.user.email})`,
            value: user.user_id,
        }));

        return (
            <Modal
                open={open}
                className="semtic__modal"
            >
                <Modal.Header>Edit Issue</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Issue ID</label>
                                <Input
                                    fluid
                                    placeholder='Type Issue ID'
                                    name="issue_id"
                                    error={this.handlerCustomInputError(errors, 'issue_id')}
                                    className={this.handlerInputError(errors, 'issue_id')} onChange={this.handleChange}
                                    value={issue_id}
                                />
                                {this.displayInputError(errors, 'issue_id')}
                            </Form.Field>

                            <Form.Field>
                                <label>Standard Name <span className="motion__required_field">*</span></label>
                                <Input
                                    fluid
                                    placeholder='Type Standard Name'
                                    name="standard_name"
                                    error={this.handlerCustomInputError(errors, 'standard_name')}
                                    className={this.handlerInputError(errors, 'standard_name')} onChange={this.handleChange}
                                    value={standard_name}
                                />
                                {this.displayInputError(errors, 'standard_name')}
                            </Form.Field>
                        </Form.Group>

                        <Form.Field>
                            <label>Domain Name <span className="motion__required_field">*</span></label>
                            <Input
                                fluid
                                placeholder='Type Domain Name'
                                name="domain_name"
                                error={this.handlerCustomInputError(errors, 'domain_name')}
                                className={this.handlerInputError(errors, 'domain_name')} onChange={this.handleChange}
                                value={domain_name}
                            />
                            {this.displayInputError(errors, 'domain_name')}
                        </Form.Field>

                        <Form.Field>
                            <label>Risk Control <span className="motion__required_field">*</span> </label>
                            <Input
                                fluid
                                placeholder='Type Risk Control'
                                name="risk_control"
                                error={this.handlerCustomInputError(errors, 'risk_control')}
                                className={this.handlerInputError(errors, 'risk_control')} onChange={this.handleChange}
                                value={risk_control}
                            />
                            {this.displayInputError(errors, 'risk_control')}
                        </Form.Field>
                        <Form.Field>
                            <label>Question <span className="motion__required_field">*</span></label>
                            <Form.TextArea
                                placeholder='Type Question'
                                name="question"
                                error={this.handlerCustomInputError(errors, 'question')}
                                className={this.handlerInputError(errors, 'question')}
                                onChange={this.handleChange}
                                value={question}
                            />
                            {this.displayInputError(errors, 'question')}
                        </Form.Field>

                        <Form.Field>
                            <label>Risk Owner</label>
                            <Dropdown
                                clearable
                                options={usersOptions}
                                selection
                                onChange={this.handleRiskOwnerChange}
                                value={risk_owner_id}
                                error={this.handlerCustomInputError(errors, 'risk_owner_id')}
                                placeholder="Select Risk Owner"
                                name="risk_owner_id"
                            />
                            {this.displayInputError(errors, 'risk_owner_id')}
                        </Form.Field>

                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Severity</label>
                                <Dropdown
                                    clearable
                                    options={spOptions}
                                    selection
                                    onChange={this.handleSeverityChange}
                                    error={this.handlerCustomInputError(errors, 'severity')}
                                    value={severity}
                                    placeholder="Select Severity"
                                    name="severity"
                                />
                                {this.displayInputError(errors, 'severity')}
                            </Form.Field>
                            <Form.Field>
                                <label>Probabaility</label>
                                <Dropdown
                                    clearable
                                    options={spOptions}
                                    selection
                                    onChange={this.handleProbabailityChange}
                                    value={probabaility}
                                    placeholder="Select Probabaility"
                                    error={this.handlerCustomInputError(errors, 'probabaility')}
                                    name="probabaility"
                                />
                                {this.displayInputError(errors, 'probabaility')}
                            </Form.Field>
                            <Form.Field>
                                <label>Risk Action</label>
                                <Dropdown
                                    clearable
                                    options={riskActionOptions}
                                    selection
                                    onChange={this.handleRiskActionChange}
                                    value={risk_action}
                                    placeholder="Select Risk Action"
                                    error={this.handlerCustomInputError(errors, 'risk_action')}
                                    name="risk_action"
                                />
                                {this.displayInputError(errors, 'risk_action')}
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => { this.props.close() }}>Cancel</Button>
                    <Button disabled={loading} className={loading ? 'loading' : ''} onClick={this.handleSubmit} positive>
                        Save Changes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default EditCustomIssue;
