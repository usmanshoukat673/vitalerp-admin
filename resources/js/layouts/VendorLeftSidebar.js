// @flow
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import { defaultPPMenus, sampleDomains } from '../helpers/menu';
import PolicyPanelMenu from './PolicyPanelMenu';

// images
import profileImg from '../../images/users/avatar-1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppAuthLogo, AppSmDarkLogo, AppSmLogo, GlobalAppName } from '..';
import VendorCatalogSwitch from './VendorCatalogSwitch';
import { useLocation, matchPath } from 'react-router-dom';
import classNames from 'classnames';
import { setPortalActiveParentDomains } from '../actions';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

/* sidebar content */
const SideBarContent = ({ hideUserProfile, user, menuItems, company, portalToken, shared_standards, match, history }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const currentPath = location.pathname;

    // Check if you are on a particular route with parameters
    const isOnSpecificRoute = !!matchPath(currentPath, {
        path: '/policy-panels/:portal_link/pp/:standard_name/:domain_name',
        exact: true, // Adjust based on your route structure
    });

    const { active_domains, active_standard } = useSelector((state) => ({
        active_domains: state.policyportal.active_domains,
        active_standard: state.policyportal.active_standard,
    }));

    const handleControlsNavigation = (parent_domain) => {
        dispatch(setPortalActiveParentDomains(parent_domain));
        history.push(`/policy-panels/${match.params.portal_link}/pp/${active_standard.slug}/${parent_domain.slug}`);
    }
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

            {/* <VendorCatalogSwitch shared_standards={shared_standards} />

            <PolicyPanelMenu company={company} token={portalToken} /> */}

            <ul className="side-nav" id="main-side-menu">
                {
                    isOnSpecificRoute ?
                        _.map(active_domains, (section) => {
                            return (
                                <li key={section.id} className={classNames('side-nav-item')}>
                                    <a
                                        onClick={() => handleControlsNavigation(section)}
                                        className={classNames('side-nav-link-ref', 'side-sub-nav-link', 'side-nav-link', 'chand')}
                                        data-menu-key={section.id}>

                                        <span>{section.menu_name} </span>
                                    </a>
                                </li>
                            )
                        })
                        :
                        (menuItems || []).map((item, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <li className={classNames('side-nav-item')}>
                                        <a
                                            className={classNames('side-nav-link-ref', 'side-sub-nav-link', 'side-nav-link', 'chand')}
                                            data-menu-key={item.key}>
                                            <span>{item.label} </span>
                                        </a>
                                    </li>
                                </React.Fragment>
                            );
                        })
                }
            </ul>

            <div className="clearfix" />
        </>
    );
};


const VendorLeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile, user, portalToken, company, leftnav, match, history }) => {

    const menuNodeRef = useRef(null);

    const { shared_standards } = useSelector((state) => ({
        shared_standards: state.policyportal.shared_standards
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
            <div className="leftside-menu pp-policy-panel-menu" ref={menuNodeRef}>
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
                            menuClickHandler={() => { }}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                            user={user} company={company}
                            shared_standards={shared_standards}
                            leftnav={leftnav}
                            portalToken={portalToken}
                            menuItems={defaultPPMenus()}
                            match={match}
                            history={history}
                        />
                    </SimpleBar>
                )}
                {isCondensed && <SideBarContent
                    isLight={isLight}
                    user={user}
                    company={company}
                    shared_standards={shared_standards}
                    leftnav={leftnav}
                    portalToken={portalToken}
                    hideUserProfile={hideUserProfile}
                    menuItems={defaultPPMenus()}
                    match={match}
                    history={history}
                />}
            </div>
        </>
    );
};

VendorLeftSidebar.defaultProps = {
    hideLogo: false,
    hideUserProfile: false,
    isLight: false,
    isCondensed: false,
};

export default withRouter(VendorLeftSidebar);
