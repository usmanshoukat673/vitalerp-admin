import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import isEmpty from 'lodash.isempty';
import { Box, TextField, Typography } from '@mui/material';
import PPAuthHeader from '../PPAuthHeader';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';

class PolicyPortalLogin extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        email: '',
        errors: [],
        loading: false
    }

    componentDidMount() {

        const params = new URLSearchParams(this.props.location.search);

        if (!isEmpty(this.props.portal_user)) {

            const redirect = params.get('redirect');
            if (redirect) {
                this.props.history.push(redirect);
            }
            else {
                // redirect user to the PolicyPortal 
                const { portal_link } = this.props.match.params;
                this.props.history.push(`/policy-panels/${portal_link}/introduction`);
            }

        }
        else {
            // do not delete entire store for now, will see later 
            // we may just needs to verify the portal link 
            // deleteStore();

            if (params.get('email')) {
                this.setState({ email: window.atob(params.get('email')) });
            }
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

        const { portal_link } = this.props.match.params;

        this.setState({ errors: [], loading: true });

        const { cookies } = this.props;

        let cock = cookies.get(`__CJPPREMERME__${this.state.email}`);

        let mfa_remb = false;

        if (cock === 'true') {
            mfa_remb = true;
        }

        const { email } = this.state;

        Axios.post('/api/auth/policy-panels-login', { email: email, mfa_remb: mfa_remb }, {
            headers: {
                'X-Company-Portal-Link-ID': portal_link
            }
        })
            .then(response => {
                const params = new URLSearchParams(this.props.location.search);
                const redirect = params.get('redirect');

                this.setState({
                    email: '',
                });

                this.props.history.push(`/${portal_link}/policy-panels/${response.data.email}/${response.data.unique_id}${!isEmpty(redirect) ? `?redirect=${redirect}` : ''}`);

            })
            .catch(err => {
                this.setState({ loading: false });
                if (err.response.status === 500) {
                    this.setState({ errors: [] });
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors) });
                }
                if (err.response.status === 429) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors) });
                }
                if (err.response.status === 404) {
                    NotificationManager.error(err.response.data.message, "Error")
                }
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { errors, loading, email } = this.state;

        return (

            <>
                <PPAuthHeader signup={false} />

                <Box sx={{ display: 'flex', marginTop: '30px' }}>
                    <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px', textAlign: 'center' }}>
                    </Box>

                    <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">
                        <Typography variant="h4">Policy Panel</Typography>
                        <Typography sx={{ marginBottom: '50px' }}>Please enter your email to access policy portal.</Typography>

                        <form onSubmit={this.handleSubmit}>
                            <Box
                                sx={{
                                    '& > :not(style)': { width: '55ch' },
                                    marginBottom: '15px'
                                }}
                            >

                                <TextField label="E-mail" autoComplete="true" variant="outlined"
                                    onChange={this.handleChange}
                                    name="email" value={email}
                                    className={classNames(this.handlerInputError(errors, 'email'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'email')}
                            </Box>


                            <LoadingButton
                                type="submit"
                                size='large'
                                sx={{ paddingRight: '40px', paddingLeft: '40px' }}
                                loading={loading}
                                loadingIndicator="Generating OTP..."
                                variant="contained">
                                Request OTP
                            </LoadingButton>
                        </form>
                    </Box>
                </Box>

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    portal_user: state.user.portalUser,
});
export default connect(mapStateToProps)(withCookies(PolicyPortalLogin));
