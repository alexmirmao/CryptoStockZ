import React, {Component} from "react";
import {Link} from "react-router-dom";
import logo from "../Icono_opt.png"
import styled from "styled-components";
import {ButtonContainer} from "./Button";

export default class Navbar extends Component{
  render() {
    return(
      <NavWrapper className="navbar navbar-expand-small  navbar-dark px-sm-5">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand"/>
        </Link>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-3">
              <Link to="/" className="nav-link">
                Comprar
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-3">
              <Link to="/verificar" className="nav-dos">
                verificar
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-3">
              <Link to="/buscar" className="nav-link">
                buscar
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
