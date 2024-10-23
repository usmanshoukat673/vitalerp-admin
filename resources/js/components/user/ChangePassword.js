import React, { Component } from 'react';
import { Segment, Form, Header, Button } from 'semantic-ui-react';
import { IoIosUnlock } from "react-icons/io";
import { NotificationManager } from 'react-notifications';
import PasswordStrengthBar from 'react-password-strength-bar';
import { connect } from 'react-redux';
import { setPWDRotation } from '../../actions';
import axiosInstance from '../../api/api';

class ChangePassword extends Component {

    state = {
        current_password: '',
        password: '',
        password_confirmation: '',
        errors: [],
        loading: false
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

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        axiosInstance.post('/api/user/change-password', this.state)
            .then(response => {

                this.setState({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                    errors: [],
                    loading: false
                });

                this.props.setPWDRotation(response.data.pwd_rotaion);

                NotificationManager.success('Your password has changed successfully!', 'Success');

                // this.props.history.push('/organizations');

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
        const { errors, loading, current_password, password, password_confirmation } = this.state;

        return (
            <React.Fragment>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment>
                        <Header size='medium'><IoIosUnlock className="change_pwd_key_icon" /> Change Password</Header>
                        <Form.Field>
                            <Form.Input className={this.handlerInputError(errors, 'current_password')} onChange={this.handleChange} fluid icon='lock' type='password' value={current_password} iconPosition='left' placeholder='Current Password' name="current_password" />
                            {this.displayInputError(errors, 'current_password')}
                        </Form.Field>
                        <Form.Field>

                            <Form.Input className={this.handlerInputError(errors, 'password')} onChange={this.handleChange} fluid icon='key' type='password' iconPosition='left' value={password} placeholder='New Password' name="password" />
                            {this.displayInputError(errors, 'password')}

                        </Form.Field>
                        <Form.Field>
                            <Form.Input className={this.handlerInputError(errors, 'password_confirmation')} onChange={this.handleChange} fluid icon='redo' type='password' iconPosition='left' value={password_confirmation} placeholder='Confirm Password' name="password_confirmation" />
                            {this.displayInputError(errors, 'password_confirmation')}
                            {password != '' ? <PasswordStrengthBar password={password} /> : ''}

                        </Form.Field>
                        <Button disabled={loading} className={loading ? 'primary__button loading' : 'primary__button'} type="submit" size='medium' primary>Submit</Button>
                    </Segment>
                </Form>
            </React.Fragment>
        );
    }
}

export default connect(null, { setPWDRotation })(ChangePassword);
