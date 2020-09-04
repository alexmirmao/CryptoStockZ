import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mergeImages from 'merge-images';



class ProductCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mainImage: ""
        }
    }

    componentDidMount(){
        this.combineImages();
    }

    combineImages(){
        mergeImages([
            { src: `data:image/png;base64,${this.props.productInfo.images[0]}`, x: 0, y: 0 },
            { src: `data:image/png;base64,${this.props.productInfo.images[1]}`, x: 60, y: 25 },
            { src: `data:image/png;base64,${this.props.productInfo.images[2]}`, x: 100, y: 0 }
          ])
            .then(b64 => {
                this.setState({mainImage: b64});
            });
    }

    render() {
        return (
            <div align="center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.state.mainImage} />
                    <Card.Body>
                        <Card.Title>{this.props.productInfo.name}</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Dna: {this.props.productInfo.dna}</ListGroup.Item>
                            <ListGroup.Item>ean: {this.props.productInfo.ean}</ListGroup.Item>
                            <ListGroup.Item>sku: {this.props.productInfo.sku}</ListGroup.Item>
                            <ListGroup.Item>Level: {this.props.productInfo.level}</ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Link to={`/products/${this.props.productInfo.id}`}>See</Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ProductCard;