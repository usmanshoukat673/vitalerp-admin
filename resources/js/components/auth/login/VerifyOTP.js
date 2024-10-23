import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import { setUser, clearUser, setToken, clearToken, setCompanies, setPWDRotation, setMaturityLevels, unsetSearchQuery, unsetSearchResults } from '../../../actions';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash.isempty';
import { Box, TextField, Typography, Button } from '@mui/material';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';
import axiosInstance from '../../../api/api';

class VerifyOTP extends Component {

    state = {
        code: '',
        id: '',
        unique_id: '',
        errors: [],
        loading: false,
        resend_loading: false,
        enable_resend: true,
        remember_me: false,
    };

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        setTimeout(
            function () {
                this.setState({ enable_resend: false });
            }
                .bind(this),
            60000
        );
    }

    setID = () => {
        const { token, unique_id } = this.props.match.params;
        if (!isEmpty(token) && this.state.id !== token) {
            this.setState({ id: token });
        }

        if (!isEmpty(unique_id) && this.state.unique_id !== unique_id) {
            this.setState({ unique_id });
        }

    }

    componentDidMount() {
        this.setID();
    };

    componentDidUpdate(prevProps) {
        this.setID();
    };

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

        const { token } = this.props;

        const { remember_me } = this.state;

        axiosInstance.post('/api/auth/verify-otp', this.state)
            .then(response => {

                if (remember_me === true) {
                    const { cookies } = this.props;
                    cookies.set(`__CJMFAREMB__${this.state.unique_id}`, true, { path: '/', expires: moment().add(2, 'w').toDate(), domain: window.location.host });
                }

                this.setState({
                    loading: false,
                    errors: [],
                    code: ''
                });
                this.props.setToken(response.data.token);
                this.props.setUser(response.data.user);
                this.props.setPWDRotation(response.data.pwd_rotaion);
                this.props.setCompanies(response.data.companies);
                this.props.setMaturityLevels(response.data.maturity_levels);
                this.props.unsetSearchQuery();
                this.props.unsetSearchResults();

                const params = new URLSearchParams(this.props.location.search);
                const redirect = params.get('redirect');

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
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
                if (err.response.status === 401) {
                    this.setState({ errors: [], loading: false });
                }
            });
    }

    handleResendVerificationCode = event => {
        event.preventDefault();

        this.setState({ errors: [], resend_loading: true });

        const { token } = this.props;

        axiosInstance.post('/api/auth/resend-otp', this.state)
            .then(response => {
                this.setState({
                    errors: [],
                    resend_loading: false
                });

                const params = new URLSearchParams(this.props.location.search);
                const redirect = params.get('redirect');

                this.props.history.push(`/verify-otp/${response.data.id}/${this.state.unique_id}${!isEmpty(redirect) ? `?redirect=${redirect}` : ''}`);
            })
            .catch(err => {
                if (err.response.status === 500 || err.response.status === 405) {
                    this.setState({ errors: [], resend_loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), resend_loading: false });
                }
                if (err.response.status === 401) {
                    this.setState({ errors: [], resend_loading: false });
                }
            });
    }

    toggle = () => {
        this.setState((prevState) => {
            return ({ remember_me: !prevState.remember_me });
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { errors, loading, resend_loading, enable_resend, remember_me, code } = this.state;

        return (
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                </Box>

                <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }}>
                    <Typography variant="h4" sx={{color: '#fff'}}>Multi-Factor Authentication</Typography>
                    <Typography sx={{ marginBottom: '50px', color: '#fff' }}>Enter your verification code</Typography>

                    <p style={{width: '50%', color: '#fff'}}>
                        Please enter verification code which is sent via SMS on your mobile number, please note verification code will expire in 2 minutes.
                    </p>

                    <form className="" onSubmit={this.handleSubmit}>

                        <Box sx={{ marginBottom: '15px', width: '45%' }}>
                            <TextField fullWidth label="Verification Code" variant="outlined"
                                onChange={this.handleChange}
                                name="code" value={code}
                                className={classNames(this.handlerInputError(errors, 'code'), 'build__input')}
                            />
                            {this.displayInputError(errors, 'code')}
                        </Box>

                        <Box sx={{ marginBottom: '15px', width: '45%' }}>
                            <Checkbox onChange={this.toggle} checked={remember_me} toggle label="Remember this browser for next 2 weeks." />
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <LoadingButton
                                type="submit"
                                size='large'
                                sx={{ paddingRight: '40px', paddingLeft: '40px', marginRight: '20px' }}
                                loading={loading}
                                loadingIndicator="Verifing..."
                                variant="contained">
                                Verify
                            </LoadingButton>

                            <Button
                                type="button"
                                size='large'
                                onClick={this.handleResendVerificationCode}
                                sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                                disabled={resend_loading || enable_resend}
                                variant="outlined">
                                Resend new Code?
                            </Button>
                        </Box>




                    </form>

                </Box>
            </Box>

        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser
});
export default connect(mapStateToProps, { setUser, clearUser, setToken, clearToken, setCompanies, setPWDRotation, setMaturityLevels, unsetSearchQuery, unsetSearchResults })(withCookies(VerifyOTP));
