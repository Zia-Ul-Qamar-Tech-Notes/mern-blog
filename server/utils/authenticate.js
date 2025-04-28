import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;

    next();
  });
};

export const generateAccessToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
export const generateRefreshToken = (id) => {
  return jwt.sign(id, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
};

export default authenticate;
