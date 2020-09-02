import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';


class UserProductsList extends React.Component {

    state = {
        user_products: []
    }

    getUserProducts() {
        var config = {
            method: 'get',
            url: 'http://192.168.1.42:10010/product',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTk4OTgwNDI5LCJleHAiOjE1OTkwNjY4Mjl9.aPE3idLGpEuUw1eYS_jTqAF0z0xUm0tuVAbPGsssEXI'
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

export default UserProductsList;