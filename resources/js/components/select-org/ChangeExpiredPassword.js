import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setUser, setPWDRotation, setCreateNewOrg } from '../../actions';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Box, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import { LoadingButton } from '@mui/lab';
import axiosInstance from '../../api/api';

class ChangeExpiredPassword extends Component {

    state = {
        password: '',
        password_confirmation: '',
        errors: [],
        loading: false,
    }

    componentDidMount() {
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

                this.props.setUser(response.data.user);
                this.props.setPWDRotation(response.data.pwd_rotaion);

                this.props.history.push('/select-organization');

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
        const { rotation } = this.props;
        const { errors, loading, password, password_confirmation } = this.state;

        return (
            <>
                <Box sx={{ display: 'flex', marginTop: '30px' }}>
                    <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px' }}>
                    </Box>

                    <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }}>
                        <Typography variant="h4" sx={{color: '#fff'}}>Your Password is Expired</Typography>
                        <Typography sx={{ marginBottom: '50px', color: '#fff' }}>Your password is already {rotation.days} days old, it is time change your password.</Typography>

                        <form className="" onSubmit={this.handleSubmit}>

                            <Box sx={{ marginBottom: '15px', width: '55%' }}>
                                <TextField type="password" fullWidth label="New Password" variant="outlined"
                                    onChange={this.handleChange}
                                    name="password" value={password}
                                    className={classNames(this.handlerInputError(errors, 'password'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'password')}
                                {password != '' ? <PasswordStrengthBar password={password} /> : ''}
                            </Box>

                            <Box sx={{ marginBottom: '15px', width: '55%' }}>
                                <TextField type="password" fullWidth label="Confirm Password" variant="outlined"
                                    onChange={this.handleChange}
                                    name="password_confirmation" value={password_confirmation}
                                    className={classNames(this.handlerInputError(errors, 'password_confirmation'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'password_confirmation')}


                            </Box>

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

const mapStateToProps = state => ({
    rotation: state.password.rotation,
});

export default connect(mapStateToProps, { setUser, setPWDRotation, setCreateNewOrg })(ChangeExpiredPassword);
