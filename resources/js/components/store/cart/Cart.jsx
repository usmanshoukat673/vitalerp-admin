import React, { useEffect, useState } from 'react';
// @flow
import { Row, Col, Card, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PageTitle from '../../sub-components/PageTitle';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, setCartSummary } from '../../../actions';
import Product from './Product';
import CartSummary from './CartSummary';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import SubscribeNow from './SubscribeNow';
import MakePayment from './MakePayment';
import { cancelSubscription } from './cartApi';

const Cart = ({ history, token }) => {

    const { items, summary, company } = useSelector((state) => ({
        items: state.cart.items,
        summary: state.cart.summary,
        company: state.orgs.company,
    }));

    const dispatch = useDispatch();

    /**
     * On quantity changed
     */
    const onQtyChange = (e, item) => {
        var localItems = [...items];
        var idx = localItems.findIndex((i) => i.id === item.id);
        var newQty = e.target.value;
        var newTotal = localItems[idx].price * newQty;
        localItems[idx] = { ...item, qty: newQty, total: newTotal };
        _adjustCart(localItems);
    };

    /**
     * Removes item from cart
     */
    const removeProduct = (e, item) => {
        e.preventDefault();
        let localItems = items.filter((i) => i.item.id !== item.item.id);
        dispatch(setCartItems(localItems));
    };

    useEffect(() => {
        let newGrossTotal = 0;
        let prices = [];
        _.forEach(items, (item) => {
            if (summary.type == 'month') {
                newGrossTotal += item.price;
            }
            else {
                newGrossTotal += item.one_time_price;
            }
            prices.push(item.price_id);
        });
        let newNetTotel = newGrossTotal - summary.discount;
        dispatch(setCartSummary({
            ...summary,
            gross_total: newGrossTotal,
            net_total: newNetTotel,
            prices: prices,
        }));
    }, [items]);

    /**
     * Adjust the cart
     */
    const _adjustCart = (localItems) => {
        // calculate gross and other total
        var newGrossTotal = 0;
        for (const item of localItems) {
            newGrossTotal += item.total;
        }
        var newNetTotel = newGrossTotal - summary.discount + summary.shipping_charge + summary.tax;
        setItems(localItems);

        dispatch(setCartSummary({
            ...summary,
            gross_total: newGrossTotal,
            net_total: newNetTotel,
        }));
    };

    const visitBilling = () => {
        history.push('/store/subscription/billing');
    }

    const visitStripBilling = () => {
        history.push(`/billing-portal/${company.id}`);
    }

    const handleCancelSubcription = () => {
        cancelSubscription(summary.subscriptionId, token);
        dispatch(setCartSummary({
            ...summary,
            subscriptionId: '',
            clientSecret: ''
        }));
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Marketplace', path: '/store/standards' },
                    {
                        label: 'Bag',
                        path: '/store/subscription/products',
                        active: true,
                    },
                ]}
                title={'Subscription Bag'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col lg={8}>
                                    {
                                        _.isEmpty(summary.subscriptionId) && <>

                                            <Table borderless className="table-centered table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Total</th>
                                                        <th style={{ width: '50px' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((product, idx) => {
                                                        return (
                                                            <Product product={product} key={idx} removeProduct={removeProduct} />
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                            <Row className="mt-4">
                                                <Col sm={6}>
                                                    <Link
                                                        to="/store/standards"
                                                        className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold">
                                                        <i className="mdi mdi-arrow-left"></i> Back to Marketplace{' '}
                                                    </Link>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className="text-sm-end">
                                                        <SubscribeNow />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    }

                                    {
                                        !_.isEmpty(summary.subscriptionId) && <Row className="mt-4">
                                            <Col sm={12}>
                                                <MakePayment cancelPayment={handleCancelSubcription} />
                                            </Col>
                                        </Row>
                                    }

                                </Col>

                                <Col lg={4}>
                                    <CartSummary />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default withRouter(Cart);