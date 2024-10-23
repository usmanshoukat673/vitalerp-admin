import React, { Suspense } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import isEmpty from 'lodash.isempty';
import { Image } from 'semantic-ui-react';
import { AppDarkLogo } from '.';
import NavigationWithConfirmation from './NavigationWithConfirmation';

const loading = () => <div className=""></div>;

const SupplierOnboardingRoute = ({ component: Component, path, ...rest }) => {

    const { user, token } = useSelector((state) => ({
        user: state.user.activeUser,
        token: state.token.activeToken,
    }));

    return (
        <Route path={path}
            {...rest}
            render={props => !isEmpty(user) ? (
                <React.Fragment>
                    <div>

                        <div className="page__header__user">
                            <div>
                                <div className="heading-user">
                                    <Image style={{ display: 'inline', height: '30px' }} src={AppDarkLogo} />
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>

                        <NavigationWithConfirmation />

                        <Suspense fallback={loading()}>
                            <Component {...props} user={user} token={token} />
                        </Suspense>
                    </div>
                    <NotificationContainer />
                </React.Fragment>) : (

                <Redirect to={{
                    pathname: "/login",
                    state: {
                        prevLocation: path,
                        error: "You need to signin first!",
                    },
                }}
                />
            )
            }
        />
    );
};


export default withRouter(SupplierOnboardingRoute);
