// @flow
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import { getMenuItems } from '../helpers/menu';

// components
import AppMenu from './Menu';


// images
import profileImg from '../../images/users/avatar-1.jpg';
import { useSelector } from 'react-redux';
import { AppAuthLogo, AppSmDarkLogo, AppSmLogo, GlobalAppName } from '..';
import classNames from 'classnames';

// type SideBarContentProps = {
//     hideUserProfile: boolean,
// };

/* sidebar content */
const SideBarContent = ({ hideUserProfile, user, company, standards, leftnav, token, supplier, suppliers_count, active_supplier }) => {
    return (
        <>
            {!hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/settings/user">
                        <img src={profileImg} alt="" height="42" className="rounded-circle shadow-sm" />
                        <span className="leftbar-user-name">{`${user.first_name} ${user.last_name}`}</span>
                    </Link>
                </div>
            )}

            <AppMenu menuItems={getMenuItems(company, supplier, suppliers_count, active_supplier, standards, leftnav)} company={company} token={token} />


            {/* <div className="leftbar-my-account-bottom">
                <Link to="/settings/user">
                    <span className="leftbar-my-account-bottom-name">
                        {
                            leftnav.leftSideBarType == 'fixed' ? 'My Account' : 'MA'
                        }
                    </span>
                </Link>
            </div> */}

            <div className="clearfix" />
        </>
    );
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile, user, token, company, leftnav }) => {
    const menuNodeRef = useRef(null);

    const { standards, supplier, suppliers_count, active_supplier } = useSelector((state) => ({
        standards: state.compliance.standards,
        supplier: state.supplier.supplier,
        suppliers_count: state.orgs.suppliers_count,
        active_supplier: state.corporate.active_supplier
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
            <div className={classNames('leftside-menu', hideLogo ? 'logo-hidden' : 'logo-visible' )} ref={menuNodeRef}>
                {!hideLogo && (
                    <>
                        <Link to="/" className="logo text-center logo-light">
                            {
                                leftnav.leftSideBarType == 'fixed' ? <div className="logo-lg">
                                    <img src={isLight ? AppAuthLogo : AppAuthLogo} alt={GlobalAppName} height="32" />
                                    <span className='app_name'>vitalERP</span>
                                </div> : <span className="logo-sm">
                                    <img src={isLight ? AppSmLogo : AppSmDarkLogo} alt={GlobalAppName} height="32" />
                                </span>
                            }
                        </Link>

                        <Link to="/" className="logo text-center logo-dark">
                            <div className="logo-lg">
                                <img src={isLight ? AppAuthLogo : AppAuthLogo} alt={GlobalAppName} height="32" />
                            </div>
                            <span className="logo-sm">
                                <img src={isLight ? AppSmLogo : AppSmDarkLogo} alt={GlobalAppName} height="32" />
                            </span>
                        </Link>
                    </>
                )}

                {!isCondensed && (
                    <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                        <SideBarContent
                            menuClickHandler={() => { }}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                            user={user} company={company}
                            standards={standards}
                            leftnav={leftnav}
                            token={token}
                            supplier={supplier}
                            active_supplier={active_supplier}
                            suppliers_count={suppliers_count}
                        />
                    </SimpleBar>
                )}
                {isCondensed && <SideBarContent active_supplier={active_supplier} supplier={supplier} isLight={isLight} user={user} company={company} standards={standards} leftnav={leftnav} token={token} hideUserProfile={hideUserProfile} suppliers_count={suppliers_count} />}
            </div>
        </>
    );
};

LeftSidebar.defaultProps = {
    hideLogo: false,
    hideUserProfile: false,
    isLight: false,
    isCondensed: false,
};

export default LeftSidebar;