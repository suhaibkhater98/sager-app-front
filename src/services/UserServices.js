import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8000/api/v1/users";

const header = {
    withCredentials: true , 
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
    }
}

class UserService {


    getUsers(pageNum = 1){
        return axios.get(USERS_API_BASE_URL+ "?page=" + pageNum, header); 
    }

    createUser(user)
    {
        return axios.post(USERS_API_BASE_URL, user , header);
    }

    getUserById(userId)
    {
        return axios.get(USERS_API_BASE_URL + '/' + userId , header);
    }

    updateUser(user, userId)
    {
        return axios.put(USERS_API_BASE_URL + '/' + userId, user , header);
        debugger
    }

    deleteUser(userId){
        return axios.delete(USERS_API_BASE_URL + '/' + userId , header);
    }

}
export default new UserService()