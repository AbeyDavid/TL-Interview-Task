import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/login");
    };
    return (
        <div class="container d-flex justify-content-center align-items-center vh-100">
            <div class="text-center">
                <h1>Welcome..!</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <button onClick={logOut} className="btn btn-danger">
                    Logout
                </button>
            </div>
        </div>
    );
}
