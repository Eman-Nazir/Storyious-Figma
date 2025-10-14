import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/userSchemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/users/signup",
        { ...data, role: "user" },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-section)] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-[var(--primary-color)] mb-1">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 mb-5">
          Join Storyious and start your journey
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full border px-4 py-3 rounded-lg bg-white"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="w-full border px-4 py-3 rounded-lg bg-white"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password must be at least 8 characters"
            {...register("password")}
            className="w-full border  bg-white px-4 py-3 rounded-lg"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full border px-4 py-3 bg-white rounded-lg"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold shadow-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
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



