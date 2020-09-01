import React from 'react';  
import './PopUp.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { Image } from "react-bootstrap";
import Meta from "../metamask.png";
import SignUpPopUp from './SignUpPopUp';

class SignInPopup extends React.Component {
    constructor(props){  
        super(props);

        this.state = { 
            showSignUpPopup: false,
            showSignInPopup: true
        };  
    }  
    
    togglePopup() {
        this.setState({  
            showSignUpPopup: !this.state.showSignUpPopup,
            showSignInPopup: this.props.closePopup
        });
    }

    FormPage() {
        return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
                <form>
                    <p className="h5 text-center mb-4">Sign In</p>
                    <div className="grey-text">
                    <MDBInput label="Type your username" icon="user" group type="user" validate error="wrong"
                        success="right" />
                    <MDBInput label="Type your password" icon="lock" group type="password" validate />
                    </div>
                </form>
            </MDBCol>
            <MDBCol md="6">
                <Image style={{width: '250px', height: '250px'}} src={Meta} alt="Icono_Meta" className="rounded mx-auto d-block"/>
            </MDBCol>
          </MDBRow>
          <MDBRow>
                <MDBCol md="4">
                    <MDBBtn color="primary">Log In</MDBBtn>
                </MDBCol>
                <MDBCol md="2">
                    <MDBBtn color="success" onClick={this.togglePopup.bind(this)}>Sign Up</MDBBtn>
                    {this.state.showSignUpPopup ?  
                    <SignUpPopUp closeSignInPopup={this.togglePopup.bind(this)}/>
                    : null
                    }
                </MDBCol>
                <MDBCol md="6">
                    <MDBBtn color="warning" onClick={this.props.closePopup}>Close</MDBBtn>
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