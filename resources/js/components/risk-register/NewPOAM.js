import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Modal, Button, Form, Input, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import _ from 'lodash';
import './NewPOAM.scss';
import axiosInstance from '../../api/api';

class NewPOAM extends Component {

    state = {
        errors: [],
        loading: false,
        severity: '',
        probabaility: '',
        comp_id: '',
        question_id: '',
        plan: '',
        start_date: '',
        planned_completion_date: '',
        actual_completion_date: '',
        resolution: '',
        artifact: '',
    }

    componentDidMount() {
        const { company, question } = this.props;

        this.setState({
            comp_id: company.id,
            question_id: question.id,
            severity: (question.pseverity != null ? question.pseverity : ''),
            probabaility: (question.pprobabaility != null ? question.pprobabaility : ''),
            plan: (question.plan != null ? question.plan : ''),
            start_date: (question.start_date != null ? new Date(question.start_date) : ''),
            planned_completion_date: (question.completion_date != null ? new Date(question.completion_date) : ''),
            actual_completion_date: (question.actual_compl_date != null ? new Date(question.actual_compl_date) : ''),
            resolution: (question.resolution != null ? question.resolution : ''),
            artifact: (question.artifact != null ? question.artifact : ''),
        });
    };

    onStartDateChange = start_date => {
        this.setState({ start_date });
    }

    onPlannedCompChange = planned_completion_date => {
        this.setState({ planned_completion_date });
    }

    onActualCompChange = actual_completion_date => {
        this.setState({ actual_completion_date });
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

    getDate = the_date => {
        let new_date = new Date(the_date);
        return `${new_date.getMonth()}-${new_date.getDate()}-${new_date.getFullYear()}`;
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        const { severity,
            probabaility,
            plan,
            start_date,
            planned_completion_date,
            actual_completion_date,
            resolution,
            artifact,
            comp_id,
            question_id,
        } = this.state;

        axiosInstance.post('/api/user/riskregister/add/custom/poam', {
            severity: severity,
            probabaility: probabaility,
            comp_id: comp_id,
            question_id: question_id,
            plan: plan,
            start_date: start_date,
            planned_completion_date: planned_completion_date,
            actual_completion_date: actual_completion_date,
            resolution: resolution,
            artifact: artifact,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    loading: false
                });
                this.props.added(e.data.issue);
                NotificationManager.success('POAM has been assigned successfully!', 'Success');
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
        const { errors,
            loading,
            severity,
            probabaility,
            plan,
            start_date,
            planned_completion_date,
            actual_completion_date,
            resolution,
            artifact
        }
            = this.state;

        const spOptions = [
            { key: 1, text: '1', value: 1 },
            { key: 2, text: '2', value: 2 },
            { key: 3, text: '3', value: 3 },
        ];

        return (
            <Modal
                open={open}
                className="semtic__modal"
            >
                <Modal.Header>POAM</Modal.Header>
                <Modal.Content className="newpoam__form">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Plan <span className="motion__required_field">*</span></label>
                            <Input
                                fluid
                                placeholder='Plan'
                                name="plan"
                                error={this.handlerCustomInputError(errors, 'plan')}
                                className={this.handlerInputError(errors, 'plan')} onChange={this.handleChange}
                                value={plan}
                            />
                            {this.displayInputError(errors, 'plan')}
                        </Form.Field>

                        <Form.Field>
                            <label>Start Date</label>
                            <DatePicker
                                onChange={this.onStartDateChange}
                                value={start_date}
                            />
                            {this.displayInputError(errors, 'start_date')}
                        </Form.Field>

                        <Form.Group widths="equal">
                            <Form.Field>
                                <label>Planned Completion Date</label>
                                <DatePicker
                                    onChange={this.onPlannedCompChange}
                                    value={planned_completion_date}
                                />
                                {this.displayInputError(errors, 'planned_completion_date')}
                            </Form.Field>

                            <Form.Field>
                                <label>Actual Completion Date</label>
                                <DatePicker
                                    onChange={this.onActualCompChange}
                                    value={actual_completion_date}
                                />
                                {this.displayInputError(errors, 'actual_completion_date')}
                            </Form.Field>
                        </Form.Group>

                        <Form.Field>
                            <label>Resolution</label>
                            <Input
                                fluid
                                placeholder='Resolution'
                                name="resolution"
                                error={this.handlerCustomInputError(errors, 'resolution')}
                                className={this.handlerInputError(errors, 'resolution')} onChange={this.handleChange}
                                value={resolution}
                            />
                            {this.displayInputError(errors, 'resolution')}
                        </Form.Field>


                        <Form.Field>
                            <label>Artifact</label>
                            <Form.TextArea
                                placeholder='Artifact'
                                name="artifact"
                                error={this.handlerCustomInputError(errors, 'artifact')}
                                className={this.handlerInputError(errors, 'artifact')}
                                onChange={this.handleChange}
                                value={artifact}
                            />
                            {this.displayInputError(errors, 'artifact')}
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
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => { this.props.close() }}>Cancel</Button>
                    <Button disabled={loading} className={loading ? 'loading' : ''} onClick={this.handleSubmit} positive>
                        Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default NewPOAM;
