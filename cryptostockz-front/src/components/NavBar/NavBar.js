import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import SignInPopUp from '../Login/SignInPopUp';
import {Button} from "react-bootstrap";
// import {Link} from "react-router-dom";

const logged = true;

class NavBar extends Component {
  constructor(props){  
    super(props);  
    this.state = { 
      showPopup: false
    };  
  }  

  togglePopup() {
      this.setState({  
          showPopup: !this.state.showPopup  
      });  
  }
  
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
          <Button variant="outline-info" onClick={this.togglePopup.bind(this)}>Login</Button>  
          {this.state.showPopup ?  
          <SignInPopUp closePopup={this.togglePopup.bind(this)}/>
          : null
          }
        </Navbar.Collapse>
      </Navbar>
    );

  }
}

export default NavBar;