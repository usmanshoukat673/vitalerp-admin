import React, { Component } from 'react';
import { Segment, Form, Icon, Button, Message } from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import './AddOrg.scss';
import axiosInstance from '../../../api/api';

class AddOrg extends Component {

    state = {
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
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

        axiosInstance.post('/api/user/org/add', this.state)
            .then(response => {

                this.setState({
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    postal_code: '',
                    errors: [],
                    loading: false
                });
                NotificationManager.success('Your new Organization has been added succssfully!', 'Success');

                this.props.history.push('/organizations');

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

        const { errors, loading } = this.state;

        const { companies } = this.props;

        return (
            <div>
                <div className="page__header">
                    <div>
                        <div className="heading">
                            Add Organization
                        </div>
                    </div>
                    <div>
                        <Link to="/organizations">
                            <Button animated>
                                <Button.Content visible>Back to Organizations</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow left' />
                                </Button.Content>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="row justify-content-center create-org-form">
                    <div className="col-md-8 col-lg-8 col-xl-10 col-sm-8 col-12">

                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment>

                                <Message info>
                                    <p>
                                        Fill in the details below to create your new organization.
                                    </p>
                                </Message>

                                <Form.Field>
                                    <Form.Input className={this.handlerInputError(errors, 'name')} onChange={this.handleChange} fluid icon='building' iconPosition='left' placeholder='Name' name="name" />
                                    {this.displayInputError(errors, 'name')}
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input className={this.handlerInputError(errors, 'address')} onChange={this.handleChange} fluid icon='mail' iconPosition='left' placeholder='Address' name="address" />
                                    {this.displayInputError(errors, 'address')}
                                </Form.Field>

                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <Form.Input className={this.handlerInputError(errors, 'city')} onChange={this.handleChange} fluid icon='map marker alternate' iconPosition='left' placeholder='City' name="city" />
                                        {this.displayInputError(errors, 'city')}
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input className={this.handlerInputError(errors, 'state')} onChange={this.handleChange} fluid icon='map marker alternate' iconPosition='left' placeholder='State' name="state" />
                                        {this.displayInputError(errors, 'state')}
                                    </Form.Field>
                                </Form.Group>


                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <Form.Input className={this.handlerInputError(errors, 'country')} onChange={this.handleChange} fluid icon='map marker alternate' iconPosition='left' placeholder='Country' name="country" />
                                        {this.displayInputError(errors, 'country')}
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input className={this.handlerInputError(errors, 'postal_code')} onChange={this.handleChange} fluid icon='zip' iconPosition='left' placeholder='Postal Code' name="postal_code" />
                                        {this.displayInputError(errors, 'postal_code')}
                                    </Form.Field>
                                </Form.Group>

                                <Button type="submit" disabled={loading} className={loading ? 'loading' : ''} size='large' primary>Submit</Button>
                                <Link to="/organizations"><Button size='large' secondary>Cancel</Button></Link>
                            </Segment>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    companies: state.orgs.companies
});

export default AddOrg;
