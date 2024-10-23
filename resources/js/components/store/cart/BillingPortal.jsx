import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import axiosInstance from '../../../api/api';

const BillingPortal = () => {

    const [loading, setLoading] = useState(false);

    const { items } = useSelector((state) => ({
        items: state.cart.items,
    }));

    const visitBillingPortan = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/marketplace/stripe/stripe-billing-portal`).then(e => {
            setLoading(false);
            window.location.href = e.data;
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    return (
        <>
            <Button disabled={_.size(items) == 0 || loading} onClick={visitBillingPortan} color="secondary" variant="contained">
                Billing
            </Button>
        </>
    )
}

export default BillingPortal;