import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";
import { withCookies } from 'react-cookie';
import { CreateDigitalProduct, GetBaseProducts, GetBaseProductsByUser, GetManufacturers } from "../../services/BackendService";
import Select from 'react-select';

import Web3 from 'web3';

var web3 = new Web3(window.ethereum);
var account0;
window.ethereum.enable();
web3.eth.getAccounts().then(function (result) {
  account0 = result[0];
})

class NewDigitalProduct extends React.Component {

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      idBaseProduct: "",
      productAddress: "0x0000000000",
      owner_address: "0x973AEe0C82633edaf13B56536762Cbc766F44ee3", // account0
      dna: "1234",
      level: 1,
      uniqueId: "",
      isManufacturer: false,
      token: cookies.get('x-access-token'),
      roles: cookies.get('roles'),
      username: cookies.get('username'),
      productsName: []
    };
  }

  componentDidMount() {
    if (this.state.roles === "ROLE_MANUFACTURER") {
      this.state.isManufacturer = true
    }

    GetBaseProducts(this.state.token)
      .then(function (response) {       
        response.data.baseProducts.map(baseProductName => {
          this.state.productsName.push({label: baseProductName.name, value: baseProductName.id})
        });
        this.setState({productsName: this.state.productsName})
      }.bind(this));
  }

  createDigitalProduct(event) {
    event.preventDefault();
    CreateDigitalProduct(
      this.state.token,
      this.state.idBaseProduct,
      this.state.productAddress,
      this.state.owner_address,
      this.state.level,
      this.state.dna,
      this.state.uniqueId
      )
      .then(function (response) {
        alert("Successful! New product created!")
      }.bind(this))
      .catch(error => {
        alert("Error creating a new product!")
      });
  }

  handleChange(e) {
    if (e.target.id === "selectUniqueId") {
      this.setState({ uniqueId: e.target.value });
    }
  }

  handleBaseProduct(e) {
    this.setState( {idBaseProduct: e.value });
  }

  render() {
    // const isEnabled = this.state.name.length > 0 && this.state.ean.length > 0 && this.state.sku.length > 0 && this.state.manufacturer.length > 0;
    // const isEnabledUsers = this.state.name.length > 0 && this.state.ean.length > 0 && this.state.sku.length > 0;
    const isEnabled = true;
    return (
      <div className="NewDigitalProduct">
        <Form.Group controlId="selectBaseProduct">
          <Form.Label>Base Product</Form.Label>
          <Select options={this.state.productsName} onChange={(e) => this.handleBaseProduct(e)}/>
        </Form.Group>
        <Form.Group controlId="selectUniqueId">
          <Form.Label>Unique Id</Form.Label>
          <Form.Control type="input" placeholder="Product Unique Id" onChange={(e) => this.handleChange(e)} value={this.state.uniqueId}/>
        </Form.Group>
        {this.state.isManufacturer ?
          <Button variant="primary" type="submit" onClick={e => this.createDigitalProduct(e)} disabled={!isEnabled}>Register</Button> 
          :
          <Button variant="primary" type="submit" onClick={e => this.createDigitalProduct(e)} disabled={!isEnabled}>Apply register</Button>
        }
      </div>
    );
  }
}

export default withCookies(NewDigitalProduct);