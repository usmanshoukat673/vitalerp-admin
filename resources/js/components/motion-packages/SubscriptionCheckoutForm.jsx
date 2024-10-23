import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import { resetPackageSummary, setCompanies, setCompany, setPackagesPopupStatus } from '../../actions';

const SubscriptionCheckoutForm = ({ history, cancelPayment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const { company, companies } = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company,
        companies: state.orgs.companies,
    }))


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard?payment_status=success`,
            },
            redirect: "if_required",
        })

        if (error) {
            setMessage(error.message);
        }
        else if (paymentIntent && paymentIntent.status === 'succeeded') {
            dispatch(resetPackageSummary());
            updateRedux();
            history.push('/dashboard?payment_status=success');
        }
        else {
            setMessage("Unexpected payment state.");
        }

        setIsProcessing(false);
    }

    const updateRedux = () => {
        let local_company = { ...company };
        local_company.plan = 'business';
        dispatch(setCompany(local_company));
        let companies_local = JSON.parse(JSON.stringify(companies));
        let index = _.findIndex(companies_local, cm => {
            return cm.id === company.id;
        });
        companies_local[index] = local_company;
        dispatch(setCompanies(companies_local));
        dispatch(setPackagesPopupStatus(false));
    }

    useEffect(() => {
        return () => {
        };
    }, [stripe]);

    useEffect(() => {
        return () => {
        };
    }, []);

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement />
                <Row>
                    <Col sm={2}>
                        <Button type='submit' disabled={isProcessing} className="mt-4" color="success" size="large" variant="contained" endIcon={<PaymentIcon />}>
                            {isProcessing ? 'Processing ...' : 'Pay Now'}
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <Button disabled={isProcessing} onClick={cancelPayment} className="mt-4" size="large" variant="outlined">
                            Cancel
                        </Button>
                    </Col>
                </Row>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    )
}

export default withRouter(SubscriptionCheckoutForm);