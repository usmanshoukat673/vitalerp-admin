import React, { useState, Suspense, useEffect } from 'react';
import { Redirect, Route, withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

// utils
import { changeBodyAttribute } from './utils';
import { hideRightSidebar } from './actions';
import { NotificationContainer } from 'react-notifications';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const VendorTopbar = React.lazy(() => import('./layouts/VendorTopbar'));
const VendorLeftSidebar = React.lazy(() => import('./layouts/VendorLeftSidebar'));
const Footer = React.lazy(() => import('./layouts/Footer'));

const loading = () => <div className=""></div>;

// import Navbar from './components/layout/Navbar';

const PolicyPortalRoute = ({ component: Component, path, location, portal_user, portalToken, leftnav, ...rest }, state) => {

    const dispatch = useDispatch();

    // new layout
    const { layoutColor, leftSideBarTheme, leftSideBarType, layoutWidth, rightSideBarState } = useSelector((state) => ({
        layoutColor: state.leftnav.layoutColor,
        layoutWidth: state.leftnav.layoutWidth,
        leftSideBarTheme: state.leftnav.leftSideBarTheme,
        leftSideBarType: state.leftnav.leftSideBarType,
        rightSideBarState: state.leftnav.rightSideBarState,
    }));

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    /*
     * layout defaults
     */
    useEffect(() => {
        changeBodyAttribute('data-layout', 'vertical');
    }, []);

    useEffect(() => {
        changeBodyAttribute('data-layout-color', 'light');
    }, [layoutColor]);

    useEffect(() => {
        changeBodyAttribute('data-layout-mode', 'fluid');
    }, [layoutWidth]);

    useEffect(() => {
        changeBodyAttribute('data-leftbar-theme', 'dark');
    }, [leftSideBarTheme]);

    useEffect(() => {
        changeBodyAttribute('data-leftbar-compact-mode', 'fixed');
    }, [leftSideBarType]);

    useEffect(() => {
        changeBodyAttribute('data-rightbar-state', 'now_hidden');
    }, [rightSideBarState]);

    useEffect(() => {
        dispatch(hideRightSidebar());
    }, []);

    /**
     * Open the menu when having mobile screen
     */
    const openMenu = () => {
        setIsMenuOpened((prevState) => {
            setIsMenuOpened(!prevState);
        });

        if (document.body) {
            if (isMenuOpened) {
                document.body.classList.remove('sidebar-enable');
            } else {
                document.body.classList.add('sidebar-enable');
            }
        }
    };

    const isCondensed = 'fixed';
    const isLight = leftSideBarTheme === 'light';

    var pathSegments = location.pathname.split('/');

    return (
        <Route path={path}
            {...rest}
            render={props => !_.isEmpty(portal_user) ? (<React.Fragment>

                <div className="wrapper">
                    <Suspense fallback={loading()}>
                        <VendorLeftSidebar portal_user={portal_user} portalToken={portalToken} leftnav={leftnav} isCondensed={isCondensed} isLight={isLight} hideUserProfile={true} />
                    </Suspense>
                    <div className="content-page">
                        <div className="content">
                            <Suspense fallback={loading()}>
                                <VendorTopbar
                                    portal_user={portal_user}
                                    portalToken={portalToken}
                                    leftnav={leftnav}
                                    openLeftMenuCallBack={openMenu}
                                    hideLogo={true}
                                />
                            </Suspense>
                            <Container fluid>
                                <Suspense fallback={loading()}>
                                    <Component {...props} portal_user={portal_user} portalToken={portalToken} leftnav={leftnav} />
                                </Suspense>
                            </Container>
                        </div>

                        <Suspense fallback={loading()}>
                            <Footer />
                        </Suspense>
                    </div>
                </div>
                <NotificationContainer />
            </React.Fragment>)
                :
                <>
                    <Redirect to={{
                        pathname: `/${pathSegments[2]}/policy-panels-login`,
                        state: {
                            prevLocation: path,
                            error: "You need to login first!",
                        },
                    }}
                    />
                </>
            }
        />
    );


};

const mapStateToProps = (state) => ({
    portal_user: state.user.portalUser,
    portalToken: state.token.portalToken,
    leftnav: state.leftnav,
});

export default withRouter(connect(mapStateToProps)(PolicyPortalRoute));