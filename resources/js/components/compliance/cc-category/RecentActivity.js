// @flow
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

// components
import Timeline from '../../sub-components/Timeline';
import TimelineItem from '../../sub-components/TimelineItem';
import CardTitle from '../../sub-components/CardTitle';
import Moment from 'react-moment';

const RecentActivity = ({ activities }) => {
    return (
        <Card>
            <Card.Body className="pb-0">
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="Recent Activity"
                    menuItems={[]}
                />
                {/*  menuItems={[
                        { label: 'Sales Report' },
                        { label: 'Export Report' },
                        { label: 'Profit' },
                        { label: 'Action' },
                    ]} */}
            </Card.Body>
            <SimpleBar style={{ maxHeight: '234px', width: '100%' }}>
                <Card.Body className="py-0">
                    <Timeline>
                        {
                            _.map(activities, act => {

                                if (act.activity === 'Login') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-login-variant bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                User login
                                            </Link>
                                            <small>{`${act.user.first_name} logged in`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Created' && act.event_type === 'document') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-file-document bg-primary-lighten text-primary timeline-icon"></i>
                                        <div className="timeline-item-primary">
                                            <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                New Document Created
                                            </Link>
                                            <small>{`${act.user.first_name} created ${act.document.name}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Edited') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-file-document-edit bg-primary-lighten text-primary timeline-icon"></i>
                                        <div className="timeline-item-primary">
                                            <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                Document Modified
                                            </Link>
                                            <small>{`${act.user.first_name} updated ${act.document.name}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Uploaded') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                Document Uploaded
                                            </Link>
                                            <small>{`${act.user.first_name} uploaded ${act.document.name}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Deleted') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-delete bg-danger-lighten text-danger timeline-icon"></i>
                                        <div className="timeline-item-danger">
                                            <Link to="#" className="text-danger fw-bold mb-1 d-block">
                                                Document Deleted
                                            </Link>
                                            <small>{`${act.user.first_name} deleted ${act.document.name}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Renamed') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-file-document-edit-outline bg-primary-lighten text-primary timeline-icon"></i>
                                        <div className="timeline-item-primary">
                                            <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                Document Renamed
                                            </Link>
                                            <small>{`${act.user.first_name} renamed ${act.document.name}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Status') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-file-certificate bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                Control Status changed
                                            </Link>
                                            <small>{`${act.user.first_name} changed ${act.control.number} to ${act.ctrl_status}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Applicability') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-file-certificate bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                Applicability changed
                                            </Link>
                                            <small>{`${act.user.first_name} changed ${act.control.number} to ${act.ctrl_applicability}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Assign') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-file-check bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                Document Assigned
                                            </Link>
                                            <small>{`${act.user.first_name} assigned ${act.document.name} to ${act.control.number}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Link') {
                                    return (<TimelineItem key={act.id}>
                                        <i className="mdi mdi-file-link bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                Document Link
                                            </Link>
                                            <small>{`${act.user.first_name} linked ${act.document.name} to ${act.control.number}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                                else if (act.activity === 'Unlink') {
                                    return (<TimelineItem key={act.id}> 
                                        <i className="mdi mdi-file-remove bg-danger-lighten text-danger timeline-icon"></i>
                                        <div className="timeline-item-danger">
                                            <Link to="#" className="text-danger fw-bold mb-1 d-block">
                                                Document Unlink
                                            </Link>
                                            <small>{`${act.user.first_name} unlinked ${act.document.name} from ${act.control.number}`}</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"><Moment fromNow>{act.created_at}</Moment></small>
                                            </p>
                                        </div>
                                    </TimelineItem>)
                                }
                            })
                        } 
                    </Timeline>
                </Card.Body>
            </SimpleBar>
        </Card>
    );
};

export default RecentActivity;
