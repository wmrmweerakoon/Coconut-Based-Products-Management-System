const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.CONTACT_PORT || 8071; // Using a different port

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/coconutdb")
    .then(() => {
        console.log("MongoDB connection established successfully for Contact Server!");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// Contact Routes
const contactRouter = require("./routes/contact");
app.use("/contact", contactRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
        error: err.message
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Contact Server is running on port: ${PORT}`);
}); 