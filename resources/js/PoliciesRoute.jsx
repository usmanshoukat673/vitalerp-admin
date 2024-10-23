import React, { Suspense } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, withRouter } from 'react-router-dom';
import PolicyHeader from './components/Policies/Layout/PolicyHeader';
import PolicyMenus from './components/Policies/Layout/PolicyMenus';

const loading = () => <div className=""></div>;

const PoliciesRoute = ({ component: Component, path, ...rest }, state) => {

    return (
        <Route path={path}
            {...rest}
            render={props => {
                return (

                    (<>
                        <PolicyHeader />

                        <PolicyMenus />

                        <div className="__policies">
                            <Suspense fallback={loading()}>
                                <Component {...props} />
                            </Suspense>
                        </div>

                        <NotificationContainer />
                    </>)
                )
            }
            }
        />
    );
};


export default withRouter(PoliciesRoute);
