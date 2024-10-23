import React, { Component } from 'react';
import { Grid, Segment, Form, Field, Card, Icon, Image, Button, Label, Dimmer, Loader, Message, Dropdown } from 'semantic-ui-react';
import { setCompany, setCompanies } from '../../actions';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import './NewOrgnization.scss';
import { connect } from 'react-redux';
import countryList from 'react-select-country-list';
import axiosInstance from '../../api/api';

class NewOrgnization extends Component {

    state = {
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        errors: [],
        loading: false,
        country_options: []
    }

    componentDidMount() {
        this.setState({ country_options: countryList().getData() });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleCountryChange = (event, { value }) => {
        this.setState({ country: value });
        this.setState({ touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(country)) {
            delete errors[0][country];
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
            .then(e => {

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

                this.props.setCompany(e.data.company);
                this.props.setCompanies(e.data.companies);


                NotificationManager.success('Your new Organization has been added succssfully!', 'Success');

                return this.props.orgCreated(e.data.company);

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

    closePanel = (e) => {
        e.preventDefault();
        this.props.closeNewOrg(e);
    }

    render() {

        const { errors, loading, country_options, country } = this.state;
        const { open_new_org } = this.props;

        const COptions = _.map(country_options, (ml, index) => ({
            key: ml.label,
            text: ml.label,
            value: ml.label,
        }));

        return (

            <div className={open_new_org ? 'new__org_overlay active' : 'new__org_overlay'} >
                <div className="new__org">
                    <div className="new__org_close">
                        <img onClick={this.closePanel} src="/images/close-button.svg" alt="Close"></img>
                    </div>
                    <div className="new__org_wrapper">
                        <div className="new__org_body">
                            <div>

                                <div className="row justify-content-center create-org-form">
                                    <div className="col-md-10 col-lg-10 col-xl-10 col-sm-12 col-12">

                                        <Form size='large' onSubmit={this.handleSubmit}>
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
                                                    <Dropdown className={this.handlerInputError(errors, 'country')} placeholder='Country' onChange={this.handleCountryChange} value={country} search selection options={COptions} />
                                                    {this.displayInputError(errors, 'country')}
                                                </Form.Field>
                                                <Form.Field>
                                                    <Form.Input className={this.handlerInputError(errors, 'postal_code')} onChange={this.handleChange} fluid icon='zip' iconPosition='left' placeholder='Postal Code' name="postal_code" />
                                                    {this.displayInputError(errors, 'postal_code')}
                                                </Form.Field>
                                            </Form.Group>

                                            <Button type="submit" disabled={loading} className={loading ? 'login__button loading' : 'login__button'} size='large' primary>Create Organization</Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default connect(null, { setCompany, setCompanies })(NewOrgnization);
