import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const data = Object.fromEntries(formData.entries());
        axios.post("http://localhost:3000/api/auth/Register", data)
            .then((res) => {
                navigate("/login")
            })
            .catch((err) => {
                alert("register again ")
            })

    }
    return (
        <>
         
            <section className="register-section">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="username" required></input>
                    <input type="email" name="email" placeholder="Email" required></input>
                    <input type="password" name="password" placeholder="password" required></input>
                    <select name="role" required>
                        <option value="">Select Role</option>
                        <option value="user">user</option>
                        <option value="Artist">Artist</option>
                    </select>
                    <button type="submit">submit</button>
                </form>
                <p>
                    Already have an account?<Link to="/login">Login</Link>
                </p>
            </section>
        </>
    )
}

export default Register;