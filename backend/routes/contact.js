const router = require('express').Router();
const Contact = require('../models/Contact');

// Create - Submit contact form
router.post('/submit', async (req, res) => {
    console.log('Received contact form submission:', req.body);
    try {
        const { name, email, subject, message } = req.body;
        const newContact = new Contact({ name, email, subject, message });
        const savedContact = await newContact.save();
        res.status(201).json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.',
            contact: savedContact
        });
    } catch (error) {
        console.error('Error in contact submission:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
            error: error.message
        });
    }
});

// Read - Get all contact submissions
router.get('/all', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submissions',
            error: error.message
        });
    }
});

// Read - Get single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contact',
            error: error.message
        });
    }
});

// Update - Update a contact
router.put('/:id', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, subject, message },
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            contact: updatedContact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating contact',
            error: error.message
        });
    }
});

// Delete - Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting contact',
            error: error.message
        });
    }
});

module.exports = router; 