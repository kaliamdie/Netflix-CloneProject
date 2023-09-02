const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
// const keysecret = "ldsjjvbhkdfhbxmvcnkshckjhes";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      // No token provided, return 403 Forbidden
      return res.status(403).json({ status: 403, message: "Forbidden, no token provided." });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const rootUser = await userdb.findOne({ _id: verifyToken._id });

    if (!rootUser) {
      throw new Error("User not found.");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(403).json({ status: 403, message: "Forbidden, invalid token." });
  }
};

module.exports = authenticate;
