const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    dob: { 
        type: Date, 
        required: [true, 'Date of birth is required'] 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Gender is required'] 
    },
    expectedRole: { 
        type: String,
        enum: ['Admin', 'Manager', 'Supplier', 'Delivery_person', 'Customer'],
        required: [true, 'Role is required'] 
    },
    mobile: { 
        type: String,
        required: [true, 'Mobile number is required']
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// JWT Token Method
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        dob: Joi.date().required().label("Date of Birth"),
        gender: Joi.string().valid("Male", "Female", "Other").required().label("Gender"),
        expectedRole: Joi.string().valid("Admin", "Manager", "Supplier", "Delivery_person", "Customer").required().label("Role"),
        mobile: Joi.string().required().label("Mobile Number")
    });
    return schema.validate(data);
};

module.exports = { User, validate };
