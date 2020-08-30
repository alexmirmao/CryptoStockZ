import React, { useState } from "react";
import {Link} from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./SignUp.css";
var params;

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    name: "",
    email: "",
    password: "",
    roles: "",
    metamaskAccount: ""
  });
  const [newUser] = useState(null);

  async function handleSubmit(event) {
    makePostRequest();
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="username" bsSize="large">
        <ControlLabel>Username</ControlLabel>
        <FormControl
          autoFocus
          type="username"
          value={fields.username}
          onChange={handleFieldChange}
        />
      </FormGroup>
      <FormGroup controlId="name" bsSize="large">
        <ControlLabel>Name</ControlLabel>
        <FormControl
          autoFocus
          type="name"
          value={fields.name}
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

          <FormGroup controlId="lista" bsSize="large">
        <select id="lista" name="lista" size="1">
        <option value="fabricante">Manufacturer</option>
        <option value="usuario">User</option>
        </select>
      </FormGroup>

      <FormGroup controlId="meta" bsSize="large">
        <ControlLabel>Cuenta Metamask</ControlLabel>
        <FormControl
          autoFocus
          type="meta"
          value={fields.meta}
          onChange={handleFieldChange}
        />
        </FormGroup>

        <Button block bsSize="large" type="submit">
          Registrar
        </Button>
      </form>
    );
  }

  const axios = require('axios');

  async function makePostRequest() {

      params = {
          username: fields.username,
          name: fields.name,
          email: fields.email,
          password: fields.password,
          roles: "user",
          metamaskAccount: fields.meta
        }

      let res = await axios.post('http://localhost:10010/signin', params);

      console.log(res.data);
  }

  return (
    <div className="Signup">
    {newUser === null ? renderForm():renderForm()}
    </div>
  );
}
