import React, { Component } from 'react';
import './AppFreshdesk.scss';
import { NotificationManager } from 'react-notifications';
import { Image, Table, Card, Item, Divider, Label, Popup, Button, Icon, Tab, List } from 'semantic-ui-react';
import _ from 'lodash';
import showCurrentTZDate from '../../utils/showCurrentTZDate';
import showTZDate from '../../utils/showTZDate';
import { TiInfo } from "react-icons/ti";
import IssueTicket from './IssueTicket';
import axiosInstance from '../../api/api';

class AppFreshdesk extends Component {

    state = {
        loading: false,
        connecting: false,
        refreshing: false,
        errors: [],
        agents: [],
        tickets: [],
        freshdesk: {},
        ticket: false,
        ticket_agent: {}
    }

    componentDidMount() {
        const { app } = this.props;

        this.setState({ loading: true });
        axiosInstance.post(`/api/user/applications/freshdesk/agents`,
            {
                comp_id: app.comp_id,
                application_id: app.id
            }).then(e => {
                this.setState({ loading: false, agents: e.data.agents, freshdesk: e.data.freshdesk, tickets: e.data.tickets });
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

    handleReconnect = () => {
        const { app } = this.props;

        this.setState({ connecting: true });
        axiosInstance.post(`/api/user/applications/freshdesk/reconnet`,
            {
                application_id: app.id,
                comp_id: app.comp_id
            }).then(e => {
                this.setState({ connecting: false, freshdesk: e.data.freshdesk }, () => {
                    NotificationManager.success('Freshdesk re-connected successfully!', 'Success');
                });
            }).catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], connecting: false });
                }
                if (err.response.status === 401) {

                    this.setState({
                        errors: [], connecting: false,

                    });

                    NotificationManager.error('Invalid API Details, please verify and enter correct information.', 'Error');

                }
                if (err.response.status === 404) {

                    this.setState({
                        errors: [], connecting: false,

                    });

                    NotificationManager.error('Invalid Domain Name, please verify domain name is correct.', 'Error');

                }
                if (err.response.status === 403) {

                    this.setState({
                        errors: [], connecting: false,

                    });

                    NotificationManager.error('Forbidden: Your account has been suspended, Please contact Freshdesk Support.', 'Error');

                }
            });
    }

    handleRefresh = () => {
        const { app } = this.props;

        this.setState({ refreshing: true, loading: true });
        axiosInstance.post(`/api/user/applications/freshdesk/refresh`,
            {
                application_id: app.id,
                comp_id: app.comp_id
            }).then(e => {
                this.setState({ refreshing: false, loading: false, errors: [], agents: e.data.agents, freshdesk: e.data.freshdesk, tickets: e.data.tickets }, () => {
                    NotificationManager.success('Freshdesk Refreshed successfully!', 'Success');
                });
            }).catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], refreshing: false, loading: false });
                }
                if (err.response.status === 401) {

                    this.setState({
                        errors: [], refreshing: false, loading: false

                    });

                    NotificationManager.error('Invalid API Details, please verify and enter correct information.', 'Error');

                }
                if (err.response.status === 404) {

                    this.setState({
                        errors: [], refreshing: false, loading: false

                    });

                    NotificationManager.error('Invalid Domain Name, please verify domain name is correct.', 'Error');

                }
                if (err.response.status === 403) {

                    this.setState({
                        errors: [], refreshing: false, loading: false
                    });

                    NotificationManager.error('Forbidden: Your account has been suspended, Please contact Freshdesk Support.', 'Error');

                }
                if (err.response.status === 429) {

                    this.setState({
                        errors: [], refreshing: false, loading: false

                    });

                    NotificationManager.warning(`You can attempt refresh after next ${err.response.data.error_message} minute.`, 'Too Many Attempts!');

                }
            });
    }

    handleIssueTicket = agent => {
        this.setState({ ticket: true, ticket_agent: agent });
    }

    closeFDTicket = () => {
        this.setState({ ticket: false });
    }

    ticketCreated = tickets => {
        this.setState({ ticket: false, tickets: tickets });
    }

    listAgents = (agents) => {

        return (<Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Session Active</Table.HeaderCell>
                    <Table.HeaderCell>Last Active</Table.HeaderCell>
                    <Table.HeaderCell>Ticket</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {_.map(agents, (agent, index) => (
                    <Table.Row key={agent.id} className="table_list_item">
                        <Table.Cell>
                            <div className={index % 2 ? 'initials odd' : 'initials even'} >{this.getInitial(agent.name)}</div>
                        </Table.Cell>
                        <Table.Cell>
                            {agent.name}
                        </Table.Cell>
                        <Table.Cell>{agent.email}

                            {_.map(agent.roles, role => (
                                <Popup key={role.updated_at} content={role.role.description} position='right center' trigger={<Label as='a' tag>
                                    {role.role.name}
                                </Label>
                                } />
                            ))}
                        </Table.Cell>

                        <Table.Cell>{showCurrentTZDate(agent.last_login_at)}</Table.Cell>
                        <Table.Cell>{showCurrentTZDate(agent.last_active_at)}</Table.Cell>
                        <Table.Cell>
                            <Popup content="Issue Ticket" position='right center' trigger={
                                <Icon color="green" onClick={() => { this.handleIssueTicket(agent) }} style={{ cursor: 'pointer' }} name="ticket" />
                            } />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>);
    }

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    listTickets = tickets => {

        return (<Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Created At</Table.HeaderCell>
                    <Table.HeaderCell>Updated At</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {_.map(tickets, (ticket, index) => (
                    <Table.Row key={ticket.id}  >
                        <Table.Cell>
                            <Icon name='ticket' size='large' verticalAlign='middle' />
                        </Table.Cell>
                        <Table.Cell>
                            {ticket.subject}
                        </Table.Cell>
                        <Table.Cell>
                            {ticket.type}
                        </Table.Cell>

                        <Table.Cell>{showCurrentTZDate(ticket.created)}</Table.Cell>
                        <Table.Cell>{showCurrentTZDate(ticket.updated)}</Table.Cell>

                    </Table.Row>
                ))}
            </Table.Body>
        </Table>);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { app, token } = this.props;

        const { agents, loading, freshdesk, connecting, refreshing, ticket, ticket_agent, tickets } = this.state;


        const panes = [
            {
                menuItem: 'Users',
                render: () => <Tab.Pane loading={loading} style={{ overflow: 'auto' }}>
                    {this.listAgents(agents)}
                </Tab.Pane>,
            },
            {
                menuItem: 'Tickets', render: () => <Tab.Pane loading={loading} style={{ overflow: 'auto' }}>
                    {this.listTickets(tickets)}
                </Tab.Pane>
            },
        ]

        return (
            <React.Fragment>

                <Card.Content>

                    <div className="app__header">
                        <Image className="application__image" size='small' rounded verticalAlign='middle' src={app.integration.logo} />

                        {freshdesk.expired ? <div><Label color="red">Service Unreachable</Label>  <Popup
                            trigger={<Icon name='info' color='red' size='large' circular />}
                            content='There are several possible reasons for this such as Your Freshdesk subscription might have been expired or Your freshdesk account API Key might get changed or Refreshed or The Freshdesk sub domain has changed.'
                            position='right center'
                        /></div> : ''}

                        {freshdesk.expired ? <Button disabled={connecting} className={connecting ? 'loading' : ''} onClick={this.handleReconnect} basic color="teal">Try Connecting</Button> : ''}
                        {!freshdesk.expired ? <Button
                            disabled={refreshing}
                            className={refreshing ? 'loading' : ''}
                            onClick={this.handleRefresh}
                            basic color="green"
                        >
                            <Icon name="redo" /> Refresh
                        </Button> : ''}
                    </div>

                    <Divider />

                    <Tab panes={panes} />

                    {ticket ? <IssueTicket agent={ticket_agent} created={this.ticketCreated} token={token} app={app} cancel={this.closeFDTicket} /> : ''}
                </Card.Content>

            </React.Fragment>
        );
    }
}

export default AppFreshdesk;
