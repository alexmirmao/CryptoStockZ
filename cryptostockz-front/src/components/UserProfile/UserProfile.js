import React from 'react';
import { Container, Row, Col, Image, Tabs, Tab, ListGroup } from 'react-bootstrap';
import './UserProfile.css';

import UserProductList from '../UserProductList/UserProductsList';
import UserWishList from '../UserWishList/UserWishList';
import NewProduct from '../NewProduct/NewProduct';

class UserProfile extends React.Component {

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
                                    <div className="container">
                                        <UserProductList/>
                                    </div>
                                </Tab>
                                <Tab eventKey="wish" title="Wish List">
                                    <div className="container">
                                        <UserWishList/>
                                    </div>
                                </Tab>
                                <Tab eventKey="tx" title="My Transactions">
                                    <div className="container">
                                        List of User Tx
                                    </div>
                                </Tab>
                                <Tab eventKey="new" title="New Product">
                                    <div className="container">
                                        <NewProduct/>
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

export default UserProfile;