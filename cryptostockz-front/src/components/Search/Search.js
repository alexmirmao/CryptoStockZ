import React, { Component } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

export default class Search extends Component {

  state = { 
    val: '',
    products: false
  };

  updateSearchValue(event) {
    this.setState({
      val: event.target.value
    });
    console.log(event.target.value);
  }

  search(event) {
    alert(this.state.val);
  }

  render() {
    return (
      <div className="container">
        <h3 className="mx-auto text-center">Search</h3>
          <Form.Text className="text-muted">
            Search products and users by their name.
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
            <Form.Check type="checkbox" label="Users (comming soon)" disabled />
            <Form.Check type="checkbox" label="Products" />
          </Form.Group>
      </div>
    )
  }
}
