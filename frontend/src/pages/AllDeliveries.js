import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaBox, FaCheckCircle, FaCog } from 'react-icons/fa';
import '../styles/AllDeliveries.css';  // Make sure CSS is imported

export default function AllDeliveries() {
    const [deliveries, setDeliveries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        function getDeliveries() {
            axios.get("http://localhost:8070/delivery/")
                .then((res) => {
                    setDeliveries(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching deliveries:", err);
                });
        }
        getDeliveries();
    }, []);

    const getStatusBadgeClass = (status) => {
        switch(status?.toLowerCase()) {
            case 'pending':
                return 'status-badge status-pending';
            case 'out for delivery':
                return 'status-badge status-out-for-delivery';
            case 'delivered':
                return 'status-badge status-delivered';
            default:
                return 'status-badge';
        }
    };

    const getStatusIcon = (status) => {
        switch(status?.toLowerCase()) {
            case 'pending':
                return <FaBox className="status-icon" />;
            case 'out for delivery':
                return <FaTruck className="status-icon" />;
            case 'delivered':
                return <FaCheckCircle className="status-icon" />;
            default:
                return <FaBox className="status-icon" />;
        }
    };

    return (
        <div className="container">
            <div className="header-section">
                <h1>All Deliveries</h1>
                <button 
                    className="crud-redirect-btn"
                    onClick={() => navigate('/crud-deliveries')}
                >
                    <FaCog /> Manage Deliveries
                </button>
            </div>
            <table className="delivery-table">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE NUMBER</th>
                        <th>DELIVERY ADDRESS</th>
                        <th>POSTAL CODE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.length > 0 ? (
                        deliveries.map((delivery, index) => (
                            <tr key={index}>
                                <td>{delivery.name}</td>
                                <td>{delivery.Email}</td>
                                <td>{delivery.phoneNumber}</td>
                                <td>{delivery.Delivery_Address}</td>
                                <td>{delivery.Postal_Code}</td>
                                <td>
                                    <div className={getStatusBadgeClass(delivery.status)}>
                                        {getStatusIcon(delivery.status)}
                                        <span>{delivery.status}</span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-data">No deliveries found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}