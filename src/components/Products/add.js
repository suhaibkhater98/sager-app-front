import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row , Alert} from 'reactstrap'
import UserService from '../../services/UserServices';
import CategoryServices from '../../services/CategoryServices';
import {Link} from "react-router-dom";
import Select from 'react-select'



export default class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            description: '',
            quantity: '',
            price:'',
            categoires:[],
            selectedValue:[],
            passMessage:'',
            emailMessage:'',
            message:''
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        CategoryServices.getCategoriesList().then(res => {
            let temp = []
            Object.values(res.data.data).forEach(data => {
                temp.push({label:data.name , value:data.id})
            })
            this.setState({
                categoires:temp
            })
        })
    }

    saveCategory = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, password: this.state.password, email: this.state.email};

        UserService.createUser(user).then(res => {
            console.log(res)
            window.location = '/users/index';
        }).catch( err => {
            this.setState({
                message: "Please input valid data"
            })
        });

    }

    changeHandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    onChange(value){
        this.setState({
            selectedValue:value
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Card>
                            <Col>
                                <h3>Add Employee</h3>
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
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Password :</label>
                                            <input name="password" className='form-control' value={this.state.password} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Email :</label>
                                            <input name="email" className='form-control' value={this.state.email} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <Select isMulti options={this.state.categoires} onChange={this.onChange}/>
                                        <Button color="success" onClick={this.saveEmployee}>Save</Button>
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