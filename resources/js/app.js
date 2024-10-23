import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, withRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { setPWDRotation } from './actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { saveState, loadState } from './store/localStorage';
import Main from './Router';
import { CookiesProvider } from 'react-cookie';
import Pusher from 'pusher-js';
// import MotionPakages from './components/motion-packages/MotionPakages';
import IdleTimeout from './components/user/IdleTimeout';
import './scss/App.scss';
import 'semantic-ui-css/semantic.min.css';

window.Pusher = Pusher;

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    saveState({
        user: store.getState().user,
        token: store.getState().token,
        leftnav: store.getState().leftnav,
        orgs: store.getState().orgs,
        password: store.getState().password,
        marketplace: store.getState().marketplace,
        cart: store.getState().cart,
        applications: store.getState().applications,
        catalog_sections: store.getState().catalog_sections,
        files: store.getState().files,
        compliance: store.getState().compliance,
        search: store.getState().search,
        devicewatch: store.getState().devicewatch,
        locations: store.getState().locations,
        projects: store.getState().projects,
        tasks: store.getState().tasks,
        mpackages: store.getState().mpackages,
        lanscape: store.getState().lanscape,
        validvalues: store.getState().validvalues,
        policyportal: store.getState().policyportal,
        corporate: store.getState().corporate,
        supplier: store.getState().supplier,
        domains: store.getState().domains,
    });
});

const App = () => {

    const { rotation } = useSelector(state => ({
        rotation: state.password.rotation,
    }));

    const [isDisconnected, setIsDisconnected] = useState(false);

    const dispatch = useDispatch();

    const renderPwdNotification = rotation => {
        return (
            (rotation && rotation.pwd_warning === 1 && !rotation.close) ?

                <div className="cj__warning">
                    <span>
                        Your password is {rotation.days} days old please change to make it more secure.
                    </span>
                    <span onClick={closeRotationWarning} className="btn__close__noty">
                        X
                    </span>
                </div>

                : ''
        );
    }

    const renderConnectionError = () => {
        return (
            <div className="cj__warning">
                <span>
                    Internet Connection Lost.
                </span>
                <span onClick={closeILMessage} className="btn__close__noty">
                    X
                </span>
            </div>
        );
    }

    const closeILMessage = () => {
        setIsDisconnected(false);
    }

    const closeRotationWarning = () => {
        rotation.close = true;
        dispatch(setPWDRotation(rotation));
    }

    return (
        <CookiesProvider>

            <div className="main__app">
                {renderPwdNotification(rotation)}
                {isDisconnected && renderConnectionError()}
                <Route component={Main} />

                <IdleTimeout />
            </div>

        </CookiesProvider>
    );
}

const RoutewithAuth = withRouter(App);

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <RoutewithAuth />
            </BrowserRouter>
        </Provider>
        , document.getElementById('root'));
}
