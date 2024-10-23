import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../TopBar/SearchBar';
import { withRouter } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { clearUser, clearToken, openLeftNave, closeLeftNav, clearPWDRotation, unsetSearchQuery, unsetSearchResults } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AiOutlineLogout } from "react-icons/ai";
import { TiArrowBackOutline } from "react-icons/ti";
import { Divider } from 'semantic-ui-react';
import './MainHeader.scss';
import { AppAuthLogo, GlobalAppName } from '../../..';
import axiosInstance from '../../../api/api';

class MainHeader extends Component {

    state = {
        anchorEl: '',
    }

    logOut = () => {
        this.setState({ anchorEl: '' });
        axiosInstance.get('/api/auth/logout').then(e => {
            this.props.clearUser();
            this.props.clearToken();
            this.props.clearPWDRotation();
            this.props.unsetSearchQuery();
            this.props.unsetSearchResults();
            deleteStore();
        }).catch(err => {
            this.props.clearUser();
            this.props.clearToken();
            this.props.clearPWDRotation();
            this.props.unsetSearchQuery();
            this.props.unsetSearchResults();
            deleteStore();
        });
    }

    displayRole = role => {
        if (role === 'A') {
            return 'Organization Admin'
        }
        else if (role === 'N') {
            return 'Organization Member'
        }
        else {
            return 'Member';
        }
    }

    navigateTo = event => {
        this.setState({ anchorEl: '' });
        this.props.history.push(event.target.id);
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: '' });
    };

    handleAllSettingsClick = () => {
        const { company } = this.props;
        this.setState({ anchorEl: '' });
        this.props.history.push(`/${company.slug}/settings/basic`);
    }

    handleAllActivitiesClick = () => {
        const { company } = this.props;
        this.setState({ anchorEl: '' });
        this.props.history.push(`/${company.slug}/activities`);
    }

    handleAccountSetup = () => {
        const { company } = this.props;
        this.setState({ anchorEl: '' });
        this.props.history.push(`/${company.slug}/onboarding/confirm-organization`);
    }

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    render() {

        const { company, user, standards, leftnav, token, rotation } = this.props;

        const { anchorEl } = this.state;

        const notyClass = (rotation && rotation.pwd_warning === 1 && !rotation.close ? 'mainheader pwd_noty_one' : 'mainheader');

        return (
            <React.Fragment>
                <div className={notyClass}>
                    {/* <div className="mainheader__left__section">
                        <img src={AppAuthLogo} alt={GlobalAppName} />
                    </div> */}

                    <div className="mainheader__mid__section">
                        <SearchBar company={company} token={token} user={user} standards={standards} leftnav={leftnav} />
                    </div>

                    <div className="mainheader__mid__right">

                        <div onClick={this.handleClick} className="user__settings__group">
                            <div aria-controls="user-menu" aria-haspopup="true" className="__gearicon" >

                                {this.getInitial(user.first_name + ' ' + user.last_name)}

                            </div>

                            <div className="__userinfo">
                                <div className="__username">{`${user.first_name} ${user.last_name}`}</div>
                                <div className="__companyname">{company.name}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <div className="userInfo">
                        <h4>{company.name}</h4>
                        <p>{user.email}</p>
                        <p>{this.displayRole(company.role)}</p>
                    </div>

                    <Divider style={{ marginTop: '0px' }} />

                    <MenuItem id="/settings/user" onClick={this.navigateTo} >
                        <FaRegUserCircle /> &nbsp;&nbsp; User Settings
                    </MenuItem>

                    {/**

                        <Divider />

                    <MenuItem onClick={this.handleAllSettingsClick} >
                        <SettingsOutlinedIcon /> &nbsp;&nbsp; All Settings
                    </MenuItem>



                    <Divider />

                    <MenuItem onClick={this.handleAllActivitiesClick} >
                        <FiActivity /> &nbsp;&nbsp; All Activities
                    </MenuItem>
                    */}

                    <Divider />



                    <MenuItem id="/select-organization" onClick={this.navigateTo} className="chanageCompanyMenu" >
                        <TiArrowBackOutline /> &nbsp;&nbsp; Change Organization
                    </MenuItem>

                    <Divider />
                    <MenuItem onClick={this.logOut}><AiOutlineLogout /> &nbsp;&nbsp; Logout</MenuItem>
                </Menu>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    standards: state.compliance.standards,
    rotation: state.password.rotation,
});

export default withRouter(connect(mapStateToProps, { clearUser, clearToken, closeLeftNav, openLeftNave, clearPWDRotation, unsetSearchQuery, unsetSearchResults })(MainHeader));
