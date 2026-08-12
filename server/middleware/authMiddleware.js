const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);
    console.log("JWT SECRET:", process.env.JWT_SECRET);

    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded User:", decoded);

    // Store user details in request
    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};

module.exports = authMiddleware;