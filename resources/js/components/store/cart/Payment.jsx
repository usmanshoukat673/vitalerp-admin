import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import axiosInstance from '../../../api/api';

const Payment = ({ }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const { publishable_key, token, company } = useSelector((state) => ({
        publishable_key: state.marketplace.publishable_key,
        token: state.token.activeToken,
        company: state.orgs.company,
    }));

    useEffect(() => {
        setStripePromise(loadStripe(publishable_key))
    }, [publishable_key]);

    useEffect(() => {
        setLoading(true);
        axiosInstance.post(`/api/user/marketplace/stripe/create-payment-intent`, {
            comp_id: company.id,
            net_total: 10
        }).then(e => {
            setClientSecret(e.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }, []);

    return (
        <>
            {clientSecret && stripePromise ? (<Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
            </Elements>) : (<div>Loading ...</div>)}
        </>
    )
}

export default Payment;