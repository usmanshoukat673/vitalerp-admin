import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Image, Label } from 'semantic-ui-react';
import InstallApp from './InstallApp';
import _ from 'lodash';
import BChart from './BLineChart/BChart';
import axiosInstance from '../../api/api';
// import LineChart from './LineChart';

class ViewApp extends Component {

    state = {
        loading: false,
        errors: [],
        uptime_logs: []
    };

    componentDidMount() {

        const { token, application } = this.props;

        this.setState({ loading: true });
        axiosInstance.post(`/api/user/applications/uptime-logs`, { id: application.id }).then(e => {
            this.setState({ loading: false, errors: [], uptime_logs: e.data.logs });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
                this.props.history.push('/login');
            }
        });

    };

    handleCloseAppView = () => {
        this.props.handleCloseAppView();
    };

    onInstall = (redirect, app) => {
        this.props.onInstalled(redirect, app);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { view_app, application, token, company } = this.props;

        const { uptime_logs, loading } = this.state;

        return (

            <React.Fragment>
                <Modal dimmer="inverted" open={view_app} size="large" className="semtic__modal" closeIcon>
                    <Modal.Header>{application.name}</Modal.Header>
                    <Modal.Content image style={{ minHeight: '450px' }}>
                        <Image wrapped size='medium' src={application.logo} />
                        <Modal.Description>
                            <p>{application.description}</p>

                            <div>
                                {
                                    _.map(application.categories, (cat) => (
                                        <Label color='teal' key={`${cat.category.id}-cat`} as='a' tag>
                                            {cat.category.name}
                                        </Label>
                                    ))
                                }
                            </div>

                            {/**  {loading ? <p>Loading chart..</p> : <LineChart logs={uptime_logs} />} */}

                            {loading ? <p>Loading chart..</p> : <BChart logs={uptime_logs} />}

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleCloseAppView} color="black">Close</Button>

                        <InstallApp application={application} token={token} company={company} onInstall={this.onInstall} />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ViewApp;
