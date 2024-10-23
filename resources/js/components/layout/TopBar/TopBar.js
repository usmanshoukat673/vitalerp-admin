import React, { Component } from 'react';
import './TopBar.scss';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { clearUser, clearToken, openLeftNave, closeLeftNav, clearPWDRotation, unsetSearchQuery, unsetSearchResults, setCompanyLocations, setCartItems, resetCartSummary } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import { connect } from 'react-redux';
import { MdMenu, MdAccountBalance } from "react-icons/md";

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { AiOutlineLogout } from "react-icons/ai";
import { TiArrowBackOutline } from "react-icons/ti";
import { IoIosArrowDown, IoIosApps } from "react-icons/io";
import { BsGear } from "react-icons/bs";
import { MdNotificationsActive, MdNotifications } from "react-icons/md";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { Divider, Icon, Button as SemButton } from 'semantic-ui-react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SettingsShortcut from './SettingsShortcut';
import SearchBar from './SearchBar';
import axiosInstance from '../../../api/api';

class TobBar extends Component {

    state = {
        anchorEl: '',
        anchorGearEl: '',
        open_settings: false
    }

    logOut = () => {
        this.setState({ anchorEl: '', anchorGearEl: '' });
        axiosInstance.get('/api/auth/logout').then(e => {
            this.props.clearUser();
            this.props.clearToken();
            this.props.clearPWDRotation();
            this.props.unsetSearchQuery();
            this.props.unsetSearchResults();
            this.props.setCompanyLocations([]);
            this.props.setCartItems([]);
            this.props.resetCartSummary();
            deleteStore();
        }).catch(err => {
            this.props.clearUser();
            this.props.clearToken();
            this.props.clearPWDRotation();
            this.props.unsetSearchQuery();
            this.props.unsetSearchResults();
            this.props.setCompanyLocations([]);
            this.props.setCartItems([]);
            this.props.resetCartSummary();
            deleteStore();
        });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: '' });
    };

    handleGearClick = event => {
        this.setState({ anchorGearEl: event.currentTarget });
    };

    handleGearClose = () => {
        this.setState({ anchorGearEl: '' });
    };

    navigateGearTo = event => {
        this.setState({ anchorGearEl: '' });
        // this.props.history.push(event.target.id);
    }

    navigateTo = event => {
        this.setState({ anchorEl: '' });
        this.props.history.push(event.target.id);
    }

    handleLeftNav = () => {
        if (this.props.leftnav.open) {
            this.props.closeLeftNav();
        }
        else {
            this.props.openLeftNave();
        }
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

    handleSettingClick = () => {
        const { company } = this.props;
        this.props.history.push(`/${company.slug}/settings/basic`);
    }

    handlerSettingsClick = () => {
        this.setState({ open_settings: true });
    }

    handleSettingsClose = status => {
        this.setState({ open_settings: status });
    }

    render() {

        const { anchorEl, anchorGearEl, open_settings } = this.state;
        const { user, company, token, standards, leftnav } = this.props;

        return (
            <div className="top__bar">

                <div style={{ display: 'flex' }}>
                    <MdMenu onClick={this.handleLeftNav} className="left__nav_toggle" /> <h4 className="activeOrg">{company.name}</h4>

                    <SearchBar company={company} token={token} user={user} standards={standards} leftnav={leftnav} />

                </div>


                <div>

                    <SettingsShortcut open={open_settings} onDrawerClose={this.handleSettingsClose} company={company} token={token} />

                    <NavLink to={`/${company.slug}/assets`}>
                        <SemButton size='small' secondary>
                            <IoIosApps style={{ fontSize: '20px' }} /> Assets
                        </SemButton>
                    </NavLink>

                    <IconButton style={{ padding: '8px' }} onClick={this.handlerSettingsClick}>
                        <BsGear className="settings__icon" />
                    </IconButton>

                    <IconButton style={{ padding: '8px' }} color="primary" aria-controls="noti-menu" aria-haspopup="false" onClick={this.handleGearClick}>
                        <Badge badgeContent={5} color="secondary">
                            <MdNotificationsActive className="user__icon" />
                        </Badge>
                    </IconButton>

                    <Menu
                        id="noti-menu"
                        anchorEl={anchorGearEl}
                        keepMounted
                        open={Boolean(anchorGearEl)}
                        onClose={this.handleGearClose}
                    >

                        <MenuItem id="/settings/user" style={{ width: '240px' }} onClick={this.navigateGearTo} >
                            Notification 1
                        </MenuItem>

                        <Divider style={{ margin: '0px' }} />

                        <MenuItem id="/settings/user" onClick={this.navigateGearTo} >
                            Notification 2
                        </MenuItem>

                        <Divider style={{ margin: '0px' }} />

                        <MenuItem id="/settings/user" onClick={this.navigateGearTo} >
                            Notification 3
                        </MenuItem>

                        <Divider style={{ margin: '0px' }} />

                        <MenuItem id="/settings/user" onClick={this.navigateGearTo} >
                            Notification 4
                        </MenuItem>

                        <Divider style={{ margin: '0px' }} />

                        <MenuItem id="/settings/user" onClick={this.navigateGearTo} >
                            Notification 5
                        </MenuItem>
                    </Menu>

                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                        <FaUserCircle className="user__icon" /> {user.first_name} <IoIosArrowDown className="user__drop_down" />
                    </Button>
                    <Menu
                        id="simple-menu"
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

                        <Divider />

                        <MenuItem id="/settings/user" onClick={this.navigateTo} >
                            <FaRegUserCircle /> &nbsp;&nbsp; My Account Settings
                        </MenuItem>

                        <MenuItem id="/select-organization" onClick={this.navigateTo} className="chanageCompanyMenu" >
                            <TiArrowBackOutline /> &nbsp;&nbsp; Change Organization
                        </MenuItem>
                        <MenuItem onClick={this.logOut}><AiOutlineLogout /> &nbsp;&nbsp; Logout</MenuItem>
                    </Menu>

                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    standards: state.compliance.standards,
});

export default withRouter(connect(mapStateToProps, { clearUser, clearToken, closeLeftNav, openLeftNave, clearPWDRotation, unsetSearchQuery, unsetSearchResults, setCompanyLocations, setCartItems, resetCartSummary })(TobBar));
