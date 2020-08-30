import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default function Buscar() {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");

  function validateForm() {
    return id.length > 0 || username.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Buscar">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="id" bsSize="large">
          <ControlLabel>Public key</ControlLabel>
          <FormControl
            autoFocus
            type="id"
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Nombre de usuario</ControlLabel>
          <FormControl
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Buscar
        </Button>
      </form>
    </div>
  );
}
