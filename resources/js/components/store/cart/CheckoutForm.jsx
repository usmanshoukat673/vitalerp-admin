import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { resetCartSummary, setCartItems } from '../../../actions';
import { withRouter } from 'react-router';
import { Col, Row } from 'react-bootstrap';

const CheckoutForm = ({ history, cancelPayment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/store/subscription/payment/success`,
            },
            redirect: "if_required",
        })

        if (error) {
            setMessage(error.message);
        }
        else if (paymentIntent && paymentIntent.status === 'succeeded') {
            dispatch(setCartItems([]));
            dispatch(resetCartSummary())
            history.push('/store/subscription/payment/success');
        }
        else {
            setMessage("Unexpected payment state.");
        }

        setIsProcessing(false);
    }

    useEffect(() => {
        return () => {
        };
    }, [stripe]);

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

export default withRouter(CheckoutForm);