import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const data = Object.fromEntries(formData.entries());
        axios.post("http://localhost:3000/api/auth/login", data,{
            withCredentials:true
        })
            .then((res) => {
                console.log(res.data); //check what backend sends 
                // const user = res.data.user;
                if (res.data.role == "Artist") {
                    navigate("/artist-home");
                } else {
                    navigate("/home")
                }

            })
            .catch((err) => {
                alert("you don't have an account")
            })

    }
    return (

        <section className="login-section">
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" required></input>
                <input type="email" name="email" placeholder="Email" required></input>
                <input type="password" name="password" placeholder="password" required></input>
                <button type="submit">Login</button>
            </form>
        </section>
    )
}

export default Login;