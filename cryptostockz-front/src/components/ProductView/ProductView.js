import React from 'react';
import { Container, Row, Col, Image, Button, ListGroup } from 'react-bootstrap';
import './ProductView.css';

import { withCookies } from 'react-cookie';

import axios from 'axios';
import mergeImages from 'merge-images';

import config from '../../config';


class ProductView extends React.Component {

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            product: {

            },
            user: {

            },
            baseUrl: config.baseUrl,
            token: cookies.get('x-access-token'),
            roles: cookies.get('roles'),
            username: cookies.get('username'),
            images: [],
            mainImage: "",
            imageLoaded: false
        };
    }

    componentDidMount() {
        this.getProductInfo(this.props.match.params.productId);
        this.getUserInfo(this.state.username);
    }


    getProductInfo(productId) {
        var config = {
            method: 'get',
            url: this.state.baseUrl + '/product/' + productId,
            headers: {
                'Content-Transfer-Encoding': 'application/json',
                'x-access-token': this.state.token
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data.product));
                this.setState({

                    product: response.data.product,
                    images: response.data.images,
                    imageLoaded: true

                });
                this.combineImages();
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    getUserInfo(username) {
        var config = {
            method: 'get',
            url: this.state.baseUrl + '/account/' + username,
            headers: {
                'x-access-token': this.state.token,
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

    resizeImage(base64Str, width, height) {

        var img = new Image;
        img.src = base64Str;
        img.width = width;
        img.height = height;
        return img;
      }

      //https://resizeimage.net/
    combineImages(){
        mergeImages([
            { src: `data:image/png;base64,${this.state.images[0]}`, x: 0, y: 0 },
            { src: `data:image/png;base64,${this.state.images[1]}`, x: 60, y: 25 },
            { src: `data:image/png;base64,${this.state.images[2]}`, x: 100, y: 0 }
          ])
            .then(b64 => {
                this.setState({mainImage: b64});
            });
    }


    render() {
        return (
            <Container className="product_container">
                <Row>
                    <Col sm={4} align="center">
                        <div>
                            <label>{this.state.product.name}</label>
                        </div>
                        <div className="product_img">
                            {this.state.imageLoaded ? 
                            <Image src={this.state.mainImage} width="350px" rounded />
                            : null }
                        </div>
                    </Col>
                    <Col sm={8}>
                        <div className="info">
                            <ListGroup>
                                <ListGroup.Item>Address: {this.state.product.address}</ListGroup.Item>
                                <ListGroup.Item>DNA: {this.state.product.dna}</ListGroup.Item>
                                <ListGroup.Item>Owner: {this.state.product.owner_address}</ListGroup.Item>
                                <ListGroup.Item>Transactions: {this.state.product.numberOfTransactions}</ListGroup.Item>
                                <ListGroup.Item>Level: {this.state.product.level}</ListGroup.Item>
                                <ListGroup.Item>Created at: {this.state.product.createdAt}</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="button_container">
                            {this.state.user.metamaskAccount !== this.state.product.owner_address ?
                                <Button>Add to Wish List</Button>
                                : (
                                    <Button>Transfer</Button>
                                )}

                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withCookies(ProductView);