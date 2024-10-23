import React, { Component } from 'react';
import { Form, Input, Button, Modal, Icon, Radio, Segment, Message, Popup, Header, Divider } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../../api/api';

class EditUser extends Component {

    state = {
        loading: false,
        errors: [],
        first_name: '',
        last_name: '',
        role: '',
    };

    componentDidMount() {
        const { user } = this.props;
        this.setState({ first_name: user.user.first_name, last_name: user.user.last_name, role: user.role });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleRoleChange = (e, { value }) => this.setState({ role: value });

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    };

    handlerCustomInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    };

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        const { user } = this.props;
        const { first_name, last_name, role } = this.state;

        axiosInstance.post('/api/user/org/user/update', { comp_id: user.comp_id, first_name: first_name, last_name: last_name, role: role, user_id: user.user_id })
            .then(e => {

                this.setState({
                    first_name: '',
                    last_name: '',
                    errors: [],
                    loading: false
                });
                NotificationManager.success('User details has been successfully updated!', 'Success');
                this.props.handleSuccessUserEdit(e.data.user);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 403) {
                    this.setState({ errors: [], loading: false });
                    NotificationManager.error(err.response.data.message, 'Admin Privileges Required');
                }
                if (err.response.status === 422) {

                    const errors = err.response.data.errors;

                    this.setState({ errors: this.state.errors.concat(errors), loading: false });

                }

                if (err.response.status === 400) {

                    const errors = err.response.data.errors;

                    if (errors.hasOwnProperty('email')) {
                        NotificationManager.warning(errors.email[0], 'Error');
                        this.setState({ loading: false, errors: [] });
                    }
                    else {
                        this.setState({ errors: this.state.errors.concat(errors), loading: false });
                    }

                }
            });
    }

    handleCloseUserEdit = () => this.props.handleCloseUserEdit();

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { errors, loading, first_name, last_name, role } = this.state;

        const { open } = this.props;

        return (
            <React.Fragment>

                <div>
                    <Modal
                        open={open}
                        className="semtic__modal"
                        size="small"
                    >
                        <Modal.Header>Change user details</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <h4>First Name</h4>
                                    <Input icon='user'
                                        fluid
                                        iconPosition='left'
                                        placeholder='Jhon'
                                        name="first_name"
                                        error={this.handlerCustomInputError(errors, 'first_name')}
                                        className={this.handlerInputError(errors, 'first_name')} onChange={this.handleChange}
                                        value={first_name}
                                    />

                                    {this.displayInputError(errors, 'first_name')}

                                </Form.Field>


                                <Form.Field>
                                    <h4>Last Name</h4>
                                    <Input icon='user'
                                        fluid
                                        iconPosition='left'
                                        placeholder='Doe'
                                        name="last_name"
                                        error={this.handlerCustomInputError(errors, 'last_name')}
                                        className={this.handlerInputError(errors, 'last_name')} onChange={this.handleChange}
                                        value={last_name}
                                    />

                                    {this.displayInputError(errors, 'last_name')}

                                </Form.Field>


                                <Message >
                                    <Radio
                                        label='Organization Member'
                                        name='radioGroup'
                                        value='N'
                                        checked={role === 'N'}
                                        onChange={this.handleRoleChange}
                                    />
                                    &nbsp;
                                    <Popup content='Details about Organization Member' size='tiny' trigger={<Icon circular name='info' />} />
                                </Message>
                                <Message>
                                    <Radio
                                        label='Organization Admin'
                                        name='radioGroup'
                                        value='A'
                                        checked={role === 'A'}
                                        onChange={this.handleRoleChange}
                                    />
                                    &nbsp;
                                    <Popup content='Details about Organization Admin' size='tiny' trigger={<Icon circular name='info' />} />
                                </Message>
                            </Form>

                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleCloseUserEdit} basic size="large" color='black'>Cancel</Button>

                            <Button disabled={loading} className={loading ? 'loading' : ''} basic size="large" color='blue'
                                type="button" onClick={this.handleSubmit}>Save Changes</Button>

                        </Modal.Actions>
                    </Modal>
                </div>

            </React.Fragment>
        );
    }
}

export default EditUser;
