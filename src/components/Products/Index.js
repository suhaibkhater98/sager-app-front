import React, { Component } from 'react'
import { Button, Row, Table } from 'reactstrap';
import ProductServices from '../../services/ProductServices';
import Pagination from 'react-js-pagination';
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ListProductsComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            meta: {},
            messageError:'',
            messageSuccess:''
        }

        this.deleteProduct = this.deleteProduct.bind(this);
        this.decQuntity = this.decQuntity.bind(this);
    }

    componentDidMount(){
        this.getProductList()
    }

    async getProductList(currentPage = 1) {
        await ProductServices.getProducts(currentPage).then((res) => {
            this.setState({
                products: res.data.data,
                meta:res.data.meta
            });
        });
    }

    decQuntity(id){
        ProductServices.decQuantity(id).then( res => {
            if(res.data.success == 1){
                this.setState({
                    messageSuccess: res.data.message
                })
                this.setState({products: this.state.products.map( product => {
                    return {
                      ...product,
                      quantity: product.id === id ? product.quantity - 1 : product.quantity
                    };
                  })
                });
            }
            else 
                this.setState({
                    messageError: res.data.message
                })
                
        });
    }

    deleteProduct(id)
    {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure to delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    ProductServices.deleteProduct(id).then( res => {
                        if(res.data.success == 1){
                            this.setState({
                                messageSuccess: res.data.message
                            })
                            this.setState({products: this.state.products.filter(product => product.id !== id)});
                        }
                        else 
                            this.setState({
                                messageError: res.data.message
                            })
                            
                    });
                }
              },
              {
                label: 'No',
              }
            ]
          });
    }


    render() {
        return (
            <div>

                <h2 className="text-center" style={{padding:"1em"}}>Products List</h2>
                {this.state.messageError && (
                                    <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.messageError}
                                    </div>
                                    </div>
                                )}

                {this.state.messageSuccess && (
                                    <div className="form-group">
                                    <div className="alert alert-success" role="alert">
                                        {this.state.messageSuccess}
                                    </div>
                                    </div>
                                )}
                <div style={{textAlign:'left'}}>
                    <Link to={"/products/add"} className="btn btn-primary">Add Product</Link>
                </div>
                <br />
                <Row>
                    <Pagination
                        totalItemsCount={this.state.meta.total}
                        activePage={this.state.meta.current_page}
                        itemsCountPerPage={this.state.meta.per_page}
                        onChange={ (pageNumber) => this.getProductList(pageNumber)}
                        itemClass="page-item"
                        linkClass='page-link'
                        firstPageText="First"
                        lastPageText="Last"
                    />
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>price</th>
                                <th>User name</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    category => 
                                    <tr key = {category.id}>
                                        <td> {category.name} </td>
                                        <td> {category.description} </td>
                                        <td> {category.quantity} {category.quantity > 0 ? <Button variant="secondary" size="sm" onClick={() => this.decQuntity(category.id)}> - </Button> :''} </td>
                                        <td> {category.price} </td>
                                        <td> {category.user_name} </td>
                                        <td> {category.created_at} </td>
                                        <td>
                                            <Link to={`/products/update/${category.id}`} className="btn btn-primary">Update</Link>
                                            <Button style={{marginLeft: "1em"}} onClick={ ()=> this.deleteProduct(category.id) } color="danger">Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Row>

            </div>
        )
    }
}