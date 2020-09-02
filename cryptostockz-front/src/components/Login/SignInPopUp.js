import React from 'react';
import './PopUp.css';
// import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { Image } from "react-bootstrap";
import Meta from "../../Images/metamask.png";
import SignUpPopUp from './SignUpPopUp';
import UserProfile from '../UserProfile/UserProfile';
import axios from 'axios';
import {withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class SignInPopup extends React.Component {

    static propTypes={
      cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        const {cookies}=props;
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showSignUpPopup: false,
            showSignInPopup: true,
            username: "",
            password: "",
            name: cookies.get("name")
        };
    }

    handleChange(e) {
        if(e.target.id === "formBasicUsername") {
            this.setState({username: e.target.value});
            const {cookies}=this.props;
            cookies.set("name", e.target.value,{path:"/"});
        }else if(e.target.id === "formBasicPassword") {
            this.setState({password: e.target.value});
        }else if(e.target.id === "handlePopUp") {
            this.setState({
                showSignUpPopup: !this.state.showSignUpPopup,
                showSignInPopup: !this.state.showSignInPopup
            })
        }

    }

    signInUser() {
      
        var payload={
            "username":this.state.username,
            "password":this.state.password
        }

        var config = {
            method: 'post',
            url: 'http://localhost:10010/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            data : payload
        };

        axios(config)
        .then(function(reponse) {
            console.log(reponse);
            return <UserProfile reponse/>
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    FormPage() {
        const username = this.state.username;
        const password = this.state.password;
        const showSignInPopup = this.state.showSignInPopup;
        //const showSignUpPopup = this.state.showSignUpPopup;
        return (
        <div className="container">
            <Form>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" value={username}
                                          onChange = {this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                          onChange = {this.handleChange}/>
                        </Form.Group>
                    </Grid>
                    <Grid item md={6}>
                        <Image style={{width: '250px', height: '250px'}} src={Meta} alt="Icono_Meta" className="rounded mx-auto d-block"/>
                    </Grid>
                    <Grid item md={4}>
                        <Button variant="success" onClick={(event) => this.signInUser(event)}>Log In</Button>
                    </Grid>
                    <Grid item md={6}>
                        <Button color="success" id="handlePopUp" value={showSignInPopup}
                                onClick={this.handleChange}>Sign Up</Button>
                        {this.state.showSignUpPopup ?
                        <SignUpPopUp closeSignInPopup={this.handleChange}/>
                        : null
                        }
                    </Grid>
                    <Grid item md={2}>
                        <Button color="warning" onClick={this.props.closePopup}>Close</Button>
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

export default withCookies(SignInPopup);
