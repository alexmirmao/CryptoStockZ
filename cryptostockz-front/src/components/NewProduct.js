import React, { useRef, useState } from "react";
import {Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./NewProduct.css";


export default function NewProduct() {

  const file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {

    event.preventDefault();

    if (file.current && file.current.size > 5000000) {
      alert(
        `Please pick a file smaller than ${5000000 /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);
  }

  return (
    <div className="Newproduct">
      <form onSubmit={handleSubmit}>
      <FormGroup controlId="nombreProducto" bsSize="large">
        <ControlLabel>Nombre producto</ControlLabel>
        <FormControl
          autoFocus
          type="nombreProducto"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        </FormGroup>
        <FormGroup controlId="idProducto" bsSize="large">
          <ControlLabel>ID Producto</ControlLabel>
          <FormControl
            autoFocus
            type="idProducto"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="precio" bsSize="large">
          <ControlLabel>Precio</ControlLabel>
          <FormControl
            value={content}
            onChange={e => setContent(e.target.value)}
            type="precio"
          />
        </FormGroup>
        <select id="moneda" name="lista" size="1">
        <option value="eur">EUR</option>
        <option value="gbp">GBP</option>
        <option value="usd">USD</option>
        </select>
        <FormGroup controlId="content">
        <ControlLabel>Descripcion</ControlLabel>
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <Button
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Verificar
        </Button>
      </form>
    </div>
  );
}
