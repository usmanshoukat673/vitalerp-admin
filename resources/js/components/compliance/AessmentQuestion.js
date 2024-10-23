import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import './AessmentQuestion.scss';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadArtifact from './UploadArtifact';
import axiosInstance from '../../api/api';

class AessmentQuestion extends Component {

    state = {
        loading: false,
        errors: [],
        risk_action: '',
        risk_rating: '',
        severity: '',
        probabaility: '',
        risk_owner_id: '',
        answer: '',
        notes: '',
        upload_artifact: false,
    }

    componentDidMount() {
        const { assessment_question } = this.props;

        this.setState({
            answer: (assessment_question && assessment_question.answer) != null ? assessment_question.answer : '',
            notes: (assessment_question && assessment_question.notes) != null ? assessment_question.notes : '',
            severity: (assessment_question && assessment_question.severity) != null ? assessment_question.severity : '',
            probabaility: (assessment_question && assessment_question.probabaility) != null ? assessment_question.probabaility : '',
            risk_rating: (assessment_question && assessment_question.risk_rating) != null ? assessment_question.risk_rating : '',
            risk_action: (assessment_question && assessment_question.risk_action) != null ? assessment_question.risk_action : '',
            risk_owner_id: (assessment_question && assessment_question.risk_owner_id) != null ? assessment_question.risk_owner_id : ''
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

    saveNotes = () => {
        this.props.assessment_question.notes = this.state.notes;
        this.saveProperties('notes', this.state.notes);
    }

    handleAnswerChange = (event, { value }) => {

        this.setState({ answer: value });

        this.props.assessment_question.answer = value;
        this.saveProperties('answer', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(answer)) {
            delete errors[0][answer];
            this.setState({ errors: errors });
        }
    };

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
            this.props.controlQuestionChange(assessment_question);
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

    handleUploadArtifactClose = () => this.setState({ upload_artifact: false });

    handleArtifactsUploaded = (section_document, artifacts) => {
        this.setState({ upload_artifact: false });
        this.props.uploaded(section_document, artifacts);
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
            answer,
            notes,
            upload_artifact
        } = this.state;
        const { assessment_question, users, control, company, token } = this.props;


        const ansOptions = [
            { key: 1, text: 'Yes', value: 'Yes' },
            { key: 2, text: 'No', value: 'No' },
        ];

        return (
            <div className="AessmentQuestion">
                <p><b>{assessment_question.question.question}</b></p>
                <Form size="mini">

                    <Form.Field>
                        <label>Asnwer</label>
                        <Dropdown
                            clearable
                            options={ansOptions}
                            selection
                            onChange={this.handleAnswerChange}
                            value={answer}
                            placeholder="Select Answer"
                        />
                        {this.displayInputError(errors, 'answer')}
                    </Form.Field>
                    <Form.Field >
                        <label>Notes</label>
                        <Form.TextArea className={this.handlerInputError(errors, 'notes')} onBlur={this.saveNotes} onChange={this.handleChange} placeholder='Notes' name="notes" value={notes} />
                        {this.displayInputError(errors, 'notes')}
                    </Form.Field>
                    <Form.Field>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<CloudUploadIcon />}
                            className="artifact__buttons"
                            onClick={() => this.setState({ upload_artifact: true })}
                            size="small"
                        >
                            Upload Artifact
                        </Button>
                    </Form.Field>

                </Form>

                {
                    upload_artifact ? <UploadArtifact
                        uploaded={this.handleArtifactsUploaded}
                        control={control}
                        open={upload_artifact}
                        close={this.handleUploadArtifactClose}
                        token={token}
                        company={company} /> : ''
                }
            </div>
        );
    }
}

export default AessmentQuestion;
