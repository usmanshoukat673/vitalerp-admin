import React, { Component } from 'react';
import _ from 'lodash';
import { Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setCompany, setCompanies } from '../../actions';
import { withRouter } from 'react-router';
import { GlobalAppName } from '../..';
import { Col, Container, Row } from 'react-bootstrap';
import axiosInstance from '../../api/api';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';
import './SecuritySettings.scss';

class SecuritySettings extends Component {

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
        const { token, company, leftnav } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>

                <div className="ssettings__mainbd">
                    <div className="ssettings__breadcrum"><VisitDashboardBreadcrum /> {' > '} Security Settings</div>

                    <div className="ssettings__header">
                        <div className="__name">Security Settings</div>
                        <div className="__actions">

                        </div>
                    </div>
                </div>

                <div className="ssettings__container">

                    <div className="security__bucket">
                        <h2>Multi Factor Authentication</h2>
                        <Container className="at__bucket__body">
                            <Row>
                                <Col>
                                    <Checkbox onChange={this.toggle} checked={required_mfa} toggle label="Required Multi Factor Authentication" />
                                    <p>Force all team members of this organization to authenticate via MFA.</p>
                                </Col>
                            </Row>
                        </Container>

                    </div>

                    <div className="security__bucket">
                        <h2>Password Policy</h2>
                        <Container className="at__bucket__body">
                            <Row>
                                <Col>
                                    <p>At least 8 characters</p>
                                    <p>A mixture of both uppercase and lowercase letters</p>
                                    <p>A mixture of letters and numbers</p>
                                    <p>Inclusion of at least one special character, e.g., ! @ # ? ]</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <div className="security__bucket">
                        <h2>Password Rotation</h2>
                        <Container className="at__bucket__body">
                            <Row><Col>
                                Password Rotation policy is set for 90 days. A Password should not be older then 90 days to access the {GlobalAppName} Platform
                            </Col>
                            </Row>
                        </Container>
                    </div>

                </div>



            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    leftnav: state.leftnav,
});

export default withRouter(connect(mapStateToProps, { setCompany, setCompanies })(SecuritySettings));


