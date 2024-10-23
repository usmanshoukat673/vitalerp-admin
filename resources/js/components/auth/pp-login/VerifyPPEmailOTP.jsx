import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import { setPortalUser, 
    clearPortalUser, 
    setPortalToken, 
    clearPortalToken, 
    unsetSearchQuery, 
    unsetSearchResults, 
    setSharedStandards, 
    setSharedCompany 
} from '../../../actions';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash.isempty';
import { Box, TextField, Typography, Button } from '@mui/material';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

class VerifyPPEmailOTP extends Component {

    state = {
        code: '',
        email: '',
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
        const { email, unique_id } = this.props.match.params;
        if (!isEmpty(email) && this.state.email !== email) {
            this.setState({ email: email });
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

        const { portal_link } = this.props.match.params;

        const { remember_me } = this.state;

        axios.post('/api/auth/policy-panel-verify-login', this.state, {
            headers: {
                'X-Company-Portal-Link-ID': portal_link
            }
        })
            .then(response => {

                if (remember_me === true) {
                    const { cookies } = this.props;
                    cookies.set(`__CJPPREMERME__${this.state.unique_id}`, true, { path: '/', expires: moment().add(2, 'w').toDate(), domain: window.location.host });
                }

                this.setState({
                    loading: false,
                    errors: [],
                    code: ''
                });
                this.props.setPortalUser(response.data.user);
                this.props.setPortalToken(response.data.token);
                this.props.setSharedStandards(response.data.shared_standards);
                this.props.setSharedCompany(response.data.shared_company);
                // this.props.unsetSearchQuery();
                // this.props.unsetSearchResults();

                const params = new URLSearchParams(this.props.location.search);
                const redirect = params.get('redirect');

                if (redirect) {
                    this.props.history.push(redirect);
                }
                else {
                    this.props.history.push(`/policy-panels/${portal_link}/introduction`);
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
        const { portal_link } = this.props.match.params;

        axios.post('/api/auth/policy-panel-resend-otp', this.state, {
            headers: {
                'X-Company-Portal-Link-ID': portal_link
            }
        })
            .then(response => {
                this.setState({
                    errors: [],
                    resend_loading: false
                });

                const params = new URLSearchParams(this.props.location.search);
                const redirect = params.get('redirect');
                NotificationManager.success('New OTP has been sent to your email.', 'Sent');
                this.props.history.push(`/${portal_link}/policy-panels/${response.data.email}/${response.data.unique_id}${!isEmpty(redirect) ? `?redirect=${redirect}` : ''}`);
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

                <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">
                    <Typography variant="h4">Verify Email OTP</Typography>
                    <Typography sx={{ marginBottom: '50px' }}>Enter your verification code</Typography>

                    <p style={{ width: '50%' }}>
                        Please enter verification code which is sent to your email address, please note verification code will expire in 2 minutes.
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
    portal_user: state.user.portalUser
});
export default connect(mapStateToProps, { setPortalUser, clearPortalUser, setPortalToken, clearPortalToken, unsetSearchQuery, unsetSearchResults, setSharedStandards, setSharedCompany })(withCookies(VerifyPPEmailOTP));
