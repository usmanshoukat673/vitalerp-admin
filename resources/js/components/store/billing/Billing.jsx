import React from 'react';
import PageTitle from '../../sub-components/PageTitle';
import { Row, Col, Card, Table, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CartSummary from '../cart/CartSummary';
import { Link } from 'react-router-dom';

const Billing = () => {

    const { items } = useSelector((state) => ({
        items: state.cart.items,
    }));

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Marketplace', path: '/store/standards' },
                    {
                        label: 'Billing',
                        path: '/store/billing',
                        active: true,
                    },
                ]}
                title={'Billing'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={8}>

                                    <Row className="mt-4">
                                        <Col sm={6}>
                                            <Link
                                                to="/store/subscription/products"
                                                className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold">
                                                <i className="mdi mdi-arrow-left"></i> Back{' '}
                                            </Link>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="text-sm-end">
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={4}>
                                    <CartSummary />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Billing;