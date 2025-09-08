import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import Footer from '../Components/Footer';
import '../App.css';

const Products = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, title: 'Coconut Oil', image: '/images/oil.jpg', price: 3000 },
    { id: 2, title: 'Coconut Milk', image: '/images/milk.jpg', price: 1500 },
    { id: 3, title: 'Coconut Water', image: '/images/water.jpg', price: 900 },
    { id: 4, title: 'Coconut Cream', image: '/images/cream.jpg', price: 2000 },
    { id: 5, title: 'Coconut Sugar', image: '/images/sugar.jpg', price: 1200 },
    { id: 6, title: 'Coconut Flour', image: '/images/flour.jpg', price: 1000 },
    { id: 7, title: 'Coconut Chips', image: '/images/chips.jpg', price: 800 },
    { id: 8, title: 'Coconut Butter', image: '/images/butter.jpg', price: 1800 },
    { id: 9, title: 'Coconut Fiber', image: '/images/fiber.jpg', price: 700 },
  ];

  const handleViewDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div>
      <section className="product-section">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            onViewDetails={() => handleViewDetails(product.id)}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Products;