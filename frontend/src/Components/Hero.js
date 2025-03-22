import React from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/images/banner.jpg'; // Import the image
import '../App.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${banner})` }} // Use the imported image
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h2>Welcome to Our Store!</h2>
          <p>Explore Our Range of Coconut-Based Products</p>
          <button className="cta-btn" onClick={() => navigate('/products')}>
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
