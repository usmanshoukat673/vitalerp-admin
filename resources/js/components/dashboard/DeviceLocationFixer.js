import React, { Component } from 'react';
import './DeviceLocationFixer.scss';
import { Modal, Dropdown, Form } from 'semantic-ui-react';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { setLocationStatus, setOrgsAutoDevices } from '../../actions';
import _ from 'lodash';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import axiosInstance from '../../api/api';
import LoadingBackgrop from '../LoadingBackgrop';

class DeviceLocationFixer extends Component {

    state = {
        errors: [],
        loading: false,
        apps: [],
        devices: [],
        no: false,
        yes: false,
        device: '',
        location: ''
    };

    displayStandardInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleDeviceChange = (event, { value }) => {

        this.setState({ device: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(device)) {
            delete errors[0][device];
            this.setState({ errors: errors });
        }
    };

    handleLocationChange = (event, { value }) => {

        this.setState({ location: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(location)) {
            delete errors[0][location];
            this.setState({ errors: errors });
        }
    };

    handleNoClick = () => {
        const { token, company, auto_devices } = this.props;

        if (_.size(auto_devices) > 1) {
            this.setState({ no: true, yes: false });
        }
        else {
            this.setState({ loading: true });
            axiosInstance.post(`/api/user/dashboard/device-ip-change`).then(e => {
                this.setState({ loading: false, errors: [] });
                this.props.setOrgsAutoDevices(e.data.devices);
                this.props.setLocationStatus(false);
                //
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
    };

    handleAssignDeviceSubmit = () => {
        const { device } = this.state;
        this.setState({ loading: true });
        axiosInstance.post(`/api/user/dashboard/device-location-changed`, { device_id: device }).then(e => {
            this.setState({ loading: false, errors: [] });
            this.props.setOrgsAutoDevices(e.data.devices);
            this.props.setLocationStatus(false);
            //
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

    handleNewDeviceSubmit = () => {
        const { location } = this.state;
        this.setState({ loading: true });
        axiosInstance.post(`/api/user/dashboard/company-new-device`, { location: location }).then(e => {
            this.setState({ loading: false, errors: [] });
            this.props.setOrgsAutoDevices(e.data.devices);
            this.props.setLocationStatus(false);
            //
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, errors, yes, no, location, device } = this.state;
        const { new_location, auto_devices } = this.props;

        const locationOptions = [{
            key: 'company',
            text: 'Company Office Location',
            value: 'company',
        },
        {
            key: 'remote',
            text: 'Remote Work Location',
            value: 'remote',
        },
        {
            key: 'other',
            text: 'Random/Other Location',
            value: 'other',
        }
        ];

        const devicesOptions = _.map(auto_devices, (dc, index) => ({
            key: dc.device_id,
            text: `${dc.nickname} - ${_.capitalize(dc.device.operating_system)} ${dc.device.os_major_version}.${dc.device.os_minor_version}`,
            value: dc.device_id,
        }));

        return (
            <Modal
                size="tiny"
                open={new_location}
                className="semtic__modal deviceLocationFixer"
            >
                <Modal.Header className="deviceLocationFixer__header"><AssignmentLateTwoToneIcon className="deviceLocationFixer__heading__icon" /> Change Detected</Modal.Header>
                <Modal.Content className="deviceLocationFixer__content">
                    {loading ? <LoadingBackgrop open={loading} /> : ''}
                    <p>We have detected a change from last location/ip/device you logged in.</p>
                    {!yes && !no ? <p>Is this your new device ?</p> : ''}

                    {yes && <Form.Field>
                        <label>What is this location your working from, please select one?</label>
                        <Dropdown
                            className="deviceLocationFixer__dropdown"
                            placeholder='Location'
                            onChange={this.handleLocationChange}
                            value={location}
                            search
                            fluid
                            selection
                            options={locationOptions}
                        />
                        {this.displayStandardInputError(errors, 'location')}
                    </Form.Field>}

                    {/** only show this if you have multiple devices */}
                    {no && <Form.Field>
                        <label>Please select the device your working from?</label>
                        <Dropdown
                            className="deviceLocationFixer__dropdown"
                            placeholder='Select Device'
                            onChange={this.handleDeviceChange}
                            value={device}
                            search
                            fluid
                            selection
                            options={devicesOptions}
                        />
                        {this.displayStandardInputError(errors, 'device')}
                    </Form.Field>}

                    {
                        !yes && !no ? <div className="deviceLocationFixer__action__buttons">
                            <Button variant="contained" onClick={() => this.setState({ no: false, yes: true })} color="primary">
                                Yes
                            </Button>

                            <Button variant="contained" onClick={this.handleNoClick}>No</Button>
                        </div> : ''
                    }

                </Modal.Content>

                <Modal.Actions>
                    {
                        yes &&
                        <Button disabled={loading} variant="contained" className="deviceLocationFixer__submit" onClick={this.handleNewDeviceSubmit} color="primary">
                            Submit
                        </Button>

                    }

                    {
                        no &&
                        <Button disabled={loading} variant="contained" className="deviceLocationFixer__submit" onClick={this.handleAssignDeviceSubmit} color="primary">
                            Submit
                        </Button>

                    }
                </Modal.Actions>
            </Modal>
        );
    }
}


const mapStateToProps = (state) => ({
    device_newly_assigned: state.user.device_newly_assigned,
    new_location: state.orgs.new_location,
    auto_devices: state.devicewatch.auto_devices,
});

export default connect(mapStateToProps, { setLocationStatus, setOrgsAutoDevices })(DeviceLocationFixer);
