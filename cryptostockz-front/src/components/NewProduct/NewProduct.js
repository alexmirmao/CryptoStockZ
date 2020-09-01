import React from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";

import axios from 'axios';


class NewProduct extends React.Component {

  state = {
    name: "",
    ean: "",
    sku: "",
    manufacturer: "",
    isManufacturer: true
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
  }

  updateName(event) {
    this.setState({

      name: event.target.value

    });
    console.log(event.target.value);
  }

  updateEan(event) {
    this.setState({

      ean: event.target.value

    });
    console.log(event.target.value);
  }

  updateSku(event) {
    this.setState({

      sku: event.target.value
    });
    console.log(event.target.value);
  }

  updateManu(event) {
    this.setState({
      manufacturer: event.target.value
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
          <Form.Control type="input" placeholder="Product Ean" onChange={(e) => this.updateEan(e)} />
        </Form.Group>
        <Form.Group controlId="formBasicSku">
          <Form.Label>SKU</Form.Label>
          <Form.Control type="input" placeholder="Product Sku" onChange={(e) => this.updateSku(e)} />
        </Form.Group>
        {this.state.isManufacturer ? null : (
          <Form.Group controlId="selectManu">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control as="select" onChange={(e) => this.updateManu(e)}>
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