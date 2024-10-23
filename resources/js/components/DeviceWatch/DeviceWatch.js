import React, { Component } from 'react';
import { Grid, Segment, Message } from 'semantic-ui-react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setWatchDevice, unsetWatchDevice, closeSubLeftNav } from '../../actions';
import DeviceLocations from './DeviceLocations';
import DWDevice from './DWDevice';
import './DeviceWatch.scss';
import DevicesLoading from './DevicesLoading';
import axiosInstance from '../../api/api';


class DeviceWatch extends Component {
    state = {
        errors: [],
        loading: false,
        devices: []
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
            const { token, company } = this.props;
            this.setState({ loading: true });
            axiosInstance.get(`/api/user/devicewatch/devices/${company.id}?auto_created=false`).then(e => {
                this.setState({ loading: false, devices: e.data.devices });
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

    handleDeviceClick = device => {

        const { company } = this.props;

        this.props.setWatchDevice(device);

        this.props.history.push(`/${company.slug}/device-watch/view/${device.device.machine_name}`);
    }

    listDevices = (devices, token) => {
        const { company } = this.props;
        return _.map(devices, dc => {
            return <DWDevice dc={dc} token={token} key={dc.device.public_ip} company={company} handleDeviceRemove={this.handleDeviceRemove} handleNickNameChanged={this.handleNickNameChanged} handleDeviceClick={this.handleDeviceClick} />
        });
    }

    handleNickNameChanged = device => {
        const { devices } = this.state;
        let index = _.findIndex(devices, dc => {
            return dc.device_id === device.device_id;
        });
        devices[index] = device;
        this.setState({ devices });
    }

    handleDeviceRemove = device => {
        const { devices } = this.state;
        _.remove(devices, (dc) => {
            return dc.device_id === device.device_id;
        });
        this.setState({ devices });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, devices, errors } = this.state;
        const { leftnav, token } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <div className="page__header">
                    <div className="heading">
                        Devices
                    </div>
                </div>

                <div style={{ margin: '15px 15px 55px 15px', height: '100% !important' }} >

                    <Grid>
                        <Grid.Column width={9}>

                            {loading ? <DevicesLoading /> :
                                <Grid doubling columns={3}>

                                    {this.listDevices(devices, token)}

                                    {_.isEmpty(devices) && !loading ? <Message
                                        style={{ margin: '15px 10px 0px 15px' }}
                                        color='orange'
                                        icon='desktop'
                                        header='No device found?'
                                        content='Have you downloaded and installed DeviceWatch Application on your machine?'
                                    /> : ''}
                                </Grid>
                            }

                        </Grid.Column>
                        <Grid.Column width={7}>
                            {!_.isEmpty(devices) ?
                                <Segment style={{ height: '100%!important' }}>
                                    <DeviceLocations devices={devices} />
                                </Segment>
                                : ''}
                        </Grid.Column>
                    </Grid>

                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    devicewatch: state.devicewatch
});

export default connect(mapStateToProps, { setWatchDevice, unsetWatchDevice, closeSubLeftNav })(DeviceWatch);
