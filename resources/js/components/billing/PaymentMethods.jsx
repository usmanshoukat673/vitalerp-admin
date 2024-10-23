import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PaymentMethods = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const { token, company } = useSelector((state) => ({
        company: state.orgs.company,
        token: state.token.activeToken,
    }));

    useEffect(() => {
        setLoading(true);
        // axiosInstance.post(`/api/user/marketplace/stripe/paymet-method/list`, {
        //     comp_id: company.id,
        // }).then(e => {
        //     setLoading(false);
        // }).catch(err => {
        //     setLoading(false);
        //     if (err.response.status === 500) {
        //         NotificationManager.error('Server Error, please contact customer support.', 'Error');
        //     }
        // });
    }, []);

    return (
        <>
            <div className="security__bucket">
                <h2>Payment methods</h2>
                <Container className="at__bucket__body">
                    <Row>
                        <Col>
                            <h4>DEFAULT</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='add-payment-method-container'>
                                <p>
                                    <a>Add a payment method</a>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default PaymentMethods;