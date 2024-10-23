// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import _ from 'lodash';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';
import getInitial from '../../../utils/getInitial';
// component
import CardTitle from '../../sub-components/CardTitle';

const ViewProject = ({ project }) => {
    return (
        <>
            <Card>
                <Card.Body>
                    <CardTitle
                        containerClass="d-flex align-items-center justify-content-between"
                        title={
                            <div className="form-check float-start">
                                <input type="checkbox" className="form-check-input" id="completedCheck" />
                                <label className="form-check-label" htmlFor="completedCheck">
                                    Mark as completed
                                </label>
                            </div>
                        }
                        icon="mdi mdi-dots-horizontal"
                        menuItems={[
                            // { label: 'Attachment', icon: 'uil uil-file-upload' },
                          //  { label: 'Edit', icon: 'uil uil-edit' },
                           // { label: 'Mark as Duplicate', icon: 'uil uil-file-copy-alt' },
                            {
                                label: 'Delete',
                                icon: 'uil uil-trash-alt',
                                variant: 'text-danger',
                                hasDivider: true,
                            },
                        ]}
                    />
                    <div className="clearfix"></div>
                    <Row>
                        <Col>
                            <h3 className="mt-3">{project.title}</h3>

                            <Row>
                                <Col>
                                    <p className="mt-2 mb-1 text-muted fw-bold font-12 text-uppercase">Assigned To</p>
                                    <div className="d-flex">
                                    {
                                        _.map(project.assign_to, user => {
                                            return(
                                                <div key={user.id}>
                                                    <div className="userInitials">{getInitial(`${user.user.first_name} ${user.user.last_name}`)}</div>
                                                    <div>
                                                        <h5 className="mt-1 font-14">{`${user.user.first_name} ${user.user.last_name}`}</h5>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    </div>
                                </Col>

                                <Col>
                                    <p className="mt-2 mb-1 text-muted fw-bold font-12 text-uppercase">Due Date</p>
                                    <div className="d-flex">
                                        <i className="uil uil-schedule font-18 text-success me-1"></i>
                                        <div>
                                            <h5 className="mt-1 font-14"><ShowCurrentTZDateMoment date={project.due_date} /></h5>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <h5 className="mt-3">Overview:</h5>

                            <p className="text-muted mb-4">
                                 {
                                     project.description
                                 }
                            </p>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default ViewProject;
