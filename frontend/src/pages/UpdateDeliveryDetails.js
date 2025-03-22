import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and params


const UpdateDeliveryDetails = () => {
  const { id } = useParams(); // Get the delivery ID from the URL
  const navigate = useNavigate(); // For navigation after update

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch existing delivery data by ID
    axios
      .get(`http://localhost:8070/delivery/${id}`)
      .then((response) => {
        const { name, Email, phoneNumber, Delivery_Address, Postal_Code } = response.data;
        setName(name);
        setEmail(Email);
        setPhone(phoneNumber);
        setAddress(Delivery_Address);
        setPostalCode(Postal_Code);
      })
      .catch((error) => {
        console.error('Error fetching delivery details:', error);
      });
  }, [id]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = 'Delivery address is required.';
    }

    // Postal code validation
    if (!postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required.';
    } else if (!/^\d{5}$/.test(postalCode)) {
      newErrors.postalCode = 'Postal code must be 5 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    const updatedDelivery = {
      name,
      Email: email,
      phoneNumber: phone,
      Delivery_Address: address,
      Postal_Code: postalCode,
    };

    // Send updated data to the backend
    axios
      .put(`http://localhost:8070/delivery/update/${id}`, updatedDelivery)
      .then(() => {
        alert('Delivery details updated successfully!');
        navigate('/all-deliveries'); // Navigate to the deliveries list page
      })
      .catch((error) => {
        console.error('Error updating delivery details:', error);
        alert('Error updating delivery details: ' + error.message);
      });
  };

  return (
    <div className="update-delivery-container">
      <h2>Update Delivery Details</h2>
      <form onSubmit={handleSubmit} className="update-delivery-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error-border' : ''}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error-border' : ''}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? 'error-border' : ''}
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Delivery Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={errors.address ? 'error-border' : ''}
            required
          ></textarea>
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className={errors.postalCode ? 'error-border' : ''}
            required
          />
          {errors.postalCode && <p className="error">{errors.postalCode}</p>}
        </div>
        <button type="submit" className="update-delivery-btn">
          Update Details
        </button>
      </form>
    </div>
  );
};

export default UpdateDeliveryDetails;