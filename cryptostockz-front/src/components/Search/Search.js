import React from "react";
import { Form, FormControl, Button, InputGroup, Row, Col } from "react-bootstrap";
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { GetManufacturers, GetBaseProducts } from "../../services/BackendService";

import { withCookies } from 'react-cookie';

import config from '../../config';

import axios from 'axios';

class Search extends React.Component {

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      val: '',
      manufacturer: undefined,
      manufacturers: [],
      baseProduct: undefined,
      baseProducts: [],
      products: [],
      baseUrl: config.baseUrl,
      token: cookies.get('x-access-token'),
      roles: cookies.get('roles'),
      username: cookies.get('username')
    };
  }

  updateSearchValue(event) {
    this.setState({
      val: event.target.value
    });
    console.log(event.target.value);
  }

  search(event) {
    console.log(this.state.baseProduct, this.state.manufacturer)
    var data = JSON.stringify(
        {
          "baseProductId": this.state.baseProduct,
          "manufacturerId": this.state.manufacturer
        }
      );

    var data = JSON.stringify({"baseProductId":"1","manufacturerId":"1"});

    var config = { 
      method: 'get',
      url: this.state.baseUrl + '/product/search',
      headers: {
        'x-access-token': this.state.token,
        'Content-Type': 'application/json'
      },
      data: data
    };

    console.log(data)

    axios(config)
      .then(function (response) {
        console.log("Respuesta al front: "+JSON.stringify(response.data))
        this.setState({
          products: response.data.message
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        alert("Something went wrong")
      });
  }

  componentDidMount() {
    GetManufacturers(this.state.token)
      .then(function (response) {
        response.data.users.map(manufacturer => {
          this.state.manufacturers.push({label: manufacturer.name, value: manufacturer.id})
        });
        this.setState({manufacturers: this.state.manufacturers})
      }.bind(this));
    
    GetBaseProducts(this.state.token)
      .then(function (response) {       
        response.data.baseProducts.map(baseProduct => {
          this.state.baseProducts.push({label: baseProduct.name, value: baseProduct.id})
        });
        this.setState({baseProducts: this.state.baseProducts})
      }.bind(this));
  }

  handleManufacturers(e) {
    this.setState({manufacturer: e.value });
  }

  handleBaseProducts(e) {
    this.setState({baseProduct: e.value });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="mx-auto text-center">Search</h3>
          <Form>
            <Row>
              <Col>
                <Form.Text className="text-muted">
                  Choose your manufacturer
                </Form.Text>
                <Form.Group controlId="selectManufacturer">
                  <Select options={this.state.manufacturers} onChange={(e) => this.handleManufacturers(e)}/>
                </Form.Group>
              </Col>
              {this.state.manufacturer !== undefined ?
                <Col>
                  <Form.Text className="text-muted">
                    Choose your product
                  </Form.Text>
                  <Form.Group controlId="selectBaseProduct">
                    <Select options={this.state.baseProducts} onChange={(e) => this.handleBaseProducts(e)}/>
                  </Form.Group>
                </Col>
              : <Col>
                  <Form.Text className="text-muted">&nbsp;</Form.Text>
                  <Form.Group controlId="selectBaseProduct">&nbsp;</Form.Group>
                </Col>}
              <Col>
                <Form.Text className="text-muted">&nbsp;</Form.Text>
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={e => this.search(e)}>Browse</Button>
                </InputGroup.Append>
              </Col>
            </Row>    
          </Form>
        </div>
        <div className="container">
          {this.state.products.length === 0 ? (
            <Grid align="center" container spacing={5}>
              <span>There are no products</span>
            </Grid>
          ) : (
              <Grid align="center" container spacing={5}>
                {this.state.products.map((product) => {
                  return (
                    <Grid item xs={6} key={product.id} >
                      <ProductCard productInfo={product} key={product.id} />
                    </Grid>
                  )
                })}
              </Grid>
            )}
        </div>
      </div>
    )
  }
}

export default withCookies(Search);