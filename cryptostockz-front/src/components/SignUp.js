import React, { useState } from "react";
import {useHistory, Link} from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./SignUp.css";
var ok_reg;
export {ok_reg}

export default function Signup() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const [newUser, setNewUser] = useState(null);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setNewUser("test");
    ok_reg= true
    history.push("/perfil")

  }


  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="nombre" bsSize="large">
        <ControlLabel>Nombre</ControlLabel>
        <FormControl
          autoFocus
          type="nombre"
          value={fields.nombre}
          onChange={handleFieldChange}
        />
      </FormGroup>
      <FormGroup controlId="nif" bsSize="large">
        <ControlLabel>NIF</ControlLabel>
        <FormControl
          autoFocus
          type="nif"
          value={fields.nif}
          onChange={handleFieldChange}
        />
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="usuario" bsSize="large">
          <ControlLabel>Nombre de usuario</ControlLabel>
          <FormControl
            autoFocus
            type="usuario"
            value={fields.usuario}
            onChange={handleFieldChange}
          />

        <select id="lista" name="lista" size="1">
        <option value="fabricante">Manufacturer</option>
        <option value="usuario">User</option>
        </select>
      </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
        <Link to="/perfil" className="nav-perfil">
          Registrar
          </Link>
        </Button>
      </form>
    );
  }

  return (
    <div className="Signup">
    {newUser === null ? renderForm():renderForm()}
    </div>
  );
}
