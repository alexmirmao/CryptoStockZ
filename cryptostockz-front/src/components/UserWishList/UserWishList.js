import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';



class UserWishList extends React.Component {

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
        {
            id: 3,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 4,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 5,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 6,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 7,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 8,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 9,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        },
        {
            id: 10,
            owner: "AirForce",
            name: "img/AirForce.png",
            ean: 10,
            sku: "Nike",
            level: 0
        }
    ];

    render() {
        return (
            <React.Fragment>
                <Grid align="center" container spacing={5}>
                        {this.storeProducts.map((product) => {
                            return <Grid item xs={6}><ProductCard productInfo={product} key={product.id}/></Grid>
                        })}
                </Grid>
            </React.Fragment>
        )
    }
}

export default UserWishList;