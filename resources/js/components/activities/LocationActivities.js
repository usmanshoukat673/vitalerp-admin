import React, { Component } from 'react';
import { Pagination, Message } from 'semantic-ui-react';
import './LocationActivities.scss';
import _ from 'lodash';
import showTZDate from '../../utils/showTZDate';
import { FiActivity } from "react-icons/fi";
import axiosInstance from '../../api/api';

class LocationActivities extends Component {

    state = {
        errors: [],
        loading: false,
        activities: [],
        activePage: 1,
        totalPages: 0,
    }

    componentDidMount() {
        this.loadActivities(1);
    }

    loadActivities = activePage => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/org/location-activities/${company.id}?page=${activePage}`).then(e => {
            this.setState({ loading: false, activities: e.data.activities.data, activePage: e.data.activities.current_page, totalPages: e.data.activities.last_page });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    }

    handlePaginationChange = (e, { activePage }) => this.loadActivities(activePage);

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    detectActivity = (activity, company) => {
        if (activity.event_type == 'location_change') {
            return `${activity.user.first_name} ${activity.user.last_name} changed company default location at ${showTZDate(activity.created_at, company.timezone)}`;
        }
        else if (activity.event_type == 'location_updated') {
            return `${activity.user.first_name} ${activity.user.last_name} changed location details at ${showTZDate(activity.created_at, company.timezone)}`;
        }
        else {
            return `${activity.user.first_name} ${activity.user.last_name} created new location at ${showTZDate(activity.created_at, company.timezone)}`;
        }
    }

    render() {
        const {
            loading,
            activities, activePage, totalPages

        } = this.state;

        const { company } = this.props;

        return (<div className="activity__bucket">
            <div className="at__bucket__header">Location Activities</div>
            <div className="at__bucket__body">
                {
                    _.map(activities, activity => {
                        return (
                            <div className="__activity__item" key={activity.id}>
                                <div className="__listitem__at_icon">
                                    <FiActivity />
                                </div>

                                <div className="__listitem__at_secion">
                                    <div className="__the__at">
                                        {this.detectActivity(activity, company)}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="at_pagination">
                <Pagination
                    activePage={activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={totalPages} />
            </div>
        </div>);
    }
}

export default LocationActivities;
