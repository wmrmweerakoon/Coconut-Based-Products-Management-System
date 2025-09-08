import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaHome, FaBox, FaCheckCircle } from 'react-icons/fa';
import '../App.css';

const CustomerDeliveryStatus = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDeliveryStatus = async () => {
            try {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    setError('Invalid email format');
                    setLoading(false);
                    return;
                }

                console.log('Fetching delivery for email:', email);
                const response = await axios.get(`http://localhost:8070/delivery/email/${encodeURIComponent(email)}`);
                console.log('API Response:', response.data);
                
                if (response.data && response.data.delivery) {
                    console.log('Setting delivery data:', response.data.delivery);
                    setDelivery(response.data.delivery);
                } else {
                    console.log('No delivery data found in response');
                    setError('No delivery data found');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching delivery status:', err);
                if (err.code === 'ERR_NETWORK') {
                    setError('Unable to connect to the server. Please check your internet connection and try again.');
                } else if (err.response) {
                    console.log('Error response:', err.response);
                    setError(err.response.data?.message || 'Error fetching delivery status');
                } else {
                    setError('An unexpected error occurred. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchDeliveryStatus();
    }, [email]);

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'out-for-delivery':
                return 'status-out-for-delivery';
            case 'delivered':
                return 'status-delivered';
            default:
                return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return <FaBox className="status-icon pending" />;
            case 'out-for-delivery':
                return <FaTruck className="status-icon out-for-delivery" />;
            case 'delivered':
                return <FaCheckCircle className="status-icon delivered" />;
            default:
                return <FaBox className="status-icon" />;
        }
    };

    const getStatusText = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'Pending';
            case 'out-for-delivery':
                return 'Out for Delivery';
            case 'delivered':
                return 'Delivered';
            default:
                return status || 'Unknown';
        }
    };

    if (loading) {
        return (
            <div className="delivery-status-container loading-container">
                <div className="loading-spinner"></div>
                <h2>Loading Delivery Status...</h2>
                <p>Please wait while we fetch your delivery information</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="delivery-status-container error-container">
                <div className="error-content">
                    <div className="error-icon">!</div>
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <button 
                        className="back-to-home-btn"
                        onClick={() => navigate('/')}
                    >
                        <FaHome className="home-icon" />
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!delivery) {
        return (
            <div className="delivery-status-container no-delivery-container">
                <div className="no-delivery-content">
                    <FaBox className="no-delivery-icon" />
                    <h2>No Delivery Found</h2>
                    <p>We couldn't find any delivery information for this email.</p>
                    <button 
                        className="back-to-home-btn"
                        onClick={() => navigate('/')}
                    >
                        <FaHome className="home-icon" />
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="delivery-status-container">
            <div className="delivery-header">
                <h1>Delivery Status</h1>
                <p className="delivery-subtitle">Track your delivery status and details below</p>
            </div>

            <div className="status-section">
                <div className={`status-badge ${getStatusClass(delivery.status)}`}>
                    {getStatusIcon(delivery.status)}
                    <span className="status-text">{getStatusText(delivery.status)}</span>
                </div>
            </div>

            <div className="delivery-info-card">
                <div className="info-grid">
                    <div className="info-item">
                        <FaTruck className="info-icon" />
                        <div className="info-content">
                            <label>Delivery ID</label>
                            <p>{delivery._id}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <div className="info-content">
                            <label>Delivery Address</label>
                            <p>{delivery.Delivery_Address}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaPhone className="info-icon" />
                        <div className="info-content">
                            <label>Contact Number</label>
                            <p>{delivery.phoneNumber}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaEnvelope className="info-icon" />
                        <div className="info-content">
                            <label>Email</label>
                            <p>{delivery.Email}</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaCalendarAlt className="info-icon" />
                        <div className="info-content">
                            <label>Order Date</label>
                            <p>{new Date(delivery.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button 
                    className="back-to-home-btn"
                    onClick={() => navigate('/')}
                >
                    <FaHome className="home-icon" />
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default CustomerDeliveryStatus;