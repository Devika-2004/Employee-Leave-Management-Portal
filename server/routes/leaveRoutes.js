const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
// Apply Leave
router.post("/apply", authMiddleware, applyLeave);

// Get Logged-in Employee Leaves
router.get("/my", authMiddleware, getMyLeaves);

// Get All Leaves (HR)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("HR"),
  getAllLeaves
);
// Update Leave Status
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("HR"),
  updateLeaveStatus
);

module.exports = router;