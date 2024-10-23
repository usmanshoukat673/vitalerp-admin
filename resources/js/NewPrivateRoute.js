import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TopBar from './components/layout/TopBar/TopBar';
import LeftNav from './components/layout/LeftNav/LeftNav';
import Footer from './components/layout/Footer/Footer';
import { NotificationContainer } from 'react-notifications';
import LeftSlideMenu from './components/layout/LeftNav/LeftSlideMenu';
import isEmpty from 'lodash.isempty';
import MainHeader from './components/layout/MainHeader/MainHeader';

const NewPrivateRoute = ({ component: Component, path, user, token, company, leftnav, ...rest }) => {

    // const params = new URLSearchParams(this.props.location.search);

    // console.log(params);

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

                    (<React.Fragment>
                        <MainHeader user={user} token={token} company={company} />

                        <LeftNav user={user} token={token} leftnav={leftnav} company={company} />
                        <div className={leftnav.open ? 'app__conainer open_app' : 'app__conainer close_app'}>
                            {<TopBar user={user} token={token} leftnav={leftnav} company={company}  />}
                            <LeftSlideMenu leftnav={leftnav} token={token} company={company} />
                            <Component {...props} user={user} token={token} leftnav={leftnav} company={company} />
                            <Footer />
                        </div>
                        <NotificationContainer />
                    </React.Fragment>)

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
    leftnav: state.leftnav
});

export default withRouter(connect(mapStateToProps)(NewPrivateRoute));
