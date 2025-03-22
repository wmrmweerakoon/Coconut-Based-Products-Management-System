import React, { useContext } from 'react';
import { CartContext } from './CartContext'; // Import CartContext to access cart data
import { useNavigate } from 'react-router-dom'; // For navigation
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../App.css';

const Checkout = () => {
  const { cart } = useContext(CartContext); // Access cart data
  const navigate = useNavigate(); // For navigation

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/deliveryForm'); // Redirect to delivery page
  };


  return (
    <div>
      <Navbar />
      <div className="checkout-container">
        <h2>Checkout</h2>

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

        {/* Payment Details Form */}
        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Enter Payment Details</h3>

          <div className="form-group">
            <label htmlFor="bankName">Bank Name:</label>
            <input type="text" id="bankName" name="bankName" required />
          </div>

          <div className="form-group">
            <label htmlFor="accountNumber">Account Number:</label>
            <input type="text" id="accountNumber" name="accountNumber" required />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Credit Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" required />
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="month" id="expiryDate" name="expiryDate" required />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" required maxLength="3" />
          </div>

          <button type="submit" className="place-order-btn">
            Next
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;