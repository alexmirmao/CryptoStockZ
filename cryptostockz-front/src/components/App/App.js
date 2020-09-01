import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import UserProfile from '../UserProfile/UserProfile';
import Home from '../Home/Home';
import ProductView from '../ProductView/ProductView';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Login/Login';
import SignUp from '../Login/SignUp'

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/profile" component={UserProfile} />
          <Route path='/search' />
          <Route path='/profile/product/:productId' component={ProductView}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
