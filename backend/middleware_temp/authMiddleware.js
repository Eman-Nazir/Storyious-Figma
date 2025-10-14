import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "No token, unauthorized" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid or expired token" 
    });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ 
      success: false,
      message: "Access denied" 
    });
  }
  next();
};