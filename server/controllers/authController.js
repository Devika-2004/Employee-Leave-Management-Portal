const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// Register Employee
// =========================
const registerEmployee = async (req, res) => {
  try {
    const { name, department, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !department || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid Email Format",
      });
    }

    // Password Validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Employee
    const employee = new Employee({
      name,
      department,
      email,
      password: hashedPassword,
      role: "Employee", // Always register as Employee
    });

    await employee.save();

    res.status(201).json({
      message: "Employee registered successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        department: employee.department,
        email: employee.email,
        role: employee.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Login Employee
// =========================
const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    // Find Employee
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: employee._id,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        department: employee.department,
        email: employee.email,
        role: employee.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Get Total Employees
// =========================
const getEmployeeCount = async (req, res) => {
  try {

    const totalEmployees = await Employee.countDocuments({
      role: "Employee",
    });

    res.status(200).json({
      totalEmployees,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  registerEmployee,
  loginEmployee,
  getEmployeeCount,
};