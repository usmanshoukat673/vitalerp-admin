import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setMarketplaceStandard, showRightSidebar } from "../../../actions";
import _ from "lodash";
import { withRouter } from 'react-router';
// import Rating from "../../sub-components/Rating";
import CheckIcon from '@mui/icons-material/Check';
import AddProduct from "./AddProduct";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Product = ({ product, history }) => {

    const [added_to_cart, setAddedToCart] = useState(false);

    const { items, token, summary } = useSelector((state) => ({
        items: state.cart.items,
        token: state.token.activeToken,
        summary: state.cart.summary,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        if (_.size(items) > 0) {
            setAddedToCart(_.some(items, (p) => p.item.id === product.id));
        }
    }, [items]);

    const handleProduct = () => {
        dispatch(showRightSidebar());
        dispatch(setMarketplaceStandard(product));
    }

    const handleSubscribe = (plan) => {
        if (!added_to_cart) {
            let item = {
                stripe_product: product.stripe_prod,
                type: 'standard',
                price: (plan == 'month' ? product.monthly_price : product.yearly_price),
                price_id: (plan == 'month' ? product.stripe_monthly_price : product.stripe_yearly_price),
                name: product.name,
                sub_type: plan,
                item: product,
                id: product.id
            }
            dispatch(setCartItems([...items, item]));
        }
        history.push('/store/subscription/products');
        return;
    }

    const removeProduct = (e) => {
        e.preventDefault();
        let localItems = items.filter((i) => i.item.id !== product.id);
        dispatch(setCartItems(localItems));
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col lg={5}>
                            <Link to="#" className="text-center d-block">
                                <img
                                    src={`${_.isEmpty(product.image_data) ? '/images/no-image.png' : product.image_data}`}
                                    className="img-fluid"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    alt="Product-img"
                                />
                            </Link>
                        </Col>

                        <Col lg={7}>
                            <form className="ps-lg-4">
                                <h3 className="mt-0 chand" onClick={handleProduct}>
                                    {product.name}
                                </h3>

                                <div className="mt-4 flex">
                                    <h6 className="font-14">Monthly Subscription Price:</h6>
                                    <h3>${product.monthly_price}</h3>
                                </div>

                                <div className="mt-4">
                                    <div className="d-flex">
                                        {
                                            added_to_cart ? <>
                                                <Button variant="contained" startIcon={<CheckIcon />}>
                                                    Selected
                                                </Button>
                                                <IconButton onClick={removeProduct} aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </> :
                                                <AddProduct product={product} added={handleSubscribe} />
                                        }
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}

export default withRouter(Product);