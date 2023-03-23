import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api/api";

export default function UserLogin() {
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        email:"",
        password:""
    })
    const [errMsg,setErrMsg] = useState(null)
    const setValues = (event)=>{
        const{name,value} = event.target
        setUserData({...userData,[name]:value})
    }
    const submitForm = async(event)=>{
        event.preventDefault()
        const result = await userLogin(userData)
        if (result.errMsg) {
            setTimeout(() => {
                setErrMsg("")
            }, 3000);
            return setErrMsg(result.errMsg)
        }
        if (result.token) {
            localStorage.setItem("token",result.token)
            navigate("/")
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
                                    <form className="p-3" onSubmit={submitForm}>
                                        <div class="form-outline mb-4">
                                            {errMsg && <p className="text-danger">{errMsg}</p>}
                                            <input
                                                id="form3Example3cg"
                                                class="form-control form-control-lg"
                                                placeholder="Enter Email"
                                                name="email"
                                                value={userData.email}
                                                onChange={setValues}
                                            />
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
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <button
                                                type="submit"
                                                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                            >
                                                Login
                                            </button>
                                        </div>
                                        <p class="text-center text-muted mt-2">
                                            Create an account{"  "}
                                            <a href="#!" onClick={()=>navigate("/")} class="fw-bold text-body">
                                                <u>Signup here </u>
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
