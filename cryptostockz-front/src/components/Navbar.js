import React, {Component} from "react";
import {useHistory,Link} from "react-router-dom";
import logo from "../Icono_opt.png"
import styled from "styled-components";
import {ButtonContainer} from "./Button";
import UserStore from "../store/userStore";

const logged=true;

export default class Navbar extends Component{
submit(){
  if(!logged){
    alert("Es necesario iniciar sesion")
  }
}
  render() {
    return(
      <div>

      <NavWrapper className="navbar navbar-expand-small  navbar-dark px-sm-5">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand"/>
        </Link>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-3">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-3">
              <Link to={UserStore.isLoggedIn ? "/profile" : "#"} className="nav-dos" onClick={this.submit}>
                Profile
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-3">
              <Link to={logged ? "/" : "#"} className="nav-dos" onClick={this.submit}>
                Products
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-3">
              <Link to={logged ? "/search" : "#"} className="nav-link" onClick={this.submit}>
                Search
              </Link>
            </li>
          </ul>
          <Link to="./cart" className="ml-auto">
            <ButtonContainer>
              <span className="mr-2">
                <i className="fas fa-cart-plus"/>
              </span>
              cesta
            </ButtonContainer>
          </Link>
      </NavWrapper>

      </div>
    );

}

}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link{
    color:var(--mainWhite)!important;
    font-size:1.3rem;
    text-transform: capitalize;
  }.nav-dos{color:var(--mainWhite)!important;
  font-size:1.3rem;
  text-transform: capitalize;

  }
`
