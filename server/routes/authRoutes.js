const express = require("express");
const router = express.Router();

const {
  registerEmployee,
  loginEmployee,
  getEmployeeCount,
} = require("../controllers/authController");

router.post("/register", registerEmployee);

router.post("/login", loginEmployee);

// Total Employees Count
router.get("/count", getEmployeeCount);

module.exports = router;