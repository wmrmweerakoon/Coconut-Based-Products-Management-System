import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEnvelope, FaUser, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ManageContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingContact, setEditingContact] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Fetch all contacts
    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8071/contact/all');
            setContacts(response.data.contacts);
            setError(null);
        } catch (error) {
            setError('Error fetching contacts. Please try again later.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Start editing a contact
    const handleEdit = (contact) => {
        setEditingContact(contact._id);
        setFormData({
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message
        });
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingContact(null);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    // Update contact
    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:8071/contact/${id}`, formData);
            setEditingContact(null);
            fetchContacts();
            alert('Contact updated successfully!');
        } catch (error) {
            alert('Error updating contact. Please try again.');
            console.error('Error:', error);
        }
    };

    // Delete contact
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await axios.delete(`http://localhost:8071/contact/${id}`);
                fetchContacts();
                alert('Contact deleted successfully!');
            } catch (error) {
                alert('Error deleting contact. Please try again.');
                console.error('Error:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <FaSpinner className="spinner" size={40} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger m-4" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">Manage Contact Messages</h2>
            <div className="row">
                {contacts.map((contact) => (
                    <motion.div
                        key={contact._id}
                        className="col-md-6 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="card">
                            <div className="card-body">
                                {editingContact === contact._id ? (
                                    // Edit Form
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleUpdate(contact._id);
                                    }}>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Subject</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Message</label>
                                            <textarea
                                                className="form-control"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button type="submit" className="btn btn-primary">
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // Display Contact
                                    <>
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h5 className="card-title d-flex align-items-center gap-2">
                                                    <FaUser className="text-primary" />
                                                    {contact.name}
                                                </h5>
                                                <h6 className="card-subtitle mb-2 text-muted d-flex align-items-center gap-2">
                                                    <FaEnvelope className="text-primary" />
                                                    {contact.email}
                                                </h6>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleEdit(contact)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(contact._id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                        <h6 className="card-subtitle mb-2">Subject: {contact.subject}</h6>
                                        <p className="card-text">{contact.message}</p>
                                        <small className="text-muted">
                                            Received: {new Date(contact.createdAt).toLocaleString()}
                                        </small>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageContacts; 