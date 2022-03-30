import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row , Alert} from 'reactstrap'
import UserService from '../../services/UserServices';
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
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, password: this.state.password, email: this.state.email};

        UserService.createUser(user).then(res => {
            if(res.data.success == 0){
                Object.keys(res.data.data).forEach(key => {
                    if(key == 'email'){
                        this.setState({
                            emailMessage:res.data.data[key][0]
                        })
                    } else if(key == 'password') {
                        this.setState({
                            passMessage:res.data.data[key][0]
                        })
                    } else if(key == 'name') {
                        this.setState({
                            nameMessage:res.data.data[key][0]
                        })
                    }
                })
            } else {
                window.location = '/users/index';
            }
        })

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
                                <h3>Add User</h3>
                                {(this.state.emailMessage || this.state.passMessage || this.state.nameMessage) && (
                                    <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {
                                            <ul>
                                                {this.state.emailMessage ? <li>{this.state.emailMessage}</li> : ''}
                                                {this.state.passMessage ? <li>{this.state.passMessage}</li> : ''}
                                                {this.state.nameMessage ? <li>{this.state.nameMessage}</li> : ''}
                                            </ul>
                                        }
                                    </div>
                                    </div>
                                )}
                                <CardBody>
                                    <Form>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Name:</label>
                                            <input name="name" className='form-control' value={this.state.name} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Password :</label>
                                            <input type="password" name="password" className='form-control' value={this.state.password} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Email :</label>
                                            <input type="email" name="email" className='form-control' value={this.state.email} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <Button color="success" onClick={this.saveUser}>Save</Button>
                                        <Link style={{"margin":"5px"}} to={"/users/index"} className="btn btn-danger">Cancel</Link>
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