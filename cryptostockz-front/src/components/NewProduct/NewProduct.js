import React from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";
import config from '../../config';

import axios from 'axios';


class NewProduct extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      ean: "",
      sku: "",
      manufacturer: "",
      isManufacturer: true,
      baseUrl: config.baseUrl
    };
  }

  checkData() {
    if (this.state.isManufacturer) {
      return (this.state.name !== "" && this.state.ean !== "" && this.state.sku !== "");
    } else {
      return (this.state.name !== "" && this.state.ean !== "" && this.state.sku !== "" && this.state.manufacturer !== "");
    }
  }

  registerNewProduct(event) {
    if (this.checkData) {
      alert("Complete all fields");
    } else {
      var data = JSON.stringify(
        [
          {
            "name": this.state.name,
            "ean": this.state.ean,
            "sku": this.state.sku,
            "manufacturer": this.state.manufacturer
          }
        ]);

      var config = {
        method: 'post',
        url: this.state.baseUrl + '/base/product',
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
  }

  handleChange(e) {
    if (e.target.id === "formBasicName") {
      this.setState({ name: e.target.value });
    } else if (e.target.id === "formBasicEan") {
      this.setState({ ean: e.target.value });
    } else if (e.target.id === "formBasicSku") {
      this.setState({ sku: e.target.value });
    } else {

      if (!this.state.isManufacturer && e.target.id === "selectManu") {
        this.setState({ manufacturer: e.target.value });
      } else {
        this.setState({ manufacturer: "manufacturer" }); //Coger del username de las cookies
      }
    }

  }

  render() {
    return (
      <div className="Newproduct">
        <Form.Group controlId="formBasicName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="input" placeholder="Product name" onChange={(e) => this.handleChange(e)} />
        </Form.Group>
        <Form.Group controlId="formBasicEan">
          <Form.Label>EAN</Form.Label>
          <Form.Control type="input" placeholder="Product Ean" onChange={(e) => this.handleChange(e)} />
        </Form.Group>
        <Form.Group controlId="formBasicSku">
          <Form.Label>SKU</Form.Label>
          <Form.Control type="input" placeholder="Product Sku" onChange={(e) => this.handleChange(e)} />
        </Form.Group>
        {this.state.isManufacturer ? null : (
          <Form.Group controlId="selectManu">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control as="select" onChange={(e) => this.handleChange(e)}>
              <option>Choose...</option>
              <option>Adidas</option>
              <option>Nike</option>
            </Form.Control>
          </Form.Group>
        )}
        <Button variant="primary" type="submit" onClick={e => this.registerNewProduct(e)}>
          Register
        </Button>
      </div>
    );
  }
}

export default NewProduct;