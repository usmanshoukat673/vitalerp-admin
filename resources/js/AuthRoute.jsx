import React, { Suspense } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, withRouter } from 'react-router-dom';
import BuildFooter from './components/onboarding/common/BuildFooter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const loading = () => <div className=""></div>;

const AuthRoute = ({ component: Component, path, ...rest }, state) => {

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


export default withRouter(AuthRoute);
