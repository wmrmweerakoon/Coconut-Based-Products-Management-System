import React from 'react';

const ProductCard = ({ id, title, image, price, onViewDetails }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-price">LKR {price}</p>
      <button className="view-details-btn" onClick={onViewDetails}>
        View Details
      </button>
    </div>
  );
};

export default ProductCard;