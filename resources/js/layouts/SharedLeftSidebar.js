// @flow
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import { getSharedMenuItems } from '../helpers/menu';
import AppMenu from './Menu';

// images
import profileImg from '../../images/users/avatar-1.jpg';
import { useSelector } from 'react-redux';
import { AppAuthLogo, AppSmDarkLogo, AppSmLogo, GlobalAppName } from '..';


/* sidebar content */
const SideBarContent = ({ hideUserProfile, user, company, token }) => {
    return (
        <>
            {!hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/">
                        <img src={profileImg} alt="" height="42" className="rounded-circle shadow-sm" />
                        <span className="leftbar-user-name">{`${user.first_name} ${user.last_name}`}</span>
                    </Link>
                </div>
            )}
            <AppMenu menuItems={getSharedMenuItems()} company={company} token={token} />

            <div className="clearfix" />
        </>
    );
};


const SharedLeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile, user, token, company, leftnav }) => {
    const menuNodeRef = useRef(null);

    const { standards } = useSelector((state) => ({
        standards: state.compliance.standards,
        // rotation: state.password.rotation,
    }));

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    return (
        <>
            <div className="leftside-menu" ref={menuNodeRef}>
                {!hideLogo && (
                    <>
                        <Link to="/" className="logo text-center logo-light">
                            <span className="logo-lg">
                                <img src={isLight ? AppAuthLogo : AppAuthLogo} alt={GlobalAppName} height="16" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? AppSmLogo : AppSmDarkLogo} alt={GlobalAppName} height="16" />
                            </span>
                        </Link>

                        <Link to="/" className="logo text-center logo-dark">
                            <span className="logo-lg">
                                <img src={isLight ? AppAuthLogo : AppAuthLogo} alt={GlobalAppName} height="16" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? AppSmLogo : AppSmDarkLogo} alt={GlobalAppName} height="16" />
                            </span>
                        </Link>
                    </>
                )}

                {!isCondensed && (
                    <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                        <SideBarContent
                            menuClickHandler={() => {}}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                            user={user} company={company}
                            standards={standards}
                            leftnav={leftnav}
                            token={token}
                        />
                    </SimpleBar>
                )}
                {isCondensed && <SideBarContent isLight={isLight} user={user} company={company} standards={standards} leftnav={leftnav} token={token} hideUserProfile={hideUserProfile} />}
            </div>
        </>
    );
};

SharedLeftSidebar.defaultProps = {
    hideLogo: false,
    hideUserProfile: false,
    isLight: false,
    isCondensed: false,
};

export default SharedLeftSidebar;
