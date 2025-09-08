import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import { toast } from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function sendData(e) {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        try {
            // Configure axios
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            console.log('Attempting login...'); // Debug log
            const response = await axios.post("http://localhost:8072/register/login", userData, config);
            console.log('Login response:', response.data); // Debug log
            
            if (response.data.success) {
                const { user, token } = response.data;
                
                // Store user info in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("userId", user._id);
                localStorage.setItem("userRole", user.role);
                
                console.log('User role:', user.role); // Debug log
                toast.success("Login Successful!");
                
                // Redirect based on user role
                if (user.role === "Delivery_person") {
                    console.log('Redirecting to crud-deliveries...'); // Debug log
                    navigate("/crud-deliveries");
                } else {
                    console.log('Redirecting to profile...'); // Debug log
                    navigate("/profile");
                }
            }
        } catch (error) {
            console.error('Login error details:', {
                message: error.message,
                response: error.response,
                stack: error.stack
            });
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        }
    }

    return (
        <div className="form-container">
            <h1 className="signup-heading">
                <b>🔑 User Login</b>
            </h1>
            <form className="signup-form" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="UserEmail" className="form-label"><b>Email Address</b></label>
                    <input
                        type="email"
                        className="form-control"
                        id="UserEmail"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label"><b>Password</b></label>
                    <input
                        type="password"
                        className="form-control"
                        id="Password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="signup-button-container">
                    <button
                        type="submit"
                        className="btn btn-primary signup-button"
                    >
                        Login
                    </button>
                </div>
            </form>
            <div className="mt-3 text-center">
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </div>
        </div>
    );
}

export default Login;