import React, {Component} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Navbar from "./Navbar";
import Image from 'react-image-resizer';
import Logo from "../Logo.png";


export default class Buscar extends Component{

  constructor(props){
    super(props);
      this.state={
        username:"",
        publicKey:"",
        errorMessage:"",
        successMessage:""
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
        publicKey:e.target.value})
    }
  }

  submit(e){
    if(this.state.username===undefined||this.state.username===""
        || this.state.publicKey===undefined || this.state.publicKey===""){
      this.setState({
        errorMessage:"Debe ingresar nombre de usuario o clave"})
        }
    else{
      this.setState({
        successMessage:"Aqui aparecera el perfil del usuario"})
    }
  }
  reset(){
    let username=this.state.username;
    let publicKey=this.state.publicKey;
      this.setState({
        username:"",
        publicKey:"",
      })
  }
  render(){
    return(
      <form>
            <h3 className="mx-auto text-center">Buscar</h3>

            <div className="form-group mx-auto text-center">
                <label>Username :  </label>
                <input placeholder="Insert username" type="text" id="username" value={this.state.username} onChange={(e)=>this.setValue(e)} />

            </div>

            <div className="form-group mx-auto text-center" autofocus>
                <label>Public key :  </label>
                <input placeholder="Public key" type="publicKey" id="publicKey" value={this.state.publicKey} onChange={(e)=>this.setValue(e)} />
            </div>
            <button block bsSize="large" type="reset" className="btn btn-primary btn-block mx-auto text-center" onClick={this.reset}>Reset</button>
            <button block bsSize="large" type="submit" className="btn btn-primary btn-block" onClick={(e)=>this.submit(e)}>
              <Link to="/" className="btn btn-primary btn-block mx-auto text-center">
                Buscar
              </Link>
            </button>
        </form>
    )
  }
}
