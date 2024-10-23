import React, { Component } from 'react';
import { Segment, Form, Header, Button } from 'semantic-ui-react';
import { FaUserTie } from "react-icons/fa";
import { NotificationManager } from 'react-notifications';
import { setUser } from '../../actions';
import { connect } from 'react-redux';
import axiosInstance from '../../api/api';

class ProfileSettings extends Component {

    state = {
        first_name: '',
        last_name: '',
        errors: [],
        loading: false
    }

    componentDidMount() {
        const { user } = this.props;

        this.setState({ first_name: user.first_name, last_name: user.last_name });
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

        const { token } = this.props;

        axiosInstance.post('/api/user/update-profile', this.state)
            .then(response => {

                this.setState({
                    errors: [],
                    loading: false
                });

                this.props.setUser(response.data.user);

                NotificationManager.success('Your profile has updated successfully!', 'Success');

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
        const { errors, loading, last_name, first_name } = this.state;

        return (
            <React.Fragment>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Segment>
                        <Header size='medium'><FaUserTie className="change_pwd_key_icon" /> Profile</Header>
                        <Form.Field>
                            <label>First Name</label>
                            <Form.Input className={this.handlerInputError(errors, 'first_name')} onChange={this.handleChange} fluid icon='user' type='text' value={first_name} iconPosition='left' placeholder='First Name' name="first_name" />
                            {this.displayInputError(errors, 'first_name')}
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name</label>
                            <Form.Input className={this.handlerInputError(errors, 'last_name')} onChange={this.handleChange} fluid icon='user' type='text' iconPosition='left' value={last_name} placeholder='Last Name' name="last_name" />
                            {this.displayInputError(errors, 'last_name')}
                        </Form.Field>

                        <Button disabled={loading} className={loading ? 'primary__button loading' : 'primary__button'} type="submit" size='medium' primary>Update Profile</Button>
                    </Segment>
                </Form>
            </React.Fragment>
        );
    }
}

export default connect(null, { setUser })(ProfileSettings);
