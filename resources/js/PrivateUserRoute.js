import React, { Suspense } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import isEmpty from 'lodash.isempty';

const loading = () => <div className=""></div>;

const PrivateUserRoute = ({ component: Component, path, user, token, leftnav, ...rest }) => {

    // const params = new URLSearchParams(this.props.location.search);

    // console.log(params);

    return (
        <Route path={path}
            {...rest}
            render={props => !isEmpty(user) ? (
                <React.Fragment>
                    <div>
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

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
    token: state.token.activeToken,
    leftnav: state.leftnav
});

export default withRouter(connect(mapStateToProps)(PrivateUserRoute));
