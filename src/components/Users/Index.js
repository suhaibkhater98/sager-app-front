import React, { Component } from 'react'
import { Button, Row, Table } from 'reactstrap';
import UserService from '../../services/UserServices';
import Pagination from 'react-js-pagination';
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class ListUsersComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            meta: {},
            messageError:'',
            messageSuccess:''
        }

        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        this.getUserList()
    }

    async getUserList(currentPage = 1) {
        await UserService.getUsers(currentPage).then((res) => {
            this.setState({
                users: res.data.data,
                meta:res.data.meta
            });
        });
    }

    
    deleteUser(id)
    {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure to delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    UserService.deleteUser(id).then( res => {
                        console.log(res.data)
                        if(res.data.success == 1){
                            this.setState({
                                messageSuccess: res.data.message
                            })
                            this.setState({users: this.state.users.filter(user => user.id !== id)});
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

                <h2 className="text-center" style={{padding:"1em"}}>Users List</h2>
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
                    <Link to={"/users/add"} className="btn btn-primary">Add User</Link>
                </div>
                <br />
                <Row>
                    <Pagination
                        totalItemsCount={this.state.meta.total}
                        activePage={this.state.meta.current_page}
                        itemsCountPerPage={this.state.meta.per_page}
                        onChange={ (pageNumber) => this.getUserList(pageNumber)}
                        itemClass="page-item"
                        linkClass='page-link'
                        firstPageText="First"
                        lastPageText="Last"
                    />
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                    <tr key = {user.id}>
                                        <td> {user.name} </td>
                                        <td> {user.email} </td>
                                        <td> {user.created_at} </td>
                                        <td>
                                            <Link to={`/users/update/${user.id}`} className="btn btn-primary">Update</Link>
                                            <Button style={{marginLeft: "1em"}} onClick={ ()=> this.deleteUser(user.id) } color="danger">Delete</Button>
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