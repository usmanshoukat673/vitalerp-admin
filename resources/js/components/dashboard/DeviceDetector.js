import React, { Component } from 'react';
import { Grid, Label, Popup, Card, Confirm, Button } from 'semantic-ui-react';
import { GoDeviceDesktop } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import _ from 'lodash';
import DeviceNickName from '../DeviceWatch/DeviceNickName';
import './DeviceDetector.scss';
import axiosInstance from '../../api/api';


class DeviceDetector extends Component {
    state = {
        open_nk: false,
        remove_device: false,
        errors: [],
        loading: false,
        setting_location: false,
    }

    handleInitNickName = () => {
        this.setState({ open_nk: true });
    };

    handleNickNameClose = () => {
        this.setState({ open_nk: false });
    };

    handleNickNameChanged = device => {
        this.props.handleNickNameChanged(device);
        this.setState({ open_nk: false });
    };

    handleDeviceTypeClick = location_type => {
        const { dc } = this.props;
        this.setState({ setting_location: true });
        axiosInstance.post(`/api/user/devicewatch/device-type`, { device_id: dc.device_id, location_type: location_type }).then(e => {
            this.setState({ setting_location: false }, () => {
                this.props.handleDeviceLocation(e.data.device);
            });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], setting_location: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], setting_location: false });
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
        const { dc, token, company } = this.props;
        const { open_nk, remove_device, setting_location } = this.state;

        return (<Grid.Column>
            <Card fluid color='green'>

                <Card.Content>


                    <GoDeviceDesktop width="26" style={{ fontSize: '25px' }} />

                    <div style={{
                        display: 'flex', justifyContent: 'space-between', marginTop: '10px'
                    }}>
                        <Card.Header style={{ marginTop: '0px', color: '#4183c4', cursor: 'pointer', fontWeight: '100', fontSize: '14px' }}>

                            {dc.nickname != null ? dc.nickname : dc.device.operating_system}

                        </Card.Header>

                        <Popup
                            trigger={<BiEditAlt onClick={this.handleInitNickName} style={{
                                cursor: 'pointer', fontSize: '18px'
                            }} />}
                            content='Set Device Nickname'
                            position='bottom left'
                        />

                    </div>
                    <Card.Description>OS: {_.capitalize(dc.device.operating_system)} {`${dc.device.os_major_version}.${dc.device.os_minor_version}`}</Card.Description>
                    <Card.Description>IP: {dc.device.public_ip}</Card.Description>

                    {!_.isEmpty(dc.location_type) ?
                        <Card.Description>Location: {_.capitalize(dc.location_type)} Location</Card.Description>
                        : ''}

                    <Card.Description>Browser: {_.capitalize(dc.device.browser)} {`${dc.device.browser_major_version}.${dc.device.browser_minor_version}`}</Card.Description>

                    {!_.isEmpty(dc.device.city) ?
                        <Card.Description>{`Address: ${dc.device.city} ${dc.device.region}, ${dc.device.country} - ${dc.device.postalcode}`}</Card.Description>
                        : ''}
                    {!_.isEmpty(dc.device.ip_org) ?
                        <Card.Description>{`ISP: ${dc.device.ip_org}`}</Card.Description>
                        : ''}
                    {!_.isEmpty(dc.device.timezone) ?
                        <Card.Description>{`Timezone: ${dc.device.timezone}`}</Card.Description>
                        : ''}
                    <Card.Description style={{
                        display: 'flex', justifyContent: 'space-between', marginTop: '10px'
                    }}>
                        <strong>{dc.device.username}</strong>


                    </Card.Description>

                    {open_nk ? <DeviceNickName dc={dc} token={token} open={true} handleNickNameChanged={this.handleNickNameChanged} handleNickNameClose={this.handleNickNameClose} /> : ''}

                    <Confirm
                        className="semtic__modal"
                        open={remove_device}
                        confirmButton="Yes"
                        cancelButton='No'
                        onCancel={this.handleRemoveCancel}
                        onConfirm={this.handleRemoveConfirm}
                        content={`Are you sure you want to remove this device from ${company.name}?`}
                    />
                </Card.Content>
                {_.isEmpty(dc.location_type) ?
                    <Card.Content extra>
                        <p>What is this location your working from, please define.</p>
                        <div className='ui three buttons'>
                            <Popup
                                trigger={<Button disabled={setting_location} onClick={() => { this.handleDeviceTypeClick('company') }} basic color='purple'>
                                    Company
                                </Button>}
                                content='Company Office Location'
                                position='bottom left'
                            />

                            <Popup
                                trigger={<Button disabled={setting_location} onClick={() => { this.handleDeviceTypeClick('remote') }} basic color='violet'>
                                    Remote
                                </Button>}
                                content='Remote Work Location'
                                position='bottom left'
                            />

                            <Popup
                                trigger={<Button disabled={setting_location} onClick={() => { this.handleDeviceTypeClick('other') }} basic color='red'>
                                    Random
                                </Button>}
                                content='Random/Other Location'
                                position='bottom left'
                            />

                        </div>
                    </Card.Content>
                    : ''}
            </Card>

        </Grid.Column>);
    }
}

export default DeviceDetector;
