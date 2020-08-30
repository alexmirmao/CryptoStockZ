import React, {Component} from "react";
import {storeProducts, detailProduct} from "./data";
{/* Context.js hace que no tengamos que pasar los productos cada vez que
 los tengamos que usar. Lo que hacemos es que fijamos los productos en el
 state de ProductContext.Provider value={productos}
*/}

const ProductContext = React.createContext();
//Provider. Da toda la información a la App
class ProductProvider extends Component{
  state={
    products:storeProducts,
    detailProduct:detailProduct
  }

  handleDetail=()=>{
    console.log("hello from handledetail");
  } // Para abrir la pagina de los detalles del producto

  addToCart=()=>{
    console.log("hello from addToCart");
  } // Para añadirlo a la cesta

  render () {
    return(
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

/* ...this.state Para pasar el state de todos
  además, como value es un objeto, le metemos las propiedades
  que va a tener: handleDetail, addToCart..*/

//Consumer. Para coger la información en cualquier parte de la App.
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};

// Ahora hay que añadir ProductProvider al principio del DOM en index.js
