import React, {Component} from "react";
import Product from "./Product";
import Title from "./Title";
import {ProductConsumer} from "../context";
/* ProductList.js es el componente que va a recopilar los datos de los
productos y ponerlos en columnas
*/
export default class ProductList extends Component{
  constructor(props){
    super(props);
      this.state={
        username:"",
        email:"",
        level:"",
        purchases:"",
        sales:"",
        errorMessage:"",
        successMessage:""
      }
  }

  render() {
    return(

      <React.Fragment>

        <div className="py-5">
    <div>
    <div className="form-group mx-auto text-center" >
        <label>Username :  </label>
        <output type="text" id="username" value={this.state.username}/>
    </div>

    <div className="form-group mx-auto text-center" >
        <label>Email :  </label>
        <output type="email" id="email" value={this.state.email} />
    </div>

    <div className="form-group mx-auto text-center" >
        <label>Level :  </label>
        <output type="level" id="level" value={this.state.level} />
    </div>

    <div className="form-group mx-auto text-center" >
        <label>Purchases :  </label>
        <output type="purchases" id="purchases" value={this.state.purchases} />
    </div>

    <div className="form-group mx-auto text-center" >
        <label>Sales :  </label>
        <output type="sales" id="sales" value={this.state.sales} />
    </div>

    </div>
          <div className="container">
            <Title name="Productos" title="disponibles"/>
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product}/>;
                  });
                }}
                {/*Da igual el nombre de la variable. Esta va a apuntar
              a la que hayamos puesto en "value" en ProductContext.Provider
                (1:50)*/}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
      //  <Product />

    )
  }
}
