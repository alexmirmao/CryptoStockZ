import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";


export default class ProductList extends Component{
  render() {
    const {id, title, img, price, inCart,ownerID} = this.props.product; // Destructuracion para no tener que poner this.props.product

    return(
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div className="img-container" onClick={()=>console.log("click")}>
            <Link to="/details">
              <img src={img} alt="product" className="card-img-top"/>
            </Link>
            <button className="cart-btn" disabled={inCart?true:false}
            onClick={()=>{console.log("Añadido a la cesta");}}>

            {inCart ? (
              <p className="text-capitalize mb-0" disabled>
                {""}
                in Cart
              </p>)
            :(
              <i className="fas fa-cart-plus" />
            )}
            </button>
          </div>
        </div>
      </ProductWrapper>
    )
  }
}

const ProductWrapper = styled.div`

 `
