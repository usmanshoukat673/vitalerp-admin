import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PaymentMethods from './PaymentMethods';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';

const BillingManagement = () => {

    const { leftnav, company } = useSelector((state) => ({
        leftnav: state.leftnav,
        company: state.orgs.company,
    }));

    return (
        <>
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>

                <div className="ssettings__mainbd">
                    <div className="ssettings__breadcrum"><VisitDashboardBreadcrum /> {' > '} Billing</div>

                    <div className="ssettings__header">
                        <div className="__name">Billing</div>
                        <div className="__actions">

                        </div>
                    </div>
                </div>

                <div className="ssettings__container">
                    <PaymentMethods />

                    <div className="security__bucket">
                        <h2>Billing Settings</h2>
                        <Container className="at__bucket__body">
                            <Row>
                                <Col>
                                    <h4>ADDRESS</h4>
                                    <p>This address appears on your monthly invoice and should be the legal address of your home or business</p>
                                </Col>
                            </Row>
                            <div className='two_column_space_beetween' style={{marginTop: '10px'}}>
                                <div>
                                    <p>
                                        {`${company.address}, ${company.city} ${company.state} - ${company.postal_code}, ${company.country}`}
                                    </p>
                                </div>
                                <div className=''>
                                    <Button variant="secondary">Edit Address</Button>
                                </div>
                            </div>
                        </Container>
                    </div>

                    <div className="security__bucket">
                        <h2>Billing history</h2>
                        <Container className="at__bucket__body">
                            <Row>
                                <Col></Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BillingManagement;