import React , {Component} from "react";
import DashboardServices from '../services/DashboardServices';

class Home extends Component{


  constructor(props){
      super(props)

      this.state = {
          totalCategories: 0,
          totalProducts: 0,
          totalUsers:0,
      }
  }

  componentDidMount(){

    DashboardServices.getCountTotal().then( res => {
      if(res.data.success === 1){
        this.setState({
          totalCategories: res.data.data.totalCategories,
          totalProducts: res.data.data.totalProducts,
          totalUsers: res.data.data.totalUsers
        })
      }
    })
  }


  render(){
    return(
      <div className="container">
      <div className="row">
        <div className="col-lg-4 col-sm-10">
          <div className="card bg-primary text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between align-items-start">
              <div className="fs-4 fw-semibold">
                Total Categories: {this.state.totalCategories}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
        <div className="card bg-warning text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between align-items-start">
              <div className="fs-4 fw-semibold">
                Total Products: {this.state.totalProducts}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
        <div className="card bg-danger text-high-emphasis-inverse mb-4">
            <div className="card-body pb-0 d-flex justify-content-between align-items-start">
              <div className="fs-4 fw-semibold">
                Total Users: {this.state.totalUsers}
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
    )
  }
}

export default Home;
