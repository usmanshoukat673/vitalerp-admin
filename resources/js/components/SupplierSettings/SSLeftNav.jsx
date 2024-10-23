import React, { Component } from 'react';
import _ from 'lodash';
import { IoMdSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';

class SSLeftNav extends Component {

    render() {

        const { supplier } = this.props;

        return (
            <div className="sub__left__menu">
                <div className="sub__settings_box">
                    <div className="heading"><IoMdSettings /> {supplier.name}</div>
                     
                    <NavLink activeClassName="active" to={`/${supplier.slug}/supplier-settings/general`} >Supplier</NavLink>
                    <NavLink activeClassName="active" to={`/${supplier.slug}/supplier-settings/locations`} >Secondary Locations</NavLink>
                    <NavLink activeClassName="active" to={`/${supplier.slug}/supplier-settings/users`} >Users</NavLink>

                </div>
               
            </div>
        );
    }
}

export default SSLeftNav;
