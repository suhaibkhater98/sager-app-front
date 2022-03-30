import axios from "axios";

const USERS_API_BASE_URL = "http://localhost:8000/api/v1/products";

const header = {
    withCredentials: true , 
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
    }
}

class ProductServices {

    getProducts(pageNum = 1){
        return axios.get(USERS_API_BASE_URL+ "?page=" + pageNum, header); 
    }

    createProduct(product)
    {
        return axios.post(USERS_API_BASE_URL, product , header);
    }

    getProductById(productId)
    {
        return axios.get(USERS_API_BASE_URL + '/' + productId , header);
    }

    updateProduct(product, productId)
    {
        return axios.put(USERS_API_BASE_URL + '/' + productId, product , header);
    }

    deleteProduct(productId){
        return axios.delete(USERS_API_BASE_URL + '/' + productId , header);
    }

    decQuantity(productId){
        return axios.post(USERS_API_BASE_URL + "/decQuantity" , {"id":productId} , header)
    }

}
export default new ProductServices()