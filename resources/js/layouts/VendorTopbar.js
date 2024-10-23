// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Button from '@mui/material/Button';

// components
// import LanguageDropdown from '../components/sub-components/LanguageDropdown';
import NotificationDropdown from '../components/sub-components/NotificationDropdown';
import PortalUSerProfileDropdown from '../components/sub-components/PortalUSerProfileDropdown';
// import SearchDropdown from '../components/sub-components/SearchDropdown';
import VendorTopbarSearch from '../components/sub-components/VendorTopbarSearch';

// images
import profilePic from '../../images/users/avatar-1.jpg';
// import avatar1 from '../../images/users/avatar-2.jpg';
// import avatar2 from '../../images/users/avatar-4.jpg';
import logoSmDark from '../../images/logo_sm_dark.png';
import logoSmLight from '../../images/logo_sm.png';
import logo from '../../images/logo-light.png';

// import lockton from '../../images/lockton/lockton.png';
import './VendorTopbar.scss';

//constants
import * as layoutConstants from '../constants/layout';
import { withRouter } from 'react-router-dom';
import VisitConsole from './VisitConsole';

// get the notifications
const Notifications = [
    // {
    //     day: 'Today',
    //     messages: [
    //         {
    //             id: 1,
    //             title: 'Datacorp',
    //             subText: 'Caleb Flakelar commented on Admin',
    //             time: '1 min ago',
    //             icon: 'mdi mdi-comment-account-outline',
    //             variant: 'primary',
    //             isRead: false,
    //         },
    //         {
    //             id: 2,
    //             title: 'Admin',
    //             subText: 'New user registered.',
    //             time: '1 hours ago',
    //             icon: 'mdi mdi-account-plus',
    //             variant: 'info',
    //             isRead: true,
    //         },
    //     ],
    // },
    // {
    //     day: 'Yesterday',
    //     messages: [
    //         {
    //             id: 1,
    //             title: 'Cristina Pride',
    //             subText: 'Hi, How are you? What about our next meeting',
    //             time: '1 day ago',
    //             avatar: avatar1,
    //             isRead: true,
    //         },
    //     ],
    // },
    // {
    //     day: '30 Dec 2021',
    //     messages: [
    //         {
    //             id: 1,
    //             title: 'Datacorp',
    //             subText: 'Caleb Flakelar commented on Admin',
    //             icon: 'mdi mdi-comment-account-outline',
    //             variant: 'primary',
    //             isRead: true,
    //         },
    //         {
    //             id: 2,
    //             title: 'Karen Robinson',
    //             subText: 'Wow ! this admin looks good and awesome design',
    //             avatar: avatar2,
    //             isRead: true,
    //         },
    //     ],
    // },
];


const VendorTopbar = ({ hideLogo, navCssClasses, topbarDark, history }) => {

    const [isopen, setIsopen] = useState(false);

    const navbarCssClasses = navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';


    const ProfileMenus = [
        // {
        //     label: 'Organization Settings',
        //     icon: 'uil uil-suitcase-alt',
        //     redirectTo: `/${company.slug}/organization-settings/general`,
        // },

    ];

    const { portal_user, shared_company, portalToken } = useSelector(state => ({
        portal_user: state.user.portalUser,
        shared_company: state.policyportal.shared_company,
        portalToken: state.token.portalToken,
    }));

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

                    <ul className="list-unstyled topbar-menu float-end mb-0">

                        <li className="dropdown notification-list">
                            <NotificationDropdown notifications={Notifications} />
                        </li>

                        <VisitConsole />
                        
                        <li className="dropdown notification-list">
                            <PortalUSerProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={portal_user.first_name === '[Not Set]' ? `${portal_user.email}` : `${portal_user.first_name} ${portal_user.last_name}`}
                                userTitle={shared_company.name}
                                portalToken={portalToken}
                            />
                        </li>

                    </ul>


                    <VendorTopbarSearch shared_company={shared_company} />

                </div>
            </div>
        </>
    );
};

export default withRouter(VendorTopbar);
