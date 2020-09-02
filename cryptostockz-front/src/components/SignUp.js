import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Navbar from "./Navbar";
import Image from 'react-image-resizer';
// import Logo from "../Logo.png";


export default class Signup extends Component{
  constructor(props){
    super(props);
      this.state={
        username:"",
        password:"",
        errorMessage:"",
        successMessage:"",
        ok_login:false,
      }
      this.reset=this.reset.bind(this);
  }

  setValue(e){
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
  }

  submit(e){
    if(this.state.username===undefined||this.state.username===""
        || this.state.password===undefined || this.state.password===""){
      this.setState({
        errorMessage:"Debe ingresar email y contraseña correctamente"})
        }
    else{
      this.setState({
        successMessage:"Bienvenido a CryptoStockZ",
        ok_login:true})
    }
  }
  reset(){
    let username=this.state.username;
    let password=this.state.password;
    let name=this.state.name;
    let email=this.state.email;
      this.setState({
        username:"",
        password:"",
        name:"",
        email:""
      })
  }
  render(){
    return(
      <form>
            <h3 className="mx-auto text-center">Sign up</h3>

            <div className="form-group mx-auto text-center">
                <label>Username :  </label>
                <input placeholder="Insert username" type="text" id="username" value={this.state.username} onChange={(e)=>this.setValue(e)} />
            </div>

            <div className="form-group mx-auto text-center">
                <label>Name :  </label>
                <input placeholder="Insert name" type="text" id="name" value={this.state.name} onChange={(e)=>this.setValue(e)} />
            </div>

            <div className="form-group mx-auto text-center">
                <label>Email :  </label>
                <input placeholder="Insert email" type="text" id="email" value={this.state.email} onChange={(e)=>this.setValue(e)} />
            </div>

            <div className="form-group mx-auto text-center" autofocus>
                <label>Password :  </label>
                <input placeholder="Insert password" type="password" id="password" value={this.state.password} onChange={(e)=>this.setValue(e)} />
            </div>

            <div className="form-group mx-auto text-center" autofocus>
            <label>Rol:    </label>
            <br/><label>Manufacturer</label><input placeholder="manufacturer" type="checkbox" id="manufacturer" value="first_checkbox"/>
            <br/><label>User</label><input placeholder="user" type="checkbox" id="user" value="first_checkbox"/>
            </div>

            <button block bsSize="large" type="reset" className="btn btn-primary btn-block mx-auto text-center" onClick={this.reset}>Reset</button>
            <button block bsSize="large" type="submit" className="btn btn-primary btn-block mx-auto text-center" >
              <Link to="/" className="btn btn-primary btn-block mx-auto text-center">
                SignUp
              </Link>
              </button>
        </form>


    )
  }
}
