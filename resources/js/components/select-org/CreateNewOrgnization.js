import React, { Component } from 'react';
import { Grid, Segment, Form, Field, Card, Icon, Image, Button, Label, Dimmer, Loader, Message, Dropdown } from 'semantic-ui-react';
import { setCompany, setCompanies } from '../../actions';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import './CreateNewOrgnization.scss';
import { connect } from 'react-redux';
import countryList from 'react-select-country-list';
import axiosInstance from '../../api/api';

class CreateNewOrgnization extends Component {

    state = {
        name: '',
        address: '',
        city: '',
        url: '',
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
                    url: '',
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

        const { errors, loading, country_options, country,  } = this.state;

        const COptions = _.map(country_options, (ml, index) => ({
            key: ml.label,
            text: ml.label,
            value: ml.label,
        }));

        return (

            <React.Fragment>

                <div className="add_new_organization_overlay">
                    <div className="add_new_organization_container">
                        <div className="add_new_organization_modal">
                            <div className="close_btn">
                                <button onClick={this.closePanel}>X</button>
                            </div>
                            <div className="mt-4 heading">
                                <h1>Add New Organization</h1>
                                <p>Please enter your organization details</p>
                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className="modal_input">
                                    <input
                                        type="text"
                                        placeholder="Organization Name"
                                        className={this.handlerInputError(errors, 'name')} onChange={this.handleChange}
                                        name="name"
                                    />
                                    {this.displayInputError(errors, 'name')}
                                </div>
                                <div className="modal_input">
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className={this.handlerInputError(errors, 'address')} onChange={this.handleChange}
                                        name="address"
                                    />
                                    {this.displayInputError(errors, 'address')}
                                </div>
                                <div className="modal_input">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className={this.handlerInputError(errors, 'city')} onChange={this.handleChange}
                                        name="city"
                                    />
                                    {this.displayInputError(errors, 'city')}
                                </div>
                                <div className="modal_input">
                                    <Dropdown className={this.handlerInputError(errors, 'country')} placeholder='Select Country' onChange={this.handleCountryChange} value={country} search selection options={COptions} />
                                    {this.displayInputError(errors, 'country')}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="modal_input me-1">
                                        <input type="text"
                                            placeholder="State"
                                            className={this.handlerInputError(errors, 'state')} onChange={this.handleChange}
                                            name="state"
                                        />
                                        {this.displayInputError(errors, 'state')}
                                    </div>
                                    <div className="modal_input ms-1">
                                        <input type="text" placeholder="Zip Code"
                                            className={this.handlerInputError(errors, 'postal_code')} onChange={this.handleChange}
                                            name="postal_code"
                                        />
                                        {this.displayInputError(errors, 'postal_code')}
                                    </div>
                                </div>

                                <div className="modal_input">
                                    <input
                                        type="text"
                                        placeholder="www.example.com"
                                        className={this.handlerInputError(errors, 'url')} onChange={this.handleChange}
                                        name="url"
                                    />
                                    {this.displayInputError(errors, 'url')}
                                </div>

                                <div className="mt-3 add_organization_btn">
                                    <button type="submit" disabled={loading} className={loading ? 'login__button loading' : 'login__button'}>Add Organizarion</button>
                                </div>

                                <div className="mt-4 cancel_btn">
                                    <button onClick={this.closePanel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default connect(null, { setCompany, setCompanies })(CreateNewOrgnization);
