import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaSearch } from 'react-icons/fa';
import '../styles/CheckDeliveryStatus.css';

const CheckDeliveryStatus = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            navigate(`/delivery-status/${email}`);
        } else {
            setError('Please enter your email address.');
        }
    };

    return (
        <div className="check-delivery-status-container">
            <div className="delivery-status-card">
                <div className="delivery-status-header">
                    <FaTruck className="delivery-icon" />
                    <h2>Track Your Delivery</h2>
                    <p>Enter your email address to check the status of your delivery</p>
                </div>
                
                <form onSubmit={handleSubmit} className="delivery-status-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter your email address"
                                required
                                className={error ? 'error-input' : ''}
                            />
                            <FaSearch className="search-icon" />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                    <button type="submit" className="check-status-btn">
                        <FaSearch /> Track Delivery
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckDeliveryStatus;