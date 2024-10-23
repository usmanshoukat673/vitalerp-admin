import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import axiosInstance from '../../api/api';

class DeviceNickName extends Component {

    state = {
        loading: false,
        errors: [],
        nickname: '',
        device_id: 0,
        comp_id: 0
    }

    componentDidMount() {
        const { dc } = this.props;
        this.setState({ nickname: (dc.nickname != null ? dc.nickname : dc.device.machine_name), device_id: dc.device_id, comp_id: dc.comp_id });
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

    handleClose = () => {
        this.props.handleNickNameClose();
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        axiosInstance.post('/api/user/devicewatch/device/set-nickname', this.state)
            .then(response => {
                this.setState({
                    errors: [],
                    loading: false
                });
                this.props.handleNickNameChanged(response.data.device);
                NotificationManager.success('Nickname has saved successfully!', 'Success');
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

                if (err.response.status === 404) {
                    const errors = err.response.data.errors;

                    NotificationManager.error('Device Not found!', 'Error');

                }
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { open } = this.props;

        const { errors, loading, nickname } = this.state;

        return (
            <Modal
                className="semtic__modal"
                size="small"
                open={open}
            >
                <Modal.Header>Device Nickname</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input icon='desktop'
                                    fluid
                                    iconPosition='left'
                                    placeholder='Nickname'
                                    name="nickname"
                                    error={this.handlerCustomInputError(errors, 'nickname')}
                                    className={this.handlerInputError(errors, 'nickname')} onChange={this.handleChange}
                                    value={nickname}
                                />

                            </Form.Field>

                            {this.displayInputError(errors, 'nickname')}
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading} className={loading ? 'loading' : ''}
                        content="Save"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.handleSubmit}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DeviceNickName;
