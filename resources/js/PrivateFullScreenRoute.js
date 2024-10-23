import React, { useState, Suspense, useEffect } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import isEmpty from 'lodash.isempty';
import { useSelector, useDispatch } from 'react-redux';

// utils
import { changeBodyAttribute } from './utils';

const loading = () => <div className=""></div>;

const PrivateFullScreenRoute = ({ component: Component, path, user, users, token, company, leftnav, ...rest }, state) => {

    // new layout
    const { layoutColor, leftSideBarTheme, leftSideBarType, layoutWidth } = useSelector((state) => ({
        layoutColor: state.leftnav.layoutColor,
        layoutWidth: state.leftnav.layoutWidth,
        leftSideBarTheme: state.leftnav.leftSideBarTheme,
        leftSideBarType: state.leftnav.leftSideBarType,
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

    return (
        <Route path={path}
            {...rest}
            render={props => !isEmpty(user) && !isEmpty(company) ? (

                (company.required_mfa && !user.mfa_enabled ?
                    //TODO: needs to check here wheter company is selected or not
                    (<Redirect to={{
                        pathname: "/select-organization",
                        state: {
                            prevLocation: path,
                            error: "You need to enable mfa!",
                        },
                    }}
                    />)
                    :
                    (<>
                        <div>
                        <Suspense fallback={loading()}>
                            <Component {...props} user={user} token={token} leftnav={leftnav} company={company} users={users} />
                        </Suspense>
                        </div>
                        <NotificationContainer />
                    </>)
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
    leftnav: state.leftnav,
    users: state.orgs.company_users,
});

export default withRouter(connect(mapStateToProps)(PrivateFullScreenRoute));
