import React, { Component } from 'react';
import { setCompanies, setUserNewDevice, setCreateNewOrg } from '../../actions';
import { connect } from 'react-redux';
import axiosInstance from '../../api/api';
import LoadingBackgrop from '../LoadingBackgrop';

class AcceptInvitation extends Component {

    state = {
        loading: false
    };

    componentDidMount() {
        this.setState({ loading: true });

        const { _token, email } = this.props.match.params;

        this.props.setCreateNewOrg({
            open: false,
            in_org: false
        });

        if (_token && email) {
            axiosInstance.post('/api/user/accept-invite', { _token: _token, email: email })
                .then(e => {
                    this.setState({
                        loading: false
                    });

                    this.props.setCompanies(e.data.companies);
                    this.props.setUserNewDevice(e.data.new_device);

                    this.props.history.push('/select-organization');

                })
                .catch(err => {
                    if (err.response.status === 500 || err.response.status === 422) {
                        this.setState({ loading: false });
                    }
                    if (err.response.status === 400) {
                        this.setState({ loading: false });
                        this.props.history.push('/select-organization');
                    }
                });
        }
        else {
            this.props.history.push('/select-organization');
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading } = this.state;

        return (
            <div>
                {loading ? <LoadingBackgrop open={true} /> : ''}
            </div>
        );
    }
}

export default connect(null, { setCompanies, setUserNewDevice, setCreateNewOrg })(AcceptInvitation);
