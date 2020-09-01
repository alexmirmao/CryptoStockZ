import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';


class UserProductsList extends React.Component {

    state = {
        user_products: []
    }

    storeProducts = [
        {
            id: 1,
            owner: "AirForce",
            name: "AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 2,
            owner: "AirForce",
            name: "Air Jordan",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 3,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
    ];

    getUserProducts() {
        var config = {
            method: 'get',
            url: 'http://192.168.1.42:10010/account/products/all',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTk4OTYwODc2LCJleHAiOjE1OTkwNDcyNzZ9.-PSfbnBUSmYmTmOSAIr-o3dmtbpwebP3IV0m4Iv5CZc'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                this.setState({
                    products: response.data.products
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
                <Grid align="center" container spacing={5}>
                        {this.state.user_products.map((product) => {
                            return (
                            <Grid item xs={6}>
                                <ProductCard productInfo={product} key={product.id.toString()} />
                            </Grid>
                            )
                        })}
                </Grid>
            </React.Fragment>
        )
    }
}

export default UserProductsList;