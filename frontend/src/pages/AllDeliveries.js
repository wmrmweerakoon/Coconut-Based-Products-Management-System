import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllDeliveries() {
    const [deliveries, setDeliveries] = useState([]);

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

    return (
        <div className="container">
            <h1>All Deliveries</h1>
            <table border="1" className="delivery-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Delivery Address</th>
                        <th>Postal Code</th>
                        <th>Status</th>
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
                                <td>{delivery.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No deliveries found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}