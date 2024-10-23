import React, { Component } from 'react';
import { Pagination, Message } from 'semantic-ui-react';
import './ControlActivities.scss';
import _ from 'lodash';
import showTZDate from '../../utils/showTZDate';
import { FiActivity } from "react-icons/fi";
import axiosInstance from '../../api/api';

class ControlActivities extends Component {

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

        axiosInstance.get(`/api/user/org/control-activities/${company.id}?page=${activePage}`).then(e => {
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
        if (activity.activity == 'Applicability') {

            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} said ${activity.control.short_name}(${activity.standard.name}) is ${activity.ctrl_applicability} at ${showTZDate(activity.created_at, company.timezone)}`);
            }

            return (`${activity.user.first_name} ${activity.user.last_name} has made control ${activity.ctrl_applicability} at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Status') {
            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} has changed ${activity.control.short_name}(${activity.standard.name}) status to ${activity.ctrl_status} at ${showTZDate(activity.created_at, company.timezone)}`);
            }
            return (`${activity.user.first_name} ${activity.user.last_name} has changed control status to ${activity.ctrl_status} at ${showTZDate(activity.created_at, company.timezone)}`);
        }

        else {
            return '';
        }
    }

    render() {
        const {
            loading,
            activities, activePage, totalPages

        } = this.state;

        const { company } = this.props;

        return (<div className="activity__bucket">
            <div className="at__bucket__header">Compliance Control Activities</div>
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

export default ControlActivities;
