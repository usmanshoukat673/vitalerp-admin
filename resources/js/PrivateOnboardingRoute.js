import React, { Suspense } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import isEmpty from 'lodash.isempty';
import AuthonticatedHeader from './components/auth/AuthonticatedHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BuildFooter from './components/onboarding/common/BuildFooter';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const loading = () => <div className=""></div>;


const PrivateOnboardingRoute = ({ component: Component, path, user, token, company, leftnav, ...rest }) => {

    // const params = new URLSearchParams(this.props.location.search);

    // console.log(params);

    return (
        <Route path={path}
            {...rest}
            render={props => !isEmpty(user) ? (
                <><ThemeProvider theme={darkTheme}>
                     <CssBaseline />
                    <div className="new__authoticated__onboarding">
                    <AuthonticatedHeader />
                    <Suspense fallback={loading()}>
                        <Component {...props} user={user} token={token} company={company} />
                    </Suspense>
                    </div>
                    <BuildFooter />
                    <NotificationContainer />
                </ThemeProvider></>) : (

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
    user: state.user.activeUser,
    token: state.token.activeToken,
    leftnav: state.leftnav,
    company: state.orgs.company
});

export default withRouter(connect(mapStateToProps)(PrivateOnboardingRoute));
