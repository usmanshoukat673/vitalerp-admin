import React, { Component } from 'react';
import { Radio, Header, Popup, Dropdown, Form, Segment, Input, Button as SemButton, Checkbox } from 'semantic-ui-react';
import { IoIosInformationCircleOutline } from "react-icons/io";
import _ from 'lodash';
import './YesNo.scss';
import Button from '@mui/material/Button';
import axiosInstance from '../../../api/api';

class YesNo extends Component {

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
            answer: question.yes_no,
            answered: question.answered,
            applicable: question.applicable,
        });
    }

    handleYesNoChange = (e, { value }) => {
        this.setState({ answer: value, changed: true });
    };

    toggleApplicable = () => {
        this.setState((prevState) => {
            return ({ applicable: !prevState.applicable });
        }, () => {
            this.setState({ changed: true });
            if (!this.state.applicable) {
                this.setState({ answer: '' });
            }
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value, changed: true });

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

        this.setState({ assets: value, changed: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(assets)) {
            delete errors[0][assets];
            this.setState({ errors: errors });
        }
    }

    submitAnswer = () => {
        this.setState({ errors: [], loading: true });

        const { token, question, all_assets } = this.props;
        const { assets, explanation, answer, applicable, } = this.state;

        const all_assets_filtered = _.map(all_assets, ast => (ast.id));

        axiosInstance.post(`/api/user/compliance/answer/yes-no`, {
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

        const { question, control, all_assets, activeStep, questions_length } = this.props;

        const { assets, explanation, answer, errors, answered, loading, changed, applicable } = this.state;

        const assetsOptions = _.map(all_assets, (ast, index) => ({
            key: ast.id,
            text: ast.integration.name,
            value: ast.id,
        }));

        return (
            <Segment color='blue'>
                <div className="yes__no__quetion">
                    <div className="__radio__group">
                        <Form>
                            <Form.Field>
                                <Checkbox onChange={this.toggleApplicable} checked={applicable} toggle label={applicable ? 'Applicable' : 'Not Applicable'} />
                            </Form.Field>
                            <Form.Field>
                                <p>
                                    {`${question.question.number} ${question.question.name}`}
                                </p>
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    disabled={!applicable}
                                    label='Yes'
                                    value='YES'
                                    name={`${question.id}-options`}
                                    checked={answer === 'YES'}
                                    onChange={this.handleYesNoChange}
                                    className="__radio__button"
                                />
                                <Radio
                                    disabled={!applicable}
                                    label='No'
                                    value='NO'
                                    name={`${question.id}-options`}
                                    checked={answer === 'NO'}
                                    onChange={this.handleYesNoChange}
                                    className="__radio__button"
                                />
                                {this.displayInputError(errors, 'answer')}
                            </Form.Field>

                            <Form.Field>
                                <label>
                                    Applicable Assets:
                                </label>
                                <Dropdown
                                    disabled={!applicable}
                                    placeholder='Assets'
                                    fluid
                                    search
                                    selection
                                    multiple
                                    onChange={this.handleAssetsChange}
                                    value={assets}
                                    options={assetsOptions}
                                />
                                {this.displayDDInputError(errors, 'assets')}
                            </Form.Field>

                            {
                                assetsOptions.length !== assets.length || answer === 'NO' || !applicable ?
                                    <Form.Field>
                                        <label>
                                            Explaination:
                                        </label>
                                        <Form.TextArea className={this.handlerInputError(errors, 'explanation')} onChange={this.handleChange} placeholder='Explaination' name="explanation" value={explanation} />
                                        {this.displayInputError(errors, 'explanation')}
                                    </Form.Field> : ''}

                            {/*<Form.Field>
                                <SemButton size="tiny" disabled={!changed} loading={loading} primary onClick={this.submitAnswer}>Save</Button>
                            </Form.Field> */}
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

export default YesNo;
