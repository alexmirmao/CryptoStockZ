import React from 'react';
import { Container, Row, Col, Image, Tabs, Tab, ListGroup } from 'bootstrap';

class ProductView extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <div className="user_img">
                            <Image src="https://www.w3schools.com/howto/img_avatar.png" width="250px" rounded />
                        </div>
                        <div className="user_information">
                            <ListGroup>
                                <ListGroup.Item>Username: username</ListGroup.Item>
                                <ListGroup.Item>Email: email@email.com</ListGroup.Item>
                                <ListGroup.Item>Level: 1</ListGroup.Item>
                                <ListGroup.Item>Sales: 0</ListGroup.Item>
                                <ListGroup.Item>Purchses: 0</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div>
                            <Tabs defaultActiveKey="products" transition={false} id="noanim-tab-example">
                                <Tab eventKey="products" title="Products">
                                </Tab>
                                <Tab eventKey="wish" title="Wish List">
                                    <div className="container">
                                        List of User Products in the Wish List - UserProductList wish
                                    </div>
                                </Tab>
                                <Tab eventKey="tx" title="My Transactions">
                                    <div className="container">
                                        List of User Tx
                                    </div>
                                </Tab>
                                <Tab eventKey="pending" title="Pending">
                                    <div className="container">
                                        List of User Products not verified - UserProductList original=false
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ProductView;