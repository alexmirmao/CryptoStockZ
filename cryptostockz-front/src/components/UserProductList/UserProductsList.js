import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { withCookies } from 'react-cookie';


import config from '../../config';


class UserProductsList extends React.Component {

    constructor(props){
        super(props);
        const {cookies} = props;
        this.state = {
            user_products: [],
            baseUrl: config.baseUrl,
            token: cookies.get('x-access-token'),
            roles: cookies.get('roles'),
            username: cookies.get('username')
        };
    }

    getUserProducts() {
        var config = {
            method: 'get',
            url: this.state.baseUrl + '/product',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data.products));
                this.setState({
                    user_products: response.data.products
                });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getUserProducts();
    }



    render() {
        return (
            <React.Fragment>
                {this.state.user_products.length === 0 ? (
                    <Grid align="center" container spacing={5}>
                        <span>There are no products</span>
                    </Grid>
                ) : (
                        <Grid align="center" container spacing={5}>
                            {this.state.user_products.map((product) => {
                                return (
                                    <Grid item xs={6} key={product.id}>
                                        <ProductCard productInfo={product} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    )
                }
            </React.Fragment>
        )
    }
}

export default withCookies(UserProductsList);