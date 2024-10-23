// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { clearPortalUser, clearPortalToken, openLeftNave, closeLeftNav, clearPWDRotation, unsetSearchQuery, unsetSearchResults, setSelectedProject, setSelectedTask, setAllProjects } from '../../actions';
import axiosInstance from '../../api/api';

const PortalUSerProfileDropdown = ({profilePic, menuItems, username, userTitle}) => {

    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    /*
     * toggle profile-dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const logOut = () => {

        dispatch(clearPortalUser());
        dispatch(clearPWDRotation());
        dispatch(unsetSearchQuery());
        dispatch(unsetSearchResults());
        dispatch(clearPortalToken());
        
        // temprary
        // axiosInstance.get('/api/auth/logout').then(e => {
        //     dispatch(clearPortalUser());
        //     dispatch(clearPWDRotation());
        //     dispatch(unsetSearchQuery());
        //     dispatch(unsetSearchResults());
        // }).catch(err => {
        //     dispatch(clearUser());
        //     dispatch(clearPortalToken());
        //     dispatch(clearPWDRotation());
        //     dispatch(unsetSearchQuery());
        //     dispatch(unsetSearchResults());
        //     deleteStore();
        // });
    }

    const getInitial = () => {
        var name = `${username}`;
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }


    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle nav-user arrow-none me-0 topbar_user_menu">
                <span className="account-user-avatar __the_initials">
                     {getInitial()}
                </span>
                <span>
                    <span className="account-user-name">{username}</span>
                    <span className="account-position">{userTitle}</span>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align={'end'} className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    {/* {menuItems.map((item, i) => {
                        return (
                            <Link to={item.redirectTo} className="dropdown-item notify-item" key={i + '-profile-menu'}>
                                <i className={classNames(item.icon, 'me-1')}></i>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })} */}
                    <a onClick={logOut} className="dropdown-item notify-item chand">
                        <i className={classNames('mdi mdi-logout', 'me-1')}></i>
                        <span>Logout</span>
                    </a>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

 


export default PortalUSerProfileDropdown;
