import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { AiFillFolder } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {withRouter, Link } from 'react-router-dom';
import { setPortalActiveParentDomains } from '../../../actions';

const PPDomains = ({history, match}) => {

    const { active_standard, active_domains } = useSelector((state) => ({
        active_domains: state.policyportal.active_domains,
        active_standard: state.policyportal.active_standard
    }));

    const dispatch = useDispatch();

    const controlsCount = (sections) => {
        let count = 0;

        _.forEach(sections, (section) => {
             count += _.size(section.controls);
        });

        return `${count} Controls`;
    }

    const handleControlsNavigation = (parent_domain) => {
        dispatch(setPortalActiveParentDomains(parent_domain));
        history.push(`/policy-panels/${match.params.portal_link}/pp/${active_standard.slug}/${parent_domain.slug}`);
    }

    return (
        <Row className="mx-n1 g-0">
            {_.map(active_domains, (domain, i) => {
                return (
                    <Col key={i} xxl={3} lg={6}>
                        <Card className="m-1 shadow-none border __the__subsection" onClick={() => { }}>
                            <div className="p-2" onClick={() => handleControlsNavigation(domain)}>
                                <Row>
                                    <Col className="col-auto">
                                        <div className="avatar-sm">
                                            <span className="avatar-title bg-light text-secondary rounded">
                                                <AiFillFolder />
                                            </span>
                                        </div>
                                    </Col>
                                    <Col className="ps-0">
                                        <Link to="#" className="text-muted fw-bold">
                                            {domain.menu_name}
                                        </Link>
                                        <p className="mb-0 font-13">
                                            {controlsCount(domain.sections)}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
}

export default withRouter(PPDomains);