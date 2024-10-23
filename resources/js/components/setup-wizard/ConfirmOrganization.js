import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { setCompany, setCompanies, setCompanyLocations } from '../../actions';
import moment from 'moment-timezone';
import countryList from 'react-select-country-list';
import { Form, Dropdown } from 'semantic-ui-react';
import './ConfirmOrganization.scss';
import axiosInstance from '../../api/api';

class ConfirmOrganization extends Component {

    state = {
        errors: [],
        loading: false,
        comp_id: '',
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        timezone: '',
        tz_list: [],
        country_options: [],
        default_location: '',
        locs_errors: [],
        locs_loading: false
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {
            const { company } = this.props;
            const { name, address, city, state, country, postal_code, comp_id, timezone } = this.state;
            this.loadTzList();

            this.setState({
                comp_id: company.id
            });

            if (name !== company.name && !_.isEmpty(company.name)) {
                this.setState({
                    name: company.name,
                });
            }

            if (address !== company.address && !_.isEmpty(company.address)) {
                this.setState({
                    address: company.address
                });
            }

            if (city !== company.city && !_.isEmpty(company.city)) {
                this.setState({
                    city: company.city
                });
            }
            if (state !== company.state && !_.isEmpty(company.state)) {
                this.setState({
                    state: company.state,
                });
            }
            if (country !== company.country && !_.isEmpty(company.country)) {
                this.setState({
                    country: company.country,
                });
            }
            if (postal_code !== company.postal_code && !_.isEmpty(company.postal_code)) {
                this.setState({
                    postal_code: company.postal_code
                });
            }
            if (timezone !== company.timezone && !_.isEmpty(company.timezone)) {
                this.setState({
                    timezone: company.timezone
                });
            }

            this.setState({ country_options: countryList().getData() });
        }
    }

