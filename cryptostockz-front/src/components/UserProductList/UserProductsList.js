import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

import config from '../../config';


class UserProductsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user_products: [],
            baseUrl: config.baseUrl
        };
    }

    getUserProducts() {
        var config = {
            method: 'get',
            url: this.state.baseUrl + '/product',
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