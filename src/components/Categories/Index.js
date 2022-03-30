import React, { Component } from 'react'
import { Button, Row, Table } from 'reactstrap';
import CategoryServices from '../../services/CategoryServices';
import Pagination from 'react-js-pagination';
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ListUsersComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            meta: {},
            messageError:'',
            messageSuccess:''
        }

        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount(){
        this.getCategoryList()
    }

    async getCategoryList(currentPage = 1) {
        await CategoryServices.getCategories(currentPage).then((res) => {
            this.setState({
                categories: res.data.data,
                meta:res.data.meta
            });
        });
    }


    deleteCategory(id)
    {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure to delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    CategoryServices.deleteCategory(id).then( res => {
                        if(res.data.success == 1){
                            this.setState({
                                messageSuccess: res.data.message
                            })
                            this.setState({categories: this.state.categories.filter(categor => categor.id !== id)});
                        } else 
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

                <h2 className="text-center" style={{padding:"1em"}}>Categories List</h2>
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
                    <Link to={"/categories/add"} className="btn btn-primary">Add Category</Link>
                </div>
                <br />
                <Row>
                    <Pagination
                        totalItemsCount={this.state.meta.total}
                        activePage={this.state.meta.current_page}
                        itemsCountPerPage={this.state.meta.per_page}
                        onChange={ (pageNumber) => this.getCategoryList(pageNumber)}
                        itemClass="page-item"
                        linkClass='page-link'
                        firstPageText="First"
                        lastPageText="Last"
                    />
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Product Count</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.categories.map(
                                    category => 
                                    <tr key = {category.id}>
                                        <td> {category.name} </td>
                                        <td> {category.number_of_products} </td>
                                        <td> {category.created_at} </td>
                                        <td>
                                            <Link to={`/categories/update/${category.id}`} className="btn btn-primary">Update</Link>
                                            <Button style={{marginLeft: "1em"}} onClick={ ()=> this.deleteCategory(category.id) } color="danger">Delete</Button>
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