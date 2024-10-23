// @flow
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import _ from 'lodash';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';
import getInitial from '../../../utils/getInitial';
import parse from 'html-react-parser';

const ViewTask = ({ task, editTask }) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">

                        <div className="form-check float-start">
                            <input type="checkbox" className="form-check-input" id="completedCheck" />
                            <label className="form-check-label" htmlFor="completedCheck">
                                Mark as completed
                            </label>
                        </div>

                        <Button type='button' size="sm" onClick={editTask} className='btn btn-success btn-md'>Edit</Button>
                        { /** 
                        <Dropdown>
                            <Dropdown.Toggle as={Link} to="#" className="arrow-none card-drop">
                                <i className="mdi mdi-dots-horizontal" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >
                                    <i className="mdi mdi-pencil me-1"></i>Edit
                                </Dropdown.Item>
                                
                                <Dropdown.Divider as="div" />
                                <Dropdown.Item className='text-danger' >
                                 <i className="mdi mdi-delete me-1"></i>Delete
                             </Dropdown.Item> 
                            </Dropdown.Menu>
                    </Dropdown>*/
                        }
                    </div>

                    <div className="clearfix"></div>
                    <Row>
                        <Col>
                            <h3 className="mt-3">{task.title}</h3>

                            <Row>
                                <Col>
                                    <p className="mt-2 mb-1 text-muted fw-bold font-12 text-uppercase">Project</p>
                                    <div className="d-flex">
                                        <h5 className="mt-1 font-14">
                                            {
                                                _.isEmpty(task.project) ? 'Unassigned' : task.project.title
                                            }
                                        </h5>
                                    </div>
                                </Col>


                            </Row>
                            <Row>
                                <Col>
                                    <p className="mt-2 mb-1 text-muted fw-bold font-12 text-uppercase">Assigned To</p>
                                    <div className="d-flex">
                                        {
                                            _.map(task.assign_to, user => {
                                                return (
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
                                            <h5 className="mt-1 font-14"><ShowCurrentTZDateMoment date={task.due_date} /></h5>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <h5 className="mt-3">Overview:</h5>

                            <div className="text-muted mb-4">
                                {
                                    parse(`${task.description}`)
                                }
                            </div>

                            <h5 className="mt-4 mb-2 font-16">Sub-tasks</h5>

                            {task.sub_tasks.map((checklist, index) => (
                                <div className="form-check mt-1" key={index}>
                                    <label
                                        htmlFor={`checklist-${checklist.id}`}>
                                        {checklist.title}
                                    </label>
                                </div>
                            ))}

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default ViewTask;
