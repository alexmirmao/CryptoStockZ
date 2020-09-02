import React from 'react';
import { Container, Row, Col, Image, Tabs, Tab, ListGroup } from 'react-bootstrap';
import './UserProfile.css';

import UserProductList from '../UserProductList/UserProductsList';
import UserWishList from '../UserWishList/UserWishList';
import NewProduct from '../NewProduct/NewProduct';
import PendingProductList from '../PendingProductList/PendingProductList';

import { withCookies } from 'react-cookie';

import axios from 'axios';

import config from '../../config';

class UserProfile extends React.Component {

    constructor(props){
        super(props);
        const {cookies} = props;
        this.state = {
            user: {
            },
            user_products: [],
            baseUrl: config.baseUrl,
            token: cookies.get('x-access-token'),
            roles: cookies.get('roles'),
            username: cookies.get('username')
        };
    }


    getUserInfo() {
        var config = {
            method: 'get',
            url: this.state.baseUrl+'/account/'+this.state.username,
            headers: {
                'x-access-token': this.state.token
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data.user));
                this.setState({
                    user: response.data.user
                });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getUserInfo();
    }


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
                                <ListGroup.Item>Username: <strong>{this.state.user.username}</strong></ListGroup.Item>
                                <ListGroup.Item>Email: <strong>{this.state.user.email}</strong></ListGroup.Item>
                                <ListGroup.Item>Level: <strong>{this.state.user.level}</strong></ListGroup.Item>
                                <ListGroup.Item>Sales: <strong>{this.state.user.sales}</strong></ListGroup.Item>
                                <ListGroup.Item>Purchases: <strong>{this.state.user.purchases}</strong></ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div>
                            <Tabs defaultActiveKey="products" transition={false} id="noanim-tab-example">
                                <Tab eventKey="products" title="Products">
                                    <div className="container">
                                        <UserProductList userProducts={this.state.products} />
                                    </div>
                                </Tab>
                                <Tab eventKey="wish" title="Wish List">
                                    <div className="container">
                                        <UserWishList />
                                    </div>
                                </Tab>
                                {this.state.roles === "ROLE_MANUFACTURER" ? (
                                    <Tab eventKey="pending" title="Pending Products">
                                        <div className="container">
                                            <PendingProductList userProducts={this.state.products} />
                                        </div>
                                    </Tab>
                                ) : null}
                                <Tab eventKey="new" title="New Product">
                                    <div className="container">
                                        <NewProduct />
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

export default withCookies(UserProfile);