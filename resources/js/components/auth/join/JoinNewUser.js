import React, { Component } from 'react';
import './JoinNewUser.scss';
import { deleteStore } from '../../../store/localStorage';
import { connect } from 'react-redux';
import Axios from 'axios';
import { setUser, clearUser, setToken, clearToken, setCompanies, setPWDRotation, clearPWDRotation, setMaturityLevels, unsetSearchQuery, unsetSearchResults } from '../../../actions';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PasswordStrengthBar from 'react-password-strength-bar';
import IdentificationLogo from '../IdentificationLogo';
import AuthHeader from '../AuthHeader';
import { Box, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import classNames from 'classnames';

class JoinNewUser extends Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        _token: '',
        password_confirmation: '',
        errors: [],
        loading: false
    };

    componentDidMount() {
        deleteStore();
        this.props.clearUser();
        this.props.clearPWDRotation();
        this.props.clearToken();

        const { _token, email } = this.props.match.params;

        this.setState({ _token, email });
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

        Axios.post('/api/auth/join', this.state)
            .then(response => {
                this.setState({
                    loading: false,
                    first_name: '',
                    last_name: '',
                    password: '',
                    password_confirmation: ''
                });
                this.props.setToken(response.data.token);
                this.props.setUser(response.data.user);
                this.props.setPWDRotation(response.data.pwd_rotaion);
                this.props.setCompanies(response.data.companies);
                this.props.setMaturityLevels(response.data.maturity_levels);
                this.props.unsetSearchQuery();
                this.props.unsetSearchResults();
                // TODO: disable MFA for now as twilip is not working properly
                // this.props.history.push('/user/enable-mfa');
                this.props.history.push('/select-organization');
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

        const { errors, loading, password, password_confirmation, first_name, last_name } = this.state;

        return (
            <>
                <AuthHeader signup={false} />

                <Box sx={{ display: 'flex', marginTop: '30px' }}>
                    <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                    </Box>

                    <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">
                        <Typography variant="h4">Account Setup</Typography>
                        <Typography sx={{ marginBottom: '50px' }}>Few more details and your account will be ready to use.</Typography>

                        <form className="" onSubmit={this.handleSubmit}>

                            <Box sx={{display: 'flex', justifyItems: 'center'}}>
                                <Box sx={{ marginBottom: '15px', flex: '0.5', marginRight: '10px' }}>

                                    <TextField fullWidth label="First name" variant="outlined"
                                        onChange={this.handleChange}
                                        name="first_name" value={first_name}
                                        className={classNames(this.handlerInputError(errors, 'first_name'), 'build__input')}
                                    />
                                    {this.displayInputError(errors, 'first_name')}
                                </Box>

                                <Box sx={{ marginBottom: '15px', flex: '0.5', marginLeft: '10px' }}>

                                    <TextField fullWidth label="Last name" variant="outlined"
                                        onChange={this.handleChange}
                                        name="last_name" value={last_name}
                                        className={classNames(this.handlerInputError(errors, 'last_name'), 'build__input')}
                                    />
                                    {this.displayInputError(errors, 'last_name')}
                                </Box>
                            </Box>

                            <Box sx={{ marginBottom: '15px' }}>
                                <TextField type="password" fullWidth label="Enter new Password" variant="outlined"
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

                                {password != '' ? <PasswordStrengthBar password={password} /> : ''}
                            </Box>

                            <LoadingButton
                                type="submit"
                                size='large'
                                sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                                loading={loading}
                                loadingIndicator="Processing..."
                                variant="contained">
                                Finish Setup
                            </LoadingButton>
                        </form>
                    </Box>
                </Box>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser
});
export default connect(mapStateToProps, { setUser, clearUser, setToken, clearToken, setCompanies, setPWDRotation, clearPWDRotation, setMaturityLevels, unsetSearchQuery, unsetSearchResults })(JoinNewUser);
