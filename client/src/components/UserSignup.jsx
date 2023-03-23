import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegistration } from "../api/api";
import "./style.css";

export default function UserSignup() {
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        name:"",
        email:"",
        mobile:"",
        password:""
    })
    const [nameError, setNameError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [message,setMessage] = useState(null)
    const [successMessage,setSuccessMessage] = useState(null)
    
    const setValues = (event)=>{
        const{name,value} = event.target
        setUserData({...userData,[name]:value})
    }
    const submitForm = async(event)=>{
        event.preventDefault()
        const result = await userRegistration(userData)
        if (result?.errors) {
            result?.errors.forEach(error => {
                if (error.param === 'name') {
                    setNameError(error.msg);
                    setTimeout(() => {
                        setNameError("")
                    }, 3000);    
                } else if (error.param === 'mobile') {
                    setPhoneError(error.msg);
                    setTimeout(() => {
                        setPhoneError("")
                    }, 3000);
                } else if (error.param === 'email') {
                    setEmailError(error.msg);
                    setTimeout(() => {
                        setEmailError("")
                    }, 3000);
                } else if (error.param === 'password') {
                    setPasswordError(error.msg);
                    setTimeout(() => {
                        setPasswordError("")
                    }, 3000);
                }
            });
        } else if (result?.message) {
            setMessage(result.message)
            setTimeout(() => {
                    setMessage("")
            }, 3000);
        } else if (result?.successmessage){
            setSuccessMessage(result.successmessage)
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        }
    }
    return (
        <div>
            <section class="vh-100 bg-image">
                <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card p-5">
                                        <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                                        {message && <h6 className="text-danger">{message}</h6>}
                                        {successMessage && <h6 className="text-success text-center">{successMessage}</h6>}
                                        <form className="p-3" onSubmit={submitForm}> 
                                            <div class="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="form3Example1cg"
                                                    class="form-control form-control-lg"
                                                    placeholder="Enter Name"
                                                    name="name"
                                                    value={userData.name}
                                                    onChange={setValues}
                                                />
                                                {nameError && <p className="text-danger">{nameError}</p>}
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input
                                                    id="form3Example3cg"
                                                    class="form-control form-control-lg"
                                                    placeholder="Enter Email"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={setValues}
                                                />
                                                {emailError && <p className="text-danger">{emailError}</p>}
                                            </div>
                                            <div class="form-outline mb-4">
                                                <input
                                                    id="form3Example3cg"
                                                    class="form-control form-control-lg"
                                                    placeholder="Enter Mobile"
                                                    name= "mobile"
                                                    value={userData.mobile}
                                                    onChange={setValues}
                                                />
                                                {phoneError && <p className="text-danger">{phoneError}</p>}
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form3Example4cg"
                                                    class="form-control form-control-lg"
                                                    placeholder="Enter Password"
                                                    name="password"
                                                    value={userData.password}
                                                    onChange={setValues}
                                                />
                                              {passwordError && <p className="text-danger">{passwordError}</p>}
                                            </div>

                                            <div class="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Register
                                                </button>
                                            </div>

                                            <p class="text-center text-muted mt-2">
                                                Have already an account?{" "}
                                                <a href="#!" onClick={()=>navigate("/login")} class="fw-bold text-body">
                                                    <u>Login here</u>
                                                </a>
                                            </p>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
