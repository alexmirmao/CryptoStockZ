import React from 'react';
import { Container, Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import './ProductView.css';

import axios from 'axios';


class ProductView extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params.productId);
    }

    getProductInfo(productId) {
        var config = {
            method: 'get',
            url: 'http://192.168.1.42:10010/product/'+productId,
            headers: {
                'Content-Transfer-Encoding': 'application/json',
                'x-access-token': ''
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <Container className="product_container">
                <Row>
                    <Col sm={4} align="center">
                        <div>
                            <label>Product Name</label>
                        </div>
                        <div className="product_img">
                            <Image style={{ elevation: 2 }} src="https://i.pinimg.com/originals/c0/a7/a5/c0a7a58b2c454aec709b651acdc1eeff.png" width="300px" rounded />
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="info">
                            <ListGroup>
                                <ListGroup.Item>Address: 0x1241414123134141</ListGroup.Item>
                                <ListGroup.Item>DNA: 12314143</ListGroup.Item>
                                <ListGroup.Item>Owner: 0xfwjnf23irj1orin</ListGroup.Item>
                                <ListGroup.Item>Transactions: 0</ListGroup.Item>
                                <ListGroup.Item>Level: 0</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="button_container">
                            <Button>Transfer</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ProductView;