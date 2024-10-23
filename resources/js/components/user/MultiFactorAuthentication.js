import React, { Component } from 'react';
import { Segment, Form, Header, Button, Message, Icon, Modal } from 'semantic-ui-react';
import { MdSecurity } from "react-icons/md";
import { MdError } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import './MultiFactorAuthentication.scss';
import { Link } from 'react-router-dom';
import MFAPhoneRequest from './Modals/MFAPhoneRequest';
import MFAVerify from './Modals/MFAVerify';
import { connect } from 'react-redux';
import { setUser } from '../../actions';
import _ from 'lodash';
import axiosInstance from '../../api/api';

class MultiFactorAuthentication extends Component {

    state = {
        country_code: '',
        phone: '',
        errors: [],
        loading: false,
        mfa_disable_promt: false
    }

    componentWillReceiveProps() {
        const { user } = this.props;
        this.setState({ country_code: (!_.isEmpty(user.country_code) ? user.country_code : ''), phone: (!_.isEmpty(user.phone) ? user.phone : '') });
    }

    handleChange = event => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ [event.target.name]: event.target.value });
        }
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

    close = () => {
        this.props.closeMFA();
    };

    showVerify = id => {
        this.props.showVerify(id);
    }

    handleMFADisbaledClose = () => this.setState({ mfa_disable_promt: false });

    handleMFADisbaledOpen = () => this.setState({ mfa_disable_promt: true });

    // send email notification
    disabpleMFA = () => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        axiosInstance.post('/api/user/disable-mfa', this.state)
            .then(response => {

                this.setState({
                    errors: [],
                    loading: false,
                    mfa_disable_promt: false
                });

                this.props.setUser(response.data.user);

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

    mfaStatus = mfa_enabled => {

        const { mfa_disable_promt, loading } = this.state;

        return mfa_enabled ? (

            <React.Fragment><Message floating>
                <TiTick style={{ fontSize: '16px', marginTop: '-3px', color: '#05c605' }} />
                On</Message>
                <Modal trigger={<Button inverted color='red' onClick={this.handleMFADisbaledOpen}>Disable ?</Button>} basic size='small' className="mfa__modal" open={mfa_disable_promt}>
                    <Header icon='shield' content='Disable Multi Factor Authentication?' />
                    <Modal.Content>
                        <p>
                            Do you really want to disable Multi Factor Authentication?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={this.handleMFADisbaledClose}>
                            <Icon name='remove' /> No
                        </Button>
                        <Button color='green' inverted onClick={this.disabpleMFA} disabled={loading} className={loading ? 'loading' : ''}>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment >
        ) : (
            <Link to="/settings/user/mfa">
                <Message className="mfa_off_box" floating>
                    <div><MdError /> Off</div>
                    <div>Set up  <Icon name='angle right' size='large' /></div>
                </Message >
            </Link>
        );
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { errors, loading, country_code, phone } = this.state;
        const { user, token, mfa_setup, mfa_verify } = this.props;

        return (
            <React.Fragment>

                <Segment>
                    <Header size='medium'><MdSecurity className="change_pwd_key_icon" /> Multi Factor Authentication </Header>
                    {this.mfaStatus(user.mfa_enabled)}
                </Segment>

                <div>
                    <MFAPhoneRequest mfa_setup={mfa_setup} user={user} token={token} close={this.close} showVerify={this.showVerify} />
                    <MFAVerify mfa_verify={mfa_verify} user={user} token={token} close={this.close} />
                </div>

            </React.Fragment>
        );
    }
}

export default connect(null, { setUser })(MultiFactorAuthentication);
