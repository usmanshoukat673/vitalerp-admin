import React, { Component } from 'react';
import { Form, Header, Button, Modal, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setUser } from '../../../actions';
import _ from 'lodash';
import { GlobalAppName } from '../../..';
import axiosInstance from '../../../api/api';

class MFAPhoneRequest extends Component {

    state = {
        country_code: '',
        phone: '',
        errors: [],
        loading: false
    }

    componentWillReceiveProps() {
        const { user } = this.props;
        this.setState({ country_code: (!_.isEmpty(user.country_code) ? user.country_code : ''), phone: (!_.isEmpty(user.phone) ? user.phone : '') });
    }

    handleChange = event => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ [event.target.name]: event.target.value });
        }
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleSelectChange = (event, { value }) => {
        this.setState({ 'country_code': value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty('country_code')) {
            delete errors[0]['country_code'];
            this.setState({ errors: errors });
        }
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '4px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        axiosInstance.post('/api/user/verify-number', this.state)
            .then(response => {
                this.setState({
                    country_code: '',
                    phone: '',
                    errors: [],
                    loading: false
                });

                this.props.setUser(response.data.user);

                this.props.showVerify(response.data.id);
            })
            .catch(err => {
                if (err.response.status === 500 && err) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422 && err) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    close = () => {
        this.props.close();
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { errors, loading, country_code, phone } = this.state;
        const { showVerify, mfa_setup } = this.props;

        const countryOptions = [
            { key: '1', value: '1', text: 'United States (+1)' },
            { key: '91', value: '91', text: 'India (+91)' }
        ];

        return (
            <React.Fragment>
                <Modal className="mfa__modal" open={mfa_setup} size="small">
                    <Modal.Header>
                        Multi-Factor Authentication
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>Provide a phone number</Header>
                            <Form>
                                <p>
                                    {GlobalAppName} will send a security code to this mobile phone number whenever you log into the {GlobalAppName} website.
                                </p>
                                <Form.Group >

                                    <Form.Field width={5}>
                                        <Select className={this.handlerInputError(errors, 'country_code')} onChange={this.handleSelectChange} placeholder='Select your country' name="country_code" options={countryOptions} defaultValue={country_code} />
                                        {this.displayInputError(errors, 'country_code')}
                                    </Form.Field>
                                    <Form.Field width={6}>
                                        <Form.Input className={this.handlerInputError(errors, 'phone')} onChange={this.handleChange} fluid icon='phone' type='text' iconPosition='left' value={phone} placeholder='Phone Number' name="phone" />
                                        {this.displayInputError(errors, 'phone')}
                                    </Form.Field>

                                </Form.Group>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            disabled={loading} className={loading ? 'primary__button loading' : 'primary__button'}
                            onClick={this.handleSubmit}
                            positive
                            content='Send Code via SMS'
                        />
                        <Button onClick={this.close} negative>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default connect(null, { setUser })(MFAPhoneRequest);
