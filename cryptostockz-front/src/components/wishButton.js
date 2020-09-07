import React from 'react';
import { Button } from 'react-bootstrap';

import { AddProductToWishList, DeleteProductFromWishList, CheckProductInWish } from '../services/BackendService';
import { Checkbox } from '@material-ui/core';

class WishButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addColor: "primary",
            removeColor: "danger",
            inwish: false
        }
    }

    componentDidMount() {
        //Aqui comprobar si un producto esta en la wishList
        CheckProductInWish(this.props.token,this.props.productId)
        .then(response => {
            console.log(response.data.products);
            if(response.data.products.length === 0){
                console.log("empty");
                this.setState({inwish: false});
            }else{
                console.log("not empty");
                this.setState({inwish: true});
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    addToWishList(e) {
        AddProductToWishList(this.props.token, this.props.productId)
            .then((response) => {
                this.setState({ inwish: true });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    removeFromWishList(e) {
        DeleteProductFromWishList(this.props.token, this.props.productId)
            .then((response) => {
                this.setState({ inwish: false });
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.inwish ?
                    <Button variant={this.state.removeColor} onClick={e => this.removeFromWishList(e)}>Remove</Button>
                    : (
                        <Button variant={this.state.addColor} onClick={e => this.addToWishList(e)}>Add to wishes</Button>
                    )}
            </React.Fragment>
        )
    }

}

export default WishButton;