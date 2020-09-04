import React from "react";
import { Button, Form } from "react-bootstrap";
import "./NewProduct.css";
import config from '../../config';


import axios from 'axios';
import { withCookies } from 'react-cookie';



class NewProduct extends React.Component {

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {
      name: "",
      ean: "",
      sku: "",
      manufacturer: "",
      isManufacturer: false,
      baseUrl: config.baseUrl,
      token: cookies.get('x-access-token'),
      roles: cookies.get('roles'),
      username: cookies.get('username'),
      manufacturers: []
    };
  }

  checkData() {
    if (this.state.isManufacturer) {
      this.setState({manufacturer: this.state.username});
      return (this.state.name === "" || this.state.ean === "" || this.state.sku === "");
    } else {
      return (this.state.name === "" || this.state.ean === "" || this.state.sku === "" || this.state.manufacturer === "");
    }
  }

  registerNewProduct(event) {
    if (this.checkData()) {
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
          'x-access-token': this.state.token
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
    } else if (this.state.isManufacturer && e.target.id === "selectManu") {
        this.setState({ manufacturer: e.target.value });
    }
  }

  componentDidMount() {
    if (this.state.roles === "ROLE_MANUFACTURER") {
      this.state.isManufacturer = true
    }

    // TODO: Debemos crear una petición en el back que devuelva todos los manufacturers
    var config = {
      method: 'get',
      url: this.state.baseUrl + '/manufacturers', // Cambiar esta peticion
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.token
      }
    };
    axios(config)
    .then((response) => {
      let manufacturersFromApi = response.data.users.map(manufacturer => {
        return {value: manufacturer.id, display: manufacturer.name}
      });
      this.setState({
        manufacturers: [{value: '', display: 'Select your manufacturer'}].concat(manufacturersFromApi)
      });
      console.log("MANUFACTURERS: "+manufacturersFromApi)
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const isEnabled = this.state.name.length > 0 && this.state.ean.length > 0 && this.state.sku.length > 0 && this.state.manufacturer.length > 0;
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
        {this.state.isManufacturer ? (
          <Form.Group controlId="selectManu">
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control as="select" onChange={(e) => this.handleChange(e)}>
              {/*<option value=""></option>
              <option value="Adidas">Adidas</option>
              <option value="Nike">Nike</option>*/}
              {this.state.manufacturers.map((manufacturer) => <option key={manufacturer.value} value={manufacturer.value}>{manufacturer.display}</option>)}
            </Form.Control>
          </Form.Group>
        ) : null}
        <Button variant="primary" type="submit" onClick={e => this.registerNewProduct(e)} disabled={!isEnabled}>
          Register
        </Button>
      </div>
    );
  }
}

export default withCookies(NewProduct);