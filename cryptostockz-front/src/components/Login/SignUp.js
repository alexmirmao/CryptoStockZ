import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';


export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
      ok_login: false
    }
    this.reset = this.reset.bind(this);
  }

  registerUser(event) {
    event.preventDefault();

    var data = JSON.stringify({
      "username": "user2",
      "email": "user2@gmail.com",
      "password": "pwd1",
      "name": "adidas",
      "roles": ["manufacturer"],
      "metamaskAccount": "0x973AEe0C82633edf3B56536762Cbc766F44ee2"
    });

    var config = {
      method: 'post',
      url: 'http://192.168.1.42:10010/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(
          response.data
        ));
        alert(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*setValue(e){
    let id=e.target.id;
    let value=e.target.value;
    let username=e.target.username;
    if(value===undefined || value==="")
      return;
    if(id==="username"){
      username=value.toUpperCase();
      this.setState({
        username:username})
    }
    else{
      this.setState({
        password:e.target.value})
    }
  }*/

  submit(e) {
    if (this.state.username === undefined || this.state.username === ""
      || this.state.password === undefined || this.state.password === "") {
      this.setState({
        errorMessage: "Debe ingresar email y contraseña correctamente"
      })
    }
    else {
      this.setState({
        successMessage: "Bienvenido a CryptoStockZ",
        ok_login: true
      })
    }
  }
  reset() {
    this.setState({
      username: "",
      name: "",
      email: "",
      password: ""
    })
  }

  render() {

    return (
      <div className="container">
        <Form onSubmit={this.registerUser}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
      </div>
    )
  }
}

/*
<form>
        <h3 className="mx-auto text-center">Sign up</h3>

        <div className="form-group mx-auto text-center">
          <label>Username :  </label>
          <input placeholder="Insert username" type="text" id="username" value={this.state.username} />
        </div>

        <div className="form-group mx-auto text-center">
          <label>Name :  </label>
          <input placeholder="Insert name" type="text" id="name" value={this.state.name} />
        </div>

        <div className="form-group mx-auto text-center">
          <label>Email :  </label>
          <input placeholder="Insert email" type="text" id="email" value={this.state.email} />
        </div>

        <div className="form-group mx-auto text-center" autoFocus>
          <label>Password :</label>
          <input placeholder="Insert password" type="password" id="password" value={this.state.password} />
        </div>

        <div className="form-group mx-auto text-center" autoFocus>
          <label>Rol:    </label>
          <br /><label>Manufacturer</label><input placeholder="manufacturer" type="checkbox" id="manufacturer" value="first_checkbox" />
          <br /><label>User</label><input placeholder="user" type="checkbox" id="user" value="first_checkbox" />
        </div>

        <button block bsSize="large" type="reset" className="btn btn-primary btn-block mx-auto text-center" onClick={this.reset}>Reset</button>
        <button block bsSize="large" type="submit" className="btn btn-primary btn-block mx-auto text-center" >
          <Link to="/" className="btn btn-primary btn-block mx-auto text-center">
            SignUp
              </Link>
        </button>
      </form>

      */
