import React, { Suspense } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AppAuthLogo, GlobalAppName } from '.';

const loading = () => <div className=""></div>;

const SharedWhistleRoute = ({ component: Component, path, leftnav, ...rest }, state) => {

    return (
        <Route path={path}
            {...rest}
            render={props => {
                return (
                    (<>
                        <div className='__secure_header__wrapper'>
                            <div className='__header'>
                                <Suspense fallback={loading()}>
                                    <span className="logo-lg">
                                        <img src={AppAuthLogo} alt={GlobalAppName} height="16" />
                                    </span>
                                </Suspense>
                            </div>
                        </div>

                        <div className="__secure_whistleblower">
                            <div className='__whistle_content__area'>
                                <Container fluid>
                                    <Suspense fallback={loading()}>
                                        <Component {...props} />
                                    </Suspense>
                                </Container>
                            </div>

                            <div className='__whistle__footer'></div>
                        </div>

                        <div className='__secure_footer__wrraper'>
                            <div>System powered by <span className="logo-short">
                                <img src={AppAuthLogo} alt={GlobalAppName} height="15" />
                            </span>
                            </div>
                        </div>

                    </>)
                )
            }
            }
        />
    );


};

export default withRouter(SharedWhistleRoute);
