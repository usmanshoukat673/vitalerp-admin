import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setUser, setCreateNewOrg } from '../../actions';
import { NotificationManager } from 'react-notifications';
import { Box, TextField, Typography, Button } from '@mui/material';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';
import axiosInstance from '../../api/api';

class VerifyMFA extends Component {

    state = {
        code: '',
        id: '',
        errors: [],
        loading: false,
        loading_resend: false,
        enable_resend: true
    }

    constructor(props) {
        super(props);
        setTimeout(
            function () {
                this.setState({ enable_resend: false });
            }
                .bind(this),
            60000
        );

        this.props.setCreateNewOrg({
            open: false,
            in_org: false
        });
    }

    setID = () => {
        const { token } = this.props.match.params;
        if (!_.isEmpty(token) && this.state.id !== token) {
            this.setState({ id: token });
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
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        axiosInstance.post('/api/user/verify-otp', this.state)
            .then(response => {

                this.setState({
                    code: '',
                    errors: [],
                    loading: false
                });

                this.props.setUser(response.data.user);

                this.props.history.push('/select-organization');
                NotificationManager.success('Multi-Factor Authentication has been successfully configured.', 'Success');
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

    handleResendVerificationCode = (event) => {
        event.preventDefault();

        this.setState({ errors: [], loading_resend: true });


        axiosInstance.post('/api/user/resend-otp', this.state)
            .then(response => {
                this.setState({
                    errors: [],
                    loading_resend: false
                });
                this.props.setUser(response.data.user);
                this.props.history.push(`/user/verify-phone/${response.data.id}`);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading_resend: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading_resend: false });
                }
            });
    }

    render() {
        const { errors, loading, code, loading_resend } = this.state;

        return (
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                </Box>

                <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }}>
                    <Typography variant="h4" sx={{color: '#fff'}}>Multi-Factor Authentication</Typography>
                    <Typography sx={{ marginBottom: '50px', color: '#fff' }}>Enter a verification code</Typography>

                    <p style={{color: '#fff'}}>
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

                        <Box sx={{display: 'flex'}}>
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
                                disabled={loading_resend}
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

export default connect(null, { setUser, setCreateNewOrg })(VerifyMFA);
