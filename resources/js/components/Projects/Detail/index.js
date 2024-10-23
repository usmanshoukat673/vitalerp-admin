// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import classNames from 'classnames';
import parse from 'html-react-parser';
// components
import PageTitle from '../../sub-components/PageTitle';
import CardTitle from '../../sub-components/CardTitle';

import TeamMembers from './TeamMembers';
import Comments from './Comments';
import Files from './Files';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';

import ProjectComments from '../Details/ProjectComments';
import showCurrentTZDate from '../../../utils/showCurrentTZDate.js';
import ProjectTasks from '../Details/ProjectTasks.tsx';
import PDRighDrawer from './PDRighDrawer.tsx';
import Subject from '../../subjects/Subject.tsx';
import axiosInstance from '../../../api/api.jsx';

const ProjectDetail = ({ company }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [comments, setComments] = useState([]);

    const dispatch = useDispatch();

    const { profile, subjects } = useSelector(state => ({
        profile: state.projects.profile,
        subjects: state.projects.subjects
    }));

    useEffect(() => {
        setLoading(true);
        axiosInstance.post('/api/user/projects/files', {
            project_id: profile.id,
        })
            .then(e => {
                setDocuments(e.data.documents);
                setErrors([]);
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setErrors([]);
                    setLoading(false);
                }
                if (err.response.status === 422) {
                    setLoading(false);
                    setErrors(errors.concat(err.response.data.errors));
                }
            });


        axiosInstance.post(`/api/user/projects/comments/list`, {
            project_id: profile.id,
        }).then(e => {
            setLoading(false);
            setComments(e.data.comments);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 422) {
                setErrors(errors.concat(err.response.data.errors));
            }

            if (err.response.status === 500) {
            }
        });

    }, [company, profile]);

    const handleUpload = (new_files) => {

        setErrors([]);
        setLoading(true);

        const formData = new FormData();

        formData.append('comp_id', company.id);
        formData.append('project_id', profile.id);
        formData.append('project_folder_id', company.project_folder.id);

        if (_.size(new_files) > 0) {
            _.forEach(new_files, (file, index) => {
                formData.append(`file_${index}`, file);
            });
        }

        axiosInstance.post('/api/user/projects/additional/attachments', formData)
            .then(e => {
                setDocuments(e.data.documents);
                setErrors([]);
                setLoading(false);
                NotificationManager.success('New Project attachements has been successuflly uploaded!', 'Success');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setErrors([]);
                    setLoading(false);
                }
                if (err.response.status === 422) {
                    setLoading(false);
                    setErrors(errors.concat(err.response.data.errors));
                }
            });
    }

    const handleCommentCreated = comment => {
        let the_comments = JSON.parse(JSON.stringify(comments));
        the_comments.push(comment);
        setComments(the_comments);
    }

    const project = {
        title: 'App design and development',
        shortDesc:
            'This card has supporting text below as a natural lead-in to additional content is a little bit longer',
        state: 'Ongoing',
        totalTasks: 81,
        totalComments: 103,
        totalMembers: 6,
        startDate: '17 March 2018',
        startTime: '1:00 PM',
        endDate: '22 December 2018',
        endTime: '1:00 PM',
        totalBudget: '$15,800',
    };

    return (
        <>
            {/* <PageTitle
                breadCrumbItems={[
                    { label: 'Projects', path: `/${company.slug}/projects/list` },
                    {
                        label: 'Project Details',
                        path: '/apps/projects/detail',
                        active: true,
                    },
                ]}
                title={'Project Details'}
            /> */}

            <Card className="d-block" style={{marginTop: '20px'}}>
                <Card.Body>
                    <CardTitle
                        containerClass="d-flex justify-content-between align-items-center mb-2"
                        icon="dripicons-dots-3"
                        title={<h3>{profile.title}</h3>}
                        menuItems={[
                            { label: 'Edit', icon: 'mdi mdi-pencil' },
                            { label: 'Delete', icon: 'mdi mdi-delete' },
                            { label: 'Invite', icon: 'mdi mdi-email-outline' },
                            { label: 'Leave', icon: 'mdi mdi-exit-to-app' },
                        ]}
                    />
                    <div
                        className={classNames(
                            'badge',
                            {
                                'bg-success': project.state === 'Finished',
                                'bg-secondary': project.state === 'Ongoing',
                                'bg-warning': project.state === 'Planned',
                            },
                            'text-light',
                            'mb-3'
                        )}>
                        {project.state}
                    </div>

                    <h5>Project Overview:</h5>

                    <div className="text-muted mb-2">
                        {parse(`${profile.description}`)}
                    </div>

                    <Row>
                        <Col md={4}>
                            <div className="mb-4">
                                <h5>Start Date</h5>
                                <p>
                                    {showCurrentTZDate(profile.start_date)}
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="mb-4">
                                <h5>End Date</h5>
                                <p>
                                    {showCurrentTZDate(profile.end_date)}
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="mb-4">
                                <h5>Budget</h5>
                                <p>{project.totalBudget}</p>
                            </div>
                        </Col>
                    </Row>

                    <TeamMembers profile={profile.assign_to} />
                </Card.Body>
            </Card>

            {/* New taks */}
            {
                _.map(subjects, subject => (<Subject key={subject.id} subject={subject}  />))
            }

            {/* Project Tasks */}
            <ProjectTasks project={profile}  />

            {
                /** <Comments /> */
            }

            <ProjectComments comments={comments} handleCreated={handleCommentCreated} newCommentAdded={handleCommentCreated} project={profile} />

            <PDRighDrawer title={profile.title} handleUpload={handleUpload} documents={documents} />
        </>
    );
};

export default withRouter(ProjectDetail);