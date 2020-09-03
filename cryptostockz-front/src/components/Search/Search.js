import React from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import ProductCard from '../ProductCard/ProductCard';
import Grid from '@material-ui/core/Grid';

import { withCookies } from 'react-cookie';

import config from '../../config';

import axios from 'axios';

class Search extends React.Component {

  constructor(props){
    super(props);
    const { cookies } = props;
    this.state = {
      val: '',
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
    var data = JSON.stringify(
      [
        {
          "productName":"",
          "manufacturerName":""
        }
      ]);

    var config = {
      method: 'get',
      url: this.state.baseUrl+'/product/search',
      headers: {
        'x-access-token': this.state.token
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        this.setState({
          products: response.data.products
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
        alert("Something went wrong")
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="mx-auto text-center">Search</h3>
          <Form.Text className="text-muted">
            Search products by its name.
        </Form.Text>
          <InputGroup className="mb-3">
            <FormControl placeholder="Search..."
              aria-label="Search key"
              aria-describedby="basic-addon2"
              value={this.state.val}
              onChange={(e) => this.updateSearchValue(e)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={e => this.search(e)}>Browse</Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Users (coming soon)" disabled />
            <Form.Check type="checkbox" label="Products" checked readOnly />
          </Form.Group>
        </div>
        <div className="container">
          <Grid align="center" container spacing={5}>
            {this.state.products.map((product) => {
              return (
                <Grid item xs={6} key={product.id} >
                  <ProductCard productInfo={product} key={product.id} />
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }
}

export default withCookies(Search);