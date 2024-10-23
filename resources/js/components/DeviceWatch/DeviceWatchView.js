import React, { Component } from 'react';
import './DeviceWatch.scss';
import { Grid, Image, Card, Header, Segment, Table, Icon } from 'semantic-ui-react';
import { GoDeviceDesktop } from "react-icons/go";
import _ from 'lodash';
import { connect } from 'react-redux';
import { setWatchDevice, unsetWatchDevice } from '../../actions';
import DWDirectories from './DWDirectories';
import DeviceLocation from './DeviceLocation';
import { withRouter } from 'react-router';
import DWStats from './DWStats';
import axiosInstance from '../../api/api';

class DeviceWatchView extends Component {
    state = {
        errors: [],
        loading: false,
        directories: []
    }

    componentDidMount() {
        const { token, device, company } = this.props;
        this.setState({ loading: true });
        axiosInstance.get(`/api/user/devicewatch/device/directories/${device.device.id}/${company.id}`).then(e => {
            this.setState({ loading: false, directories: e.data.directories });
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

    listDirectories = directories => {
        return _.map(directories, directory => {
            return (
                <Header key={directory.id} as='h4'>{directory.path}</Header>
            );
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, errors, directories } = this.state;
        const { leftnav, device, company, token } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <div className="page__header">
                    <div className="heading">
                        {device.nickname != null ? device.nickname : device.device.machine_name}
                    </div>
                </div>

                <div style={{ margin: '15px 15px 55px 30px', height: '100% !important', paddingBottom: '55px' }} >

                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={9}>
                                <Segment>

                                    <Header as="h3">Device Details</Header>

                                    <Table celled striped>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell colSpan='2'>{device.device.operating_system}</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    Device Name
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {device.device.machine_name}
                                                </Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    Username
                                                </Table.Cell>
                                                <Table.Cell>{device.device.username}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    Device Encrypted?
                                                </Table.Cell>
                                                <Table.Cell>{device.device.device_encrypted}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    Public IP
                                                </Table.Cell>
                                                <Table.Cell>{device.device.public_ip}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    Private IP
                                                </Table.Cell>
                                                <Table.Cell>{device.device.private_ip}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    <Icon name='file outline' />Antivirus Installed?
                                                </Table.Cell>
                                                <Table.Cell>{device.device.antivirus_status}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    <Icon name='file outline' /> Windows Defender
                                                </Table.Cell>
                                                <Table.Cell>{device.device.windows_defender}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    <Icon name='file outline' /> Domain Firewall
                                                </Table.Cell>
                                                <Table.Cell>{device.device.domain_firewall}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    <Icon name='file outline' /> Private Firewall
                                                </Table.Cell>
                                                <Table.Cell>{device.device.private_firewall}</Table.Cell>

                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell width={5}>
                                                    <Icon name='file outline' /> Public Firewall
                                                </Table.Cell>
                                                <Table.Cell>{device.device.public_firewall}</Table.Cell>

                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Segment style={{ height: '100%!important' }}>
                                    <Header as="h3">Device Location</Header>

                                    <DeviceLocation device={device.device} />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={9}>
                                <DWDirectories directories={directories} company={company} />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <DWStats token={token} device={device} company={company} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    device: state.devicewatch.device
});

export default withRouter(connect(mapStateToProps, { setWatchDevice, unsetWatchDevice })(DeviceWatchView));
