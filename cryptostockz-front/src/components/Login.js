
import { useHistory , Link} from "react-router-dom";
import { Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";
import React from 'react';
var ok_login
export {ok_login};

export default function Login() {

  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    if(true)//verque el usuario ya este registrado
    {
      ok_login = true
      history.push(ok_login)
      history.push("/perfil")
    }
    else{
      //(event.target.elements.email.value
      alert("Debe registrarse")
    }

  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit} >
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <Button block bsSize="large" onClick={handleSubmit} disabled={!validateForm()} type="submit">
        Login
        </Button>
        <Button block bsSize="large" type="submit">
        <Link to="/signup" className="nav-registro">
          Registro
          </Link>
        </Button>
      </form>
    </div>

  );
}
