import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setUser, setCreateNewOrg } from '../../actions';
import { Link } from 'react-router-dom';
import { GlobalAppName } from '../..';
import { Box, FormControl, InputLabel, MenuItem, TextField, Typography, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import classNames from 'classnames';
import axiosInstance from '../../api/api';

class EnableMFA extends Component {

    state = {
        phone: '',
        country_code: '',
        errors: [],
        loading: false,
        later: true
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const strict = params.get('strict');

        if (strict) {
            this.setState({ later: false });
        }

        this.props.setCreateNewOrg({
            open: false,
            in_org: false
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleSelectChange = (event) => {
        this.setState({ 'country_code': event.target.value });

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
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
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

                this.props.history.push(`/user/verify-phone/${response.data.id}`);

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

    renderLater = later => {
        return (later ? <Link style={{ color: '#fff !important', marginLeft: '15px' }} to="/select-organization" >
            Set up later
        </Link> : '');
    }

    render() {
        const { errors, loading, country_code, phone, later } = this.state;

        const countryOptions = [
            { key: '1', value: '1', text: 'United States (+1)' },
            { key: '91', value: '91', text: 'India (+91)' }
        ];

        return (
            <>
                <Box sx={{ display: 'flex', marginTop: '30px' }}>
                    <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                    </Box>

                    <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }}>
                        <Typography variant="h4" sx={{color: '#fff'}}>Multi-Factor Authentication</Typography>
                        <Typography sx={{ marginBottom: '50px', color: '#fff' }}>Secure your account with two-factor authentication</Typography>

                        <p style={{color: '#fff'}}>
                            {GlobalAppName} will send a security code to this mobile phone number whenever you log into the {GlobalAppName} website.
                        </p>

                        <form onSubmit={this.handleSubmit}>

                            <Box sx={{ marginBottom: '15px', display: 'flex' }}>
                                <Box sx={{flex: '0.3'}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="country_code_label_id">Select your country</InputLabel>
                                        <Select
                                            labelId="country_code_label_id"
                                            id="country_code"
                                            value={country_code}
                                            label="Select your country"
                                            onChange={this.handleSelectChange}
                                            className={classNames(this.handlerInputError(errors, 'country_code'), 'build__input')}
                                        >
                                            <MenuItem sx={{ fontSize: '18px!important' }} key={1} value={1}>United States (+1)</MenuItem>
                                            <MenuItem sx={{ fontSize: '18px!important' }} key={91} value={91}>India (+91)</MenuItem>
                                        </Select>
                                        {this.displayInputError(errors, 'country_code')}
                                    </FormControl>
                                </Box>

                                <Box sx={{marginLeft: '20px', flex: '0.5'}}>
                                    <TextField fullWidth label="Phone Number" variant="outlined"
                                        onChange={this.handleChange}
                                        name="phone" value={phone}
                                        className={classNames(this.handlerInputError(errors, 'phone'), 'build__input')}
                                    />
                                    {this.displayInputError(errors, 'phone')}
                                </Box>

                            </Box>
                            <LoadingButton
                                type="submit"
                                size='large'
                                sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                                loading={loading}
                                loadingIndicator="Sending..."
                                variant="contained">
                                Send Code Via SMS
                            </LoadingButton>

                            <p style={{ marginTop: '10px' }}>
                                {this.renderLater(later)}
                            </p>
                        </form>
                    </Box>
                </Box>
            </>
        );
    }
}

export default connect(null, { setUser, setCreateNewOrg })(EnableMFA);
