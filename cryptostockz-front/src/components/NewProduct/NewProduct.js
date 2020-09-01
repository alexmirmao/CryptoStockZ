import React from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";

import axios from 'axios';


class NewProduct extends React.Component {

  state = {
    new_product: {
      name: "",
      ean: "",
      sku: ""
    }
  }

  registerNewProduct(event) {
    var data = JSON.stringify(
      [
        {
          "name": this.state.new_product.name,
          "ean": this.state.new_product.ean,
          "sku": this.state.new_product.sku
        }
      ]);

    var config = {
      method: 'post',
      url: 'http://192.168.1.42:10010/base/product',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTk4OTgwNDI5LCJleHAiOjE1OTkwNjY4Mjl9.aPE3idLGpEuUw1eYS_jTqAF0z0xUm0tuVAbPGsssEXI'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateName(event) {
    this.setState({
      new_product: {
        name : event.target.value
      }
    });
    console.log(event.target.value);
  }

  updateEan(event) {
    this.setState({
      new_product: {
        ean : event.target.value
      }
    });
    console.log(event.target.value);
  }

  updateSku(event) {
    this.setState({
      new_product: {
        sku : event.target.value
      }
    });
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="Newproduct">
          <Form.Group controlId="formBasicName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="input" placeholder="Product name" onChange={(e) => this.updateName(e)} />
          </Form.Group>
          <Form.Group controlId="formBasicEan">
            <Form.Label>EAN</Form.Label>
            <Form.Control type="input" placeholder="Product Ean" onChange={(e) => this.updateEan(e)}/>
          </Form.Group>
          <Form.Group controlId="formBasicSku">
            <Form.Label>SKU</Form.Label>
            <Form.Control type="input" placeholder="Product Sku" onChange={(e) => this.updateSku(e)}/>
          </Form.Group>
          <Form.Group controlId="formBasicManu">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control type="input" placeholder="Manufacturer" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={e => this.registerNewProduct(e)}>
            Register
        </Button>
      </div>
    );
  }
}

export default NewProduct;