import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import Axios from 'axios';
import { Message } from 'semantic-ui-react';
import { setUser, clearUser, setToken, clearToken } from '../../../actions';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash.isempty';
import { Box, TextField, Typography } from '@mui/material';
import AuthHeader from '../AuthHeader';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';

class ForgotPassword extends Component {

    state = {
        email: '',
        errors: [],
        loading: false,
        sent: false,
        message: ''
    }

    componentDidMount() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push(`/${this.props.company.slug}/compliance-stack`); // it was /dashboard 
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

        this.setState({ errors: [], loading: true, sent: false });

        Axios.post('/api/auth/sent-reset-password-link', { email: this.state.email })
            .then(response => {
                this.setState({
                    email: '',
                    sent: true,
                    loading: false,
                    message: response.data.message
                });
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false, sent: false });
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false, sent: false });
                }
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { errors, loading, message, sent, email } = this.state;

        return (
            <>
                <AuthHeader signup={true} />

                <Box sx={{ display: 'flex', marginTop: '30px', justifyContent: 'center' }}>
                   
                <Box sx={{ padding: '20px', borderRadius: '6px', mt: '50px',  background: '#0000008c', width: '35%' }} className="_auth__right">
                        <Typography variant="h4">Reset Password</Typography>
                        <Typography sx={{ marginBottom: '50px' }}>Please enter your email address</Typography>

                        {sent ? <Message positive>
                            <Message.Header>Email Sent</Message.Header>
                            <p>
                                {message}
                            </p>
                        </Message> : ''}

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
export default connect(mapStateToProps, { setUser, clearUser, setToken, clearToken })(ForgotPassword);
