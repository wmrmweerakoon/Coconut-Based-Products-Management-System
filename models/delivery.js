const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    Delivery_Address: {
        type: String,
        required: true,
    },
    Postal_Code: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Out for Delivery', 'Delivered'],
        default: 'Pending'
    }
});

const Delivery = mongoose.model("Delivery", deliverySchema);
module.exports = Delivery;