import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setUser, setPWDRotation, setCreateNewOrg } from '../../actions';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Box, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';
import axiosInstance from '../../api/api';
import AuthHeader from '../auth/AuthHeader';

class ChangeCurrentPassword extends Component {

    state = {
        password: '',
        password_confirmation: '',
        errors: [],
        loading: false,
    }

    componentDidMount() {
        if (this.props.user.changed_password === 1) {
            // TODO: disabple mfa after password change for time being
            //this.props.history.push('/user/enable-mfa');
            this.props.history.push('/select-organization');
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

        axiosInstance.post('/api/user/change-current-password', this.state)
            .then(response => {

                this.setState({
                    password: '',
                    password_confirmation: '',
                    errors: [],
                    loading: false
                });

                // SET companies 
                // set matuirut levels 
                // set up new deive 
                // setup suppleir

                this.props.setUser(response.data.user);
                this.props.setPWDRotation(response.data.pwd_rotaion);

                // TODO: disabple mfa after password change for time being
                //this.props.history.push('/user/enable-mfa');
                this.props.history.push(response.data.redirect);
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

    render() {
        const { errors, loading, password, password_confirmation } = this.state;

        return (
            <>
                <AuthHeader signup={false} />
                <Box sx={{ display: 'flex', marginTop: '30px', justifyContent: 'center' }}>


                    <Box sx={{ padding: '20px', borderRadius: '6px', mt: '50px', background: '#0000008c', width: '35%' }} className="_auth__right">
                        <Typography variant="h4" sx={{ color: '#fff' }}>Change Password</Typography>
                        <Typography sx={{ marginBottom: '50px', color: '#fff' }}>For security reason it is import to change your password</Typography>

                        <form className="" onSubmit={this.handleSubmit}>

                            <Box sx={{ marginBottom: '15px' }}>
                                <TextField type="password" fullWidth label="New Password" variant="outlined"
                                    onChange={this.handleChange}
                                    name="password" value={password}
                                    className={classNames(this.handlerInputError(errors, 'password'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'password')}
                            </Box>

                            <Box sx={{ marginBottom: '15px' }}>
                                <TextField type="password" fullWidth label="Confirm Password" variant="outlined"
                                    onChange={this.handleChange}
                                    name="password_confirmation" value={password_confirmation}
                                    className={classNames(this.handlerInputError(errors, 'password_confirmation'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'password_confirmation')}
                            </Box>
                            {password != '' ? <PasswordStrengthBar password={password} /> : ''}

                            <LoadingButton
                                type="submit"
                                size='large'
                                sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                                loading={loading}
                                loadingIndicator="Changing..."
                                variant="contained">
                                Change Password
                            </LoadingButton>
                        </form>
                    </Box>
                </Box>
            </>
        );
    }
}

export default connect(null, { setUser, setPWDRotation, setCreateNewOrg })(ChangeCurrentPassword);
