import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { setUser, clearUser, setToken, clearToken, setCompanies, setPWDRotation, clearPWDRotation, setMaturityLevels, unsetSearchQuery, unsetSearchResults, setUserNewDevice, setSupplier } from '../../../actions';
import { NotificationManager } from 'react-notifications';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import isEmpty from 'lodash.isempty';
import { Box, Grid, TextField, Typography } from '@mui/material';
import AuthHeader from '../AuthHeader';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';

class Login extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        email: '',
        password: '',
        errors: [],
        loading: false
    }

    componentDidMount() {
        if (!isEmpty(this.props.user)) {

            const params = new URLSearchParams(this.props.location.search);
            const redirect = params.get('redirect');
            const { rotation } = this.props;

            if (redirect) {
                this.props.history.push(redirect);
            }
            else if (this.props.user.changed_password === 0) {
                this.props.history.push('/user/change-password');
            }
            else if (rotation.pwd_warning === 2) {
                this.props.history.push('/user/password-expired');
            }
            else {
                // needs to add second step here about MFA
                // needs to make sure wheter user has selected org or not then redirect accordigly
                this.props.history.push('/select-organization');
            }

        }
        else {
            deleteStore();
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

        const { cookies } = this.props;

        let cock = cookies.get(`__CJMFAREMB__${this.state.email}`);

        let mfa_remb = false;

        if (cock === 'true') {
            mfa_remb = true;
        }

        const { email, password } = this.state;

        Axios.post('/api/auth/login', { email: email, password: password, mfa_remb: mfa_remb })
            .then(response => {
                const params = new URLSearchParams(this.props.location.search);
                const redirect = params.get('redirect');

                this.setState({
                    email: '',
                    password: ''
                });

                this.props.setToken(response.data.token);
                this.props.setUserNewDevice(response.data.new_device);

                // check if we are redicting user to configure mfa // No need to check for the configure for now as we stcikly forcking the email otp
                // if(response.data.configure_mfa) {
                //     this.props.history.push(`/configure-mfa${!isEmpty(redirect) ? `?redirect=${redirect}` : ''}`);
                // }
                if (response.data.mfa_required) {
                    this.props.history.push(`/verify-login-email-otp${!isEmpty(redirect) ? `?redirect=${redirect}` : ''}`);
                }
                else {
                    this.props.setUser(response.data.user);
                    this.props.setCompanies(response.data.supplier.companies);
                    this.props.setSupplier(response.data.supplier);
                    this.props.setUserNewDevice(response.data.new_device);
                    this.props.setPWDRotation(response.data.pwd_rotaion);
                    this.props.setMaturityLevels(response.data.maturity_levels);
                    this.props.unsetSearchQuery();
                    this.props.unsetSearchResults();

                    if (redirect) {
                        this.props.history.push(redirect);
                    }
                    else if (response.data.user.changed_password === 0) {
                        this.props.history.push('/user/change-password');
                    }
                    else if (response.data.pwd_rotaion.pwd_warning === 2) {
                        this.props.history.push('/user/password-expired');
                    }
                    else {
                        this.props.history.push('/select-organization');
                    }
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
                if (err.response.status === 429) {
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

        const { errors, loading, email, password } = this.state;

        return (

            <>
                <AuthHeader signup={false} />

                <Box sx={{ display: 'flex', marginTop: '30px', justifyContent: 'center' }}>


                    <Box sx={{ padding: '20px', borderRadius: '6px', mt: '50px', background: '#0000008c', width: '35%' }} className="_auth__right">
                        <Typography variant="h4">Welcome back</Typography>
                        <Typography sx={{ marginBottom: '50px' }}>Please enter your login details</Typography>

                        <form onSubmit={this.handleSubmit}>
                            <Box
                                sx={{
                                    marginBottom: '15px'
                                }}
                            >

                                <TextField label="E-mail" autoComplete="true" variant="outlined"
                                    onChange={this.handleChange}
                                    fullWidth
                                    name="email" value={email}
                                    type='email'
                                    className={classNames(this.handlerInputError(errors, 'email'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'email')}
                            </Box>

                            <Box
                                sx={{
                                    marginBottom: '15px'
                                }}
                            >

                                <TextField type="password" label="Password" autoComplete="true" variant="outlined"
                                    onChange={this.handleChange}
                                    name="password" value={password}
                                    fullWidth
                                    className={classNames(this.handlerInputError(errors, 'password'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'password')}
                            </Box>

                            <Grid container spacing={2} sx={{mt: 2, mb: 2}}>
                                <Grid item xs={6}>
                                    <LoadingButton
                                        type="submit"
                                        size='large'
                                        sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                                        loading={loading}
                                        loadingIndicator="Processing..."
                                        variant="contained">
                                        Login
                                    </LoadingButton>
                                </Grid>
                                <Grid item xs={6} className="forget_password">
                                    <p><Link to="/password-recovery" style={{ textDecoration: 'none' }}>Forgot Your Password?</Link></p>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
    rotation: state.password.rotation
});
export default connect(mapStateToProps, { setUser, clearUser, setToken, clearToken, setCompanies, setPWDRotation, clearPWDRotation, setMaturityLevels, unsetSearchQuery, unsetSearchResults, setUserNewDevice, setSupplier })(withCookies(Login));
