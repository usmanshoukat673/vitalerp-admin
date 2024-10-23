import React, { useState, Suspense, useEffect } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

// utils
import { changeBodyAttribute } from './utils';
import { hideRightSidebar } from './actions';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const SharedTopbar = React.lazy(() => import('./layouts/SharedTopbar'));
const SharedLeftSidebar = React.lazy(() => import('./layouts/SharedLeftSidebar'));
const Footer = React.lazy(() => import('./layouts/Footer'));

const loading = () => <div className=""></div>;

// import Navbar from './components/layout/Navbar';

const SharedPublicRoute = ({ component: Component, path, leftnav, ...rest }, state) => {

    const dispatch = useDispatch();

    // const [isMenuOpened, setIsMenuOpened] = useState(false);

    // const loading = () => <div className="text-center"></div>;

    //   /**
    //  * Open the menu when having mobile screen
    //  */
    //    const openMenu = () => {
    //     setIsMenuOpened(!isMenuOpened);
    //     if (document.body) {
    //         if (isMenuOpened) {
    //             document.body.classList.remove('sidebar-enable');
    //         } else {
    //             document.body.classList.add('sidebar-enable');
    //         }
    //     }
    // };

    // const params = new URLSearchParams(this.props.location.search);

    // console.log(params);

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

    // templ variabes
    const user = null;
    const token = null;
    const company = null;

    return (
        <Route path={path}
            {...rest}
            render={props => {
                return (

                    (<>

                        <div className="wrapper">
                            <Suspense fallback={loading()}>
                                <SharedLeftSidebar user={user} token={token} leftnav={leftnav} company={company} isCondensed={isCondensed} isLight={isLight} hideUserProfile={true} />
                            </Suspense>
                            <div className="content-page">
                                <div className="content">
                                    <Suspense fallback={loading()}>
                                        <SharedTopbar user={user} token={token} leftnav={leftnav} company={company} openLeftMenuCallBack={openMenu} hideLogo={true} />
                                    </Suspense>
                                    <Container fluid>
                                        <Suspense fallback={loading()}>
                                            <Component {...props} user={user} token={token} leftnav={leftnav} company={company} />
                                        </Suspense>
                                    </Container>
                                </div>

                                <Suspense fallback={loading()}>
                                    <Footer />
                                </Suspense>
                            </div>
                        </div>

                    </>)
                )
            }
            }
        />
    );


};

const mapStateToProps = (state) => ({
    leftnav: state.leftnav
});

export default withRouter(connect(mapStateToProps)(SharedPublicRoute));
