import React, { Component } from 'react';
import _ from 'lodash';
import { Placeholder, Dimmer, Popup, Segment, Button, Pagination, Divider, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser, clearToken } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import showTZDate from '../../../utils/showTZDate';
import Invites from './Invites';
import IconButton from '@mui/material/IconButton';
import EditUser from './EditUser';
import { withRouter } from 'react-router';
import { AiFillEdit } from "react-icons/ai";
import './Users.scss';
import axiosInstance from '../../../api/api';
import VisitDashboardBreadcrum from '../../dashboard/VisitDashboardBreadcrum';

class Users extends Component {

    state = {
        loading: false,
        users: [],
        activePage: 1,
        totalPages: 0,
        user: {},
        edit: false,
    };

    componentDidMount() {
        this.loadUsers(1);
    }

    handlePaginationChange = (e, { activePage }) => this.loadUsers(activePage);


    loadUsers = activePage => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/org/users/${company.id}?page=${activePage}`).then(e => {
            this.setState({
                loading: false,
                users: e.data.users.data,
                activePage: e.data.users.current_page,
                totalPages: e.data.users.last_page
            });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }
        });
    }

    listUsers = (users, company) => {

        return (<Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Joined</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    {/* <Table.HeaderCell>Watch Invite</Table.HeaderCell> */}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {_.map(users, (user, index) => (
                    <Table.Row key={user.user_id} className="table_list_item">
                        <Table.Cell>
                            <div className={index % 2 ? 'initials odd' : 'initials even'} >{this.getInitial(user.user.first_name + ' ' + user.user.last_name)}</div>
                        </Table.Cell>
                        <Table.Cell>
                            {user.user.first_name} {user.user.last_name}
                        </Table.Cell>
                        <Table.Cell>{user.user.email}</Table.Cell>
                        <Table.Cell><strong>{this.displayRole(user.role)}</strong></Table.Cell>
                        <Table.Cell>{showTZDate(user.user.created_at, company.timezone)}</Table.Cell>
                        <Table.Cell>
                            <Popup
                                content="Update user details or Change Role."
                                position='left center'
                                trigger={<IconButton onClick={() => { this.handleEditUser(user, index) }} aria-label="Change User Details" size="medium" color="primary" ><AiFillEdit /></IconButton>}
                            />
                        </Table.Cell>
                        {/* <Table.Cell>
                            <Popup
                                content={user.watch_invited ? `Re-invite to use DeviceWatch Application. Last Invited ${showTZDate(user.watch_invited_at, company.timezone)}` : 'Invite to use DeviceWatch Application.'}
                                position='left center'
                                trigger={<Button onClick={() => { this.handleWatchInvite(user, index) }} circular loading={user.inviting} icon={user.watch_invited ? 'check' : 'clock'} color="teal" />}
                            />


                        </Table.Cell> */}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>);
    }

    handleWatchInvite = (user, index) => {
        const { users } = this.state;
        users[index].inviting = true;
        this.setState({ users }, () => {
            axiosInstance.post('/api/user/org/watch/invite', {
                user_id: user.user_id,
                comp_id: user.comp_id,
                company_name: user.company.name,
            })
                .then(response => {

                    NotificationManager.success('You have successfully invited new team member to use DeviceWatch!', 'Success');

                    let user_company = response.data.user_company;

                    const { users } = this.state;
                    let index = _.findIndex(users, u => {
                        return u.id === user_company.id;
                    });
                    users[index] = user_company;
                    this.setState({ users });

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

                        if (errors.hasOwnProperty('email')) {
                            NotificationManager.warning(errors.email[0], 'Error');
                            this.setState({ loading: false, errors: [] });
                        }
                        else {
                            this.setState({ errors: this.state.errors.concat(errors), loading: false });
                        }

                    }
                });
        });

    }

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    displayRole = role => {
        if (role == 'A') {
            return 'Organization Admin'
        }
        else if (role == 'N') {
            return 'Organization Member'
        }
        else {
            return 'Member';
        }
    }

    handleEditUser = (user, index) => {
        this.setState({ edit: true, user: user });
    }

    handleCloseUserEdit = () => {
        this.setState({ edit: false, user: {} });
    }

    handleSuccessUserEdit = user => {
        const { users } = this.state;
        let index = _.findIndex(users, u => {
            return u.user_id === user.user_id;
        });
        users[index] = user;
        this.setState({ users, edit: false, user: {} });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, users, activePage, totalPages, user, edit } = this.state;
        const { company, token, leftnav } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>

                <div className="uaccounts__mainbd">
                    <div className="uaccounts__breadcrum"><VisitDashboardBreadcrum /> {' > '} Security Settings</div>

                    <div className="uaccounts__header">
                        <div className="__name">User Accounts</div>
                        <div className="__actions">
                            <Link to={`/${company.slug}/organization-settings/user-accounts/invite-user`}><Button basic color="blue">Invite User</Button></Link>
                        </div>
                    </div>
                </div>

                <div className="uaccounts__container">
                    <div className="uaccounts__bucket">
                        <div className="at__bucket__header">All Users</div>
                        <div className="at__bucket__body">

                            {loading ? <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>

                            </Placeholder> :

                                this.listUsers(users, company)

                            }

                            <div className="at_pagination">
                                <Pagination
                                    activePage={activePage}
                                    onPageChange={this.handlePaginationChange}
                                    totalPages={totalPages} />
                            </div>
                        </div>

                    </div>

                    <Invites />
                </div>

                {
                    edit ? <EditUser token={token} user={user} open={edit} handleCloseUserEdit={this.handleCloseUserEdit} handleSuccessUserEdit={this.handleSuccessUserEdit} /> : ''
                }


            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    leftnav: state.leftnav,
});
export default withRouter(connect(mapStateToProps, { clearUser, clearToken })(Users));
