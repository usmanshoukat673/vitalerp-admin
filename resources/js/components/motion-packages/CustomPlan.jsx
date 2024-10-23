// @flow
import React from 'react';
import { Col, Card } from 'react-bootstrap';
import classNames from 'classnames';
import { Button } from '@mui/material';

let plan1 = {
    id: 3,
    name: 'Custom Package',
    icon: 'dripicons-store',
    price: '$?',
    duration: 'Month',
    features: [
        'ISO 27001 4-10', 'ISO 27001:2013 Annex A', 'Hosted Scan',
        '100 User',
        'Email Support',
        '24x7 Support',
    ],
    isRecommended: false,
    isAvailable: false,
};

const CustomPlan = ({plan}) => {

    return (
        <>
            <Col md={4}>
                <Card
                    className={classNames('card-pricing', {
                        'card-pricing-recommended': plan.is_recommended,
                    })}>
                    <Card.Body className="text-center">
                        <p className="card-pricing-plan-name fw-bold text-uppercase">{plan.name}</p>
                        <i className={classNames('card-pricing-icon', plan.icon, 'text-primary')}></i>
                        <h2 className="card-pricing-price">
                            {plan.price} <span>/ {plan.duration}</span>
                        </h2>
                        
                        
                        {
                            plan.is_available && <Button variant="contained">Call for Price</Button>
                        }

                        {
                            _.size(plan.features) > 0 && <ul className="card-pricing-features">
                             {plan.features.map((feature, idx1) => {
                                return <li key={idx1}>{feature.feature.name}</li>;
                            })}
                            {plan.description.map((feature, idx1) => {
                                return <li key={idx1}>{feature}</li>;
                            })}
                        </ul>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default CustomPlan;
