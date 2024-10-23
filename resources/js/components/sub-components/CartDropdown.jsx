// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Dropdown, Alert } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

// notifiaction continer styles
const notificationContainerStyle = {
    maxHeight: '300px',
    display: 'none',
};

const notificationShowContainerStyle = {
    maxHeight: '300px',
};

const CartDropdown = ({ history }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationContentStyle, setNotificationContentStyles] = useState(notificationContainerStyle);


    const { items } = useSelector((state) => ({
        items: state.cart.items,
    }));

    /*
     * toggle notification-dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setNotificationContentStyles(
            notificationContentStyle === notificationContainerStyle
                ? notificationShowContainerStyle
                : notificationContainerStyle
        );
    };

    const visitCart = () => {
        history.push('/store/subscription/products');
    }

    const visitMarketplace = () => {
        history.push('/store/standards');
    }

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-notification"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">
                <i className="dripicons-cart noti-icon"></i>
                {
                    _.size(items) > 0 && <span className="cart-noti-icon-badge">{_.size(items)}</span>
                }
            </Dropdown.Toggle>
            {/* <Dropdown.Menu align={'end'} className="dropdown-menu-animated dropdown-lg">
                <div onClick={toggleDropdown}> */}
               {/* <div className="dropdown-item noti-title px-3"> */}
                        {
                            // _.size(items) > 0 ? <h5 className="m-0">
                            //     <span className="float-end">
                            //         {/* <Link to="/notifications" className="text-dark">
                            //         <small>Clear All</small>
                            //     </Link> */}
                            //     </span>
                            //     Selected Products:
                            // </h5> : <Alert variant="warning" className="mt-3">
                            //     Your Subscription bag is <strong>Empty</strong>.
                            // </Alert>
                        }
                    {/* </div>   */}

                    {/* {
                        _.size(items) > 0 && <SimpleBar className="px-3" style={notificationContentStyle}>
                            {items.map((product, idx) => {
                                return (
                                    <Dropdown.Item
                                        key={idx + '-noti'}
                                        className={classNames(
                                            'p-0 notify-item card shadow-none mb-2',
                                        )}>
                                        <Card.Body>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1 text-truncate ms-2">
                                                    <h5 className="noti-item-title fw-semibold font-14">
                                                        {product.name}
                                                    </h5>
                                                    <b>
                                                        {
                                                            product.sub_type == 'month' ? `US ${product.item.monthly_price.toFixed(2)}/Month` : `US ${product.item.yearly_price.toFixed(2)}/Year`
                                                        }
                                                    </b>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Dropdown.Item>
                                );
                            })}
                        </SimpleBar>
                    } */}

                    {/* {
                        _.size(items) > 0 ? <Dropdown.Item onClick={visitCart} className="text-center text-primary notify-item border-top border-light py-2">
                            View Subscription Bag
                        </Dropdown.Item> : <Dropdown.Item onClick={visitMarketplace} className="text-center text-primary notify-item border-top border-light py-2">
                            Visit Marketplace
                        </Dropdown.Item>
                    } */}

               {/* </div>
            </Dropdown.Menu>*/}
        </Dropdown>
    );
};

export default withRouter(CartDropdown);
