import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaHandshake, FaTruck, FaGlobe, FaAward, FaRecycle } from 'react-icons/fa';
import cocofarm from '../assets/images/cocofarm.jpg';
import '../App.css';

function AboutUs() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="about-us-container">
            {/* Hero Section */}
            <motion.section 
                className="about-hero position-relative py-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    position: 'relative',
                    minHeight: '80vh',
                    background: '#f8f9fa',
                    overflow: 'hidden'
                }}
            >
                <div className="row g-0 h-100">
                    {/* Left Content Side */}
                    <div className="col-lg-6 d-flex align-items-center" 
                        style={{
                            background: 'linear-gradient(135deg, #1a5f7a 0%, #086288 100%)',
                            padding: '4rem',
                            minHeight: '80vh'
                        }}>
                        <div className="py-5">
                            <motion.h1 
                                className="display-3 fw-bold mb-4"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{ 
                                    color: '#ffffff',
                                    letterSpacing: '1px',
                                    lineHeight: '1.2'
                                }}
                            >
                                Welcome to <br/>
                                <span style={{ color: '#9ee2ff' }}>CocoHub</span>
                            </motion.h1>
                            <motion.p 
                                className="lead fs-4 mb-5"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{ 
                                    color: '#e0f4ff',
                                    fontWeight: 400,
                                    maxWidth: '600px'
                                }}
                            >
                                Your Premier Destination for Premium Coconut-Based Products
                            </motion.p>
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="d-flex gap-3"
                            >
                                <button 
                                    className="btn btn-lg px-4 py-3 fw-semibold" 
                                    style={{ 
                                        backgroundColor: '#9ee2ff',
                                        color: '#086288',
                                        fontSize: '1.1rem',
                                        borderRadius: '8px',
                                        minWidth: '160px'
                                    }}
                                >
                                    Learn More
                                </button>
                                <button 
                                    className="btn btn-lg px-4 py-3 fw-semibold" 
                                    style={{ 
                                        borderColor: '#9ee2ff',
                                        borderWidth: '2px',
                                        color: '#9ee2ff',
                                        fontSize: '1.1rem',
                                        borderRadius: '8px',
                                        minWidth: '160px'
                                    }}
                                >
                                    Contact Us
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Image Side */}
                    <div className="col-lg-6 position-relative">
                        <motion.div
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: `url(${cocofarm})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(45deg, rgba(26, 95, 122, 0.2), rgba(8, 98, 136, 0.1))'
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.section>
            
            <div className="container my-5">
                {/* Who We Are */}
                <motion.section 
                    className="mb-5 p-4 bg-white rounded-3 shadow-sm"
                    {...fadeIn}
                >
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className="display-6 mb-4" style={{ color: '#5d4037' }}>Who We Are</h2>
                            <p className="lead" style={{ color: '#795548' }}>
                                CocoHub is more than just a marketplace - we're a community dedicated to 
                                revolutionizing the coconut industry through sustainable practices and 
                                innovation.
                            </p>
                            <p className="mb-4" style={{ color: '#8d6e63' }}>
                                Our platform connects conscious consumers with ethical coconut farmers, 
                                ensuring fair trade practices while delivering premium quality products 
                                to your doorstep.
                            </p>
                            <div className="d-flex gap-3">
                                <div className="d-flex align-items-center">
                                    <FaAward style={{ color: '#795548' }} className="me-2" size={24} />
                                    <span style={{ color: '#795548' }}>Premium Quality</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <FaRecycle style={{ color: '#795548' }} className="me-2" size={24} />
                                    <span style={{ color: '#795548' }}>Sustainable</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <motion.img 
                                src={cocofarm} 
                                alt="Coconut Farm" 
                                className="img-fluid rounded-3 shadow"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </motion.section>

                {/* Our Mission */}
                <motion.section 
                    className="mb-5 p-5 bg-light rounded-3"
                    {...fadeIn}
                    style={{ background: '#f8f9fa' }}
                >
                    <h2 className="display-6 text-primary text-center mb-5">Our Mission</h2>
                    <div className="row g-4">
                        <motion.div 
                            className="col-md-3"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center p-4 bg-white rounded-3 shadow-sm h-100">
                                <FaHandshake className="text-primary mb-3" size={40} />
                                <h5 className="fw-bold text-dark">Empower Farmers</h5>
                                <p className="text-muted">Supporting local communities through fair trade practices</p>
                        </div>
                        </motion.div>
                        <motion.div 
                            className="col-md-3"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center p-4 bg-white rounded-3 shadow-sm h-100">
                                <FaLeaf className="text-primary mb-3" size={40} />
                                <h5 className="fw-bold text-dark">Eco-Friendly</h5>
                                <p className="text-muted">Promoting sustainable and organic farming methods</p>
                        </div>
                        </motion.div>
                        <motion.div 
                            className="col-md-3"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center p-4 bg-white rounded-3 shadow-sm h-100">
                                <FaTruck className="text-primary mb-3" size={40} />
                                <h5 className="fw-bold text-dark">Quality Delivery</h5>
                                <p className="text-muted">Ensuring fresh and timely product delivery</p>
                        </div>
                        </motion.div>
                        <motion.div 
                            className="col-md-3"
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center p-4 bg-white rounded-3 shadow-sm h-100">
                                <FaGlobe className="text-primary mb-3" size={40} />
                                <h5 className="fw-bold text-dark">Global Impact</h5>
                                <p className="text-muted">Creating a sustainable global coconut ecosystem</p>
                        </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Product Categories */}
                <motion.section 
                    className="mb-5"
                    {...fadeIn}
                >
                    <h2 className="display-6 text-primary text-center mb-5">Our Products</h2>
                    <div className="row g-4">
                        <motion.div 
                            className="col-md-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary mb-3">🥥 Food & Beverages</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">• Premium Coconut Oil</li>
                                        <li className="mb-2">• Organic Coconut Milk</li>
                                        <li className="mb-2">• Coconut Flour</li>
                                        <li className="mb-2">• Coconut Sugar</li>
                                        <li className="mb-2">• Coconut Water</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="col-md-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary mb-3">🧴 Beauty & Care</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">• Coconut Hair Oil</li>
                                        <li className="mb-2">• Coconut Soap</li>
                                        <li className="mb-2">• Body Lotion</li>
                                        <li className="mb-2">• Face Scrub</li>
                                        <li className="mb-2">• Lip Balm</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="col-md-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary mb-3">🏠 Home & Living</h5>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">• Coir Products</li>
                                        <li className="mb-2">• Shell Crafts</li>
                                        <li className="mb-2">• Natural Cleaners</li>
                                        <li className="mb-2">• Eco-friendly Utensils</li>
                                        <li className="mb-2">• Home Decor</li>
                                    </ul>
                            </div>
                        </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Why Choose Us */}
                <motion.section 
                    className="mb-5 p-5 rounded-3"
                    {...fadeIn}
                    style={{ background: 'linear-gradient(135deg, #004d40 0%, #00796b 100%)' }}
                >
                    <h2 className="display-6 text-white text-center mb-5">Why Choose CocoHub?</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="p-4 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                                <h5 className="fw-bold mb-3 text-white">🌟 Premium Quality</h5>
                                <p className="mb-0 text-white">We ensure every product meets the highest quality standards through rigorous testing and verification.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                                <h5 className="fw-bold mb-3 text-white">♻️ Eco-Friendly</h5>
                                <p className="mb-0 text-white">Our commitment to sustainability extends from farming practices to packaging solutions.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                                <h5 className="fw-bold mb-3 text-white">🌍 Global Network</h5>
                                <p className="mb-0 text-white">Connect with verified suppliers and access premium products from around the world.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

export default AboutUs;
