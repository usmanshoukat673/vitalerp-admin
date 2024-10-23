// @flow
import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import PageTitle from '../../sub-components/PageTitle';

import ProjectList from './ProjectList';
import ProjectSummary from './ProjectSummary';
import Statistics from './Statistics';
import MonthlyTarget from './MonthlyTarget';
import ProjectStatistics from './ProjectStatistics';
import ProjectOverview from './ProjectOverview';
import DailyTask from './DailyTask';
import TeamMembers from './TeamMembers';
import './ComplianceV2.scss';

// data
import { members, projectList, statisticsData, tasksData } from './data';
import { setSelectedTask, setAllProjects, setCompanyUsers, setBackPageURL, setTaskToEdit } from '../../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axiosInstance from '../../../api/api';


const ComplianceV2 = ({company, history, projects, setAllProjects}) => {

    useEffect(() => {
        axiosInstance.get(`/api/user/projects/all/${company.id}`).then(e => {
            setAllProjects(e.data.projects);
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }, [company]);
    
    return (
        <div className='__ComplianceV2'>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboard', path: `/${company.slug}/compliance-stack`, active: true },
                ]}
                title={'Dashboard'}
            />

            <Row>
                <Col xxl={9}>
                    <ProjectList projects={projects} company={company} projectList={projectList} />
                    <Row>
                        <Col xxl={3} md={4}>
                            <MonthlyTarget />
                        </Col>
                        <Col xxl={9} md={8}>
                            <ProjectStatistics />
                        </Col>
                    </Row>
                </Col>

                <Col xxl={3}>
                    <ProjectSummary />
                </Col>
            </Row>

            <Row>
                <Statistics statisticsData={statisticsData} />
            </Row>

            {
                /**
                 * <Row>
                <Col xxl={6}>
                    <ProjectOverview />
                </Col>
                <Col xxl={3} md={6}>
                    <DailyTask taskData={tasksData} />
                </Col>
                <Col xxl={3} md={6}>
                    <TeamMembers members={members} />
                </Col>
            </Row>
                 */
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    projects: state.projects.projects,
});

export default withRouter(connect(mapStateToProps, { setSelectedTask, setAllProjects, setCompanyUsers, setBackPageURL, setTaskToEdit })(ComplianceV2));
