import React, { Component } from 'react';
import './Dashboard.scss';
import { Card, Grid } from 'semantic-ui-react';
import AppFreshdesk from './AppFreshdesk';
import AppFreshservice from './AppFreshservice';
import { connect } from 'react-redux';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection, setLocationStatus, setOrgsAutoDevices } from '../../actions';
import _ from 'lodash';
import DevicesLoading from '../DeviceWatch/DevicesLoading';
import DeviceDetector from './DeviceDetector';
import DeviceLocationFixer from './DeviceLocationFixer';
import axiosInstance from '../../api/api';

const AppComponents = {
    AppFreshdesk: AppFreshdesk,
    AppFreshservice: AppFreshservice
};

class Dashboard extends Component {

    state = {
        errors: [],
        loading: false,
        apps: [],
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {

            this.props.closeSubLeftNav();
            this.props.selectControlFunction({});
            this.props.selectCatalogSection({});

            // const { token, company } = this.props;
            // this.setState({ loading: true });
            // axiosInstance.get(`/api/user/dashboard/apps/${company.id}`).then(e => {
            //     this.setState({ loading: false, apps: e.data.apps });
            // }).catch(err => {
            //     if (err.response.status === 500) {
            //         this.setState({ errors: [], loading: false });
            //         NotificationManager.error('Server Error, Please contact customer support.', 'Error');
            //     }
            //     if (err.response.status === 401) {
            //         this.setState({ errors: [], loading: false });
            //         this.props.history.push('/login');
            //     }
            // });

            const { company } = this.props;
            this.setState({ loading: true });
            axiosInstance.get(`/api/user/dashboard/devices/${company.id}?auto_created=true`).then(e => {
                this.setState({ loading: false });
                this.props.setOrgsAutoDevices(e.data.devices);
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
    }

    handleAppList = () => {
        const { apps } = this.state;
        const { token } = this.props;

        return apps.length > 0 ? (<Card.Group itemsPerRow={2}>
            {
                _.map(apps, app => {

                    return (<Card key={app.integration_id} className="application">
                        {
                            (typeof AppComponents[app.integration.component] !== "undefined") ?
                                React.createElement(AppComponents[app.integration.component], {
                                    key: app.created_at,
                                    app: app,
                                    token: token
                                }) :
                                React.createElement(
                                    () => <div>The Application {app.integration.component} has not been created yet.</div>,
                                    { key: app.created_at }
                                )
                        }
                    </Card>);
                })
            }
        </Card.Group>) : '';
    }

    listDevices = (devices, token) => {
        const { company } = this.props;
        return _.map(devices, dc => {
            return <DeviceDetector dc={dc} token={token} key={dc.device.id} company={company} handleDeviceRemove={this.handleDeviceRemove} handleNickNameChanged={this.handleDeviceUpdate} handleDeviceLocation={this.handleDeviceUpdate} handleDeviceClick={this.handleDeviceClick} />
        });
    }

    handleDeviceUpdate = device => {
        const { auto_devices } = this.props;
        let index = _.findIndex(auto_devices, dc => {
            return dc.device_id === device.device_id;
        });
        auto_devices[index] = device;
        this.props.setOrgsAutoDevices(auto_devices);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading } = this.state;
        const { leftnav, auto_devices, token, company, new_location, device_newly_assigned } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <div className="page__header">
                    <div className="heading">
                        Dashboard
                    </div>
                </div>

                <div style={{ margin: '15px 15px 55px 15px' }}>

                    {loading ? <div></div> : this.handleAppList()}

                    {loading ? <DevicesLoading /> :
                        <Grid doubling columns={3}>

                            {this.listDevices(auto_devices, token)}

                        </Grid>
                    }

                </div>

                {new_location && !device_newly_assigned && <DeviceLocationFixer token={token} company={company} />}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    new_device: state.user.new_device,
    device_newly_assigned: state.user.device_newly_assigned,
    new_location: state.orgs.new_location,
    auto_devices: state.devicewatch.auto_devices,
});

export default connect(mapStateToProps, { closeSubLeftNav, selectControlFunction, selectCatalogSection, setLocationStatus, setOrgsAutoDevices })(Dashboard);
