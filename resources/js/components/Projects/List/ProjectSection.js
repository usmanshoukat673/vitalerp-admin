// @flow
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card, Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';
import ShowCurrentTZDateMoment from '../../../utils/showCurrentTZDateMoment';
import getInitial from '../../../utils/getInitial';
import { GrView } from 'react-icons/gr';
const Project = ({ project, history, selectProject, company }) => {

    const [completed, setCompleted] = useState(project.stage === 'Done');

    const markSelected = () => {
        selectProject(project);
    };

    const navigateToTaksDetails = () => {
        selectProject(project);
        history.push(`/${company.slug}/workbench/projects/details/${project.id}`);
    }

    return (
        <Row className="justify-content-sm-between mt-2">
            <Col sm={6} className="mb-2 mb-sm-0">
                <div className="form-check">
                    <GrView onClick={markSelected}  className="preview-button"
                    id={`project-${project.id}`} />
                    <label className="form-check-label project-link" htmlFor={`project-${project.id}`} onClick={navigateToTaksDetails}>
                        {project.title}
                    </label>
                </div>
            </Col>
            <Col sm={6}>
                <div className="d-flex justify-content-between">
                    <div className='d-flex'>
                    {
                        _.map(project.assign_to, user => {
                            return(

                                <OverlayTrigger key={user.id} placement="right" overlay={<Tooltip>{`${user.user.first_name} ${user.user.last_name}`}</Tooltip>}>
                                    <div className="userInitials rounded-circle avatar-xs">{getInitial(`${user.user.first_name} ${user.user.last_name}`)}</div>
                                </OverlayTrigger>
                            )
                        })
                    }

                    </div>
                    <div>
                        <ul className="list-inline font-13 text-end">
                            <li className="list-inline-item">
                                <i className="uil uil-schedule font-16 me-1"></i> <ShowCurrentTZDateMoment date={project.due_date} />
                            </li>
                           {
                               /**
                                *  <li className="list-inline-item ms-1">
                                <i className="uil uil-align-alt font-16 me-1"></i>{' '}
                                {project.checklists.filter((t) => t.completed).length} / {project.checklists.length}
                            </li>

                                */
                           }
                           <li className="list-inline-item ms-1">
                            <i className="uil uil-comment-message font-16 me-1"></i> {project.total_comments}
                           </li>
                            <li className="list-inline-item ms-2">
                                <span
                                    className={classNames(
                                        'badge',
                                        {
                                            'badge-danger-lighten': project.priority_text === 'High',
                                            'badge-info-lighten': project.priority_text === 'Medium',
                                            'badge-success-lighten': project.priority_text === 'Low',
                                        },
                                        'p-1'
                                    )}>
                                    {project.priority_text}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

const ProjectSection = ({ title, projects, selectProject, history, company }) => {
    const [collapse, setCollapse] = useState(true);

    /*
     * toggle project-dropdown
     */
    const toggleProject = () => setCollapse(!collapse);

    return (
        <>
            <h5 className="m-0 pb-2">
                <Link className="text-dark" to="#" onClick={toggleProject}>
                    <i
                        className={classNames(
                            'uil',
                            { 'uil-angle-down': collapse, 'uil-angle-right': !collapse },
                            'font-18'
                        )}></i>
                    {title} <span className="text-muted">({projects.length})</span>
                </Link>
            </h5>
            <Collapse in={collapse}>
                <Card className="mb-0">
                    <Card.Body className="pb-1 pt-2">
                        {projects.map((project, idx) => (
                            <Project selectProject={selectProject} company={company} project={project} key={idx} history={history} />
                        ))}
                    </Card.Body>
                </Card>
            </Collapse>
        </>
    );
};

export default withRouter(ProjectSection);
