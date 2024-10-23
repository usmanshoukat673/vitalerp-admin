import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

function Item({ item }) {
    return (
        <Card className='slider__item'>
            <Card.Body>
                <Row>
                    <Col lg={5}>
                        <Link to="#" className="text-center d-block">
                            <img
                                src={`${_.isEmpty(item.image_data) ? '/images/no-image.png' : item.image_data}`}
                                className="img-fluid"
                                style={{ maxWidth: '275px', maxHeight: '275px' }}
                                alt="Product-img"
                            />
                        </Link>
                    </Col>
                    <Col lg={7}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>

                        <Button className="CheckButton">
                            Check it out!
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

const StoreSlider = ({ featured_products }) => {
    return (
        <Carousel
            navButtonsProps={{
                style: {
                    backgroundColor: 'cornflowerblue',
                    borderRadius: 0
                }
            }}
        >
            {
                featured_products.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

export default StoreSlider;