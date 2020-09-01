import React from 'react';
import {Card, Button, ListGroup } from 'bootstrap';

class ProductCard extends React.Component {

    render() {
        return (
            <div align="center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://www.clipartmax.com/png/middle/8-82865_footwear-keds-nike-run-shoe-shoes-sneaker-icon-nike-shoe-drawing.png" />
                    <Card.Body>
                        <Card.Title>{this.props.productInfo.name}</Card.Title>
                        <Card.Text>
                            <ListGroup>
                                <ListGroup.Item>Dna: {this.props.productInfo.dna}</ListGroup.Item>
                                <ListGroup.Item>ean: {this.props.productInfo.ean}</ListGroup.Item>
                                <ListGroup.Item>sku: {this.props.productInfo.sku}</ListGroup.Item>
                                <ListGroup.Item>Level: {this.props.productInfo.level}</ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                        <Button variant="primary">See</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ProductCard;