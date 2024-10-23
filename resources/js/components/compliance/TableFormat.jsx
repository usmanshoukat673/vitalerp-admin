import React, { useContext } from 'react';
import { Card, Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setParentDomain } from '../../actions';

const Controls = ({ controls, openProfile }) => {
    return (
        _.map(controls, control => {
            return (
                <tr key={control.id}>
                    <td style={{ cursor: 'pointer' }} onClick={() => openProfile(control)}>
                        {control.number} {control.name}
                    </td>
                </tr>
            )
        })
    )
}

const CustomToggle = ({ children, eventKey, containerClass, linkClass, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <h5 className={containerClass}>
            <Link
                to="#"
                className={classNames(linkClass, {
                    collapsed: !isCurrentEventKey,
                })}
                onClick={decoratedOnClick}>
                {children}
            </Link>
        </h5>
    );
};

const SubDomainAccordion = ({ subdomain, index, openProfile }) => {
    return (
        <Card className="mb-0">
            <Card.Header>
                <CustomToggle
                    eventKey={String(index)}
                    containerClass="m-0"
                    linkClass="custom-accordion-title d-block py-1">
                    {subdomain.menu_name}
                    <i className="mdi mdi-chevron-down accordion-arrow"></i>
                </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={String(index)}>
                <div className='table-responsive'>
                    <Card.Body>
                        <table className='table'>
                            <tbody>
                                <Controls controls={subdomain.controls} openProfile={openProfile} />
                            </tbody>
                        </table>
                    </Card.Body>
                </div>
            </Accordion.Collapse>
        </Card>
    );
};

const STDDomain = ({ domain, openProfile }) => {
    
    const handTemp = () => openProfile(domain);
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-2 chand" onClick={() => openProfile(domain)}>{domain.menu_name}</h4>
                    {!_.isEmpty(domain.description) && <p className="text-muted font-14 mb-3">
                        {domain.description}
                    </p>}
                    <Accordion defaultActiveKey="0" id="accordion" className="custom-accordion">
                        {
                            _.map(domain.sections, (subdomain, index) => {
                                return <SubDomainAccordion key={index} subdomain={subdomain} index={index} openProfile={handTemp} />;
                            })
                        }
                    </Accordion>
                </Card.Body>
            </Card>
        </>
    )
}

const TableFormattedStack = ({ history }) => {

    const dispatch = useDispatch();

    const { parent_sections, company, standard } = useSelector((state) => ({
        parent_sections: state.leftnav.parent_sections,
        company: state.orgs.company,
        standard: state.leftnav.standard,
    }));

    const handleControlsNavigation = (parent_domain) => {
        dispatch(setParentDomain(parent_domain));
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}/${parent_domain.slug}`);
    }

    return (<div className='__TableFormattedStack'>
        {
            _.map(parent_sections, section => {
                return (
                    <STDDomain domain={section} key={section.id} openProfile={handleControlsNavigation} />
                )
            })
        }
    </div>)
}

export default withRouter(TableFormattedStack);