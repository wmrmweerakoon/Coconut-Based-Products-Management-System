import React, { useEffect, useState } from "react";
import axios from "axios";

const DeleteDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all deliveries
  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get("http://localhost:8070/delivery/");
      setDeliveries(response.data);
    } catch (err) {
      setError("Error fetching deliveries");
      console.error("Error fetching deliveries:", err);
    }
  };

  // Delete a delivery
  const deleteDelivery = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/delivery/delete/${id}`);
      setDeliveries(deliveries.filter((delivery) => delivery._id !== id)); // Remove the deleted delivery from the list
      alert("Delivery deleted successfully!");
    } catch (err) {
      setError("Error deleting delivery");
      console.error("Error deleting delivery:", err);
    }
  };
  return (
    <div className="delete-deliveries-container">
      <h1>Delete Deliveries</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {deliveries.length === 0 ? (
        <p>No deliveries available.</p>
      ) : (
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Delivery Address</th>
              <th>Postal Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.name}</td>
                <td>{delivery.Email}</td>
                <td>{delivery.phoneNumber}</td>
                <td>{delivery.Delivery_Address}</td>
                <td>{delivery.Postal_Code}</td>
                <td>
                  <button
                    onClick={() => deleteDelivery(delivery._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default DeleteDeliveries;