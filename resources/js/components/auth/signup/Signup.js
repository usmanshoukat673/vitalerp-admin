import React, { Component } from 'react';
import { deleteStore } from '../../../store/localStorage';
import { connect } from 'react-redux';
import Axios from 'axios';
import { setUser, clearUser, setToken, clearToken, setCompanies, clearPWDRotation } from '../../../actions';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash.isempty';
import AuthHeader from '../AuthHeader';
import { Box } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import classNames from 'classnames';

class Signup extends Component {

    state = {
        company_name: '',
        first_name: '',
        last_name: '',
        email: '',
        errors: [],
        loading: false
    };

    componentDidMount() {
        if (!isEmpty(this.props.user)) {
            this.props.history.push(`/${this.props.company.slug}/compliance-stack`); // it was /dashboard 
        }
        else {
            deleteStore();
            this.props.clearUser();
            this.props.clearPWDRotation();
            this.props.clearToken();
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

    displayInputCustomError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage_custom">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        Axios.post('/api/auth/signup', this.state)
            .then(response => {

                let email = this.state.email;

                this.setState({
                    loading: false,
                    company_name: '',
                    first_name: '',
                    last_name: '',
                    email: ''
                });
                this.props.history.push(`/signup/success/${email}`);
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

        const { errors, loading, first_name, last_name, company_name, email } = this.state;

        return (
            <>
                <AuthHeader signup={true} />

                <Box sx={{ display: 'flex', marginTop: '30px' }}>
                    <Box sx={{ flex: '0.5', marginRight: '50px', marginTop: '50px', fontSize: '19px', textAlign: 'center' }}>
                        <Typography variant="h1" gutterBottom sx={{ color: '#fff' }}>
                            Say goodbye to manual GRC tasks and hello to automation.
                        </Typography>
                    </Box>

                    <Box sx={{ flex: '0.5', padding: '20px', borderRadius: '6px', mt: '50px' }} className="_auth__right">
                        <Typography variant="h4">Create Account</Typography>
                        <Typography sx={{ marginBottom: '50px' }}>Please enter your account details to begin.</Typography>


                        <form className="" onSubmit={this.handleSubmit}>

                            <Box sx={{ display: 'flex', justifyItems: 'center' }}>
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

                                <TextField fullWidth label="Company Name" variant="outlined"
                                    onChange={this.handleChange}
                                    name="company_name" value={company_name}
                                    className={classNames(this.handlerInputError(errors, 'company_name'), 'build__input')}
                                />
                                {this.displayInputError(errors, 'company_name')}
                            </Box>

                            <Box sx={{ marginBottom: '15px' }}>

                                <TextField fullWidth label="E-mail address" variant="outlined"
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
                                Create account
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
export default connect(mapStateToProps, { setUser, clearUser, setToken, clearToken, setCompanies, clearPWDRotation })(Signup);
