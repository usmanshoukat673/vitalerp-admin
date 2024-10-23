import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { GlobalAppName } from '../..';
import { Typography } from '@mui/material';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';

const PageTitle = ({ history, breadCrumbItems, title, component }) => {
    const navigate = (path) => {
        history.push(path);
    }

    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            <li className="breadcrumb-item chand"><VisitDashboardBreadcrum /></li>

                            {breadCrumbItems.map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                ) : (
                                    <li className="breadcrumb-item" key={index}>
                                        <Link to={item.path} >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </Breadcrumb>
                    </div>
                    {
                        title ? <Typography
                            sx={
                                {
                                    color: '#000',
                                    lineHeight: '75px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }} variant="h5">
                            {title}
                        </Typography>
                            : <div className="page-title-component">{component}</div>
                    }

                </div>
            </Col>
        </Row>
    )
}


export default withRouter(PageTitle);
