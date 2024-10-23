import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { AiOutlineCloudDownload } from "react-icons/ai";
import axiosInstance from '../../api/api';

class InstallApp extends Component {

    state = {
        errors: [],
        loading: false,
        installed: false
    }

    componentDidMount() {
        const { application } = this.props;
        this.setState({ loading: true });
        axiosInstance.post(`/api/user/applications/installed`, { app_id: application.id }).then(e => {
            this.setState({ loading: false, installed: e.data.installed });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
                this.props.history.push('/login');
            }
        });
    }

    handleInstall = () => {
        const { token, company, application } = this.props;
        this.setState({ loading: true });
        axiosInstance.post(`/api/user/applications/install`, { app_id: application.id }).then(e => {
            this.setState({ loading: false, installed: e.data.installed });
            this.props.onInstall(e.data.redirect, e.data.app);

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
                this.props.history.push('/login');
            }
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { application } = this.props;
        const { installed, loading } = this.state;

        return (
            <React.Fragment>
                {!installed ? <Button
                    primary
                    onClick={this.handleInstall}
                    disabled={loading}
                    className={loading ? 'loading' : ''}
                >
                    <AiOutlineCloudDownload /> Install
                </Button> : <Button basic>
                    Installed
                </Button>}

            </React.Fragment>
        );
    }
}

export default InstallApp;
