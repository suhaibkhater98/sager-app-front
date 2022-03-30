import React, { useState, useEffect } from "react";
import { Routes, Route, Link , Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ListUsersComponent from "./components/Users/Index";
import AddUserComponent from "./components/Users/add";
import UpdateUserComponent from "./components/Users/update";
import ListCategoriesComponent from "./components/Categories/Index";
import AddCategoryComponent from "./components/Categories/add";
import UpdateCategoryComponent from "./components/Categories/update";
import ListProductsComponent from "./components/Products/Index";
import AddProductComponent from "./components/Products/add";
import UpdateProductComponent from "./components/Products/update";


import PrivateRoute from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
  const isLoggedIn = JSON.parse(localStorage.getItem("user")) != null

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={ currentUser ? "/" : "/login"} className="navbar-brand">
          Sager Application
        </Link>
        <div className="navbar-nav mr-auto">
          
          {currentUser && (<li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/users/index"} className="nav-link">
                Users
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/categories/index"} className="nav-link">
                Categories
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/products/index"} className="nav-link">
                Products
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.name}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {
            isLoggedIn ?
            <>
              <Route exact path="/profile" element={<Profile />} />
              <Route path="/users/index" element={<ListUsersComponent />} />
              <Route path="/users/add" element={<AddUserComponent />} />
              <Route path="/users/update/:id" element={<UpdateUserComponent />} />
              <Route path="/categories/index" element={<ListCategoriesComponent />} />
              <Route path="/categories/add" element={<AddCategoryComponent />} />
              <Route path="/categories/update/:id" element={<UpdateCategoryComponent />} />
              <Route path="/products/index" element={<ListProductsComponent />} />
              <Route path="/products/add" element={<AddProductComponent />} />
              <Route path="/products/update/:id" element={<UpdateProductComponent />} />
            </>
            :
            ''
          }
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
