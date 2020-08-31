import React, { Component } from "react";
import { Navbar, Nav, Button } from 'react-bootstrap'


const logged = true;

export default class NavBar extends Component {
  submit() {
    if (!logged) {
      alert("Es necesario iniciar sesion")
    }
  }
  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/home">CryptoStockZ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
          <Button variant="outline-info">Login</Button>
        </Navbar.Collapse>
      </Navbar>
    );

  }

}