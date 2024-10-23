import React, { Component } from 'react';
import { Input, Header, Popup, Dropdown, Form, Segment, Checkbox } from 'semantic-ui-react';
import { IoIosInformationCircleOutline } from "react-icons/io";
import Button from '@mui/material/Button';
import './SelectDoc.scss';
import axiosInstance from '../../../api/api';

class SelectDoc extends Component {

    state = {
        answer: '',
        assets: [],
        explanation: '',
        errors: [],
        loading: false,
        answered: false,
        changed: false,
        applicable: false,
    }

    componentDidMount() {

        const { question } = this.props;

        this.setState({
            assets: _.map(question.assets, (asset, index) => (asset.app_id)),
            answer: (question.document_id != null ? question.document_id : ''),
            answered: question.answered,
            applicable: question.applicable,
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

    toggleApplicable = () => {
        this.setState((prevState) => {
            return ({ applicable: !prevState.applicable });
        }, () => {
            this.setState({ changed: true });
        });
    }

    handleDocumentChange = (event, { value }) => {
        this.setState({ answer: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(answer)) {
            delete errors[0][answer];
            this.setState({ errors: errors });
        }
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    displayDDInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleAssetsChange = (event, { value }) => {

        this.setState({ assets: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(assets)) {
            delete errors[0][assets];
            this.setState({ errors: errors });
        }
    }

    submitAnswer = () => {
        this.setState({ errors: [], loading: true });

        const { question, all_assets } = this.props;
        const { assets, explanation, answer, applicable, } = this.state;

        const all_assets_filtered = _.map(all_assets, ast => (ast.id));

        axiosInstance.post(`/api/user/compliance/answer/select-doc`, {
            applicable: applicable,
            assets: assets,
            explanation: explanation,
            answer: answer,
            question_id: question.id,
            all_assets: all_assets_filtered
        })
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                    changed: false
                }, () => {
                    this.props.handleNext();
                });

                // TODO: may needs to replace the question in props
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    handleNext = () => {
        this.submitAnswer();
    };

    handleBack = () => {
        this.props.handleBack();
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { question, control, all_assets, documents, activeStep, questions_length } = this.props;

        const { assets, applicable, answer, errors, answered, loading, changed, explanation } = this.state;

        const docsOptions = _.map(documents, (doc, index) => ({
            key: doc.id,
            text: doc.name,
            value: doc.id,
        }));

        const assetsOptions = _.map(all_assets, (ast, index) => ({
            key: ast.id,
            text: ast.integration.name,
            value: ast.id,
        }));

        return (
            <Segment color='blue'>
                <div className="select__doc__quetion">
                    <div className="__radio__group">
                        <Form.Field>
                            <Checkbox onChange={this.toggleApplicable} checked={applicable} toggle label={applicable ? 'Applicable' : 'Not Applicable'} />
                        </Form.Field>
                        <Form>
                            <Form.Field>
                                <Dropdown
                                    placeholder='Select Document'
                                    fluid
                                    search
                                    selection
                                    onChange={this.handleDocumentChange}
                                    value={answer}
                                    options={docsOptions}
                                    disabled={!applicable}
                                />
                                {this.displayInputError(errors, 'answer')}
                            </Form.Field>

                            <Form.Field>
                                <label>
                                    Applicable Assets:
                                </label>
                                <Dropdown
                                    placeholder='Assets'
                                    fluid
                                    search
                                    selection
                                    multiple
                                    onChange={this.handleAssetsChange}
                                    value={assets}
                                    options={assetsOptions}
                                    disabled={!applicable}
                                />
                            </Form.Field>
                            {
                                assetsOptions.length !== assets.length || !applicable ?
                                    <Form.Field>
                                        <label>
                                            Explaination:
                                        </label>
                                        <Form.TextArea className={this.handlerInputError(errors, 'explanation')} onChange={this.handleChange} placeholder='Explaination' name="explanation" value={explanation} />
                                        {this.displayInputError(errors, 'explanation')}
                                    </Form.Field> : ''}
                        </Form>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                style={{ marginTop: '8px', marginRight: '8px' }}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                                style={{ marginTop: '8px', marginRight: '8px' }}
                            >
                                {activeStep === questions_length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Segment>
        );
    }
}

export default SelectDoc;
