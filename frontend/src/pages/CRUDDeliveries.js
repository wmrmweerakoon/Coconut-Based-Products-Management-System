import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaTruck, FaSpinner, FaArrowLeft, FaExchangeAlt } from 'react-icons/fa';
import '../styles/CRUDDeliveries.css';

const CRUDDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8070/delivery/");
      setDeliveries(response.data);
    } catch (err) {
      setError("Failed to fetch deliveries. Please try again.");
      console.error("Error fetching deliveries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) return "Invalid phone number format";
    if (!formData.address.trim()) return "Address is required";
    if (!formData.postalCode.trim()) return "Postal code is required";
    if (!/^\d{5}$/.test(formData.postalCode)) return "Invalid postal code format";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setFormLoading(true);
    setError("");
    setSuccess("");

    const deliveryData = {
      name: formData.name,
      Email: formData.email,
      phoneNumber: formData.phone,
      Delivery_Address: formData.address,
      Postal_Code: formData.postalCode,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8070/delivery/update/${editId}`, deliveryData);
        setSuccess("Delivery updated successfully!");
      } else {
        await axios.post("http://localhost:8070/delivery/add", deliveryData);
        setSuccess("Delivery added successfully!");
      }
      fetchDeliveries();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving delivery. Please try again.");
      console.error("Error saving delivery:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (delivery) => {
    setFormData({
      name: delivery.name,
      email: delivery.Email,
      phone: delivery.phoneNumber,
      address: delivery.Delivery_Address,
      postalCode: delivery.Postal_Code,
    });
    setEditId(delivery._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this delivery?")) return;

    setLoading(true);
    setError("");
    try {
      await axios.delete(`http://localhost:8070/delivery/delete/${id}`);
      setSuccess("Delivery deleted successfully!");
      fetchDeliveries();
    } catch (err) {
      setError("Error deleting delivery. Please try again.");
      console.error("Error deleting delivery:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", address: "", postalCode: "" });
    setEditId(null);
  };

  return (
    <div className="crud-container">
      <button 
        className="back-button"
        onClick={() => navigate('/all-deliveries')}
      >
        <FaArrowLeft /> Back to All Deliveries
      </button>

      <h1 className="page-title">
        <FaTruck /> Manage Deliveries
      </h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="delivery-form">
        <h2 className="add-delivery-title">
          {editId ? "Edit Delivery" : "Add New Delivery"}
        </h2>
        
        <div className="form-section">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            disabled={formLoading}
          />
        </div>

        <div className="form-section">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            disabled={formLoading}
          />
        </div>

        <div className="form-section">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled={formLoading}
          />
        </div>

        <div className="form-section">
          <label>Delivery Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter delivery address"
            disabled={formLoading}
          />
        </div>

        <div className="form-section">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter postal code"
            disabled={formLoading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={formLoading}>
          {formLoading ? (
            <>
              <FaSpinner className="spinner" /> Saving...
            </>
          ) : editId ? (
            <>
              <FaEdit /> Update Delivery
            </>
          ) : (
            <>
              <FaPlus /> Add Delivery
            </>
          )}
        </button>
      </form>

      <div className="table-container">
        <h3>Delivery Records</h3>
        {loading ? (
          <div className="loading-container">
            <FaSpinner className="spinner" />
            <p>Loading deliveries...</p>
          </div>
        ) : deliveries.length === 0 ? (
          <div className="no-data-message">
            <p>No deliveries found. Add your first delivery using the form above.</p>
          </div>
        ) : (
          <div className="table-responsive">
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
                    <td className="action-buttons">
                      <button
                        onClick={() => handleEdit(delivery)}
                        className="edit-btn"
                        title="Edit delivery"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(delivery._id)}
                        className="delete-btn"
                        title="Delete delivery"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => navigate(`/update-delivery-status/${delivery._id}`)}
                        className="status-btn"
                        title="Update status"
                      >
                        <FaExchangeAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRUDDeliveries;