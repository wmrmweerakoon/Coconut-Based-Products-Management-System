import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext'; // Import CartContext
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../App.css';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation
  const { addToCart } = useContext(CartContext); // Use CartContext

  // Hardcoded product details
  const productDetails = {
    1: { title: 'Coconut Oil', image: '/images/oil.jpg', price: 3000, description: 'High-quality coconut oil for cooking and skincare.' },
    2: { title: 'Coconut Milk', image: '/images/milk.jpg', price: 1500, description: 'Fresh coconut milk for beverages and cooking.' },
    3: { title: 'Coconut Water', image: '/images/water.jpg', price: 900, description: 'Refreshing coconut water, a natural energy drink.' },
    4: { title: 'Coconut Cream', image: '/images/cream.jpg', price: 2000, description: 'Rich and creamy coconut cream for desserts and curries.' },
    5: { title: 'Coconut Sugar', image: '/images/sugar.jpg', price: 1200, description: 'Natural coconut sugar for a healthier alternative.' },
    6: { title: 'Coconut Flour', image: '/images/flour.jpg', price: 1000, description: 'Gluten-free coconut flour for baking and cooking.' },
    7: { title: 'Coconut Chips', image: '/images/chips.jpg', price: 800, description: 'Crispy coconut chips for snacking.' },
    8: { title: 'Coconut Butter', image: '/images/butter.jpg', price: 1800, description: 'Creamy coconut butter, perfect for spreads and cooking.' },
    9: { title: 'Coconut Fiber', image: '/images/fiber.jpg', price: 700, description: 'Natural coconut fiber for eco-friendly products.' },
  };

  const product = productDetails[id];

  if (!product) {
    return <div>Product not found!</div>; // If no product is found for the ID
  }

  // Handle "Add to Cart" functionality
  const handleAddToCart = () => {
    addToCart({ ...product, id }); // Add product by ID
    alert(`${product.title} added to cart!`);
  };
  
  // Handle "Buy Now" functionality
  const handleBuyNow = () => {
    addToCart(product); // Add product to cart
    navigate('/checkout'); // Redirect to checkout page
  };

  // Handle "Go to Cart" functionality
  const handleGoToCart = () => {
    navigate('/cart'); // Redirect to cart page
  };

  return (
    <div>
      <Navbar />
      <div className="product-details">
        <img src={product.image} alt={product.title} className="product-image" />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> LKR {product.price}</p>

        {/* Add to Cart and Buy Now Buttons */}
        <div className="product-actions">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        {/* Cart Icon to Go to Cart Page */}
        <div className="cart-icon-container" onClick={handleGoToCart}>
          <img src="/images/cart.png" alt="Cart" className="cart-icon" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;