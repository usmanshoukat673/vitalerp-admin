import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import { setCompany, setCompanies, setCompanyLocations } from '../../actions';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import moment from 'moment-timezone';
import countryList from 'react-select-country-list';
import { withRouter } from 'react-router';
import axiosInstance from '../../api/api';

class CompanyProfile extends Component {

    state = {
        comp_id: '',
        name: '',
        email: '',
        address: '',
        description: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        timezone: '',
        website: '',
        loading: false,
        touched: false,
        errors: [],
        tz_list: [],
        country_options: [],
        default_location: '',
        locs_errors: [],
        locs_loading: false
    };

    setCompanyState = (company) => {
        const { name, address, city, state, country, postal_code, website, timezone, email, description } = this.state;
        this.setState({
            comp_id: company.id
        });

        if (email !== company.email && !_.isEmpty(company.email)) {
            this.setState({
                email: company.email,
            });
        }

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

        if (description !== company.description && !_.isEmpty(company.description)) {
            this.setState({
                description: company.description
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
        if (website !== company.website && !_.isEmpty(company.website)) {
            this.setState({
                website: company.website
            });
        }
    }

    componentDidMount() {
        this.setCompanyState(this.props.company);
        this.loadTzList();
        this.setState({ country_options: countryList().getData() });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.company.id !== this.props.company.id) {
            this.setCompanyState(this.props.company);
        }
    }

    loadTzList = () => {
        const { company } = this.props;
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

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true, touched: false });

        const { token, active_company, company } = this.props;

        axiosInstance.post('/api/user/org/save-basic-details', this.state)
            .then(response => {

                this.setState({
                    errors: [],
                    loading: false
                });

                this.props.setCompanies(response.data.companies);

                if (active_company.id === company.id) {
                    this.props.setCompany(response.data.company);
                }

                this.props.history.push(`/${response.data.company.slug}/organization-settings/general`);

                NotificationManager.success('Details saved successfully!', 'Success');
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

        const { name,
            email,
            address,
            description,
            city,
            state,
            country,
            postal_code,
            errors,
            loading,
            touched,
            timezone,
            website,
            tz_list,
            country_options,
            default_location,
            locs_errors,
            locs_loading

        } = this.state;

        const { locations, company, token, leftnav } = this.props;

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
            <div className="gnsettings__bucket">
                <div className="at__bucket__header">{company.name}</div>
                <div className="at__bucket__body">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Organization Name<sup>*</sup></label>
                                <Form.Input className={this.handlerInputError(errors, 'name')} onChange={this.handleChange} fluid type='text' name="name" value={name} />
                                {this.displayInputError(errors, 'name')}
                            </Form.Field>
                            <Form.Field>
                                <label>Email<sup>*</sup></label>
                                <Form.Input className={this.handlerInputError(errors, 'email')} onChange={this.handleChange} fluid type='text' name="email" value={email} />
                                {this.displayInputError(errors, 'email')}
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Address</label>
                            <Form.Input className={this.handlerInputError(errors, 'address')} onChange={this.handleChange} fluid type='text' name="address" value={address} />
                            {this.displayInputError(errors, 'address')}
                        </Form.Field>
                        <Form.Group widths='equal'>
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
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Country</label>

                                <Dropdown className={this.handlerInputError(errors, 'country')} placeholder='Country' onChange={this.handleCountryChange} value={country} search selection options={COptions} />

                                {this.displayInputError(errors, 'country')}
                            </Form.Field>

                            <Form.Field>
                                <label>ZIP/Postcode</label>

                                <Form.Input className={this.handlerInputError(errors, 'postal_code')} onChange={this.handleChange} fluid type='text' name="postal_code" value={postal_code} />
                                {this.displayInputError(errors, 'postal_code')}
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
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
                            <Form.Field>
                                <label>Website</label>
                                <Form.Input className={this.handlerInputError(errors, 'website')} onChange={this.handleChange} fluid type='text' name="website" value={website} />
                                {this.displayInputError(errors, 'website')}
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Description</label>
                            <Form.TextArea className={this.handlerInputError(errors, 'description')} onChange={this.handleChange} rows={4} name="description" value={description} />
                            {this.displayInputError(errors, 'description')}
                        </Form.Field>
                        <Button disabled={loading || !touched} className={loading ? 'loading' : ''} type="submit" primary>Save Changes</Button>
                    </Form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    active_company: state.orgs.company,
    token: state.token.activeToken,
    locations: state.locations.locations,
    leftnav: state.leftnav,
});

export default withRouter(connect(mapStateToProps, { setCompany, setCompanies, setCompanyLocations })(CompanyProfile));
