const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    customerName: { type: String, required: true },
    email: { type: String , required: true},
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback",feedbackSchema);

module.exports = Feedback;