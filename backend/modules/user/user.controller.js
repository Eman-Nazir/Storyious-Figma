import User from "../user/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "All fields required" });
    if (await User.findOne({ email })) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin login
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = generateToken({ id: "admin", role: "admin", username: "Admin" });
      res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.json({ message: "Admin login successful", role: "admin" });
    }

    // User login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id, role: user.role, username: user.username });
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ message: "Login successful", role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

//ADMIN DASHBOARD 
export const dashboard = (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard", user: req.user });
};
