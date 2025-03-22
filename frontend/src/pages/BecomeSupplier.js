// src/pages/BecomeSupplier.js
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../App.css';

const BecomeSupplier = () => {
  const [formData, setFormData] = useState({
    supplierName: '',
    address: '',
    email: '',
    phone: '',
    numCoconuts: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  return (
    <div>
      <Navbar />
      <div className="supplier-form-container">
        <h2>Become a Supplier</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="supplierName"
            placeholder="Supplier Name"
            value={formData.supplierName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="numCoconuts"
            placeholder="Number of Coconuts"
            value={formData.numCoconuts}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeSupplier;
