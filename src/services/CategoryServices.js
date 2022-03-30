import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8000/api/v1/categories";

const header = {
    withCredentials: true , 
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
    }
}

class CategoryServices {


    getCategories(pageNum = 1){
        return axios.get(USERS_API_BASE_URL+ "?withPagination=true&&page=" + pageNum, header); 
    }

    createCategory(category)
    {
        return axios.post(USERS_API_BASE_URL, category , header);
    }

    getCategoryById(categoryId)
    {
        return axios.get(USERS_API_BASE_URL + '/' + categoryId , header);
    }

    updateCategory(category, categoryId)
    {
        return axios.put(USERS_API_BASE_URL + '/' + categoryId, category , header);
        debugger
    }

    deleteCategory(categoryId){
        return axios.delete(USERS_API_BASE_URL + '/' + categoryId , header);
    }

    getCategoriesList(){
        return axios.get(USERS_API_BASE_URL , header); 
    }

}
export default new CategoryServices()