import React, { Component } from 'react';
import './Devices.scss';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection, setLocationStatus, setOrgsAutoDevices } from '../../actions';
import _ from 'lodash';
import DevicesLoading from '../DeviceWatch/DevicesLoading';
import DeviceDetector from './DeviceDetector';
import { withRouter } from 'react-router';
import axiosInstance from '../../api/api';
import VisitDashboardBreadcrum from './VisitDashboardBreadcrum';

class Devices extends Component {

    state = {
        errors: [],
        loading: false,
    }

    componentDidMount() {
        // if (_.isEmpty(this.props.user)) {
        //     this.props.history.push('/login');
        // }
        // else if (_.isEmpty(this.props.company)) {
        //     this.props.history.push('/select-organization');
        // }
        // else {

        //     this.props.closeSubLeftNav();
        //     this.props.selectControlFunction({});
        //     this.props.selectCatalogSection({});

        //     const { company } = this.props;
        //     this.setState({ loading: true });
        //     axiosInstance.get(`/api/user/dashboard/devices/${company.id}?auto_created=true`).then(e => {
        //         this.setState({ loading: false });
        //         this.props.setOrgsAutoDevices(e.data.devices);
        //     }).catch(err => {
        //         if (err.response.status === 500) {
        //             this.setState({ errors: [], loading: false });
        //         }
        //         if (err.response.status === 401) {
        //             this.setState({ errors: [], loading: false });
        //             this.props.history.push('/login');
        //         }
        //     });

        // }
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
        const { leftnav, auto_devices, token, company } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="device__mainbd">
                    <div className="device__breadcrum"><VisitDashboardBreadcrum /> {' > '} Device Logins</div>

                    <div className="device__header">
                        <div className="__name">Device Logins</div>
                        <div className="__actions">
                        </div>
                    </div>
                </div>


                <div className="devices__container">

                    {loading ? <DevicesLoading /> :
                        <Grid doubling columns={3}>

                            {this.listDevices(auto_devices, token)}

                        </Grid>
                    }

                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auto_devices: state.devicewatch.auto_devices,
    leftnav: state.leftnav,
    token: state.token.activeToken,
    company: state.orgs.company,
    user: state.user.activeUser,
});

export default withRouter(connect(mapStateToProps, { closeSubLeftNav, selectControlFunction, selectCatalogSection, setLocationStatus, setOrgsAutoDevices })(Devices));
