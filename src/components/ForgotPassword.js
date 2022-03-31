import React, { useState , useRef } from "react";
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
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    
    const changeHandler = (event)=>{
        setEmail(event.target.value );
    }


    const handleForgotPassword = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();
        
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.forgotPassowrd(email).then((response) => {
                setMessage(response.data.message)
                setSuccessful(true)
            }).catch( (error) => {
                setMessage(error.response.data.message)
            });
            setLoading(false);
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
                <label htmlFor="email">Email</label>
                <Input
                    type="email"
                    className="form-control"
                    name="password"
                    value={email}
                    onChange={changeHandler}
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