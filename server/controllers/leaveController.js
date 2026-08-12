const Leave = require("../models/Leave");

// ===================================
// Apply Leave
// ===================================
const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Get Employee ID from JWT Token
    const employeeId = req.user.id;

    // Validation
    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Date Validation
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        message: "Start date cannot be after end date",
      });
    }

    // Create Leave
    const leave = new Leave({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await leave.save();

    res.status(201).json({
      message: "Leave Applied Successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===================================
// Get My Leaves
// ===================================
const getMyLeaves = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const leaves = await Leave.find({ employeeId }).sort({
      createdAt: -1,
    });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===================================
// Get All Leaves (HR)
// ===================================
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===================================
// Update Leave Status (HR)
// ===================================
const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    res.status(200).json({
      message: "Leave status updated successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
};