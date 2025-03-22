import React, { useContext } from "react";
import { CartContext } from "./CartContext"; // Import CartContext
import { useNavigate } from "react-router-dom"; // For navigation
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../App.css";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // Redirect to checkout

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((product, index) => (
              <div key={index} className="cart-item">
                <img
                  src={product.image}
                  alt={product.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>
                    <strong>Price:</strong> LKR {product.price}
                  </p>

                  {/* Quantity Selection */}
                  <label>Quantity: </label>
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      updateQuantity(product.id, parseInt(e.target.value))
                    }
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>


                  {/* Remove Item Button */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Display Total Price */}
            <h3 className="cart-total">Total: LKR {totalPrice}</h3>

            {/* Proceed to Checkout Button */}
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
