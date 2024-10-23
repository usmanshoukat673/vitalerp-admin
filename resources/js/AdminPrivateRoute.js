import React, { useState, Suspense, useEffect } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import TopBar from './components/layout/TopBar/TopBar';
import LeftNav from './components/layout/LeftNav/LeftNav';
// import Footer from './components/layout/Footer/Footer';
import { NotificationContainer } from 'react-notifications';
import LeftSlideMenu from './components/layout/LeftNav/LeftSlideMenu';
import isEmpty from 'lodash.isempty';
import MainHeader from './components/layout/MainHeader/MainHeader';

import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

// utils
import { changeBodyAttribute } from './utils';
import RightDrawer from './layouts/RightDrawer';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import('./layouts/Topbar'));
const LeftSidebar = React.lazy(() => import('./layouts/LeftSidebar'));
const Footer = React.lazy(() => import('./layouts/Footer'));

const loading = () => <div className=""></div>;


const AdminPrivateRoute = ({ component: Component, path, user, users, token, company, leftnav, ...rest }) => {


    // new layout
    const { layoutColor, leftSideBarTheme, leftSideBarType, layoutWidth, rightSideBarState, centerPageAreaState } = useSelector((state) => ({
        layoutColor: state.leftnav.layoutColor,
        layoutWidth: state.leftnav.layoutWidth,
        leftSideBarTheme: state.leftnav.leftSideBarTheme,
        leftSideBarType: state.leftnav.leftSideBarType,
        rightSideBarState: state.leftnav.rightSideBarState,
        centerPageAreaState: state.leftnav.centerPageAreaState,
    }));

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    /*
     * layout defaults
     */
    useEffect(() => {
        changeBodyAttribute('data-layout', 'vertical');
    }, []);

    useEffect(() => {
        changeBodyAttribute('data-layout-color', layoutColor);
    }, [layoutColor]);

    useEffect(() => {
        changeBodyAttribute('data-layout-mode', layoutWidth);
    }, [layoutWidth]);

    useEffect(() => {
        changeBodyAttribute('data-leftbar-theme', leftSideBarTheme);
    }, [leftSideBarTheme]);

    useEffect(() => {
        changeBodyAttribute('data-leftbar-compact-mode', leftSideBarType);
    }, [leftSideBarType]);

    useEffect(() => {
        changeBodyAttribute('data-rightbar-state', rightSideBarState);
    }, [rightSideBarState]);

    useEffect(() => {
        changeBodyAttribute('data-center-area-state', centerPageAreaState);
    }, [centerPageAreaState]);

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

    // const updateDimensions = useCallback(() => {
    //     // activate the condensed sidebar if smaller devices like ipad or tablet
    //     if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
    //         dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED));
    //     } else if (window.innerWidth > 1028) {
    //         dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     window.addEventListener('resize', updateDimensions);

    //     return () => {
    //         window.removeEventListener('resize', updateDimensions);
    //     };
    // }, [dispatch, updateDimensions]);

    const isCondensed = 'fixed';
    const isLight = leftSideBarTheme === 'light';

    return (
        <Route path={path}
            {...rest}
            render={props => !isEmpty(user) && !isEmpty(company) && company.role === 'A' ? (


                (company.required_mfa && !user.mfa_enabled ?

                    (<Redirect to={{
                        pathname: "/select-organization",
                        state: {
                            prevLocation: path,
                            error: "You need to enable mfa!",
                        },
                    }}
                    />)

                    :

                    (<React.Fragment>
                        <div className="wrapper">
                            <Suspense fallback={loading()}>
                                <LeftSidebar user={user} token={token} leftnav={leftnav} company={company} isCondensed={isCondensed} isLight={isLight} hideUserProfile={true} hideLogo={true} />
                            </Suspense>
                            <div className="content-page">
                                <div className="content">
                                    <Suspense fallback={loading()}>
                                        <Topbar user={user} token={token} leftnav={leftnav} openLeftMenuCallBack={openMenu} hideLogo={true} />
                                    </Suspense>
                                    <Container fluid>

                                        <Suspense fallback={loading()}>
                                            <Component {...props} user={user} users={users} token={token} leftnav={leftnav} company={company} />
                                        </Suspense>
                                    </Container>
                                </div>

                                <Suspense fallback={loading()}>
                                    {/* <Footer /> */}
                                </Suspense>
                            </div>

                            <RightDrawer />
                        </div>


                        <NotificationContainer />
                    </React.Fragment>)

                )

            ) : (

                <Redirect to={{
                    pathname: "/login",
                    state: {
                        prevLocation: path,
                        error: "You need to login first!",
                    },
                }}
                />
            )
            }
        />
    );

    // const params = new URLSearchParams(this.props.location.search);

    // console.log(params);

    return (
        <Route path={path}
            {...rest}
            render={props => !isEmpty(user) && !isEmpty(company) && company.role === 'A' ? (


                (company.required_mfa && !user.mfa_enabled ?

                    (<Redirect to={{
                        pathname: "/select-organization",
                        state: {
                            prevLocation: path,
                            error: "You need to enable mfa!",
                        },
                    }}
                    />)

                    :

                    (<React.Fragment>
                        <MainHeader user={user} token={token} company={company} />
                        <LeftNav user={user} token={token} leftnav={leftnav} company={company} />
                        <div className={leftnav.open ? 'app__conainer open_app' : 'app__conainer close_app'}>
                            {/* <TopBar user={user} token={token} leftnav={leftnav} company={company} /> */}
                            <LeftSlideMenu leftnav={leftnav} token={token} company={company} />
                            <Component {...props} user={user} token={token} leftnav={leftnav} company={company} />
                            <Footer />
                        </div>
                        <NotificationContainer />
                    </React.Fragment>)

                )

            ) : (

                <Redirect to={{
                    pathname: "/login",
                    state: {
                        prevLocation: path,
                        error: "You need to login first!",
                    },
                }}
                />
            )
            }
        />
    );
};

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
    token: state.token.activeToken,
    company: state.orgs.company,
    users: state.orgs.company_users,
    leftnav: state.leftnav
});

export default withRouter(connect(mapStateToProps)(AdminPrivateRoute));
