



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role, 
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-section)] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-[var(--primary-color)] mb-1">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-5">
          Join Storious and start your journey
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg "
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg "
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg "
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg "
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg "
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="author">Author</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[var(--primary-color)] hover:bg-opacity-90 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--primary-color)] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
