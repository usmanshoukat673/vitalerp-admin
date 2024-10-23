import React, { Suspense } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import isEmpty from 'lodash.isempty';
import BuildFooter from './components/onboarding/common/BuildFooter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const loading = () => <div className=""></div>;

const PrivateTokenRoute = ({ component: Component, path, token, ...rest }) => {

    return (
        <Route path={path}
            {...rest}
            render={props => !isEmpty(token) ? (
                <>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                        <div className="new__auth_v2">
                        <Suspense fallback={loading()}>
                            <Component {...props} token={token} />
                        </Suspense>
                        </div>

                        <BuildFooter />
                        <NotificationContainer />
                    </ThemeProvider> </>) : (

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

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
});

export default withRouter(connect(mapStateToProps)(PrivateTokenRoute));
