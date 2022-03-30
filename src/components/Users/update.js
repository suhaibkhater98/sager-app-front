import React, { Component } from 'react'
import UserService from '../../services/UserServices';
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { useParams } from "react-router";

class UpdateEmployeeComponent extends Component {
    
    
    constructor(props){
        super(props)

        
        this.state = {
            id: this.props.params.id,
            name: '',
            password: '',
            message:'',
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }


    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res)=>{
            let user = res.data.data;
            this.setState({
                name: user.name,
            });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, password: this.state.password};

        UserService.updateUser(user, this.state.id).then( res=> {
            window.location = '/users/index';
        } , error => {
            this.setState({
                message: "Please input valid data"
            })
        });

    }

    changeHandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    cancel()
    {
        window.location = '/users/index';
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Card>
                            <Col>
                                <h3>Update Employee</h3>
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
                                            <label>Password:</label>
                                            <input type="password" name="password" className='form-control' value={this.state.password} onChange={this.changeHandler}></input>
                                        </FormGroup>
                                        <Button color="success" onClick={this.updateUser}>Save</Button>
                                        <Button color="danger"onClick={() => this.cancel()}>Cancel</Button>
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