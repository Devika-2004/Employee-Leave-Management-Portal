const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Employee = require("../models/Employee");


// Register API
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check existing employee
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }


    // Password encryption
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create employee
    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      role
    });


    await newEmployee.save();


    res.status(201).json({
      message: "Employee registered successfully"
    });


  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = router;