import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../Components/Hero';
import ProductCard from '../Components/ProductCard';
import Footer from '../Components/Footer';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, title: 'Coconut Oil', image: '/images/oil.jpg', price: 3000 },
    { id: 2, title: 'Coconut Milk', image: '/images/milk.jpg', price: 1500 },
    { id: 3, title: 'Coconut Water', image: '/images/water.jpg', price: 900 },
  ];

  const handleViewDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div>
      <Hero />
      <section className="product-section">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            onViewDetails={() => handleViewDetails(product.id)} 
          />
        ))}
      </section>
      <div className="more-products-btn-container">
        <button className="cta-btn" onClick={() => navigate('/products')}>More Products</button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
