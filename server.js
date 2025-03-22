const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure body-parser is used

// MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connection established successfully!");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

// Routes
const deliveryRouter = require("./routes/deliveries.js");
app.use("/delivery", deliveryRouter); // Mount the delivery router

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on port number: ${PORT}`);
});
