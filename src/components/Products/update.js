import React, { Component } from 'react'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row , Image} from 'reactstrap'
import { useParams , Navigate } from "react-router";
import CategoryServices from '../../services/CategoryServices';
import ProductServices from '../../services/ProductServices';
import Select from 'react-select'
import NumericInput from 'react-numeric-input';
import {Link} from "react-router-dom";

class UpdateEmployeeComponent extends Component {
    
    
    constructor(props){
        super(props)

        
        this.state = {
            id: this.props.params.id,
            name: '',
            description: '',
            quantity: 1,
            price:1,
            categoires:[],
            selectedValue:[],
            message:'',
            fileUploaded:null

        }

        this.changeHandler = this.changeHandler.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.onChangeMulti = this.onChangeMulti.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
    }


    componentDidMount(){
        ProductServices.getProductById(this.state.id).then( (res)=>{
            let product = res.data.data;
            this.setState({
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                selectedValue: product.category_ids,
                fileUploaded: product.image ?? null
            });
        });

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

    updateProduct = (e) => {
        e.preventDefault();

        if(this.state.selectedValue.length <= 0){
            this.setState({
                message: "You should select at least on category"
            })
            return;
        }
        if(this.state.name.length <= 0 || this.state.description.length <= 0){
            this.setState({
                message: "Please Fill the required fields."
            })
            return;
        }

        let product = {
            id:this.state.id,
            name: this.state.name,
            description: this.state.description,
            quantity: this.state.quantity,
            price: this.state.price,
            categories: this.state.selectedValue,
        };

        ProductServices.updateProduct(product, this.state.id).then( res => {
            window.location = '/products/index';
        } , error => {
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

    onChangeMulti(value){
        this.setState({
            selectedValue:value
        })
    }


    onChangeFile(value){
        if(["image/png" , "image/jpeg"].includes(value.target.files[0].type)){
            this.setState({
                fileUploaded: value.target.files[0]
            })
        } else {
            this.setState({
                message: "Only Image allowed",
                fileUploaded: ""
            })
        }
    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Card>
                            <Col>
                                <h3>Update Product</h3>
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
                                            <label>Name: <span style={{"color":"red"}}>*</span></label>
                                            <input name="name" className='form-control' value={this.state.name} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Description: <span style={{"color":"red"}}>*</span></label>
                                            <textarea name="description" className='form-control' value={this.state.description} onChange={this.changeHandler} />
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Quantity: </label>
                                            <NumericInput className="form-control" name="quantity" min={1} max={100} value={this.state.quantity} onChange={this.onChangeQuantity}/>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Price :</label>
                                            <NumericInput className="form-control" name="price" step={0.5} min={1} value={this.state.price} onChange={this.onChangePrice}/>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Categories: <span style={{"color":"red"}}>*</span></label>
                                            <Select isMulti options={this.state.categoires} value={this.state.selectedValue} onChange={this.onChangeMulti}/>
                                        </FormGroup>
                                        <FormGroup style={{padding:"1em"}}> <img style={{"height":"150px","width":"350px"}}  src={this.state.fileUploaded} /> </FormGroup>
                                        <FormGroup style={{padding:"1em"}}>
                                            <label>Image :</label>
                                            <input type="file" onChange={this.onChangeFile}/>
                                        </FormGroup>
                                        <Button color="success" onClick={this.updateProduct}>Save</Button>
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

export default (props) => (
    <UpdateEmployeeComponent
        {...props}
        params={useParams()}
    />
);