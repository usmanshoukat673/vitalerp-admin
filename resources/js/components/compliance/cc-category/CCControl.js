import React, { Component } from 'react';
import { Form, Checkbox, Dropdown, Input } from 'semantic-ui-react';
import ApplicabityConsent from './ApplicabityConsent';
import ControlNote from './ControlNote';
import './CCControl.scss';

class CCControl extends Component {

    state = {
        loading: false,
        errors: [],
        control_status: '',
        applicable: '',
        justification: '',
        control_conset: false,
    }

    componentDidMount() {
        const { control } = this.props;

        this.setState({
            // severity: (control.assessment_question && control.assessment_question.severity) != null ? control.assessment_question.severity : '',
            // probabaility: (control.assessment_question && control.assessment_question.probabaility) != null ? control.assessment_question.probabaility : '',
            // risk_rating: (control.assessment_question && control.assessment_question.risk_rating) != null ? control.assessment_question.risk_rating : '',
            // risk_action: (control.assessment_question && control.assessment_question.risk_action) != null ? control.assessment_question.risk_action : '',
            // risk_owner_id: (control.assessment_question && control.assessment_question.risk_owner_id) != null ? control.assessment_question.risk_owner_id : '',
            control_status: (control.properties && control.properties.status) != null ? control.properties.status : '',
            applicable: (control.properties && control.properties.applicable) != null ? control.properties.applicable : '',
            justification: (control.properties && control.properties.justification) != null ? control.properties.justification : '',
        });
    }

    handlerCustomInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    };


    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleJustificationBlur = event => {
        this.props.controlStatusChange('justification', event.target.value, this.props.control);
    }

    handleControlStatusChange = (event, { value }) => {

        this.setState({ control_status: value });

        this.props.controlStatusChange('status', value, this.props.control);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(control_status)) {
            delete errors[0][control_status];
            this.setState({ errors: errors });
        }
    };

    toggleApplicability = () => {

        if (this.state.applicable == 'Applicable') {
            this.setState({ control_conset: true });
        }
        else {
            this.setState((prevState) => {
                return ({ applicable: (prevState.applicable == 'Applicable' ? 'Not Applicable' : 'Applicable') });
            }, () => {
                this.props.controlStatusChange('applicable', this.state.applicable, this.props.control);
                if (this.state.applicable === 'Not Applicable') {
                    this.setState({ control_status: 'Not Implemented' });
                    this.props.controlStatusChange('status', 'Not Implemented', this.props.control);
                }
            });
        }


    }

    keepControlAsIs = () => {
        this.setState({ control_conset: false });
    }

    setControlNA = () => {
        this.setState({ control_conset: false });
        this.setState((prevState) => {
            return ({ applicable: (prevState.applicable == 'Applicable' ? 'Not Applicable' : 'Applicable') });
        }, () => {
            this.props.controlStatusChange('applicable', this.state.applicable, this.props.control);
            if (this.state.applicable === 'Not Applicable') {
                this.setState({ control_status: 'Not Implemented' });
                this.props.controlStatusChange('status', 'Not Implemented', this.props.control);
            }
        });
    }

    handleControlClick = () => {
        const { control, handleOperations } = this.props;
        handleOperations(control);
    }

    render() {

        const { control_status, applicable, errors, loading, justification, control_conset } = this.state;

        const statusOptions = [
            { key: 'Implemented', text: 'Implemented', value: 'Implemented' },
            { key: 'Partially Implemented', text: 'Partially Implemented', value: 'Partially Implemented' },
            { key: 'Not Implemented', text: 'Not Implemented', value: 'Not Implemented' }
        ];

        const { control, company, token } = this.props;

        return (
            <div className="ccsection__control">
                <div className="ccc__leftsection">
                    <div className="_ccc__name">
                        <span onClick={this.handleControlClick}> {control.number}</span>

                        <ControlNote company={company} token={token} control={control} />
                    </div>
                    <div className="_ccc__description" onClick={this.handleControlClick}>
                        {control.name}
                    </div>
                    <div className="__c__description_new">
                        {control.description}
                    </div>
                    <div className="_ccc__properties">
                        <div>{control.artifacts ? control.artifacts.length : 0}	Artifacts</div>
                        <span></span>
                        <div>{control.mapped ? control.mapped.length : 0} Mapped</div>
                    </div>
                </div>
                <div className="ccc__rightsection">
                    <div className="ccc_applicability">
                        <Form size="mini">
                            <Form.Field>
                                <div>Applicable</div>
                                <div><Checkbox checked={applicable === 'Applicable'} onChange={this.toggleApplicability} toggle color="primary" /></div>
                            </Form.Field>
                        </Form>
                    </div>
                    <div className="ccc_implement">
                        <Form size="mini">
                            {applicable == 'Not Applicable' ?
                                <Form.Field>
                                    <Input
                                        fluid
                                        placeholder='Control Justification'
                                        name="justification"
                                        onChange={this.handleChange}
                                        onBlur={this.handleJustificationBlur}
                                        value={justification}
                                    />
                                    {this.displayInputError(errors, 'justification')}
                                </Form.Field> :
                                <Form.Field>
                                    <Dropdown
                                        disabled={applicable == 'Not Applicable'}
                                        clearable
                                        options={statusOptions}
                                        selection
                                        onChange={this.handleControlStatusChange}
                                        value={control_status}
                                        placeholder="Select Control Status"
                                        error={this.handlerCustomInputError(errors, 'control_status')}
                                        name="control_status"
                                    />
                                </Form.Field>
                            }

                        </Form>
                    </div>
                </div>

                <ApplicabityConsent control_conset={control_conset} keepControlAsIs={this.keepControlAsIs} setControlNA={this.setControlNA} />
            </div>
        );
    }
}

export default CCControl;
