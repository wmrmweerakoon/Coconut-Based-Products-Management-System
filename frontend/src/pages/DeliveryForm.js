import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext'; // Import CartContext to access cart data
import { useNavigate } from 'react-router-dom'; // For navigation
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import '../App.css';

const Delivery = () => {
  const { cart } = useContext(CartContext); // Access cart data
  const navigate = useNavigate(); // For navigation

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errors, setErrors] = useState({}); // State for errors

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  // Validation function
  const validateForm = () => {
    let validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number validation
    const postalCodeRegex = /^[0-9]{5}$/; // 5-digit postal code validation

    if (!name.trim()) validationErrors.name = 'Name is required.';
    if (!email.trim()) validationErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) validationErrors.email = 'Invalid email format.';

    if (!phone.trim()) validationErrors.phone = 'Phone number is required.';
    else if (!phoneRegex.test(phone)) validationErrors.phone = 'Phone number must be 10 digits.';

    if (!address.trim()) validationErrors.address = 'Delivery address is required.';
    if (!postalCode.trim()) validationErrors.postalCode = 'Postal code is required.';
    else if (!postalCodeRegex.test(postalCode)) validationErrors.postalCode = 'Postal code must be 5 digits.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    // Create an object with form data
    const newDelivery = {
      name,
      Email: email,
      phoneNumber: phone,
      Delivery_Address: address,
      Postal_Code: postalCode,
    };

    axios.post("http://localhost:8070/delivery/add", newDelivery)
      .then(() => {
        alert("Delivery added successfully!");
        navigate('/'); // Redirect to home page after placing the order
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        alert("Error placing order: " + err.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="delivery-container">
        <h2>Delivery Details</h2>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  {product.title} - ${product.price} x {product.quantity}
                </li>
              ))}
            </ul>
          )}
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
        </div>

        {/* Delivery Details Form */}
        <form onSubmit={handleSubmit} className="delivery-form">
          <h3>Enter Delivery Details</h3>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address:</label>
            <textarea
              id="address"
              name="address"
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
