import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductOptions from './ProductOptions';
import { Dropdown, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems } from '../../../actions';

const Product = ({ product, removeProduct }) => {

    const { items, summary } = useSelector((state) => ({
        items: state.cart.items,
        summary: state.cart.summary,
    }));

    const dispatch = useDispatch();

    const handleRemove = (e) => {
        removeProduct(e, product);
    }

    const [subscriptionOptions, setSubscriptionOptions] = useState([]);

    useEffect(() => {
        if (product) {
            setSubscriptionOptions([
                {
                    key: 1,
                    text: `US ${product.item.monthly_price.toFixed(2)}/Month`,
                    value: 'month',
                },
                {
                    key: 2,
                    text: `US ${product.item.yearly_price.toFixed(2)}/Year`,
                    value: 'year',
                }
            ])
        }
    }, [product]);

    const handleSubType = (event, { value }) => {
        const updatedItems = items.map(item => {
            if (item.id === product.id) {
                return { 
                    ...item, 
                    sub_type: value, 
                    price: (value == 'month' ? product.item.monthly_price : product.item.yearly_price),
                    price_id: (value == 'month' ? product.item.stripe_monthly_price : product.item.stripe_yearly_price),
                };
            }
            return item;
        });
        dispatch(setCartItems(updatedItems));
    }

    return (
        <tr>
            <td>
                <p className="m-0 d-inline-block align-middle font-16">
                    <Link to="#" className="text-body">
                        {product.name}
                    </Link>
                    <br />
                    <small className="me-2">
                        <b>Type:</b> {product.type}{' '}
                    </small>
                </p>
            </td>
            <td>

                <Form.Field>
                    <Dropdown
                        placeholder='Subcription Type'
                        onChange={handleSubType}
                        value={product.sub_type}
                        fluid
                        selection
                        options={subscriptionOptions}
                        disabled={!_.isEmpty(summary.subscriptionId)}
                    />
                    {/* {this.displayInputError(errors, 'product.sub_type')} */}
                </Form.Field>
            </td>
            <td>
                {_.isEmpty(summary.subscriptionId) && <ProductOptions removeProduct={handleRemove} /> }
            </td>
        </tr>
    )
}

export default Product;