import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import { Header, Card, Button, Segment, Form, Divider, Input, Label, Icon, Step, Checkbox, Message } from 'semantic-ui-react';
import { FiHelpCircle } from "react-icons/fi";
import { connect } from 'react-redux';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../../actions';
import { GlobalAppName } from '../../..';
import axiosInstance from '../../../api/api';

const notFound = '/images/no-result-found.svg';

class Freshservice extends Component {
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
        domain_name: ''
    };

    componentDidMount() {
        this.setState({ errors: [], loading: true, touched: false });

        this.props.closeSubLeftNav();
        this.props.selectControlFunction({});
        this.props.selectCatalogSection({});

        axiosInstance.post('/api/user/applications/freshservice/get-settings')
            .then(e => {

                if (e.data.app != null) {
                    this.setState({
                        api_key: e.data.app.api_key,
                        domain_name: e.data.app.domain_name,
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

        this.setState({ errors: [], loading: true, touched: false });

        const { token, company, application } = this.props;
        const { api_key, domain_name, change_domain } = this.state;

        axiosInstance.post('/api/user/applications/freshservice/save-settings', {
            api_key: api_key,
            domain_name: domain_name,
            change_domain: change_domain,
            integration_id: application.integration_id,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    loading: false,
                    touched: false,
                    api_key: e.data.app.api_key,
                    domain_name: e.data.app.domain_name,
                    connected: e.data.app.connected,
                    configured: e.data.app.configured,
                });
                return NotificationManager.success('Freshservice connected successfully!', 'Success');
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

                    NotificationManager.error('Forbidden: Your account has been suspended, Please contact Freshservice Support.', 'Error');

                }
            });
    }

    handleFinish = () => {
        this.setState({ errors: [], finishing: true, touched: false });

        const { application } = this.props;

        axiosInstance.post('/api/user/applications/freshservice/finish-setup', {
            integration_id: application.integration_id,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    finishing: false,
                    touched: false,
                    configured: e.data.app.configured,
                }, () => {
                    NotificationManager.success('Freshservice has been successfully installed & configured!', 'Success');
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, finishing, errors, api_key, domain_name, touched, configured, connected, expired, change_domain } = this.state;
        const { leftnav } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>
                <div className="page__header">
                    <div className="heading">
                        Freshservice Settings
                    </div>

                </div>
                <div style={{ margin: '15px 15px 55px 15px' }}>
                    <Segment>
                        <Header as="h4">
                            Account Information
                        </Header>

                        <Card.Group itemsPerRow={2}>
                            <Card>
                                <Card.Content style={{ overflow: 'auto' }}>

                                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>Configure Settings</div>

                                        {connected ? expired === 1 ? <Label color="red">
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
                                                <label>API Key</label>

                                                <Form.Input className={this.handlerInputError(errors, 'api_key')} onChange={this.handleChange} fluid type='password' name="api_key" value={api_key} />
                                                {this.displayInputError(errors, 'api_key')}
                                            </Form.Field>
                                        </Form.Group>


                                        <Form.Group>
                                            <Form.Field width={8}>
                                                <label>Domain Name</label>
                                                <Input label='https://' disabled={connected && !change_domain} className={this.handlerInputError(errors, 'domain_name')} onChange={this.handleChange} fluid type='text' name="domain_name" value={domain_name} />
                                                {this.displayInputError(errors, 'domain_name')}
                                            </Form.Field>
                                            <Form.Field width={8}>
                                                <p style={{ marginTop: '30px', fontSize: '16px' }}>.freshservice.com</p>
                                            </Form.Field>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Field>
                                                <Checkbox onChange={this.toggle} checked={change_domain} toggle label="Change Domain Name" />

                                                {change_domain ? <Message style={{ display: 'block' }} warning>
                                                    Changing domain name will wipe out all your existing freshservice data from {GlobalAppName} & it can not be recovered.
                                                </Message> : ''}


                                            </Form.Field>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Field width={8}>
                                                <Button fluid onClick={this.handleSubmit} basic disabled={loading || !touched} className={loading ? 'loading' : ''} type="button" primary>
                                                    {connected ? 'Re-Connect' : 'Connect'}
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
                                                        Freshservice connected successfully.
                                                    </Step.Description>
                                                </Step.Content>
                                            </Step> : <Step active>
                                                <Step.Content>
                                                    <Step.Title>Connect</Step.Title>
                                                    <Step.Description>
                                                        Enter Freshdeks Account Information to connect
                                                    </Step.Description>
                                                </Step.Content>
                                            </Step>}


                                            {configured && !expired ? <Step completed>
                                                <Step.Content>
                                                    <Step.Title>Finished</Step.Title>
                                                    <Step.Description>You have successfully configured Freshservice.</Step.Description>
                                                </Step.Content>
                                            </Step> : <Step active>
                                                <Step.Content>
                                                    <Step.Title>Finish</Step.Title>
                                                    <Step.Description>Click finish to complete Freshservice setup</Step.Description>
                                                </Step.Content>
                                            </Step>}


                                        </Step.Group>
                                    </div>

                                </Card.Content>
                            </Card>

                            <Card>
                                <Card.Content>

                                    <Card.Header>
                                        <FiHelpCircle /> Getting Your Account Information
                                    </Card.Header>

                                    <Divider />

                                    <p>
                                        You will need to have or create account at <a target="_blank" href="https://freshservice.com/">https://freshservice.com</a> to be able to use Freshservice into {GlobalAppName} Platform.
                                    </p>

                                    <Header as="h5">Where can I find my API key?</Header>

                                    <p>1. Log in to your Freshservice Support Portal</p>
                                    <p>2. Click on your profile picture on the top right corner of your portal</p>
                                    <p>3. Go to Profile settings Page</p>
                                    <p>4. Your API key will be available below the change password section to your right</p>

                                    <Header as="h5">Where can I find my Sub Domain?</Header>

                                    <p>
                                        Freshservice assign your company a special sub-domain, When you login to your Freshservice support portal, you should get redirect to the same.
                                    </p>

                                    <p>You can easily grab sub domain from the URL for example, <span style={{ color: '#33a2f7' }}>https://<b>example</b>.freshservice.com</span> here <b>example</b> is compnay your domain name.</p>

                                    <Header as="h5">Enable Skip Mandatory Fields option.</Header>

                                    <p>Make sure you enable creating tickeing wihout Freshservice required fields, You can use below steps find this setting:  </p>
                                    <p>1. Log in to your Freshservice Support Portal (You should be an Admin)</p>
                                    <p>2. Go to settings by cliking on gear icon from left hand navigation menu</p>
                                    <p>3. Select ticket fileds option from General Settings</p>
                                    <p>4. You should have an checkbox with label called <b>"Skip mandatory fields when using API"</b> at the top-right corner</p>


                                    <p>This setting is required for paid Freshservice accounts only, when you have your creaed own custom required fields.</p>

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

export default connect(mapStateToProps, { closeSubLeftNav, selectControlFunction, selectCatalogSection })(Freshservice);
