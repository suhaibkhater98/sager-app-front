import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = "http://localhost:8000/api/v1/users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
    email,
    password,
  } , {
    withCredentials: true
  })
};

const logout = () => {
  localStorage.removeItem("user")
  return axios.post(API_URL + "logout", {} , {
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
    },
    withCredentials: true
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
