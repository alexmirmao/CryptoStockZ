import React from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";

//import axios from 'axios';


export default function NewProduct() {

  /*function registerNewProduct() {
    var config = {
      method: 'get',
      url: 'http://192.168.1.42:10010/api/test/all',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk4ODk4OTUxLCJleHAiOjE1OTg5ODUzNTF9.IVHZGv8qSmg5qivsHoMtdWSlY5iW7Dds_wx8_MhJef8'
      }
    };

    axios(config).then((response) => {
      console.log(response);
    })
    .catch((error)=> {
      console.log(error);
    });
  }*/

  return (
    <div className="Newproduct">
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="input" placeholder="Product name" />
        </Form.Group>
        <Form.Group controlId="formBasicEan">
          <Form.Label>EAN</Form.Label>
          <Form.Control type="input" placeholder="Product Ean" />
        </Form.Group>
        <Form.Group controlId="formBasicSku">
          <Form.Label>SKU</Form.Label>
          <Form.Control type="input" placeholder="Product Sku" />
        </Form.Group>
        <Form.Group controlId="formBasicManu">
          <Form.Label>Manufacturer</Form.Label>
          <Form.Control type="input" placeholder="Manufacturer" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}