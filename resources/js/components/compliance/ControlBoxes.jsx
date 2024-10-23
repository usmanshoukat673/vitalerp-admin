import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BsGearFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { setParentDomain } from '../../actions';
import _ from 'lodash';
import Typography from '@mui/material/Typography';

const ControlBoxes = ({ history, openProfile }) => {

    const { parent_domain, company, standard } = useSelector((state) => ({
        parent_domain: state.compliance.parent_domain,
        company: state.orgs.company,
        standard: state.leftnav.standard,
    }));

    const dispatch = useDispatch();

    const handleControlsNavigation = (parent_domain) => {
        dispatch(setParentDomain(parent_domain));
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}/domain`);
    }

    return (
        <Row className="mx-n1 g-0">
            {_.map(parent_domain.sections, (section) => {
                return <React.Fragment key={`section-${section.id}`}>
                    <Typography variant="h6" gutterBottom className="p-2">
                        {section.menu_name}
                    </Typography>
                    {
                        _.map(section.controls, control => {
                            return (
                                <Col key={control.id} xxl={3} lg={6}>
                                    <Card className="m-1 shadow-none border __the__subsection" onClick={() => openProfile(control)}>
                                        <div className="p-2" >
                                            <Row>
                                                <Col className="col-auto">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title bg-light text-secondary rounded">
                                                        <BsGearFill />
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col className="ps-0">
                                                    <Link to="#" className="text-muted fw-bold">
                                                        {`${control.number} ${control.name}`}
                                                    </Link>
                                                    {/* <p className="mb-0 font-13">
                                                        {section.menu_name}
                                                    </p> */}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </React.Fragment>
            })}
        </Row>
    );
}

export default withRouter(ControlBoxes);