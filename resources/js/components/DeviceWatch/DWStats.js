import React, { Component } from 'react';
import { Pagination, Segment, Header, Message } from 'semantic-ui-react';
import _ from 'lodash';
import showTZDate from '../../utils/showTZDate';
import { withRouter } from 'react-router';
import axiosInstance from '../../api/api';

class DWStats extends Component {

    state = {
        errors: [],
        loading: false,
        stats: [],
        activePage: 1,
        totalPages: 0,
    }

    componentDidMount() {
        this.loadStats(1);
    }

    handlePaginationChange = (e, { activePage }) => this.loadStats(activePage);

    loadStats = page => {
        const { token, device } = this.props;
        this.setState({ loading: true });
        axiosInstance.get(`/api/user/devicewatch/device/stats/${device.device.id}?page=${page}`).then(e => {
            this.setState({ loading: false, stats: e.data.stats.data, activePage: e.data.stats.current_page, totalPages: e.data.stats.last_page });
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

    listStats = stats => {

        const { company } = this.props;

        return _.map(stats, stat => {
            return (stat.status === 'Stop' ?
                <Message negative key={stat.id}>
                    <Message.Header>{stat.status}</Message.Header>
                    <p>Device stopeed at {showTZDate(stat.event_date, company.timezone)}</p>
                </Message> : <Message info key={stat.id}>
                    <Message.Header>{stat.status}</Message.Header>
                    <p>Device started at {showTZDate(stat.event_date, company.timezone)}</p>
                </Message>
            );;
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { stats, activePage, totalPages } = this.state;

        return (
            <Segment>
                <Header as="h3">Stats</Header>

                {this.listStats(stats)}

                <div className="activity__container">
                    <Pagination
                        activePage={activePage}
                        onPageChange={this.handlePaginationChange}
                        totalPages={totalPages} />
                </div>
            </Segment>
        );
    }
}

export default withRouter(DWStats);
