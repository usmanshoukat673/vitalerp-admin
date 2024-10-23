import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Form, Dropdown, Button } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import countryList from 'react-select-country-list';
import moment from 'moment-timezone';
import './AddLocation.scss';
import axiosInstance from '../../../api/api';

class AddLocation extends Component {

    state = {
        errors: [],
        loading: false,
        email: '',
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        timezone: '',
        country_options: [],
    }

    componentDidMount() {
        this.setState({ country_options: countryList().getData(), timezone: moment.tz.guess() });
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

    handleCountryChange = (event, { value }) => {
        this.setState({ country: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(country)) {
            delete errors[0][country];
            this.setState({ errors: errors });
        }
    }

    handleTZChange = (event, { value }) => {
        this.setState({ timezone: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(timezone)) {
            delete errors[0][timezone];
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

        this.setState({ errors: [], loading: true });
        const { name, address, city, state, country, postal_code, timezone } = this.state;

        axiosInstance.post('/api/user/locations/add-location', {
            name: name,
            address: address,
            city: city,
            state: state,
            country: country,
            timezone: timezone,
            postal_code: postal_code,
        })
            .then(e => {
                this.setState({
                    email: '',
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    postal_code: '',
                    errors: [],
                    loading: false
                });

                this.props.added(e.data.location);

                NotificationManager.success('New Location has been successfully created!', 'Success');

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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const {
            loading,
            email,
            errors,
            country_options,
            name, address, city, state, country, postal_code, timezone

        } = this.state;
        const { company, token, open, tz_list } = this.props;

        const COptions = _.map(country_options, (ml, index) => ({
            key: ml.label,
            text: ml.label,
            value: ml.label,
        }));

        const timeZoneOptions = _.map(tz_list, (tz, index) => ({
            key: tz,
            text: tz,
            value: tz,
        }));

        return (
            <Modal
                className="semtic__modal add__location__modal"
                onClose={() => { }}
                open={open}
                size="tiny"
            >
                <Modal.Content className="add__location_modal_container">
                    <div className="sss__header">
                        <div className="__ss__number">
                            Add Location
                        </div>
                        <div className="__ss__close">
                            <CloseIcon onClick={this.props.close} />
                        </div>
                    </div>

                    <div className="__ap__form">
                        <Form>
                            <Form.Field>
                                <label>Name</label>

                                <Form.Input className={this.handlerInputError(errors, 'name')} onChange={this.handleChange} fluid type='text' name="name" value={name} />
                                {this.displayInputError(errors, 'name')}
                            </Form.Field>
                            <Form.Field  >
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
                                <label>Time Zone</label>
                                <Dropdown placeholder='TimeZone' onChange={this.handleTZChange} value={timezone} search selection options={timeZoneOptions} />
                            </Form.Field>

                            <Form.Field>
                                <Button fluid disabled={loading} className={loading ? '__ap__action loading' : '__ap__action'} onClick={this.handleSubmit} >
                                    Submit
                                </Button>
                            </Form.Field>
                        </Form>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

export default AddLocation;
