import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import logo from './Logo.png';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import SignUp from "./components/SignUp"
import ProductList from "./components/ProductList"
import Details from "./components/Details"
import Cart from "./components/Cart"
import Default from "./components/Default"
import Verificar from "./components/Verificar"
import Buscar from "./components/Buscar"


class App extends Component {
  render () {
    return (
    <React.Fragment>
      <Navbar />
      <Switch> //Aqui creamos los paths para cada una de las paginas
        <Route exact path="/" component={SignUp} />
        <Route exact path="/ProductList" component={ProductList} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/verificar" component={Verificar} />
        <Route exact path="/buscar" component={Buscar} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
}
}

export default App;
