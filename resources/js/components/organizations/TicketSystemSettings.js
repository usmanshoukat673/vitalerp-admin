import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setCompany, setCompanies } from '../../actions';
import FreshdeskTicketing from './FreshdeskTicketing';
import FreshserviceTicketing from './FreshserviceTicketing';
import axiosInstance from '../../api/api';

class TicketSystemSettings extends Component {

    state = {
        required_mfa: false,
        loading: false,
        errors: []
    };

    componentDidMount() {
        const { company } = this.props;
        this.setState({ required_mfa: company.required_mfa });
    }

    toggle = () => {
        this.setState((prevState) => {
            // Save seettings and update company
            return ({ required_mfa: !prevState.required_mfa });
        }, () => {
            this.setState({ errors: [], loading: true });
            const { required_mfa } = this.state;

            axiosInstance.post('/api/user/org/security/toggle-mfa', { required_mfa: required_mfa})
                .then(response => {
                    this.setState({
                        errors: [],
                        loading: false
                    });
                    this.props.setCompany(response.data.company);
                    this.props.setCompanies(response.data.companies);
                })
                .catch(err => {
                    if (err.response.status === 500) {
                        this.setState({ errors: [], loading: false });
                    }
                    if (err.response.status === 422) {
                        const errors = err.response.data.errors;

                        this.setState({ errors: this.state.errors.concat(errors), loading: false });
                    }
                    if (err.response.status === 400) {
                        this.setState({ errors: this.state.errors.concat(errors), loading: false });
                    }
                });

        });
    }

    setCompanyState = (company, companies) => {
        this.props.setCompany(company);
        this.props.setCompanies(companies);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { required_mfa } = this.state;
        const { token, company } = this.props;

        return (
            <React.Fragment>

                <div className="row" style={{ margin: '5px 5px 55px 5px' }}>
                    <div className="col-md-12">

                        <div style={{ paddingLeft: '8px', marginTop: '20px' }}>
                            <h2>Ticket System Settings</h2>
                        </div>

                        <FreshdeskTicketing />

                        <FreshserviceTicketing />
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});

export default connect(mapStateToProps, { setCompany, setCompanies })(TicketSystemSettings);
