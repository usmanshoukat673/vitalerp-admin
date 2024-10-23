// @flow
import React, { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setPackageSummary } from '../../actions';
import axiosInstance from '../../api/api';
import axios from 'axios';

const BusinessPlan = ({plan}) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const cancelTokenSource = axios.CancelToken.source();

    const { summary, company } = useSelector((state) => ({
        summary: state.mpackages.summary,
        company: state.orgs.company,
        token: state.token.activeToken,
    }));

    const createSubscription = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/marketplace/stripe/create-bu-plan-subscription`, {
            comp_id: company.id,
        }).then(e => {
            dispatch(setPackageSummary({
                ...summary,
                subscriptionId: e.data.subscriptionId,
                clientSecret: e.data.clientSecret
            }));
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 500) {
            }
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    useEffect(() => {
        return () => {
            // Cancel the request when the component is unmounting
            cancelTokenSource.cancel('Request canceled due to component unmounting.');
        };
    }, []);

    return (
        <>
            <Col md={4}>
                <Card
                    className={classNames('card-pricing', {
                        'card-pricing-recommended': plan?.is_recommended,
                    })}>
                    <Card.Body className="text-center">
                        {plan?.is_recommended && <div className="card-pricing-plan-tag">Recommended</div>}
                        <p className="card-pricing-plan-name fw-bold text-uppercase">{plan.name}</p>
                        <i className={classNames('card-pricing-icon', plan.icon, 'text-primary')}></i>
                        <h2 className="card-pricing-price">
                            {plan.price} <span>/ MONTH</span>
                        </h2>
                        {
                            plan.is_available &&  <Button onClick={createSubscription} variant="contained">
                            Choose Plan
                        </Button>
                        }
                        <ul className="card-pricing-features">
                            {plan.features.map((feature, idx1) => {
                                return <li key={idx1}>{feature.feature.name}</li>;
                            })}
                            {plan.description.map((feature, idx1) => {
                                return <li key={idx1}>{feature}</li>;
                            })}
                        </ul>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default BusinessPlan;
