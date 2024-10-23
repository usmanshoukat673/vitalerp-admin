import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const MakePayment = ({cancelPayment}) => {

    const [stripePromise, setStripePromise] = useState(null);

    const { publishable_key, summary } = useSelector((state) => ({
        publishable_key: state.marketplace.publishable_key,
        summary: state.cart.summary,
    }));

    useEffect(() => {
        setStripePromise(loadStripe(publishable_key))
    }, [publishable_key]);

    return (
        <>
            {summary.clientSecret && stripePromise ? (<Elements stripe={stripePromise} options={{ clientSecret: summary.clientSecret }}>
                <CheckoutForm cancelPayment={cancelPayment} />
            </Elements>) : (<div>Loading ...</div>)}
        </>
    )
}

export default MakePayment;