import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CRUDDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  });
  const [editId, setEditId] = useState(null); // Track the ID of the delivery being edited
  const navigate = useNavigate();

  // Fetch all delivery records
  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get("http://localhost:8070/delivery/");
      setDeliveries(response.data);
    } catch (err) {
      console.error("Error fetching deliveries:", err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const deliveryData = {
      name: formData.name,
      Email: formData.email,
      phoneNumber: formData.phone,
      Delivery_Address: formData.address,
      Postal_Code: formData.postalCode,
    };

    try {
      if (editId) {
        // Update existing delivery
        await axios.put(`http://localhost:8070/delivery/update/${editId}`, deliveryData);
        alert("Delivery updated successfully!");
      } else {
        // Create new delivery
        await axios.post("http://localhost:8070/delivery/add", deliveryData);
        alert("Delivery added successfully!");
      }
      fetchDeliveries(); // Refresh the list
      setFormData({ name: "", email: "", phone: "", address: "", postalCode: "" }); // Clear form
      setEditId(null); // Reset edit mode
    } catch (err) {
      console.error("Error saving delivery:", err);
      alert("Error saving delivery: " + err.message);
    }
  };

  // Handle edit button click
  const handleEdit = (delivery) => {
    setFormData({
      name: delivery.name,
      email: delivery.Email,
      phone: delivery.phoneNumber,
      address: delivery.Delivery_Address,
      postalCode: delivery.Postal_Code,
    });
    setEditId(delivery._id); // Set the ID of the delivery being edited
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/delivery/delete/${id}`);
      alert("Delivery deleted successfully!");
      fetchDeliveries(); // Refresh the list
    } catch (err) {
      console.error("Error deleting delivery:", err);
      alert("Error deleting delivery: " + err.message);
    }
  };

  return (
    <div className="crud-deliveries-container">
      <h2>Manage Deliveries</h2>

      {/* Form for Create/Update */}
      <form onSubmit={handleSubmit} className="delivery-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Delivery Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {editId ? "Update Delivery" : "Add Delivery"}
        </button>
      </form>

      {/* Table to display deliveries */}
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Actions</th>
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
                  onClick={() => handleEdit(delivery)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(delivery._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRUDDeliveries;