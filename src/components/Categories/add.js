import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row , Alert} from 'reactstrap'
import CategoryServices from '../../services/CategoryServices';
import {Link} from "react-router-dom";

export default class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            password: '',
            email: '',
            nameMessage:'',
            passMessage:'',
            emailMessage:'',
            message:''
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
    }

    saveCategory = (e) => {
        e.preventDefault();
        let category = {name: this.state.name};

        CategoryServices.createCategory(category).then(res => {
            window.location = '/categories/index';
        }).catch( err => {
            this.setState({
                message: "Please input valid data"
            })
        });

    }

    changeHandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Card>
                            <Col>
                                <h3>Add Category</h3>
                                {this.state.message && (
                                    <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                    </div>
                                )}
                                <CardBody>
                                    <Form>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Name:</label>
                                            <input name="name" className='form-control' value={this.state.name} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <Button color="success" onClick={this.saveCategory}>Save</Button>
                                        <Link style={{"margin":"5px"}} to={"/categories/index"} className="btn btn-danger">Cancel</Link>
                                    </Form>
                                </CardBody>
                            </Col>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}