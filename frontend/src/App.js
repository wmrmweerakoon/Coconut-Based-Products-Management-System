import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import BecomeSupplier from "./pages/BecomeSupplier";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AllDeliveries from "./pages/AllDeliveries";
import Delivery from "./pages/DeliveryForm";
import UpdateDeliveryDetails from "./pages/UpdateDeliveryDetails";
import DeleteDeliveries from "./pages/DeleteDeliveries"; // Import the DeleteDeliveries component
import UpdateDeliveryStatus from "./pages/UpdateDeliveryStatus";
import CustomerDeliveryStatus from "./pages/CustomerDeliveryStatus";
import CheckDeliveryStatus from './pages/CheckDeliveryStatus';//for customers to give their email to check the status
import CRUDDeliveries from "./pages/CRUDDeliveries"; // Import the CRUD page
import { CartProvider } from "./pages/CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/become-supplier" element={<BecomeSupplier />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/deliveryForm" element={<Delivery />} />
          <Route path="/all-deliveries" element={<AllDeliveries />} />
          <Route path="/update-delivery/:id" element={<UpdateDeliveryDetails />} />
          <Route path="/delete-deliveries" element={<DeleteDeliveries />} /> 
          <Route path="/crud-deliveries" element={<CRUDDeliveries />} />
          <Route path="/update-delivery-status/:id" element={<UpdateDeliveryStatus />} />
          <Route path="/delivery-status/:email" element={<CustomerDeliveryStatus />} />
          <Route path="/check-delivery-status" element={<CheckDeliveryStatus />} />
          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;