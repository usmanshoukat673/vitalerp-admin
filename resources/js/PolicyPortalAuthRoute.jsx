import React, { Suspense, useEffect } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, withRouter } from 'react-router-dom';
import BuildFooter from './components/onboarding/common/BuildFooter';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { setPWDRotation } from './actions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const loading = () => <div className=""></div>;

const PolicyPortalAuthRoute = ({ component: Component, path, ...rest }, state) => {

    const dispatch = useDispatch();

    const { rotation } = useSelector(state => ({
        rotation: state.password.rotation,
    }));

    useEffect(() => {
        if (!_.isEmpty(rotation)) {
            rotation.close = true;
            dispatch(setPWDRotation(rotation)); // closing this intentionally as user is login to the policy portal
        }
    }, [rotation]);

    return (
        <Route path={path}
            {...rest}
            render={props => {
                return (

                    (<ThemeProvider theme={darkTheme}>

                        <CssBaseline />

                        <div className="new__auth_v2">
                            <Suspense fallback={loading()}>
                                <Component {...props} />
                            </Suspense>
                        </div>

                        <BuildFooter />

                        <NotificationContainer />
                    </ThemeProvider>)
                )
            }
            }
        />
    );
};


export default withRouter(PolicyPortalAuthRoute);
