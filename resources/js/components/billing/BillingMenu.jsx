import React, { useState } from 'react';
import { withRouter } from 'react-router';
import axiosInstance from '../../api/api';

const BillingMenu = ({ history }) => {

    const [loading, setLoading] = useState(false);

    const visitBillingPortan = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            axiosInstance.post(`/api/user/marketplace/stripe/stripe-billing-portal`).then(e => {
                window.location.href = e.data;
            }).catch(err => {
                setLoading(false);
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });
        }
    }

    return (
        <>
            <a onClick={visitBillingPortan}>
                {loading ? 'Loading Stripe...' : 'Billing'}
            </a>
        </>
    )
}

export default withRouter(BillingMenu);