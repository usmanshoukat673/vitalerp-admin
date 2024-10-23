import React, { Component } from 'react';
import { Icon, Image, Button, Label, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../Organizations.scss';
import _ from 'lodash';
import { Link, withRouter, Route, NavLink } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Users from './Users';

import './OrgProfile.scss';
import InviteUser from './InviteUser';

class OrgProfile extends Component {

    state = {
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    componentWillMount() {
        this.setState({ loading: true });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { profile_company } = this.props;
        const { loading } = this.state;

        return (
            <div>
                <div className="page__header">
                    <div>
                        <div className="heading">
                            {profile_company.name} Settings
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="row profile__row">

                    <div className="col-md-12 profile__column">
                        {this.props.match.url}
                        <div className="profile__menu">
                            <ul>
                                <li>
                                    <NavLink exact activeClassName="active" to={this.props.match.url}>Users</NavLink>
                                </li>
                                <li>
                                    <NavLink exact activeClassName="active" to={`/${profile_company.slug}/settings/invite-user`}>Invite User</NavLink>
                                </li>

                            </ul>
                        </div>

                        <div>
                            <Route exact path={this.props.match.url} component={Users} />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    profile_company: state.orgs.profile_company
});

export default withRouter(connect(mapStateToProps)(OrgProfile));
