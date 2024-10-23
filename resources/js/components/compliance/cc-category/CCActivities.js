import React, { Component } from 'react';
import _ from 'lodash';
import Moment from 'react-moment';
import './CCActivities.scss';

class CCActivities extends Component {

    render() {

        const { activities, c_title } = this.props;

        return (
            <div className="__activities">

                {
                    c_title && <div className="at__header">Activity</div>
                }

                {
                    _.map(activities, act => {

                        if (act.activity === 'Login') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} logged in`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Created' && act.event_type === 'document') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} created ${act.document.name}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Edited') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} edited ${act.document.name}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Uploaded') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} uploaded ${act.document.name}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Deleted') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} deleted ${act.document.name}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Renamed') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} renamed ${act.document.name}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Status') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} changed ${act.control.number} to ${act.ctrl_status}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Applicability') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} changed ${act.control.number} to ${act.ctrl_applicability}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Assign') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} assigned ${act.document.name} to ${act.control.number}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Link') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} linked ${act.document.name} to ${act.control.number}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                        else if (act.activity === 'Unlink') {
                            return (<div className="at_activity" key={act.id}>
                                <div className="at_sub">{`${act.user.first_name} unlinked ${act.document.name} from ${act.control.number}`}</div>
                                <div className="at_time"><Moment fromNow>{act.created_at}</Moment></div>
                            </div>)
                        }
                    })
                }

            </div>
        )
    }
}

export default CCActivities;
