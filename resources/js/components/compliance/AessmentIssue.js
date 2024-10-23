import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import './AessmentIssue.scss';
import axiosInstance from '../../api/api';

class AessmentIssue extends Component {

    state = {
        loading: false,
        errors: [],
        risk_action: '',
        risk_rating: '',
        severity: '',
        probabaility: '',
        risk_owner_id: ''
    }

    componentDidMount() {
        const { assessment_question } = this.props;

        this.setState({
            severity: (assessment_question && assessment_question.severity) != null ? assessment_question.severity : '',
            probabaility: (assessment_question && assessment_question.probabaility) != null ? assessment_question.probabaility : '',
            risk_rating: (assessment_question && assessment_question.risk_rating) != null ? assessment_question.risk_rating : '',
            risk_action: (assessment_question && assessment_question.risk_action) != null ? assessment_question.risk_action : '',
            risk_owner_id: (assessment_question && assessment_question.risk_owner_id) != null ? assessment_question.risk_owner_id : ''
        });
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

        this.setState({ severity: value }, this.calculateRisk);

        this.saveProperties('severity', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(severity)) {
            delete errors[0][severity];
            this.setState({ errors: errors });
        }
    };

    saveProperties = (property, value) => {
        const { assessment_question } = this.props;
        axiosInstance.post(`/api/user/riskregister/save/rr/properties`, {
            id: assessment_question.id,
            property: property,
            value: value
        }).then(e => {
        }).catch(err => {
            if (err.response.status === 500 || err.response.status === 401) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 422) {

                const errors = err.response.data.errors;

                this.setState({ errors: this.state.errors.concat(errors), loading: false });

            }
        });
    }

    handleProbabailityChange = (event, { value }) => {

        this.setState({ probabaility: value }, this.calculateRisk);

        this.saveProperties('probabaility', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(probabaility)) {
            delete errors[0][probabaility];
            this.setState({ errors: errors });
        }
    };

    handleRiskActionChange = (event, { value }) => {

        this.setState({ risk_action: value });

        this.saveProperties('risk_action', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(risk_action)) {
            delete errors[0][risk_action];
            this.setState({ errors: errors });
        }
    };

    handleRiskOwnerChange = (event, { value }) => {

        this.setState({ risk_owner_id: value });

        this.saveProperties('risk_owner_id', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(risk_owner_id)) {
            delete errors[0][risk_owner_id];
            this.setState({ errors: errors });
        }
    };


    calculateRisk = () => {
        const { severity, probabaility } = this.state;

        if (severity > 0 && probabaility > 0) {
            this.setState({ risk_rating: severity * probabaility });
            this.saveProperties('risk_rating', severity * probabaility);
        }
        else {
            this.setState({ risk_rating: '' });
            this.saveProperties('risk_rating', '');
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const {
            loading,
            errors,
            risk_rating,
            severity,
            probabaility,
            risk_action,
            risk_owner_id,
        } = this.state;
        const { assessment_question, users } = this.props;


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
            <div className="AessmentIssue">
                <p><b>{assessment_question.question.question}</b></p>
                <Form size="mini">
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Dropdown
                                clearable
                                options={usersOptions}
                                selection
                                onChange={this.handleRiskOwnerChange}
                                value={risk_owner_id}
                                placeholder="Select Risk Owner"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                clearable
                                options={spOptions}
                                selection
                                onChange={this.handleSeverityChange}
                                value={severity}
                                placeholder="Select Severity"
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Dropdown
                                clearable
                                options={spOptions}
                                selection
                                onChange={this.handleProbabailityChange}
                                value={probabaility}
                                placeholder="Select Probabaility"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                clearable
                                options={riskActionOptions}
                                selection
                                onChange={this.handleRiskActionChange}
                                value={risk_action}
                                placeholder="Select Risk Action"
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default AessmentIssue;
