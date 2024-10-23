import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Button, List, Divider, Modal, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser, clearToken } from '../../actions';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import AssignUser from './AssignUser';
import showTZDate from '../../utils/showTZDate';
import axiosInstance from '../../api/api';
import LoadingBackgrop from '../LoadingBackgrop';

class TeamProfile extends Component {

    state = {
        loading: false,
        removing: false,
        team: '',
        users: [],
        assigning_users: false,
        deletePrompt: false,
        userToRemove: ''
    }

    componentDidMount() {
        const { company } = this.props;
        const { id } = this.props.match.params;

        this.setState({ loading: true });

        axiosInstance.get('/api/user/teams/profile/' + company.id + '/' + id).then(e => {
            this.setState({ loading: false, team: e.data.team, users: e.data.team.users });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }
        });
    }

    showAU = () => {
        this.setState({ assigning_users: true });
    }

    closeAU = () => this.setState({ assigning_users: false })

    listUsers = (users, company) => {
        const { removing } = this.state;
        return (<List divided relaxed>{_.map(users, (user, index) => (
            <List.Item key={user.user.id} className="list__item">
                <div className={index % 2 ? 'initials odd' : 'initials even'} >{this.getInitial(user.user.first_name + ' ' + user.user.last_name)}</div>
                <List.Content>
                    <List.Header >{user.user.first_name} {' '} {user.user.last_name}</List.Header>
                    <List.Description>
                        Assign By: {user.user.id === user.assigned_by ? 'Self' : `${user.assignee.first_name} ${user.assignee.last_name}`} At {showTZDate(user.created_at, company.timezone)}
                    </List.Description>
                </List.Content>
                <Button size="mini" disabled={removing} onClick={() => { this.removeUser(user) }} style={{ marginLeft: '15px' }} inverted color="red">Remove</Button>
            </List.Item>
        ))
        }</List>);
    }

    removeUser = user => {
        this.setState({ deletePrompt: true, userToRemove: user });
    }

    confirmRemoveUser = () => {
        const { userToRemove, users } = this.state;

        this.setState({ removing: true });

        axiosInstance.post('/api/user/teams/remove-user', {
            team_id: userToRemove.team_id,
            user_id: userToRemove.user_id
        }).then(e => {
            _.remove(users, u => {
                return userToRemove.user.id === u.user.id;
            });
            this.setState({ removing: false, users: users, deletePrompt: false });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], removing: false });
            }
            if (err.response.status === 401) {
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }

            if (err.response.status === 422) {
                this.setState({ errors: [], removing: false });
                NotificationManager.error(err.response.data.error_message, 'Error');
            }
        });
    };

    handleDeletePromptClose = () => {
        this.setState({ deletePrompt: false, userToRemove: '' });
    }

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    newUserAssigned = user => {
        let users = this.state.users;
        users.push(user);
        this.setState({ users });
    }

    render() {

        const { loading, team, assigning_users, users, deletePrompt, removing } = this.state;
        const { company } = this.props;

        return (
            <React.Fragment>
                {loading ? <LoadingBackgrop open={loading} /> :
                    <React.Fragment>
                        <div className="teams__row">
                            <div className="row">
                                <div className="col-md-12">

                                    <Segment piled style={{ marginBottom: '20px' }} className="listing_row">

                                        <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                                            <h3>{team.name}</h3>
                                            <div>
                                                <Button basic color="teal" onClick={this.showAU}>Assign Users</Button>
                                                <Link to={`/${company.slug}/organization-settings/team-management`}><Button basic color="blue">Back to Teams</Button></Link>
                                            </div>
                                        </div>

                                        <Divider />


                                        {this.listUsers(users, company)}

                                    </Segment>

                                </div>
                            </div>
                        </div>
                        {assigning_users ? <AssignUser team={team} assigning_users={assigning_users} onFinish={this.closeAU} onUserAssigned={this.newUserAssigned} /> : ''}

                        <Modal
                            open={deletePrompt}
                            onClose={this.handleDeletePromptClose}
                            basic
                            size='small'
                            className="semtic__modal"
                        >
                            <Header icon='trash' content='Remove User' />
                            <Modal.Content className="semtic__modal__content">
                                <h3>Do you really want to remove user from team?</h3>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={this.handleDeletePromptClose} inverted>
                                    Cancel
                                </Button>
                                <Button disabled={removing} className={removing ? 'loading' : ''} color='red' onClick={this.confirmRemoveUser} inverted>
                                    Yes, Remove
                                </Button>
                            </Modal.Actions>
                        </Modal>

                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default connect(mapStateToProps, { clearUser, clearToken })(TeamProfile);
