import React, { Component } from 'react';
import { Form, Header, Button, Modal } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../../actions';
import _ from 'lodash';
import axiosInstance from '../../../api/api';

class MFAVerify extends Component {

    state = {
        code: '',
        id: '',
        errors: [],
        loading: false,
        enable_resend: true
    }

    constructor(props) {
        super(props);
        setTimeout(
            function () {
                this.setState({ enable_resend: false });
            }
                .bind(this),
            60000
        );
    }

    setID = () => {
        const { action_id } = this.props.match.params;
        if (!_.isEmpty(action_id) && this.state.id !== action_id) {
            this.setState({ id: action_id });
        }

    }

    componentDidMount() {
        this.setID();
    };

    componentDidUpdate(prevProps) {
        this.setID();
    };

    componentWillReceiveProps() {
        const { user } = this.props;
        this.setState({ country_code: (!_.isEmpty(user.country_code) ? user.country_code : ''), phone: (!_.isEmpty(user.phone) ? user.phone : '') });
    }

    handleChange = event => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ [event.target.name]: event.target.value });
        }
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
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '4px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        const { token } = this.props;

        axiosInstance.post('/api/user/verify-otp', this.state)
            .then(response => {

                this.setState({
                    code: '',
                    errors: [],
                    loading: false
                });

                this.props.setUser(response.data.user);
                this.props.close();
                NotificationManager.success('Multi-Factor Authentication has been successfully configured.', 'Success');
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

    close = () => {
        this.props.close();
    };


    handleResendVerificationCode = () => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        const { token } = this.props;

        axiosInstance.post('/api/user/resend-otp', this.state)
            .then(response => {
                this.setState({
                    errors: [],
                    loading: false
                });
                this.props.setUser(response.data.user);
                this.props.history.push(`/settings/user/verify-mfa/${response.data.id}`);
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { errors, loading, code, enable_resend } = this.state;
        const { mfa_verify } = this.props;

        return (
            <React.Fragment>
                <Modal className="mfa__modal" open={mfa_verify} size="small">
                    <Modal.Header>
                        Multi-Factor Authentication
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>Enter a verification code</Header>
                            <Form>
                                <p>
                                    Please enter verification code which is sent via SMS on your mobile number, please note verification code will expire in 2 minutes.
                                </p>
                                <Form.Group >

                                    <Form.Field width={8}>
                                        <Form.Input
                                            className={this.handlerInputError(errors, 'code')}
                                            onChange={this.handleChange}
                                            fluid
                                            icon='mobile'
                                            type='text'
                                            iconPosition='left'
                                            value={code}
                                            placeholder='Code'
                                            name="code" />
                                        {this.displayInputError(errors, 'code')}
                                    </Form.Field>

                                    <Button
                                        disabled={loading} className={loading ? 'primary__button loading' : 'primary__button'}
                                        onClick={this.handleSubmit}
                                        positive
                                        labelPosition='right'
                                        icon='checkmark'
                                        content='Verify'
                                    />



                                </Form.Group>
                            </Form>

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='black' disabled={enable_resend} onClick={this.handleResendVerificationCode}>
                            Resend new Code?
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { setUser })(MFAVerify));
