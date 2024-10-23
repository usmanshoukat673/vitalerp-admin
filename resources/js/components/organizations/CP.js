import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Form, Dropdown } from 'semantic-ui-react';
import { setCompany, setCompanies, setCompanyLocations } from '../../actions';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import moment from 'moment-timezone';
import countryList from 'react-select-country-list';
import { withRouter } from 'react-router';
import axiosInstance from '../../api/api';

const CompanyProfile = ({ company, setCompany, setCompanies, setCompanyLocations, active_company, locations }) => {

    const [cp_state, setState] = useState({
        comp_id: '',
        name: '',
        address: '',
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
    })

    const [timeZoneOptions, setTimeZoneOptions] = useState([]);
    const [COptions, setCOptions] = useState([]);
    const [locationsOptions, setLocationsOptions] = useState([]);

    // moment.tz.guess()
    const loadTzList = () => {

        setState({ ...cp_state, tz_list: moment.tz.names() });

        axiosInstance.get(`/api/user/org/tz-list/${company.id}/?usertz=${moment.tz.guess()}`)
            .then(response => {
                setState({
                        ...cp_state,
                        errors: [],
                        loading: false,
                        default_location: response.data.default_location.id
                    });

                if (response.data.company) {
                    setCompany(response.data.company);
                    setCompanies(response.data.companies);
                    setState({
                            ...cp_state,
                            timezone: response.data.company.timezone
                        });
                }
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setState({ ...cp_state, errors: state.errors.concat(err.response.data.errors), loading: false });
                }
            })
            .finally(() => {
                setState(
                    {
                        ...cp_state,
                        errors: [], loading: false
                    }
                );
            });
    }

    useEffect(() => {
        if(company)
        {
            setState({
                ...cp_state,
                comp_id: company.id,
                name: company.name,
                address: (_.isEmpty(company.address) ? '' : company.address),
                city: (_.isEmpty(company.city) ? '' : company.city),
                state: (_.isEmpty(company.state) ? '' : company.state),
                country: (_.isEmpty(company.country) ? '' : company.country),
                postal_code: (_.isEmpty(company.postal_code) ? '' : company.postal_code),
                timezone: (_.isEmpty(company.timezone) ? '' : company.timezone),
                website: (_.isEmpty(company.website) ? '' : company.website),
                country_options: countryList().getData()
            });

            loadTzList();
            setTimeZoneOptions(_.map(cp_state.tz_list, (tz, index) => ({
                key: tz,
                text: tz,
                value: tz,
            })));
            setCOptions(_.map(cp_state.country_options, (ml, index) => ({
                key: ml.label,
                text: ml.label,
                value: ml.label,
            })));
        }
    }, [company]);

    useEffect(() => {
       
    }, []);

    useEffect(() => {
        setLocationsOptions(_.map(locations, (loc, index) => ({
            key: loc.id,
            text: `${loc.name}`,
            value: loc.id,
        })));
    }, [locations]);

    const handleChange = event => {
        setState({ ...cp_state, [event.target.name]: event.target.value, touched: true });
        const { errors } = state;
        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            setState({ ...cp_state, errors: errors });
        }
    }

    const handleTZChange = (event, { value }) => {
        setState({ ...cp_state, timezone: value, touched: true });

        const { errors } = state;

        if (errors.length > 0 && errors[0].hasOwnProperty(timezone)) {
            delete errors[0][timezone];
            setState({ ...cp_state, errors: errors });
        }
    }

    const handleLocationsChange = (event, { value }) => {
        setState({ ...cp_state, default_location: value, touched: true });
        const { errors } = state;
        if (errors.length > 0 && errors[0].hasOwnProperty(default_location)) {
            delete errors[0][default_location];
            setState({ ...cp_state, errors: errors });
        }
    };

    const handleCountryChange = (event, { value }) => {
        setState({ ...cp_state, country: value, touched: true });

        const { errors } = state;

        if (errors.length > 0 && errors[0].hasOwnProperty(country)) {
            delete errors[0][country];
            setState({ ...cp_state, errors: errors });
        }
    }

    const handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    const displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    const handleSubmit = event => {
        event.preventDefault();

        setState({ ...cp_state, errors: [], loading: true, touched: false });


        axiosInstance.post('/api/user/org/save-basic-details', state)
            .then(response => {

                setState({
                    ...cp_state,
                    errors: [],
                    loading: false
                });

                setCompanies(response.data.companies);

                if (active_company.id === company.id) {
                    setCompany(response.data.company);
                }


                return NotificationManager.success('Details saved successfully!', 'Success');
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setState({ ...cp_state, errors: state.errors.concat(err.response.data.errors), loading: false });
                }
            })
            .finally(() => {
                setState(
                    {
                        ...cp_state,
                        errors: [], loading: false
                    }
                );
            });
    }

    const handleLocationsAddition = (e, { value }) => {

        setState({ ...cp_state, locs_errors: [], locs_loading: true });

        axiosInstance.post('/api/user/locations/add-location-on-the-fly', {
            name: value,
        })
            .then(e => {

                locationAdded(e.data.location);

                setState({
                    ...cp_state,
                    locs_errors: [],
                    locs_loading: false,
                    touched: true,
                    default_location: e.data.location.id
                });

            }).catch(err => {
                if (err.response.status === 422) {
                    setState({ ...cp_state, locs_errors: state.locs_errors.concat(err.response.data.errors), locs_loading: false });
                }
            }).finally(() => {
                setState(
                    {
                        ...cp_state,
                        locs_errors: [], loading: false
                    }
                );
            });
    }

    const locationAdded = location => {
        let the_locations = [...locations];
        the_locations.push(location);
        setCompanyLocations(the_locations);
    }

    return (
        <div className="gnsettings__bucket">
            <div className="at__bucket__header">{company.name}</div>
            <div className="at__bucket__body">
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Organization Name</label>

                        <Form.Input className={handlerInputError(cp_state.errors, 'name')} onChange={handleChange} fluid type='text' name="name" value={cp_state.name} />
                        {displayInputError(cp_state.errors, 'name')}
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Form.Input className={handlerInputError(cp_state.errors, 'address')} onChange={handleChange} fluid type='text' name="address" value={cp_state.address} />
                        {displayInputError(cp_state.errors, 'address')}
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>City</label>

                            <Form.Input className={handlerInputError(cp_state.errors, 'city')} onChange={handleChange} fluid type='text' name="city" value={cp_state.city} />
                            {displayInputError(cp_state.errors, 'city')}
                        </Form.Field>
                        <Form.Field>
                            <label>State</label>

                            <Form.Input className={handlerInputError(cp_state.errors, 'state')} onChange={handleChange} fluid type='text' name="state" value={cp_state.state} />
                            {displayInputError(cp_state.errors, 'state')}
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Country</label>

                            <Dropdown className={handlerInputError(cp_state.errors, 'country')} placeholder='Country' onChange={handleCountryChange} value={cp_state.country} search selection options={COptions} />

                            {displayInputError(cp_state.errors, 'country')}
                        </Form.Field>

                        <Form.Field>
                            <label>ZIP/Postcode</label>

                            <Form.Input className={handlerInputError(cp_state.errors, 'postal_code')} onChange={handleChange} fluid type='text' name="postal_code" value={cp_state.postal_code} />
                            {displayInputError(cp_state.errors, 'postal_code')}
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>TimeZone</label>
                            <Dropdown placeholder='TimeZone' onChange={handleTZChange} value={cp_state.timezone} search selection options={timeZoneOptions} />

                        </Form.Field>

                        <Form.Field>
                            <label>Location/NickName</label>
                            <Dropdown
                                fluid
                                options={locationsOptions}
                                search
                                selection
                                onChange={handleLocationsChange}
                                value={cp_state.default_location}
                                allowAdditions
                                onAddItem={handleLocationsAddition}
                                disabled={cp_state.locs_loading}
                            />
                            {displayInputError(cp_state.errors, 'default_location')}
                            {displayInputError(cp_state.locs_errors, 'name')}
                        </Form.Field>
                        <Form.Field>
                            <label>Website</label>
                            <Form.Input className={handlerInputError(cp_state.errors, 'website')} onChange={handleChange} fluid type='text' name="website" value={cp_state.website} />
                            {displayInputError(cp_state.errors, 'website')}
                        </Form.Field>
                    </Form.Group>
                    <Button disabled={cp_state.loading || !cp_state.touched} className={cp_state.loading ? 'loading' : ''} type="submit" primary>Save Changes</Button>
                </Form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    active_company: state.orgs.company,
    token: state.token.activeToken,
    locations: state.locations.locations,
    leftnav: state.leftnav,
});

export default withRouter(connect(mapStateToProps, { setCompany, setCompanies, setCompanyLocations })(CompanyProfile));