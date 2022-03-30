import React, { Component } from 'react'
import CategoryServices from '../../services/CategoryServices';
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { useParams } from "react-router";

class UpdateEmployeeComponent extends Component {
    
    
    constructor(props){
        super(props)

        
        this.state = {
            id: this.props.params.id,
            name: '',
            message:'',
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
    }


    componentDidMount(){
        CategoryServices.getCategoryById(this.state.id).then( (res)=>{
            let user = res.data.data;
            this.setState({
                name: user.name,
            });
        });
    }

    updateCategory = (e) => {
        e.preventDefault();
        let category = {name: this.state.name};

        CategoryServices.updateCategory(category, this.state.id).then( res=> {
            window.location = '/categories/index';
        } , error => {
            this.setState({
                message: "Please inter valid data"
            })
        });

    }

    changeHandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    cancel()
    {
        window.location = '/categories/index';
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
                                        <Button color="success" onClick={this.updateCategory}>Save</Button>
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