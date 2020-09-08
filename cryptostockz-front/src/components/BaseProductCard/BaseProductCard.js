import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import mergeImages from 'merge-images';



class BaseProductCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainImage: ""
        }
    }

    componentDidMount() {
        if (false) {
            this.combineImages();
        }
        console.log(this.props.productInfo);
    }

    combineImages() {
        mergeImages([
            { src: `data:image/png;base64,${this.props.productInfo.images[0]}`, x: 0, y: 0 },
            { src: `data:image/png;base64,${this.props.productInfo.images[1]}`, x: 60, y: 25 },
            { src: `data:image/png;base64,${this.props.productInfo.images[2]}`, x: 20, y: 0 }
        ])
            .then(b64 => {
                this.setState({ mainImage: b64 });
            });
    }

    render() {
        return (
            <div align="center">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://www.marshall.edu/it/files/question-mark-circle-icon.png" />
                    <Card.Body>
                        <Card.Title>{this.props.productInfo.name} - Base</Card.Title>
                        <ListGroup>
                            <ListGroup.Item>Manufacturer: {this.props.productInfo.fk_manufacturer}</ListGroup.Item>
                            <ListGroup.Item>Ean: {this.props.productInfo.ean}</ListGroup.Item>
                            <ListGroup.Item>Sku: {this.props.productInfo.sku}</ListGroup.Item>
                        { this.props.productInfo.original ? 
                            <ListGroup.Item>Verified</ListGroup.Item>
                         : (
                            <ListGroup.Item>Not Verified</ListGroup.Item>
                         )
                        }
                           
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default BaseProductCard;