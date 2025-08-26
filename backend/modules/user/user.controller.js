import User from "./user.model.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { generateToken } from "../../utils/token.js"; 


// SIGNUP
export const signup = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long");
  }

  if (await User.findOne({ email })) {
    throw new ApiError(400, "Email already exists");
  }

  if (await User.findOne({ username })) {
    throw new ApiError(400, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  await newUser.save();

  res.status(201).json(
    new ApiResponse(201, { username, email, role: newUser.role }, "User created successfully")
  );
});




// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  // Use token utility
  const token = generateToken({ id: user._id, username: user.username, role: user.role });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json(
    new ApiResponse(200, {
      email: user.email,
      username: user.username,
      role: user.role,
    }, "Login successful")
  );
});

// LOGOUT
export const logout = asyncHandler(async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

