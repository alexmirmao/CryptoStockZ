import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default function RegistrarTransaccion() {
  const [idProducto, setIdProducto] = useState("");
  const [publicKey, setPublicKey] = useState("");

  function validateForm() {
    return idProducto.length > 0 && publicKey.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="RegistrarTransaccion">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="idProducto" bsSize="large">
          <ControlLabel>ID Producto</ControlLabel>
          <FormControl
            autoFocus
            type="idProducto"
            value={idProducto}
            onChange={e => setIdProducto(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="publicKey" bsSize="large">
          <ControlLabel>Public key</ControlLabel>
          <FormControl
            value={publicKey}
            onChange={e => setPublicKey(e.target.value)}
            type="publicKey"
          />
        </FormGroup>
        <select id="transaccion" name="lista" size="1">
        <option value="compra">compra</option>
        <option value="venta">venta</option>
        </select>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Registrar
        </Button>

      </form>
    </div>
  );
}
