import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mergeImages from 'merge-images';

import WishButton from '../wishButton';



class ProductCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mainImage: ""
        }
    }

    componentDidMount(){
        if(this.props.digital){
            this.combineImages();
        }
    }

    combineImages(){
        mergeImages([
            { src: `data:image/png;base64,${this.props.productInfo.images[0]}`, x: 0, y: 0 },
            { src: `data:image/png;base64,${this.props.productInfo.images[1]}`, x: 60, y: 25 },
            { src: `data:image/png;base64,${this.props.productInfo.images[2]}`, x: 20, y: 0 }
          ])
            .then(b64 => {
                this.setState({mainImage: b64});
            });
    }

    render() {
        return (
            <div align="center">
                <Card style={{ width: '18rem' }}>
                    {this.props.digital ?  
                    <Card.Img variant="top" src={this.state.mainImage} />
                    :  (
                        <Card.Img variant="top" src="https://www.marshall.edu/it/files/question-mark-circle-icon.png" />
                    )
                }
                    
                    <Card.Body>
                        <Card.Title>{this.props.productInfo.name}</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Dna: {this.props.productInfo.dna}</ListGroup.Item>
                            <ListGroup.Item>Address: {this.props.productInfo.address}</ListGroup.Item>
                            <ListGroup.Item>Owner: {this.props.productInfo.owner_address}</ListGroup.Item>
                            <ListGroup.Item>Level: {this.props.productInfo.level}</ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Link to={`/products/${this.props.productInfo.id}`}>See</Link>
                        <br></br>
                        <WishButton token={this.props.token} productId={this.props.productInfo.id}/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ProductCard;