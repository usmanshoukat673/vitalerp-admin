// @flow
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import _, { isEmpty } from 'lodash';
import ProjectType from './ProjectType.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPackagesPopupStatus } from '../../../actions/index.js';

const HomePage = ({company}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(!isEmpty(company) && isEmpty(company.plan))
        {
            dispatch(setPackagesPopupStatus(true));
        }
    }, [company]);

    return (
        <div>
            <Box sx={{ m: '15px' }}>
                <Typography variant='h4' gutterBottom>Home</Typography>
            </Box>
            <Row>
                <Col lg={3}>
                    <ProjectType title="Documents" />
                </Col>
                <Col lg={3}>
                    <ProjectType title="Traning" />
                </Col>
                <Col lg={3}>
                    <ProjectType title="Audits" />
                </Col>
                <Col lg={3}>
                    <ProjectType title="Assets" />
                </Col>
            </Row>

            <Row>
                <Col lg={3}>
                    <ProjectType title="Incidence" />
                </Col>
                <Col lg={3}>
                    <ProjectType title="Stakeholders" />
                </Col>
                <Col lg={3}>
                    <ProjectType title="Risk" />
                </Col>
                <Col lg={3}>
                    <ProjectType title="Assessments" />
                </Col>
            </Row>
        </div>
    )
};

export default HomePage;
