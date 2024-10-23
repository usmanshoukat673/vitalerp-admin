// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, clearToken, openLeftNave, closeLeftNav, clearPWDRotation, unsetSearchQuery, unsetSearchResults, setSelectedProject, setSelectedTask, setAllProjects } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import axiosInstance from '../../api/api';
import getInitial from '../../utils/getInitial';
import { getModuleAccess } from '../../helpers/getModuleAccess';

const ProfileDropdown = ({ profilePic, menuItems, username, plan }) => {

    const dispatch = useDispatch();

    const { company, supplier, companies } = useSelector((state) => ({
        company: state.orgs.company,
        supplier: state.supplier.supplier,
        companies: state.orgs.companies,
    }));

    const [dropdownOpen, setDropdownOpen] = useState(false);

    /*
     * toggle profile-dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const logOut = () => {
        axiosInstance.get('/api/auth/logout').then(e => {
            dispatch(clearUser());
            dispatch(clearToken());
            dispatch(clearPWDRotation());
            dispatch(unsetSearchQuery());
            dispatch(unsetSearchResults());
            dispatch(setSelectedProject({}));
            dispatch(setAllProjects([]));
            dispatch(setSelectedTask({}));
            deleteStore();
        }).catch(err => {
            dispatch(clearUser());
            dispatch(clearToken());
            dispatch(clearPWDRotation());
            dispatch(unsetSearchQuery());
            dispatch(unsetSearchResults());
            deleteStore();
        });
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
                    {getInitial(username)}
                </span>
                <span>
                    <span className="account-user-name">{username}</span>
                    <span className="account-position">{_.size(company?.roles) > 0 ? 'CORPORATE' : _.size(supplier.roles) > 0 ? supplier.name : ''}</span>
                    <span className="account-position">{`${company.name}`}</span>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align={'end'} className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    {
                        getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], _.size(supplier?.roles) > 0 ? supplier.roles : [], [12]) && <Link to={`/${company.slug}/organization-settings/general`} className="dropdown-item notify-item">
                            <i className={classNames('uil uil-suitcase-alt', 'me-1')}></i>
                            <span>{`Company Settings`}</span>
                        </Link>
                    }
                    {
                        getModuleAccess(_.size(company?.roles) > 0 ? company.roles : [], _.size(supplier?.roles) > 0 ? supplier.roles : [], [1]) && <Link to={`/${supplier.slug}/supplier-settings/general`} className="dropdown-item notify-item">
                            <i className={classNames('uil uil-suitcase-alt', 'me-1')}></i>
                            <span>{`Supplier Settings`}</span>
                        </Link>
                    }

                    <Link to={`/settings/user`} className="dropdown-item notify-item">
                        <i className={classNames('mdi mdi-account-edit', 'me-1')}></i>
                        <span>{`Account Settings`}</span>
                    </Link>

                    {
                        _.size(companies) > 1 && <>
                            <Dropdown.Divider />
                            <Link to={`/select-organization`} className="dropdown-item notify-item">
                                <i className={classNames('uil uil-suitcase-alt', 'me-1')}></i>
                                <span>{`Change Organization`}</span>
                            </Link>
                        </>
                    }

                    {/* {menuItems.map((item, i) => {
                        return (
                            <Link to={item.redirectTo} className="dropdown-item notify-item" key={i + '-profile-menu'}>
                                <i className={classNames(item.icon, 'me-1')}></i>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })} */}
                    <Dropdown.Divider />
                    <a onClick={logOut} className="dropdown-item notify-item chand">
                        <i className={classNames('mdi mdi-logout', 'me-1')}></i>
                        <span>Logout</span>
                    </a>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};




export default ProfileDropdown;
