import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitStatus, setSubmitStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            console.log('Submitting form data:', formData);
            const response = await axios.post('http://localhost:8071/contact/submit', formData);
            console.log('Server response:', response.data);
            
            setSubmitStatus({
                submitted: true,
                success: true,
                message: response.data.message
            });

            // Clear form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            console.error('Error details:', error);
            console.error('Error response:', error.response);
            setSubmitStatus({
                submitted: true,
                success: false,
                message: error.response?.data?.message || 'Something went wrong. Please try again later.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <motion.section 
                className="position-relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    minHeight: '500px',
                    background: '#f8f9fa'
                }}
            >
                {/* Background Design */}
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '70%',
                        height: '100%',
                        background: 'linear-gradient(45deg, #086288 0%, #1a5f7a 100%)',
                        clipPath: 'polygon(100px 0, 100% 0, 100% 100%, 0 100%)',
                        zIndex: 1
                    }}
                />
                
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row align-items-center" style={{ minHeight: '500px' }}>
                        <div className="col-lg-6">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h1 className="display-4 fw-bold mb-4" style={{ color: '#086288' }}>
                                    Let's Start a 
                                    <span className="d-block" style={{ color: '#1a5f7a' }}>Conversation</span>
                                </h1>
                                <p className="lead mb-4" style={{ color: '#666' }}>
                                    Have questions about our products or services? 
                                    We're here to help and answer any question you might have.
                                </p>
                                <motion.div 
                                    className="d-inline-block"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <a 
                                        href="#contact-form" 
                                        className="btn btn-lg px-4 py-3 d-inline-flex align-items-center gap-2"
                                        style={{
                                            backgroundColor: '#086288',
                                            color: 'white',
                                            borderRadius: '30px'
                                        }}
                                    >
                                        Get Started
                                        <FaArrowRight />
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                        <div className="col-lg-6">
                            <motion.div
                                className="p-4 rounded-4 shadow-lg bg-white"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                style={{ transform: 'rotate(2deg)' }}
                            >
                                <div className="d-flex align-items-center gap-4 mb-4">
                                    <div 
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '60px', 
                                            height: '60px',
                                            backgroundColor: '#e8f4f8'
                                        }}
                                    >
                                        <FaPhone className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="h5 mb-1">Call Us</h3>
                                        <p className="mb-0 text-primary">+94 77 123 4567</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-4">
                                    <div 
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '60px', 
                                            height: '60px',
                                            backgroundColor: '#e8f4f8'
                                        }}
                                    >
                                        <FaEnvelope className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="h5 mb-1">Email Us</h3>
                                        <p className="mb-0 text-primary">info@cocohub.com</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                    className="position-absolute"
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#9ee2ff',
                        top: '15%',
                        left: '10%'
                    }}
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="position-absolute"
                    style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#086288',
                        bottom: '20%',
                        right: '15%'
                    }}
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.section>

            <div className="container my-5" id="contact-form">
                <div className="row g-5">
                    {/* Contact Information */}
                    <motion.div 
                        className="col-lg-4"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="h3 mb-4" style={{ color: '#086288' }}>Contact Information</h2>
                        
                        <div className="d-flex align-items-center mb-4">
                            <FaPhone className="text-primary me-3" size={24} />
                            <div>
                                <h3 className="h6 mb-1">Phone</h3>
                                <p className="mb-0">+94 77 123 4567</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <FaEnvelope className="text-primary me-3" size={24} />
                            <div>
                                <h3 className="h6 mb-1">Email</h3>
                                <p className="mb-0">info@cocohub.com</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <FaMapMarkerAlt className="text-primary me-3" size={24} />
                            <div>
                                <h3 className="h6 mb-1">Address</h3>
                                <p className="mb-0">123 Coconut Lane,<br />Colombo 03, Sri Lanka</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <FaClock className="text-primary me-3" size={24} />
                            <div>
                                <h3 className="h6 mb-1">Business Hours</h3>
                                <p className="mb-0">Mon - Fri: 9:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <h3 className="h6 mb-3">Follow Us</h3>
                            <div className="d-flex gap-3">
                                <a href="#" className="text-primary" style={{ fontSize: '24px' }}><FaFacebook /></a>
                                <a href="#" className="text-primary" style={{ fontSize: '24px' }}><FaTwitter /></a>
                                <a href="#" className="text-primary" style={{ fontSize: '24px' }}><FaInstagram /></a>
                                <a href="#" className="text-primary" style={{ fontSize: '24px' }}><FaLinkedin /></a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        className="col-lg-8"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="bg-light p-4 p-md-5 rounded-3">
                            <h2 className="h3 mb-4" style={{ color: '#086288' }}>Send Us a Message</h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Your Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="subject"
                                                name="subject"
                                                placeholder="Subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                placeholder="Your Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                style={{ height: '150px' }}
                                                required
                                            ></textarea>
                                            <label htmlFor="message">Your Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg d-flex align-items-center gap-2"
                                            style={{
                                                backgroundColor: '#086288',
                                                borderColor: '#086288',
                                                padding: '12px 30px'
                                            }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {submitStatus.submitted && (
                                <motion.div 
                                    className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'} mt-4`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {submitStatus.message}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <motion.section 
                className="mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <div className="container-fluid px-0">
                    <div className="bg-light p-4">
                        <h2 className="h3 text-center mb-4" style={{ color: '#086288' }}>Find Us on Map</h2>
                        <div className="ratio ratio-21x9" style={{ maxHeight: '400px' }}>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467128219!2d79.84884331477269!3d6.927076994992611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591614a33361%3A0x8ce6532452dab3dd!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1645488345728!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Contact; 