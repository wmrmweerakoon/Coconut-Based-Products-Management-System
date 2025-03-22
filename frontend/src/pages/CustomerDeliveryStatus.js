import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const CustomerDeliveryStatus = () => {
    const { email } = useParams(); // Use email or another unique identifier
    const [delivery, setDelivery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8070/delivery/email/${email}`)
            .then((response) => {
                console.log("API Response:", response.data); // Log the response
                setDelivery(response.data.delivery); // Set only the delivery object
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching delivery status:', err);
                setError('Error fetching delivery status. Please try again later.');
                setLoading(false);
            });
    }, [email]);

    // Function to determine status class
    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'status status-pending';
            case 'Out for Delivery':
                return 'status status-out-for-delivery';
            case 'Delivered':
                return 'status status-delivered';
            default:
                return 'status';
        }
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="customer-delivery-status-container">
            <h2>Your Delivery Status</h2>
            {delivery ? (
                <div className="delivery-details">
                    <p><strong>Name:</strong> {delivery.name}</p>
                    <p><strong>Email:</strong> {delivery.Email}</p>
                    <p><strong>Phone Number:</strong> {delivery.phoneNumber}</p>
                    <p><strong>Delivery Address:</strong> {delivery.Delivery_Address}</p>
                    <p><strong>Postal Code:</strong> {delivery.Postal_Code}</p>
                    <p>
                        <strong>Status:</strong>{" "}
                        <span className={getStatusClass(delivery.status)}>
                            {delivery.status}
                        </span>
                    </p>
                </div>
            ) : (
                <p className="no-delivery-message">No delivery found for the provided email.</p>
            )}
        </div>
    );
};

export default CustomerDeliveryStatus;