import React, {Component} from "react";
import Product from "./Product";
import Title from "./Title";
import {ProductConsumer} from "../context";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
/* ProductList.js es el componente que va a recopilar los datos de los
productos y ponerlos en columnas
*/
export default class ProductList extends Component{
  render() {
    return(

      <React.Fragment>

        <div className="py-5">
    <div>
    <FormGroup controlId="nombre" bsSize="large">
      <ControlLabel>Nombre</ControlLabel>
      <FormControl
        autoFocus
        type="nombre"
        value="nombre"
      />
    </FormGroup>
    <FormGroup controlId="nif" bsSize="large">
      <ControlLabel>nif</ControlLabel>
      <FormControl
        autoFocus
        type="nif"
        value="nif"
      />
    </FormGroup>
    <FormGroup controlId="email" bsSize="large">
      <ControlLabel>email</ControlLabel>
      <FormControl
        autoFocus
        type="email"
        value="email"
      />
    </FormGroup>
      <FormGroup controlId="rol" bsSize="large">
        <ControlLabel>rol</ControlLabel>
        <FormControl
          autoFocus
          type="rol"
          value="rol"
        />
      </FormGroup>
      <FormGroup controlId="level" bsSize="large">
        <ControlLabel>level</ControlLabel>
        <FormControl
          autoFocus
          type="level"
          value="level"
        />
      </FormGroup>
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
