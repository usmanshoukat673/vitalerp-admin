import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import { Header, Card, Button, Segment, Form, Divider, Input, Label, Icon, Step, Checkbox, Message } from 'semantic-ui-react';
import { FiHelpCircle } from "react-icons/fi";
import { connect } from 'react-redux';
import axiosInstance from '../../../api/api';

const notFound = '/images/no-result-found.svg';

class MSOffice365Settings extends Component {
    state = {
        errors: [],
        loading: false,
        finishing: false,
        touched: false,
        connected: false,
        configured: false,
        expired: false,
        change_domain: false,
        expired_at: '',
        api_key: '',
        domain_name: '',
        oauthState: '', // needs to save in redux
        authUrl: ''
    };

    componentDidMount() {
        this.setState({ errors: [], loading: true, touched: false });

        axiosInstance.post('/api/user/applications/office365/get-settings')
            .then(e => {

                if (e.data.app != null) {
                    this.setState({
                        connected: e.data.app.connected,
                        configured: e.data.app.configured,
                        expired: e.data.app.expired,
                        expired_at: e.data.app.expired_at,
                        errors: [],
                        loading: false,
                        touched: false,
                    });
                }
                else {
                    this.setState({
                        errors: [],
                        loading: false,
                        touched: false,
                    });
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false, touched: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false, touched: false });
                }
            });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ touched: true });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        // Should visit MS
        // get auth code
        // store access token
        // works accordingly

        this.setState({ errors: [], loading: true, touched: false });

        const { token, company, application } = this.props;

        axiosInstance.post('/api/user/applications/office365/create-auth-request', {
            integration_id: application.integration_id,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    // loading: false,
                    touched: false,
                    authUrl: e.data.authUrl,
                    oauthState: e.data.oauthState,
                    connected: e.data.app.connected,
                    configured: e.data.app.configured,
                });
                // redirect to the auth url
                window.location.href = e.data.authUrl;
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false, touched: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false, touched: false });
                }
                if (err.response.status === 401) {

                    this.setState({
                        errors: [], loading: false,
                        touched: false,
                        connected: false,
                        configured: false
                    });

                    NotificationManager.error('Invalid API Details, please verify and enter correct information.', 'Error');

                }
                if (err.response.status === 404) {

                    this.setState({
                        errors: [], loading: false,
                        touched: false,
                        connected: false,
                        configured: false
                    });

                    NotificationManager.error('Invalid Domain Name, please verify domain name is correct.', 'Error');

                }
                if (err.response.status === 403) {

                    this.setState({
                        errors: [], loading: false,
                        touched: false,
                        connected: false,
                        configured: false
                    });

                    NotificationManager.error('Forbidden: Your account has been suspended, Please contact Freshdesk Support.', 'Error');

                }
            });
    }

    handleFinish = () => {
        this.setState({ errors: [], finishing: true, touched: false });

        const { application } = this.props;

        axiosInstance.post('/api/user/applications/freshdesk/finish-setup', {
            integration_id: application.integration_id,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    finishing: false,
                    touched: false,
                    configured: e.data.app.configured,
                }, () => {
                    NotificationManager.success('Freshdesk has been successfully installed & configured!', 'Success');
                    this.props.history.push(`/${this.props.company.slug}/compliance-stack`); // it was /dashboard 
                });
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], finishing: false, touched: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), finishing: false, touched: false });
                }
            });
    }

    toggle = () => {
        this.setState((prevState) => {
            return ({ change_domain: !prevState.change_domain });
        });
    }

    render() {

        const { loading, finishing, errors, api_key, domain_name, touched, configured, connected, expired, change_domain } = this.state;

        return (
            <div>
                <div className="page__header">
                    <div className="heading">
                        Office 365 Settings
                    </div>

                </div>
                <div style={{ margin: '15px 15px 55px 15px' }}>
                    <Segment>
                        <Header as="h4">
                            Account Information
                        </Header>

                        <Card.Group itemsPerRow={1}>
                            <Card>
                                <Card.Content style={{ overflow: 'auto' }}>

                                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>Configure Settings</div>

                                        {connected ? expired ? <Label color="red">
                                            <Icon name='close' /> Service Unreachable
                                                </Label> :
                                            <Label color="green">
                                                <Icon name='check' /> Connected
                                                </Label>

                                            : <Label color="red">
                                                <Icon name='close' /> Not Connected
                                                </Label>}
                                    </Card.Header>

                                    <Divider />

                                    <Form>


                                        <Form.Group>
                                            <Form.Field width={8}>
                                                <Button fluid onClick={this.handleSubmit} basic disabled={loading} className={loading ? 'loading' : ''} type="button" primary>
                                                    {connected ? 'Re-Connect' : 'Click here to Connect Office 365'}
                                                </Button>
                                            </Form.Field>

                                            {!configured && connected ? <Form.Field width={8}>
                                                <Button fluid color="green" onClick={this.handleFinish} disabled={finishing} className={finishing ? 'loading' : ''} type="button">
                                                    Finish Setup
                                                </Button>
                                            </Form.Field> : ''}
                                        </Form.Group>

                                    </Form>

                                    <div>
                                        <Step.Group ordered>

                                            {connected && !expired ? <Step completed>
                                                <Step.Content>
                                                    <Step.Title>Connected</Step.Title>
                                                    <Step.Description>
                                                        Office 365 connected successfully.
                                                </Step.Description>
                                                </Step.Content>
                                            </Step> : <Step active>
                                                    <Step.Content>
                                                        <Step.Title>Connect</Step.Title>
                                                        <Step.Description>
                                                            Login to your Microsoft business account to connect.
                                                </Step.Description>
                                                    </Step.Content>
                                                </Step>}


                                            {configured && !expired ? <Step completed>
                                                <Step.Content>
                                                    <Step.Title>Finished</Step.Title>
                                                    <Step.Description>You have successfully configured Office 365.</Step.Description>
                                                </Step.Content>
                                            </Step> : <Step active>
                                                    <Step.Content>
                                                        <Step.Title>Finish</Step.Title>
                                                        <Step.Description>Click finish to complete Office 365 setup</Step.Description>
                                                    </Step.Content>
                                                </Step>}


                                        </Step.Group>
                                    </div>

                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    application: state.applications.app,
});

export default connect(mapStateToProps)(MSOffice365Settings);
