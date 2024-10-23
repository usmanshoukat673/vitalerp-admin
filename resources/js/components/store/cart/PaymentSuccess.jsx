import React, { useEffect } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import PageTitle from '../../sub-components/PageTitle';
import { useDispatch } from 'react-redux';
import { resetCartSummary, setCartItems } from '../../../actions';
import _ from 'lodash';

const PaymentSuccess = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCartItems([]));
        dispatch(resetCartSummary())
        return () => {};
    }, []);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    {
                        label: 'successful',
                        path: '/store/subscription/products',
                        active: true,
                    },
                ]}
                title={'Subscription successful'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={8}>

                                    <Alert variant="success" className="mt-3">
                                        <strong>Congratulations!</strong> Your payment was successful. The product you purchased might take a minute or so to be reflected in your account. Thank you for subscribing to our service.
                                    </Alert>

                                </Col>

                                <Col lg={4}>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default PaymentSuccess;