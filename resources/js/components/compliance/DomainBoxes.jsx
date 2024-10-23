import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { AiFillFolder } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter, Link } from 'react-router-dom';
import { setParentDomain } from '../../actions';

const DomainBoxes = ({history}) => {

    const { parent_sections, company, standard } = useSelector((state) => ({
        parent_sections: state.leftnav.parent_sections,
        company: state.orgs.company,
        standard: state.leftnav.standard,
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
        dispatch(setParentDomain(parent_domain));
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}/${parent_domain.slug}`);
    }

    return (
        <Row className="mx-n1 g-0">
            {_.map(parent_sections, (psection, i) => {
                return (
                    <Col key={i} xxl={3} lg={6}>
                        <Card className="m-1 shadow-none border __the__subsection" onClick={() => { }}>
                            <div className="p-2" onClick={() => handleControlsNavigation(psection)}>
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
                                            {psection.menu_name}
                                        </Link>
                                        <p className="mb-0 font-13">
                                            {controlsCount(psection.sections)}
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

export default withRouter(DomainBoxes);