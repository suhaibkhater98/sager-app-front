import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users/";

const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
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
  axios.post(API_URL + "logout", {} , {
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
    },
    withCredentials: true
  })
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const forgotPassowrd = (email) => {
  return axios.post("http://localhost:8000/api/v1/forgot-password", {email});
}

const ResetPassword = (email , password , password_confirmation , token) => {
  return axios.post("http://localhost:8000/api/v1/reset-password", {email , password, password_confirmation , token});
}
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  forgotPassowrd,
  ResetPassword,
}

export default AuthService;
