import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDeliveryStatus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        axios.get(`http://localhost:8070/delivery/get/${id}`)
            .then((response) => {
                setStatus(response.data.user.status);
            })
            .catch((error) => {
                console.error('Error fetching delivery status:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8070/delivery/update-status/${id}`, { status })
            .then(() => {
                alert('Delivery status updated successfully!');
                navigate('/all-deliveries');
            })
            .catch((error) => {
                console.error('Error updating delivery status:', error);
                alert('Error updating delivery status: ' + error.message);
            });
    };

    return (
        <div className="update-status-container">
            <h2>Update Delivery Status</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
                <button type="submit" className="update-status-btn">
                    Update Status
                </button>
            </form>
        </div>
    );
};

export default UpdateDeliveryStatus;