import React, { Component } from 'react';
import ChangePassword from './ChangePassword';
import ProfileSettings from './ProfileSettings';
import { Header, Segment, Image } from 'semantic-ui-react';
import Moment from 'react-moment';
import { MdClose } from "react-icons/md";
import LoginActivities from './LoginActivities';
import PasswordActivities from './PasswordActivities';
import MultiFactorAuthentication from './MultiFactorAuthentication';
import MFAActivities from './MFAActivities';
import UserPasswordRotation from './UserPasswordRotation';
import { connect } from 'react-redux';
import { setUser } from '../../actions';
import APIToken from './APIToken';
import { AppDarkLogo, GlobalAppName } from '../..';

class Profile extends Component {

    state = {
        mfa_setup: false,
        mfa_verify: false
    };

    openMFA = () => {
        const { action } = this.props.match.params;
        if (action === 'mfa' && !this.state.mfa_setup) {
            this.setState({ mfa_setup: true, mfa_verify: false });
        }

        if (action !== 'mfa' && this.state.mfa_setup) {
            this.setState({ mfa_setup: false });
        }

        if (action === 'verify-mfa' && !this.state.mfa_verify) {
            this.setState({ mfa_verify: true, mfa_setup: false });
        }

        if (action !== 'verify-mfa' && this.state.mfa_verify) {
            this.setState({ mfa_verify: false });
        }
    }

    componentDidMount() {
        this.openMFA();
    }

    componentDidUpdate(prevProps) {
        this.openMFA();
    };

    closeUsersSetting = () => {
        // TODO: if company has not selected redirect to org
        // this.props.history.push('/dashboard');
        this.props.history.goBack();
    }

    closeMFA = () => {
        this.setState({ mfa_setup: false, mfa_verify: false });
        this.props.history.push('/settings/user');
    }

    showVerify = id => {
        this.setState({ mfa_setup: false, mfa_verify: true });
        this.props.history.push(`/settings/user/verify-mfa/${id}`);
    }

    onPwdRotationChanged = user => {
        this.props.setUser(user);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { token, user } = this.props;
        const { mfa_setup, mfa_verify } = this.state;

        return (
            <React.Fragment>
                <div className="page__header__user">
                    <div>
                        <div className="heading-user">
                            <Image style={{ display: 'inline', height: '40px' }} src='/images/logo/logo.png' />  <span style={{ marginLeft: '10px' }}> Account Settings</span>
                        </div>
                    </div>
                    <div>
                        <MdClose className="close__settings" onClick={this.closeUsersSetting} />
                    </div>
                </div>

                <div className="myprofile__row">

                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <ProfileSettings token={token} user={user} />
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <ChangePassword token={token}></ChangePassword>
                        </div>
                    </div>
                    {/* <div className="row justify-content-md-center" style={{ marginBottom: '0' }}>
                        <div className="col-md-6">
                            <MultiFactorAuthentication user={user} token={token} mfa_setup={mfa_setup} mfa_verify={mfa_verify} closeMFA={this.closeMFA} showVerify={this.showVerify} />
                        </div>
                    </div> */}

                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <LoginActivities token={token} />
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <PasswordActivities token={token} />
                        </div>
                    </div>

                    {/* <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <MFAActivities token={token} />
                        </div>
                    </div> */}

                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, { setUser })(Profile);
