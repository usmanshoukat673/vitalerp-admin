import React, { Suspense } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, withRouter } from 'react-router-dom';
import BuildFooter from './components/onboarding/common/BuildFooter';
import BuildHeader from './components/onboarding/common/BuildHeader';
// const SharedTopbar = React.lazy(() => import('./layouts/SharedTopbar'));
const loading = () => <div className=""></div>;

const OnboardingRoute = ({ component: Component, path, ...rest }, state) => {

    return (
        <Route path={path}
            {...rest}
            render={props => {
                return (

                    (<>
                        <BuildHeader />

                        <div className="ai__build">
                            <Suspense fallback={loading()}>
                                <Component {...props} />
                            </Suspense>
                        </div>

                        <BuildFooter />

                        <NotificationContainer />
                    </>)
                )
            }
            }
        />
    );
};


export default withRouter(OnboardingRoute);
