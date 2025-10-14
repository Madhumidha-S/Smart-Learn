require("dotenv").config();
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const Role = require("../models/roles");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let roleData = await Role.findByName(role);
    if (!roleData) {
      return res
        .status(400)
        .json({ message: "Invalid role (admin, teacher, student)" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role_id: roleData.id,
    });

    const token = generateToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(201).json({
      message: "User registered",
      user: { id: newUser.id, email: newUser.email, role: role },
    });
  } catch (err) {
    next(err);
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Get role name for response
    const roleData = await Role.findById(user.role_id);

    const token = generateToken(user);

    // Set token cookie (consistent naming)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Return user data for frontend
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        role: roleData ? roleData.name : "unknown",
      },
    });
  } catch (err) {
    next(err);
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
