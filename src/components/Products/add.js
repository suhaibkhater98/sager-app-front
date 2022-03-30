import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row , Alert} from 'reactstrap'
import CategoryServices from '../../services/CategoryServices';
import ProductServices from '../../services/ProductServices';
import {Link} from "react-router-dom";
import Select from 'react-select'
import NumericInput from 'react-numeric-input';



export default class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            description: '',
            quantity: 1,
            price:1,
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

        let product = {name: this.state.name, description: this.state.description, quantity: this.state.quantity,price:this.state.price,categories:this.state.selectedValue};

        ProductServices.createProduct(product).then(res => {
            window.location = '/products/index';
        }).catch( err => {
            this.setState({
                message: "Please input valid data"
            })
        });

    }

    changeHandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    onChangeQuantity = (value) => {
        this.setState({
            quantity: value
        })
    }

    onChangePrice = (value) => {
        this.setState({
            price: value
        })
    }
    onChange(value){
        let temp = []
        Object.values(value).forEach(data => {
            temp.push(data.value)
        })
        this.setState({
            selectedValue:temp
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Card>
                            <Col>
                                <h3>Add Product</h3>
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
                                            <label>Description :</label>
                                            <textarea name="description" className='form-control' value={this.state.description} onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Quantity :</label>
                                            <NumericInput className="form-control" name="quantity" min={1} max={100} value={this.state.quantity} onChange={this.onChangeQuantity}/>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Price :</label>
                                            <NumericInput className="form-control" name="price" step={0.5} min={1} value={this.state.price} onChange={this.onChangePrice}/>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Categories :</label>
                                            <Select isMulti options={this.state.categoires} onChange={this.onChange}/>
                                        </FormGroup>
                                        <Button color="success" onClick={this.saveCategory}>Save</Button>
                                        <Link style={{"margin":"5px"}} to={"/products/index"} className="btn btn-danger">Cancel</Link>
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