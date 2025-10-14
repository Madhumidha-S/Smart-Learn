const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  let token = req.cookies?.token;
  
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isTeacher = (req, res, next) => {
  if (req.user.role_id === 2) next();
  else res.status(403).json({ message: "Access denied" });
};

module.exports = { authMiddleware, isTeacher };
