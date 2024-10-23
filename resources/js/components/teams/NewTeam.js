import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Icon, Radio, Segment, Message, Popup, Header } from 'semantic-ui-react';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import axiosInstance from '../../api/api';

class NewTeam extends Component {
    state = {
        loading: false,
        name: '',
        errors: []
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

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        const { name } = this.state;

        axiosInstance.post('/api/user/teams/create-team', { name: name })
            .then(response => {
                this.setState({
                    name: '',
                    errors: [],
                    loading: false
                });
                NotificationManager.success('Team has been successfully created!', 'Success');

                this.goBack(event);

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

    goBack = event => {
        event.preventDefault();
        const params = new URLSearchParams(this.props.location.search);
        const redirect = params.get('redirect');

        this.props.history.push(redirect);
    }

    render() {

        const { errors, loading, name } = this.state;

        return (
            <React.Fragment>
                <div className="users__row">

                    <div className="row justify-content-md-center">
                        <div className="col-md-12">
                            <Segment piled>

                                <h3>Create a new team</h3>

                                {
                                    /*

                                    <Message color='teal'>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem optio nulla veritatis quos harum</p>
                                    <p>corporis temporibus asperiores necessitatibus ipsum quo blanditiis commodi quibusdam, tenetur numquam perferendis perspiciatis exercitatione</p>
                                </Message>

                                */
                                }

                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-xm-12">
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Field>
                                                <h4>Team Name</h4>
                                                <Input icon='group'
                                                    fluid
                                                    iconPosition='left'
                                                    placeholder='e.g. Information Technology'
                                                    name="name"
                                                    error={this.handlerCustomInputError(errors, 'name')}
                                                    className={this.handlerInputError(errors, 'name')} onChange={this.handleChange}
                                                    value={name}
                                                />

                                            </Form.Field>

                                            {this.displayInputError(errors, 'name')}


                                            <Button disabled={loading} className={loading ? 'loading' : ''} basic size="large" color='blue' type="submit">Submit</Button>
                                            <Button onClick={this.goBack} basic size="large" color='black'>Cancel</Button>

                                        </Form>
                                    </div>
                                </div>
                            </Segment>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company
});
export default connect(mapStateToProps)(NewTeam);
