import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import Axios from 'axios';
import { setUser, clearUser, setToken, clearToken } from '../../../actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import isEmpty from 'lodash.isempty';
import { Box, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AuthHeader from '../AuthHeader';
import classNames from 'classnames';
import PasswordStrengthBar from 'react-password-strength-bar';

class ResetPassword extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
        errors: [],
        loading: false
    }

    componentDidMount() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push(`/${this.props.company.slug}/compliance-stack`); // it was /dashboard 
        }
        else {
            deleteStore();
        }

        const { resettoken } = this.props.match.params;
        const params = new URLSearchParams(this.props.location.search);
        const email = params.get('email');

        if (!resettoken && !email) {
            this.props.history.push('/login');
        }
        else {
            this.setState({ token: resettoken, email: email });
        }
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

        Axios.post('/api/auth/reset-password', this.state)
            .then(response => {
                this.setState({
                    email: '',
                    loading: false,
                    password: '',
                    password_confirmation: '',
                });

                NotificationManager.success(response.data.message, 'Success');

                this.props.history.push('/login');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
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

        const { errors, loading, email, password, password_confirmation } = this.state;

        return (
            <>
                <AuthHeader signup={true} />

                <Box sx={{ display: 'flex', marginTop: '30px', justifyContent: 'center' }}>
                   

                <Box sx={{ padding: '20px', borderRadius: '6px', mt: '50px',  background: '#0000008c', width: '35%' }} className="_auth__right">
                        <Typography variant="h4">Reset Password</Typography>
                        <Typography sx={{ marginBottom: '50px' }}>Please reset your password</Typography>

                        <form className="" onSubmit={this.handleSubmit}>

                            <Box sx={{
                                    marginBottom: '15px'
                                }}>
                                <TextField fullWidth label="E-mail" variant="outlined"
                                    onChange={this.handleChange}
                                    name="email" value={email}
                                    className={classNames(this.handlerInputError(errors, 'email'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'email')}
                            </Box>

                            <Box sx={{
                                    marginBottom: '15px'
                                }}>
                                <TextField type="password" fullWidth label="Enter new Password" variant="outlined"
                                    onChange={this.handleChange}
                                    name="password" value={password}
                                    className={classNames(this.handlerInputError(errors, 'password'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'password')}
                            </Box>

                            <Box sx={{
                                    marginBottom: '15px'
                                }}>
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
                                loadingIndicator="Processing..."
                                variant="contained">
                                Reset password
                            </LoadingButton>
                        </form>
                    </Box>
                </Box>


            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
    company: state.orgs.company
});
export default connect(mapStateToProps, { setUser, clearUser, setToken, clearToken })(ResetPassword);
