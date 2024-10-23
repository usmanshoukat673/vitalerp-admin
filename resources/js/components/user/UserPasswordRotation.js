import React, { Component } from 'react';
import { Segment, Button, Header, Input, Form } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { RiRotateLockLine } from "react-icons/ri";
import axiosInstance from '../../api/api';

class UserPasswordRotation extends Component {

    state = {
        loading: false,
        resetting_default: false,
        touched: false,
        errors: [],
        duration: 0
    };

    componentDidMount() {
        const { user } = this.props;
        this.setState({ duration: user.pwd_rotaion });
    }

    handleChange = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ [event.target.name]: event.target.value });
            this.setState({ touched: true });
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
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true, touched: false });

        const { token } = this.props;

        axiosInstance.post('/api/user/password-rotation', {
            duration: this.state.duration
        })
            .then(response => {
                this.setState({
                    errors: [],
                    loading: false
                });
                this.props.changed(response.data.user);
                return NotificationManager.success('Details saved successfully!', 'Success');
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

    resetDefault = event => {
        event.preventDefault();

        this.setState({ errors: [], resetting_default: true, touched: false });

        axiosInstance.post('/api/user/password-rotation')
            .then(response => {
                this.setState({
                    errors: [],
                    resetting_default: false,
                    duration: 90
                });
                this.props.changed(response.data.user);
                return NotificationManager.success('Duration has been set to default!', 'Success');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], resetting_default: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), resetting_default: false });
                }
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { duration, errors, loading, touched, resetting_default } = this.state;

        return (
            <React.Fragment>
                <Segment piled >
                    <Header> <RiRotateLockLine className="change_pwd_key_icon" /> Password Rotation</Header>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field width={4}>
                            <label>Number of Days</label>
                            <Input name="duration" type="text" value={duration} className={this.handlerInputError(errors, 'name')} onChange={this.handleChange} placeholder='Eg. 90 days' />
                            {this.displayInputError(errors, 'duration')}
                        </Form.Field>
                        <Form.Field>
                            <Button disabled={loading || !touched} className={loading ? 'loading' : ''} type="submit" primary>Save Changes</Button>
                            <Button disabled={duration == 90} className={resetting_default ? 'loading' : ''} onClick={this.resetDefault} type="button" default>Reset Default</Button>
                        </Form.Field>
                    </Form>
                </Segment>

            </React.Fragment>
        );
    }

}

export default UserPasswordRotation;
