import React, { Component } from 'react';
import { Segment, Header, Message, Pagination } from 'semantic-ui-react';
import { FaKey } from "react-icons/fa";
import _ from 'lodash';
import showCurrentTZDate from '../../utils/showCurrentTZDate';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { clearUser, clearToken } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import { connect } from 'react-redux';
import axiosInstance from '../../api/api';

class PasswordActivities extends Component {

    state = {
        loading: false,
        errors: [],
        activePage: 1,
        totalPages: 0,
        activites: [],

    }

    componentDidMount() {
        this.loadActivities(1);
    }

    handlePaginationChange = (e, { activePage }) => this.loadActivities(activePage);

    loadActivities = page => {

        this.setState({ loading: true });

        axiosInstance.get('/api/user/activities/password?page=' + page).then(e => {
            this.setState({ loading: false, activites: e.data.activities.data, activePage: e.data.activities.current_page, totalPages: e.data.activities.last_page });
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

    listActivities = activites => {
        return (
            _.map(activites, activity => (
                <Message key={activity.created_at}>
                    <Message.Header>Password changed</Message.Header>
                    <Message.Content><strong>
                        {showCurrentTZDate(activity.created_at)}

                    </strong> from <strong>{activity.ip}</strong> with a {activity.system}</Message.Content>
                </Message>
            ))
        );
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { activites, activePage, totalPages } = this.state;

        return (
            <React.Fragment>
                <Segment>
                    <Header size='medium'><FaKey className="change_pwd_key_icon" /> &nbsp; Password History</Header>

                    <p>Your recent password activity:</p>

                    {this.listActivities(activites)}

                    <div className="activity__container">
                        <Pagination
                            activePage={activePage}
                            onPageChange={this.handlePaginationChange}
                            totalPages={totalPages} />
                    </div>
                </Segment>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { clearUser, clearToken })(PasswordActivities));
