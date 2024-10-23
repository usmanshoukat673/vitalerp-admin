import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Button, Modal, Header, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser, clearToken } from '../../actions';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/api';

class AssignUser extends Component {

    state = {
        loading: false,
        assigning: false,
        assigning_user: '',
        users: []
    }

    componentDidMount() {
        const { company, team } = this.props;

        this.setState({ loading: true });

        axiosInstance.get('/api/user/teams/profile/users/' + company.id + '/' + team.enc_id).then(e => {
            this.setState({ loading: false, users: e.data.users });
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
    closeAU = () => {
        this.props.onFinish();
    }

    assignUser = user => {
        const {  team } = this.props;

        this.setState({ assigning: true, assigning_user: user });

        axiosInstance.post('/api/user/teams/assign-user', {
            team_id: team.id,
            user_id: user.id
        }).then(e => {

            let users = this.state.users;
            _.remove(users, item => {
                return item.user_id === user.id;
            })

            this.setState({ assigning: false, assigning_user: '', users: users });


            this.props.onUserAssigned(e.data.user);
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], assigning: false, assigning_user: '' });
            }
            if (err.response.status === 401) {
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }

            if (err.response.status === 422) {
                this.setState({ errors: [], assigning: false, assigning_user: '' });
                NotificationManager.error(err.response.data.error_message, 'Error');
            }
        });
    }

    listUsers = (users, assigning) => {
        const { assigning_user } = this.state;
        return (<List divided relaxed>{_.map(users, (user, index) => (
            <List.Item key={user.user.id} className="list__item">
                <div className={index % 2 ? 'initials odd' : 'initials even'} >{this.getInitial(user.user.first_name + ' ' + user.user.last_name)}</div>
                <List.Content>
                    <List.Header as='a' >{user.user.first_name} {' '} {user.user.last_name}</List.Header>

                </List.Content>
                <Button disabled={assigning && assigning_user.id === user.user_id} className={assigning && assigning_user.id === user.user_id ? 'loading' : ''} style={{ marginLeft: '25px' }} size="mini" basic color='orange' onClick={() => { this.assignUser(user.user) }}>
                    Assign
                </Button>
            </List.Item>
        ))}</List>);
    }

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    render() {

        const { loading, users, assigning } = this.state;
        const { assigning_users, company } = this.props;

        return (
            <React.Fragment>
                <Modal dimmer="inverted" className="semtic__modal" open={assigning_users} onClose={this.closeAU}>
                    <Modal.Header>Assign Users</Modal.Header>
                    <Modal.Content className="listing_row">

                        <Modal.Description>
                            <Header>Available Users</Header>
                            <p>
                                Select Users from the list and click assign button to add user into the Team.
              </p>

                            {this.listUsers(users, assigning)}

                            <p>
                                Need more users Click here to <Link to={`/${company.slug}/settings/invite-user`}>Invite User</Link>
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>

                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Done."
                            onClick={this.closeAU}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default connect(mapStateToProps, { clearUser, clearToken })(AssignUser);
