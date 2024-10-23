import Axios from 'axios';
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selecteApp, clearApp } from '../../../actions';
import axiosInstance from '../../../api/api';

class MSOffice365Callback extends Component {

    state = {
        errors: [],
        loading: false,
    };

    componentDidMount() {
        this.setState({ errors: [], loading: true, touched: false });

        const params = new URLSearchParams(this.props.location.search);

        const { company, application } = this.props;

        axiosInstance.post('/api/user/applications/office365/get-access-token', {
            integration_id: application.integration_id,
            state: params.get('state'),
            code: params.get('code')
        })
            .then(e => {
                // this.props.selecteApp(e.data.app);
                this.props.history.push(`/${company.slug}${application.integration.config_url}`);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false, touched: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false, touched: false });
                }
            });
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    };

    render() {
        return (
            <div>
                <p>Processing Auth request...</p>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    application: state.applications.app,
});

export default withRouter(connect(mapStateToProps, { selecteApp })(MSOffice365Callback));
