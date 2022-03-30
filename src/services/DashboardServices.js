import axios from "axios";

const Dashboard_API_BASE_URL = "http://localhost:8000/api/v1/dashboards";

const header = {
    withCredentials: true , 
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
    }
}


class DashboardServices {

    getCountTotal(){
        return axios.get(Dashboard_API_BASE_URL + '/getCountTotal' , header);
    }

}
export default new DashboardServices()
