import React from 'react';
import './PopUp.css';
// import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { Image } from "react-bootstrap";
// import SignInPopUp from './SignInPopUp';
import Meta from "../../Images/metamask.png";
import axios from 'axios';
import Web3 from 'web3';

var web3 = new Web3(window.ethereum);
var account0;
  window.ethereum.enable();
  web3.eth.getAccounts().then(function(result){
    account0 = result[0];
  })


class SignUpPopup extends React.Component {
    constructor(props){
        super(props);
          this.state={
            username:"",
            password:"",
            name: "",
            email: "",
            metamask: account0,
            errorMessage:"",
            successMessage:"",
            ok_login:false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      if(e.target.id === "formBasicUsername") {
          this.setState({username: e.target.value});
      }else if(e.target.id === "formBasicPassword") {
          this.setState({password: e.target.value});
      }else if(e.target.id === "formBasicEmail") {
        this.setState({email: e.target.value});
      }else if(e.target.id === "formBasicName") {
        this.setState({name: e.target.value});
      }else if(e.target.id === "formBasicMetamask") {
        this.setState({metamask: e.target.value});
      }

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

    signUpUser() {
      // var data = JSON.stringify({"username":"nike","email":"nike@gmail.com","password":"nike","name":"nike","roles":["manufacturer"],"metamaskAccount":"0x973AEe0C82633edaf13B56536762Cbc766F44ee2"});
      var payload={
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "name": this.state.name,
        "roles": ["user"],
        "metamaskAccount": account0
      }

      console.log(payload)

      var config = {
        method: 'post',
        url: 'http://localhost:10010/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        data : payload
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("User Signed Up");
      })
      .catch(function (error) {
        console.log(error);
        alert("Something went wrong");
      });
    }

    FormPage() {
      const name = this.state.name;
      const username = this.state.username;
      const password = this.state.password;
      const metamask = this.state.metamask;
      const email = this.state.email;
      // const showSignInPopup = this.state.showSignInPopup;
      // const showSignUpPopup = this.state.showSignUpPopup;
        return (
        <div className="container">
        <Form>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Image style={{width: '250px', height: '250px'}} src={Meta} alt="Icono_Meta" className="rounded mx-auto d-block"/>
              </Grid>
              <Grid item md={6}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="Enter name" value={name}
                                onChange = {this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Enter username" value={username}
                                onChange = {this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email}
                                onChange = {this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password}
                                onChange = {this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicMetamask">
                  <Form.Label>Metamask</Form.Label>
                  <Form.Control type="string" placeholder={account0}/>
                </Form.Group>
              </Grid>
              <Grid item md={10}>
                  <Button color="warning" onClick={this.props.closePopup}>Close</Button>
              </Grid>
              <Grid item md={2}>
                  <Button variant="success" onClick={(event) => this.signUpUser(event)}>Sign Up</Button>
              </Grid>
            </Grid>
        </Form>
    </div>
        );
    };

    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    {this.FormPage()}
                </div>
            </div>
        );
    }
}

export default SignUpPopup;
