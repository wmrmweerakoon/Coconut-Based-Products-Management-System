import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckDeliveryStatus = () => {
    const [email, setEmail] = useState(''); // State to store the email input
    const navigate = useNavigate(); // Hook for navigation

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            navigate(`/delivery-status/${email}`); // Navigate to the delivery status page
        } else {
            alert('Please enter your email address.');
        }
    };

    return (
        <div className="check-delivery-status-container">
            <h2>Check Your Delivery Status</h2>
            <form onSubmit={handleSubmit} className="delivery-status-form">
                <div className="form-group">
                    <label htmlFor="email">Enter Your Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@example.com"
                        required
                    />
                </div>
                <button type="submit" className="check-status-btn">
                    Check Status
                </button>
            </form>
        </div>
    );
};

export default CheckDeliveryStatus;