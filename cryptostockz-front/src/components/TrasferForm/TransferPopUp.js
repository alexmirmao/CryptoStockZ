import React from 'react';
import './PopUp.css';
import { Button } from 'reactstrap';

import Grid from '@material-ui/core/Grid';
import { Form } from 'react-bootstrap';

class TransferPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiver:""
        }
    }

    transferProduct(){
        alert("Receiver -> " + this.state.receiver);
    }

    handleChange(e){
        if(e.target.id === "formBasicReceiver"){
            this.setState({receiver: e.target.value});
        }
    }

    closePopup(e){
        this.props.show = false;
        alert(this.props.show);
    }

    FormPage() {
        return (
            <div className="container">
                <Form>
                <Form.Label>Transfer producto ownership</Form.Label>
                    <Grid container spacing={3}>
                        <Grid item md={6}>
                            <Form.Group controlId="formBasicReceiver">
                                <Form.Control type="username" placeholder="Enter receiver address" onChange={e => this.handleChange(e)} />
                            </Form.Group>
                        </Grid>
                        <Grid item md={3}>
                            <Button color="primary" onClick={e => this.transferProduct(e)}>Transfer</Button>
                        </Grid>
                        <Grid item md={3}>
                            <Button color="danger" onClick={e => this.props.closePopup}>Cancel</Button>
                        </Grid>
                    </Grid>
                    </Form>
            </div>
        );
    };

    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    {this.FormPage()}
                </div>
            </div>
        );
    }
}

export default TransferPopUp;
