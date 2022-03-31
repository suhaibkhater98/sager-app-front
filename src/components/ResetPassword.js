import React, { useState , useRef } from "react";
import {useSearchParams} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";


const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

  
const ResetPassword = () => {

    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setpasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [successful, setSuccessful] = useState(false);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = (e) => {
        setpasswordConfirm(e.target.value);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {

            AuthService.ResetPassword(email , password , password_confirmation , searchParams.get("token")).then((response) => {
                if(response.data.success === 1){
                    setSuccessful(true)
                    window.location = '/login';
                } else {
                    setSuccessful(false)
                    setLoading(false);
                    setMessage(response.data.message)
                }
            }).catch( (error) => {
                setMessage(error.response.data.message)
                setLoading(false);
            });
            
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />

            <Form onSubmit={handleForgotPassword} ref={form}>

                <div className="form-group">
                    <label htmlFor="password">Email</label>
                    <Input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required]}
                    />
                </div>

                <div className="form-group">
                <label htmlFor="email">Password</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                />
                </div>

                <div className="form-group">
                <label htmlFor="password">Password Confirmation</label>
                <Input
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    value={password_confirmation}
                    onChange={onChangeConfirmPassword}
                    validations={[required]}
                />
                </div>

                <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Submit</span>
                </button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className= { successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            </div>
        </div>
    );
}




export default ResetPassword;