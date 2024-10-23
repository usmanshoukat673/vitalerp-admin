import React, { Component } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { GlobalAppName } from '../..';
import { useSelector } from 'react-redux';

const PageTitle = ({ history, breadCrumbItems, title }) => {

    const { company } = useSelector((state) => ({
        company: state.orgs.company
    }));

    const navigate = (path) => {
        history.push(path);
    }

    const dashboard = () => {
        history.push(`/${company.slug}/compliance-stack`);
    }

    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            <Breadcrumb.Item onClick={dashboard}>{GlobalAppName}</Breadcrumb.Item>

                            {breadCrumbItems.map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                ) : (
                                    <Breadcrumb.Item key={index} onClick={() => { navigate(item.path) }}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                );
                            })}
                        </Breadcrumb>
                    </div>
                    <h4 className="page-title">{title}</h4>
                </div>
            </Col>
        </Row>
    );
}

export default withRouter(PageTitle);
