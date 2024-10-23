import React, { Component } from 'react';
import { Grid, Label, Popup, Card, Confirm } from 'semantic-ui-react';
import { GoDeviceDesktop } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import { FcFullTrash } from "react-icons/fc";
import DeviceNickName from './DeviceNickName';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../api/api';

class DWDevice extends Component {

    state = {
        open_nk: false,
        remove_device: false,
        errors: [],
        loading: false
    }

    handleDeviceClick = dc => {
        this.props.handleDeviceClick(dc);
    };

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

    handleDeviceRemove = () => {
        this.setState({ remove_device: true });
    };

    handleRemoveCancel = () => {
        this.setState({ remove_device: false });
    };

    handleRemoveConfirm = () => {
        this.setState({ errors: [], loading: true });

        const { token, dc } = this.props;

        axiosInstance.post('/api/user/devicewatch/device/remove', { device_id: dc.device_id, comp_id: dc.comp_id })
            .then(response => {
                this.setState({
                    errors: [],
                    loading: false
                });
                this.props.handleDeviceRemove(dc);
                NotificationManager.success('Device has been successfully removed!', 'Success');
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
                    const errors = err.response.data.errors;

                    this.setState({ errors: this.state.errors.concat(errors), loading: false });

                }

                if (err.response.status === 404) {
                    const errors = err.response.data.errors;

                    NotificationManager.error('Device Not found!', 'Error');

                }
            });
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { dc, token, company } = this.props;
        const { open_nk, remove_device } = this.state;

        return (<Grid.Column>
            <Card>

                <Card.Content>
                    {dc.device.status === 1 ? <Label as='a' color='green' ribbon='right'>
                        Active
                    </Label> : <Label as='a' color='red' ribbon='right'>
                        Inactive
                    </Label>}


                    <GoDeviceDesktop width="26" style={{ fontSize: '25px', marginLeft: '-60px' }} />

                    <div style={{
                        display: 'flex', justifyContent: 'space-between', marginTop: '10px'
                    }}>
                        <Card.Header onClick={() => { this.handleDeviceClick(dc) }} style={{ marginTop: '0px', color: '#4183c4', cursor: 'pointer', fontWeight: '100', fontSize: '14px' }}>

                            {dc.nickname != null ? dc.nickname : dc.device.machine_name}

                        </Card.Header>

                        <Popup
                            trigger={<BiEditAlt onClick={this.handleInitNickName} style={{
                                cursor: 'pointer', fontSize: '18px'
                            }} />}
                            content='Set Device Nickname'
                            position='bottom left'
                        />

                    </div>
                    <Card.Meta>IP: {dc.device.public_ip}</Card.Meta>
                    <Card.Description style={{
                        display: 'flex', justifyContent: 'space-between', marginTop: '10px'
                    }}>
                        <strong>{dc.device.username}</strong>

                        <Popup
                            trigger={<FcFullTrash onClick={this.handleDeviceRemove} style={{
                                cursor: 'pointer', fontSize: '18px'
                            }} />}
                            content='Remove Device'
                            position='bottom left'
                        />
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

            </Card>

        </Grid.Column>);
    }
}

export default DWDevice;
