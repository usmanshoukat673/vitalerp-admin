// @flow
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Button from '@mui/material/Button';
// actions
import { changeSidebarType, hideRightSidebar, showRightSidebar, setProjectRightView, setPortalUser, setPortalToken, setSharedStandards, setSharedCompany, changePageAreaState } from '../actions';

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


//constants
import * as layoutConstants from '../constants/layout';
import CartDropdown from '../components/sub-components/CartDropdown';
import axiosInstance from '../api/api';
import { AppAuthLogo, GlobalAppName } from '..';

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

// get the profilemenu

// type TopbarProps = {
//     hideLogo?: boolean,
//     navCssClasses?: string,
//     openLeftMenuCallBack?: () => void,
//     topbarDark?: boolean,
// };

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark, user, token, match, history }) => {

    const { layoutType, leftSideBarType, showRightSidebarState, policy_portal, company, supplier } = useSelector(state => ({
        layoutType: state.leftnav.layoutType,
        leftSideBarType: state.leftnav.leftSideBarType,
        showRightSidebarState: state.leftnav.showRightSidebar,
        policy_portal: state.orgs.policy_portal,
        company: state.orgs.company,
        supplier: state.supplier.supplier
    }));

    const dispatch = useDispatch();

    const [isopen, setIsopen] = useState(false);
    const [showRHDExpandButton, setShowRHDExpandButton] = useState(true);

    const navbarCssClasses = navCssClasses || '';
    const containerCssClasses = !hideLogo ? 'container-fluid' : '';

    useEffect(() => {
        if (match.url == `/${company.slug}/compliance-stack`) // it was /dashboard but for now we are moving it to CS 
        {
            dispatch(hideRightSidebar());
            setShowRHDExpandButton(false);
        }
        else if (match.url == '/store/standards' || match.url == '/store/toolkits' || match.url == '/store/saas-applications') {
            setShowRHDExpandButton(false);
        }
        else {
            setShowRHDExpandButton(true);
        }
    }, []);

    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen((prevState) => !prevState);
        if (openLeftMenuCallBack) openLeftMenuCallBack();

        switch (layoutType) {
            case layoutConstants.LAYOUT_VERTICAL:
                // condition added
                if (window.innerWidth >= 768) {
                    if (leftSideBarType === 'fixed' || leftSideBarType === 'scrollable')
                        dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED));
                    if (leftSideBarType === 'condensed')
                        dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
                }
                break;

            case layoutConstants.LAYOUT_FULL:
                if (document.body) {
                    document.body.classList.toggle('hide-menu');
                }
                break;
            default:
                break;
        }

        dispatch(changePageAreaState(leftSideBarType === 'condensed' ? 'non-focused' : "focused"));
    };

    const ProfileMenus = [
        {
            label: 'Organization Settings',
            icon: 'uil uil-suitcase-alt',
            redirectTo: `/${company.slug}/organization-settings/general`,
        },
        {
            label: 'Supplier Settings',
            icon: 'uil uil-suitcase-alt',
            redirectTo: `/${company.slug}/supplier-settings/basic`,
        },
        {
            label: 'Account Settings',
            icon: 'mdi mdi-account-edit',
            redirectTo: '/settings/user',
        },
        {
            label: 'Change Organization',
            icon: 'mdi mdi-lifebuoy',
            redirectTo: '/select-organization',
        },
        // {
        //     label: 'Lock Screen',
        //     icon: 'mdi mdi-lock-outline',
        //     redirectTo: '/account/lock-screen',
        // },
        // {
        //     label: 'Logout',
        //     icon: 'mdi mdi-logout',
        //     redirectTo: '/account/logout',
        // },
    ];

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
        dispatch(setProjectRightView('task'));
    };

    const [switching, setSwithing] = useState(false);

    const visitPolicyPanel = () => {
        setSwithing(true);
        axiosInstance.get(`/api/user/compliance/policy-portal/switch-to-portal`).then(e => {
            dispatch(setPortalUser(user));
            dispatch(setPortalToken(token));
            dispatch(setSharedStandards(e.data.shared_standards));
            dispatch(setSharedCompany(e.data.shared_company));
            history.push(`/policy-panels/${policy_portal.link}/introduction`);
        }).catch(err => { });
        setSwithing(false);
    }

    return (
        <>
            <div className={classNames('navbar-custom', navbarCssClasses)}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <span className="topnav-logo">
                            <span className="topnav-logo-lg">
                                <img src={AppAuthLogo} alt={GlobalAppName} height="35" />
                                <span className='app_name'>vitalERP</span>
                                <span className='app_mode'>{_.size(company?.roles) > 0 ? 'MANAGE' : _.size(supplier.roles) > 0 ? '- SUPPLIER' : ''}</span>
                            </span>
                            {/* <span className="topnav-logo-sm">
                                <img src={topbarDark ? logoSmLight : logoSmDark} alt="logo" height="30" />
                            </span> */}
                        </span>
                    )}

                    <ul className="list-unstyled topbar-menu float-end mb-0">
                        {/* <li className="notification-list topbar-dropdown d-xl-none">
                            <SearchDropdown />
                        </li> */}
                        {/* <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
                            <LanguageDropdown />
                        </li> */}
                        {/* Hide shopping cart icon - 28May2024 */}
                        {/* <li className="dropdown notification-list">
                            <CartDropdown notifications={Notifications} />
                        </li> */}
                        {/* <li className="dropdown notification-list">
                            <NotificationDropdown notifications={Notifications} />
                        </li> */}
                        {/* <li className="dropdown notification-list d-none d-sm-inline-block">
                            <AppsDropdown />
                        </li> */}
                        {/* <li className="notification-list">
                            <Button disabled={switching} className='mui-button' variant="outlined" onClick={visitPolicyPanel}>Policy Panels</Button>
                        </li> */}
                        <li className="dropdown notification-list">
                            <ProfileDropdown
                                profilePic={profilePic}
                                menuItems={ProfileMenus}
                                username={`${user.first_name} ${user.last_name}`}
                                plan={company.plan}
                                token={token}
                            />
                        </li>

                        {
                            // (!showRightSidebarState && showRHDExpandButton) && <li className="notification-list">
                            //     <button
                            //         className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                            //         onClick={handleRightSideBar}>
                            //         <i className="dripicons-chevron-left noti-icon"></i>
                            //     </button>
                            // </li>
                        }

                    </ul>

                    {/* toggle for vertical layout */}
                    <button className="button-menu-mobile open-left" onClick={handleLeftMenuCallBack}>
                        <i className="mdi mdi-menu" />
                    </button>

                </div>
            </div >
        </>
    );
};

export default withRouter(Topbar);
