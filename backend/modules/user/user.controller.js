import bcrypt from "bcryptjs";
import User from "./user.model.js";
import { generateToken } from "../../utils/token.js";
import {
  validateSignup,
  validateLogin,
} from "../../utils/validation.js";

const emailPattern = (email) =>
  new RegExp(
    "^" + email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$",
    "i"
  );

const publicUser = (user) => ({
  id: user._id || user.id,
  username: user.username,
  email: user.email,
  role: user.role,
});

const handleAuthError = (res, error, fallback) => {
  if (error.statusCode === 400) {
    return res.status(400).json({
      message: error.message,
      ...(error.field ? { field: error.field } : {}),
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Email or username already exists",
    });
  }

  return res.status(500).json({
    message: fallback,
  });
};

export const initializeAdmin = async () => {
  try {
    await User.ensureAdminExists();
  } catch (error) {
    console.error(
      "Failed to ensure admin user:",
      error.message
    );
  }
};

export const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = validateSignup(req.body);

    if (
      await User.findOne({
        email: emailPattern(email),
      })
    ) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message: "User created successfully",
      user: publicUser(user),
    });
  } catch (error) {
    return handleAuthError(
      res,
      error,
      "Server error during signup"
    );
  }
};

export const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = validateLogin(req.body);

    // Support existing accounts stored with mixed-case emails.
    let user = await User.findOne({
      email: req.body.email.trim(),
    });

    if (!user) {
      const matches = await User.find({
        email: emailPattern(email),
      }).limit(2);

      user = matches.length === 1 ? matches[0] : null;
    }

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
      username: user.username,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      user: publicUser(user),
    });
  } catch (error) {
    return handleAuthError(
      res,
      error,
      "Server error during login"
    );
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    return res.json({
      user: publicUser(req.user),
    });
  } catch {
    return res.status(500).json({
      message: "Error fetching current user",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  });

  return res.json({
    message: "Logged out successfully",
  });
};

export const dashboard = (req, res) => {
  return res.json({
    message: "Welcome to Admin Dashboard",
    user: req.user,
  });
};