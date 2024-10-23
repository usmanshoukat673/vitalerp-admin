import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import SubscriptionCheckoutForm from './SubscriptionCheckoutForm';

const MakeSubscriptionPayment = ({cancelPayment}) => {

    const [stripePromise, setStripePromise] = useState(null);

    const { publishable_key, summary } = useSelector((state) => ({
        publishable_key: state.marketplace.publishable_key,
        summary: state.mpackages.summary,
    }));

    useEffect(() => {
        setStripePromise(loadStripe(publishable_key))
    }, [publishable_key]);

    useEffect(() => {
        return () => {
        };
    }, []);

    return (
        <>
            {summary.clientSecret && stripePromise ? (<Elements stripe={stripePromise} options={{ clientSecret: summary.clientSecret }}>
                <SubscriptionCheckoutForm cancelPayment={cancelPayment} />
            </Elements>) : (<div>Loading ...</div>)}
        </>
    )
}

export default MakeSubscriptionPayment;