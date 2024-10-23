// @flow
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import Statistics from './Statistics';
import Status from './Status';
import Tasks from './Tasks';
import TasksChart from './TasksChart';
import Activity from './Activity';
import Calendar from './Calendar';
import { Dropdown } from 'semantic-ui-react';
import { Box } from '@mui/material';
import { setAllProjects, hideRightSidebar } from '../../../actions';
import CompanyProfile from '../../organizations/CompanyProfile';
import IndivudualForm from '../../organizations/IndivudualForm';
import EventSecurityPrivacy from '../../organizations/EventSecurityPrivacy';
import TypeOfBussiness from '../../organizations/TypeOfBussiness';
import AnnualRevenues from '../../organizations/AnnualRevenues';
import ApproximateShareOfRevenue from '../../organizations/ApproximateShareOfRevenue';
import ChangesToTheBusiness from '../../organizations/ChangesToTheBusiness';
import CyberSecurityGeneralInformation from '../../organizations/CyberSecurityGeneralInformation';
import RightDrawer from '../../../layouts/RightDrawer';
import axiosInstance from '../../../api/api';

const ProjectDashboardPage = ({ company, token }) => {

    const dispatch = useDispatch();

    const { companies, projects } = useSelector((state) => ({
        projects: state.projects.projects,
        companies: state.orgs.companies,
    }));

    const all_companies = {
        key: 'all',
        text: `All Companies`,
        value: 'all',
    };

    const all_projects = {
        key: 'all',
        text: `All Projects`,
        value: 'all',
    };

    const [users, setUsers] = useState(0);

    const [project_id, setPorojectId] = useState('all');
    const [project_options, setProjectOptions] = useState([
        all_projects,
        {
            key: '0',
            text: `Unassigned`,
            value: '0',
        }
    ]);

    useEffect(() => {
        if (projects) {
            let options = _.map(projects, (pr, index) => ({
                key: `${pr.id}`,
                text: `${pr.title}`,
                value: `${pr.id}`,
            }));

            options.push(all_projects,);

            options.push({
                key: '0',
                text: `Unassigned`,
                value: '0',
            });

            setProjectOptions(
                _.sortBy(options, ['text'])
            );
        }
    }, [projects]);

    const [company_options, setCompanyOptions] = useState([all_companies]);
    const [selected_company, setSelectedCompany] = useState('all');
    const [selected_company_object, setSelectedCompanyObject] = useState(company);

    useEffect(() => {
        if (companies) {
            let options = _.map(companies, (cmp, index) => ({
                key: `${cmp.comp_id}`,
                text: `${cmp.company.name}`,
                value: `${cmp.comp_id}`,
            }));

            options.push(all_companies);

            setCompanyOptions(
                _.sortBy(options, ['text'])
            );
        }
    }, [company, companies]);

    const [task_state, setTaskState] = useState({
        tasks: [],
    });

    const getTasks = () => {
        axiosInstance.post(`/api/user/projects/tasks`, {
            comp_id: selected_company,
            project_id: project_id
        }).then(e => {
            setTaskState({
                tasks: e.data.tasks,
            });
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    const getProjects = () => {
        axiosInstance.get(`/api/user/projects/all/${selected_company}`).then(e => {
            dispatch(setAllProjects(e.data.projects));
        }).catch(err => {
            if (err.response.status === 500) {
            }
            if (err.response.status === 401) {
            }
        });
    }

    const getUsersCount = () => {
        axiosInstance.get(`/api/user/projects/users/${selected_company}`).then(e => {
            setUsers(e.data.users);
        }).catch(err => {
            if (err.response.status === 500) {
            }
            if (err.response.status === 401) {
            }
        });
    }

    useEffect(() => {
        getTasks();
    }, [company, token, project_id]);

    useEffect(() => {
        getProjects();
        getUsersCount();
    }, [company, token, selected_company]);

    // get the projects 

    const handleProjectChange = (event, { value }) => {
        setPorojectId(value);
    }

    const handleCompanyChange = (event, { value }) => {
        setSelectedCompany(value);
     //   console.log(_.find(companies, function (o) { return o.comp_id == value; }));
        setSelectedCompanyObject(_.find(companies, function (o) { return o.comp_id == value; }));
    }

    const handleRightSideBar = () => {
        dispatch(hideRightSidebar());
    };

    return (
        <>
            <Box sx={{ pt: 2, mb: 2, display: 'felx', alignItems: 'center' }}>
                <Dropdown
                    options={company_options}
                    selection
                    onChange={handleCompanyChange}
                    value={selected_company}
                    placeholder="Select Company"
                />

                <Dropdown
                    options={project_options}
                    selection
                    onChange={handleProjectChange}
                    value={project_id}
                    placeholder="Select Project"
                    className='__board__projects__dd'
                />
            </Box>

            {
                selected_company != 'all' && <Row>
                    <Col lg={12}>
                        <CompanyProfile company={selected_company_object} />
                    </Col>
                </Row>
            }

            {
                selected_company != 'all' && <>
                    <IndivudualForm company={selected_company_object} />

                    <EventSecurityPrivacy company={selected_company_object} />

                    <TypeOfBussiness company={selected_company_object} />

                    <AnnualRevenues company={selected_company_object} />

                    <ApproximateShareOfRevenue company={selected_company_object} />

                    <ChangesToTheBusiness company={selected_company_object} />

                    <CyberSecurityGeneralInformation company={selected_company_object} />
                </>
            }


            <Statistics projects={projects} tasks={task_state.tasks} users={users} />

            <Row>
                <Col lg={4}>
                    <Status />
                </Col>
                <Col lg={8}>
                    <Tasks comp_id={selected_company} token={token} root_project_id={project_id} />
                </Col>
            </Row>


            <Row>
                <Col xs={12}>
                    <TasksChart />
                </Col>
            </Row>

            <Row>
                <Col xl={5}>
                    <Activity />
                </Col>
                <Col xl={7}>
                    <Calendar />
                </Col>
            </Row>

            <RightDrawer title="Analytics" />
        </>
    );
};

export default ProjectDashboardPage;
