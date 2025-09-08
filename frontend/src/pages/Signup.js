import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [expectedRole, setExpectedRole] = useState("");
    const [mobile, setMobile] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors

        if (!isChecked) {
            setError("You must agree to the terms & conditions before submitting.");
            toast.error("You must agree to the terms & conditions.");
            return;
        }

        const userData = {
            name,
            email,
            password,
            dob,
            gender,
            expectedRole,
            mobile 
        };

        //checking passwords in correct format
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and include both letters and numbers.");
            toast.error("Invalid password format!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8072/register/signup', userData);
            
            if (response.data.success) {
                // Show success message
                toast.success('Registration successful! Please login.');
                // Always redirect to login page after successful registration
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Give time for the success message to be seen
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="form-container">
            <h1 className="signup-heading">
                <b>🤵 User Registration</b>
            </h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                
                <div className="mb-3">
                    <label htmlFor="UserName" className="form-label"><b>Full Name</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="UserName"
                        placeholder="Enter your full name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label"><b>Password</b></label>
                    <input
                        type="password"
                        className="form-control"
                        id="Password"
                        placeholder="Create a password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div id="passwordHelp" className="form-text">
                        Use at least 8 characters with letters and numbers.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="UserMobile" className="form-label"><b>Mobile Number</b></label>
                    <input
                        type="text"
                        className="form-control"
                        id="UserMobile"
                        placeholder="07XXXXXXXX"
                        value={mobile}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d{0,10}$/.test(input)) {
                                setMobile(input);
                            }
                        }}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="dob" className="form-label"><b>Date of Birth</b></label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label"><b>Gender</b></label>
                    <select
                        className="form-select"
                        id="gender"
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="expectedRole" className="form-label"><b>Expected Role</b></label>
                    <select
                        className="form-select"
                        id="expectedRole"
                        onChange={(e) => setExpectedRole(e.target.value)}
                        required
                    >
                        <option value="">Select a Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Supplier">Supplier</option>
                        <option value="Delivery_person">Delivery Person</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="TermsCheck"
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="TermsCheck">
                        I agree to the Terms & Conditions
                    </label>
                </div>

                <div className="signup-button-container">
                    <button
                        type="submit"
                        className="btn btn-primary signup-button"
                    >
                        Create Account
                    </button>
                </div>
                <div className="mt-3 text-center">
                    <label className="form-check-label" htmlFor="loginLink">
                        If you already have an account <Link to="/login">Login from here</Link>.
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Signup;