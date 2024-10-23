import React, { Component } from 'react';
import { Pagination, Message } from 'semantic-ui-react';
import './DocumentActivities.scss';
import _ from 'lodash';
import showTZDate from '../../utils/showTZDate';
import { FiActivity } from "react-icons/fi";
import axiosInstance from '../../api/api';

class DocumentActivities extends Component {

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

        axiosInstance.get(`/api/user/org/document-activities/${company.id}?page=${activePage}`).then(e => {
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
        if (activity.activity == 'Created') {

            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} has created ${activity.document.name} document in ${activity.control.short_name}(${activity.standard.name}) at ${showTZDate(activity.created_at, company.timezone)}`);
            }

            return (`${activity.user.first_name} ${activity.user.last_name} has created ${activity.document.name} document in files at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Edited') {
            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} has changed ${activity.document.name} document in ${activity.control.short_name}(${activity.standard.name}) at ${showTZDate(activity.created_at, company.timezone)}`);
            }
            return (`${activity.user.first_name} ${activity.user.last_name} has changed ${activity.document.name} document at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Renamed') {
            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} has renamed ${activity.document.name} document in ${activity.control.short_name}(${activity.standard.name}) at ${showTZDate(activity.created_at, company.timezone)}`);
            }
            return (`${activity.user.first_name} ${activity.user.last_name} has renamed ${activity.document.name} document at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Uploaded') {
            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} has uploaded ${activity.document.name} document in ${activity.control.short_name}(${activity.standard.name}) at ${showTZDate(activity.created_at, company.timezone)}`);
            }
            return (`${activity.user.first_name} ${activity.user.last_name} has uploaded ${activity.document.name} document in files at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Link') {

            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} has linked ${activity.document.name} document in ${activity.control.short_name}(${activity.standard.name}) at ${showTZDate(activity.created_at, company.timezone)}`);
            }

            return (`${activity.user.first_name} ${activity.user.last_name} has linked ${activity.document.name} document at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Assign') {

            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} has linked ${activity.document.name} document in ${activity.control.short_name}(${activity.standard.name}) at ${showTZDate(activity.created_at, company.timezone)}`);
            }

            return (`${activity.user.first_name} ${activity.user.last_name} has linked ${activity.document.name} document at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Unlink') {

            if (!_.isEmpty(activity.control)) {
                return (`${activity.user.first_name} ${activity.user.last_name} unlinked ${activity.document.name} document from ${activity.control.short_name}(${activity.standard.name}) at ${showTZDate(activity.created_at, company.timezone)}`);
            }

            return (`${activity.user.first_name} ${activity.user.last_name} has unlinked ${activity.document.name} document at ${showTZDate(activity.created_at, company.timezone)}`);
        }
        else if (activity.activity == 'Deleted') {
            return (`${activity.user.first_name} ${activity.user.last_name} deleted ${activity.document.name} document at ${showTZDate(activity.created_at, company.timezone)}`);
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
            <div className="at__bucket__header">Document Activities</div>
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

export default DocumentActivities;
