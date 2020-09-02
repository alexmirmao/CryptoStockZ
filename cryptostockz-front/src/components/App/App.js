import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import UserProfile from '../UserProfile/UserProfile';
import Home from '../Home/Home';
import ProductView from '../ProductView/ProductView';
import Login from '../Login/Login';
import SignUp from '../Login/SignUp'
import Search from '../Search/Search';
import {CookiesProvider} from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <React.Fragment>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => {
              return (
                <Redirect to="/home" />
              )
            }} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={UserProfile} />
            <Route path='/products/:productId' component={ProductView} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/search' component={Search} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    </CookiesProvider>
  );
}

export default App;
