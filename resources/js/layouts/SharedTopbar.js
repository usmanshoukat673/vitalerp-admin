// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import classNames from 'classnames';
// actions
import { openSubLeftNave, closeSubLeftNav } from '../actions';

// components
import LanguageDropdown from '../components/sub-components/LanguageDropdown';
import NotificationDropdown from '../components/sub-components/NotificationDropdown';
import ProfileDropdown from '../components/sub-components/ProfileDropdown';
import SearchDropdown from '../components/sub-components/SearchDropdown';
import TopbarSearch from '../components/sub-components/TopbarSearch';
import AppsDropdown from '../components/sub-components/AppsDropdown/';

// images
import profilePic from '../../images/users/avatar-1.jpg';
import avatar1 from '../../images/users/avatar-2.jpg';
import avatar2 from '../../images/users/avatar-4.jpg';
import logoSmDark from '../../images/logo_sm_dark.png';
import logoSmLight from '../../images/logo_sm.png';
import logo from '../../images/logo-light.png';

import lockton from '../../images/lockton/lockton.png';
import './SharedTopbar.scss';

//constants
import * as layoutConstants from '../constants/layout';

// get the notifications
const Notifications = [
    {
        day: 'Today',
        messages: [
            {
                id: 1,
                title: 'Datacorp',
                subText: 'Caleb Flakelar commented on Admin',
                time: '1 min ago',
                icon: 'mdi mdi-comment-account-outline',
                variant: 'primary',
                isRead: false,
            },
            {
                id: 2,
                title: 'Admin',
                subText: 'New user registered.',
                time: '1 hours ago',
                icon: 'mdi mdi-account-plus',
                variant: 'info',
                isRead: true,
            },
        ],
    },
    {
        day: 'Yesterday',
        messages: [
            {
                id: 1,
                title: 'Cristina Pride',
                subText: 'Hi, How are you? What about our next meeting',
                time: '1 day ago',
                avatar: avatar1,
                isRead: true,
            },
        ],
    },
    {
        day: '30 Dec 2021',
        messages: [
            {
                id: 1,
                title: 'Datacorp',
                subText: 'Caleb Flakelar commented on Admin',
                icon: 'mdi mdi-comment-account-outline',
                variant: 'primary',
                isRead: true,
            },
            {
                id: 2,
                title: 'Karen Robinson',
                subText: 'Wow ! this admin looks good and awesome design',
                avatar: avatar2,
                isRead: true,
            },
        ],
    },
];


const SharedTopbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark, user, token, company, leftnav, openSubLeftNave }) => {
    const dispatch = useDispatch();

    const [isopen, setIsopen] = useState(false);

    const navbarCssClasses = navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

    return (
        <>
            <div className={classNames('navbar-custom', navbarCssClasses)}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <Link to="/" className="topnav-logo">
                            <span className="topnav-logo-lg">
                                <img src={logo} alt="logo" height="30" />
                            </span>
                            <span className="topnav-logo-sm">
                                <img src={topbarDark ? logoSmLight : logoSmDark} alt="logo" height="30" />
                            </span>
                        </Link>
                    )}
                    

                    <div className='__TopbarSearchPublic'>
                     <img src={lockton} alt="logo"  height="55" />

                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    asset_types: state.compliance.asset_types,
    control_models: state.compliance.control_models
});

export default connect(mapStateToProps, {openSubLeftNave, closeSubLeftNav})(SharedTopbar);
