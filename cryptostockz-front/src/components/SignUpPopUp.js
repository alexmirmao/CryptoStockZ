import React from 'react';  
import './PopUp.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { Image } from "react-bootstrap";
import Meta from "../metamask.png";

class SignInPopup extends React.Component {
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
    FormPage() {
        return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
                <Image style={{width: '250px', height: '250px'}} src={Meta} alt="Icono_Meta" className="rounded mx-auto d-block"/>
            </MDBCol>
            <MDBCol md="6">
                <form>
                    <p className="h5 text-center mb-4">Sign Up</p>
                    <div className="grey-text">
                    <MDBInput label="Type your username" icon="user" group type="user" validate error="wrong"
                        success="right" />
                    <MDBInput label="Type your password" icon="lock" group type="password" validate />
                    </div>
                </form>
            </MDBCol>
          </MDBRow>
          <MDBRow>
                <MDBCol md="6">
                    <MDBBtn color="warning" onClick={this.props.closePopup}>Close</MDBBtn>
                </MDBCol>
                <MDBCol md="4">
                    <MDBBtn color="primary">Log In</MDBBtn>
                </MDBCol>
                <MDBCol md="2">
                    <MDBBtn color="success">Sign Up</MDBBtn>
                </MDBCol>
          </MDBRow>
        </MDBContainer>
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

export default SignInPopup;