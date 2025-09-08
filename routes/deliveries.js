const router = require("express").Router();
let Delivery = require("../models/delivery.js"); // Ensure this path is correct

// Add delivery details
router.route("/add").post((req, res) => {
  const { name, Email, phoneNumber, Delivery_Address, Postal_Code } = req.body;

  const newDelivery = new Delivery({
    name,
    Email,
    phoneNumber,
    Delivery_Address,
    Postal_Code,
  });

  newDelivery
    .save()
    .then(() => {
      res.json("Details Added");
    })
    .catch((err) => {
      console.error("Error saving delivery:", err); // Add error logging
      res.status(400).json("Error: " + err);
    });
});

// Get all deliveries
router.route("/").get((req, res) => {
  Delivery.find()
    .then((deliveries) => res.json(deliveries))
    .catch((err) => {
      console.error("Error fetching deliveries:", err); // Add error logging
      res.status(500).json("Error fetching deliveries");
    });
});

// Update delivery details
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, Email, phoneNumber, Delivery_Address, Postal_Code } = req.body;

  const updateDelivery = { name, Email, phoneNumber, Delivery_Address, Postal_Code };

  try {
    const update = await Delivery.findByIdAndUpdate(userId, updateDelivery, { new: true });
    res.status(200).send({ status: "User updated", user: update });
  } catch (err) {
    console.error("Error updating delivery:", err); // Add error logging
    res.status(500).send({ status: "Error with updating data" });
  }
});
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;
  try {
    await Delivery.findByIdAndDelete(userId);
    res.status(200).send({ status: "User deleted" });
  } catch (err) {
    console.error("Error deleting delivery:", err);
    res.status(500).send({ status: "Error with delete user", error: err.message });
  }
});


// Get delivery by ID
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  try {
    const user = await Delivery.findById(userId);
    res.status(200).send({ status: "User fetched", user: user });
  } catch (err) {
    console.error("Error fetching delivery by ID:", err); // Add error logging
    res.status(500).send({ status: "Error with fetching user", error: err.message });
  }
});

//update delivery status
router.route("/update-status/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { status } = req.body;

  try {
      const update = await Delivery.findByIdAndUpdate(userId, { status }, { new: true });
      res.status(200).send({ status: "Delivery status updated", delivery: update });
  } catch (err) {
      console.error("Error updating delivery status:", err);
      res.status(500).send({ status: "Error with updating status", error: err.message });
  }
});


router.route("/email/:email").get(async (req, res) => {
    const email = req.params.email;

    try {
        const delivery = await Delivery.findOne({ 
            Email: { $regex: new RegExp('^' + email + '$', 'i') } 
        });
        
        if (!delivery) {
            return res.status(404).send({ status: "Delivery not found" });
        }
        res.status(200).send({ status: "Delivery fetched", delivery });
    } catch (err) {
        console.error("Error fetching delivery by email:", err);
        res.status(500).send({ status: "Error with fetching delivery", error: err.message });
    }
});

module.exports = router;
