import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import logo from './Logo.png';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import ProductList from "./components/ProductList"
import Details from "./components/Details"
import Cart from "./components/Cart"
import Default from "./components/Default"
import Buscar from "./components/Buscar"
import Login from "./components/Login"
import RegistrarTransaccion from "./components/RegistrarTransaccion"
import Signup from "./components/SignUp"
import Newproduct from "./components/NewProduct"

class App extends Component {
  render () {
    return (
    <React.Fragment>
      <Navbar />
      <Switch> //Aqui creamos los paths para cada una de las paginas
        <Route exact path="/ProductList" component={ProductList} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/buscar" component={Buscar} />
        <Route exact path="/" component={Login}/>
        <Route exact path="/RegistrarTransaccion" component={RegistrarTransaccion}/>
        <Route exact path="/perfil" component={ProductList}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/NewProduct" component={Newproduct}/>
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
}
}

export default App;