    loadTzList = () => {
        const { token, company } = this.props;
        this.setState({ tz_list: moment.tz.names() });

        axiosInstance.get(`/api/user/org/tz-list/${company.id}/?usertz=${moment.tz.guess()}`)
            .then(response => {

                this.setState({
                    errors: [],
                    loading: false,
                    default_location: response.data.default_location.id
                });

                if (response.data.company) {
                    this.props.setCompany(response.data.company);
                    this.props.setCompanies(response.data.companies);
                    this.setState({
                        timezone: response.data.company.timezone
                    });
                }
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

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ touched: true });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleTZChange = (event, { value }) => {
        this.setState({ timezone: value });
        this.setState({ touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(timezone)) {
            delete errors[0][timezone];
            this.setState({ errors: errors });
        }
    }

    handleLocationsChange = (event, { value }) => {

        this.setState({ default_location: value });
        this.setState({ touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(default_location)) {
            delete errors[0][default_location];
            this.setState({ errors: errors });
        }
    };

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
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleProceed = () => {

        this.setState({ errors: [], loading: true, touched: false });

        const { token, company } = this.props;

        axiosInstance.post('/api/user/org/save-basic-details', this.state)
            .then(response => {

                this.setState({
                    errors: [],
                    loading: false
                });
                this.props.setCompany(response.data.company);
                this.props.setCompanies(response.data.companies);

                this.props.history.push(`/${company.slug}/onboarding/organization-users`);
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

    handleLocationsAddition = (e, { value }) => {

        this.setState({ locs_errors: [], locs_loading: true });

        axiosInstance.post('/api/user/locations/add-location-on-the-fly', {
            name: value,
        })
            .then(e => {

                this.locationAdded(e.data.location);

                this.setState({
                    locs_errors: [],
                    locs_loading: false,
                    touched: true,
                    default_location: e.data.location.id
                });

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ locs_errors: [], locs_loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ locs_errors: this.state.locs_errors.concat(err.response.data.errors), locs_loading: false });
                }
            });
    }

    locationAdded = location => {
        let locations = this.props.locations;
        locations.push(location);
        this.props.setCompanyLocations(locations);
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {


        const { company, token, leftnav, user, locations } = this.props;

        const { name,
            address,
            city,
            state,
            country,
            postal_code,
            errors,
            loading,
            touched,
            timezone,
            tz_list,
            country_options,
            default_location,
            locs_errors,
            locs_loading

        } = this.state;

        const timeZoneOptions = _.map(tz_list, (tz, index) => ({
            key: tz,
            text: tz,
            value: tz,
        }));
        // moment.tz.guess()

        const COptions = _.map(country_options, (ml, index) => ({
            key: ml.label,
            text: ml.label,
            value: ml.label,
        }));

        const locationsOptions = _.map(locations, (loc, index) => ({
            key: loc.id,
            text: `${loc.name}`,
            value: loc.id,
        }));

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="__coorz__verify__org">
                    <div className="__coorz__header">
                        Welcome back, {`${user.first_name}`}!
                    </div>
                    <div className="__coorz__sub__header">
                        <div className="__coorz__sub__header__left">
                            Let’s finish setting up your account
                        </div>
                        <div className="__coorz__sub__header__right">
                            <div className="__coorz__cust__progress__label">Your account is 54% complete</div>
                            <div>
                                <div className="__coorz__cust__progress">
                                    <div className="__current__progress" style={{ width: '54%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="__coorz__setup__steps">
                        <div className="__coorz__setup__step step_1">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">
                                <div className="step__inactive"><FiCheck /> Login</div>
                                <div className="step__active"><MdKeyboardArrowRight /> Confirm your organization</div>
                                <div className="step__inactive"><FiCheck /> Manage organization users</div>
                                <div className="step__inactive"><FiCheck /> Assign responsibilities</div>
                            </div>
                        </div>
                        <div className="__coorz__setup__step active__step">
                            <div className="__ss__header">
                                Confirm your organization
                            </div>
                            <div className="__ss__body">

                                <Form>
                                    <Form.Field >
                                        <label>Organization Name</label>

                                        <Form.Input className={this.handlerInputError(errors, 'name')} onChange={this.handleChange} fluid type='text' name="name" value={name} />
                                        {this.displayInputError(errors, 'name')}
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Address</label>
                                        <Form.Input className={this.handlerInputError(errors, 'address')} onChange={this.handleChange} fluid type='text' name="address" value={address} />
                                        {this.displayInputError(errors, 'address')}
                                    </Form.Field>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>City</label>

                                            <Form.Input className={this.handlerInputError(errors, 'city')} onChange={this.handleChange} fluid type='text' name="city" value={city} />
                                            {this.displayInputError(errors, 'city')}
                                        </Form.Field>
                                        <Form.Field>
                                            <label>State</label>

                                            <Form.Input className={this.handlerInputError(errors, 'state')} onChange={this.handleChange} fluid type='text' name="state" value={state} />
                                            {this.displayInputError(errors, 'state')}
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>Country</label>

                                            <Dropdown className={this.handlerInputError(errors, 'country')} placeholder='Country' onChange={this.handleCountryChange} value={country} search selection options={COptions} />

                                            {this.displayInputError(errors, 'country')}
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Postal Code</label>

                                            <Form.Input className={this.handlerInputError(errors, 'postal_code')} onChange={this.handleChange} fluid type='text' name="postal_code" value={postal_code} />
                                            {this.displayInputError(errors, 'postal_code')}
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Field>
                                        <label>TimeZone</label>
                                        <Dropdown placeholder='TimeZone' onChange={this.handleTZChange} value={timezone} search selection options={timeZoneOptions} />

                                    </Form.Field>

                                    <Form.Field>
                                        <label>Location/NickName</label>
                                        <Dropdown
                                            fluid
                                            options={locationsOptions}
                                            search
                                            selection
                                            onChange={this.handleLocationsChange}
                                            value={default_location}
                                            allowAdditions
                                            onAddItem={this.handleLocationsAddition}
                                            disabled={locs_loading}
                                        />
                                        {this.displayInputError(errors, 'default_location')}
                                        {this.displayInputError(locs_errors, 'name')}
                                    </Form.Field>
                                </Form>

                                <div onClick={this.handleProceed} className="__ss__question__proceed">
                                    Proceed
                                </div>
                            </div>
                        </div>
                        <div className="__coorz__setup__step step__full__blank">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">

                            </div>
                        </div>
                        <div className="__coorz__setup__step step__half_blank">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    locations: state.locations.locations
});

export default withRouter(connect(mapStateToProps, { setCompanyLocations, setCompany, setCompanies })(ConfirmOrganization));
