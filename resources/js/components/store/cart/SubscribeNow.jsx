import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setCartSummary } from '../../../actions';
import axiosInstance from '../../../api/api';
import axios from 'axios';

const SubscribeNow = () => {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const cancelTokenSource = axios.CancelToken.source();

    const { summary, company, token } = useSelector((state) => ({
        summary: state.cart.summary,
        company: state.orgs.company,
        token: state.token.activeToken,
    }));

    const createSubscription = () => {
        setLoading(true);
        axiosInstance.post(`/api/user/marketplace/stripe/create-subscription`, {
            comp_id: company.id,
            prices: summary.prices
        }).then(e => {
            dispatch(setCartSummary({
                ...summary,
                subscriptionId: e.data.subscriptionId,
                clientSecret: e.data.clientSecret
            }));
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response.status === 401) {
                history.push('/login');
            }
        });
    }

    const handleSubscription = () => {
        if (_.isEmpty(summary.subscriptionId)) {
            createSubscription();
        }
        else {
            // redirect to payment 
        }
    }

    useEffect(() => {
        return () => {
            // Cancel the request when the component is unmounting
            cancelTokenSource.cancel('Request canceled due to component unmounting.');
        };
    }, []);

    return (
        <Button disabled={_.size(summary.prices) == 0} onClick={handleSubscription} variant="contained">
            Subscribe Now
        </Button>
    );
}

export default SubscribeNow;