import React, { Component } from 'react';
import _ from 'lodash';
import { IoMdSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import BillingMenu from '../billing/BillingMenu';

class SubLeftNav extends Component {

    render() {

        const { company } = this.props;

        return (
            <div className="sub__left__menu">
                <div className="sub__settings_box">
                    <div className="heading"><IoMdSettings /> {company.name}</div>
                    {/* <NavLink activeClassName="active" to={`/dashboard`} >Home</NavLink> */}
                    <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/general`} >Company Settings</NavLink>
                    <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/locations`} >Secondary Locations</NavLink>
                    <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/suppliers`} >Suppliers</NavLink>
                    {/* {company.role === 'A' ? <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/security`} >Security Settings</NavLink> : ''} */}
                    {/**{company.role === 'A' ? <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/ticket-system`} >Ticket System</NavLink> : ''} */}
                    {/* {company.role === 'A' ? <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/user-accounts`}>User Accounts</NavLink> : ''} */}
                    {/* <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/team-management`}>Teams</NavLink> */}
                    {/* <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/device-logins`}>Device Logins</NavLink> */}
                    {/* <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/user-sections`}>Assign Roles</NavLink> */}
                    {/* <Divider /> */}
                    {/* <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/billing`} >Billing</NavLink> */}
                    {/* <Divider /> */}
                    <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/activities`} >Activities</NavLink>
                    {/* <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/whistleblower`} >Whistleblower</NavLink> */}

                    <Divider />
                    {/* <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/subscriptions`} >Subscriptions</NavLink>
                    <BillingMenu /> */}
                </div>
                {/**
             <div className="sub__settings_box second">
                    <div className="heading"><FaUserCircle /> User Preferences</div>
                    <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/preferences`}>Preferences</NavLink>
                    <NavLink activeClassName="active" to={`/${company.slug}/organization-settings/notifications`}>Notifications Settings</NavLink>

                </div> */}
            </div>
        );
    }
}

export default SubLeftNav;
