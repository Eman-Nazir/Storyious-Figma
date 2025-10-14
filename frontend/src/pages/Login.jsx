import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/userSchemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(" Login attempt:", { email: data.email });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/users/login`,
        {
          email: data.email.trim(),
          password: data.password,
        },
        {
          withCredentials: true,
           // allows cookies
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(" Login success:", res.data);
      toast.success(res.data.message || "Login successful!");

      const userData = res.data.user || {
        id: res.data.id,
        username: res.data.username,
        role: res.data.role,
        email: data.email,
      };

      login(userData);

      const userRole = userData.role || res.data.user?.role;
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(" Login error:", err);

      const status = err.response?.status;
      const message = err.response?.data?.message || "Login failed";

      if (status === 400) {
        toast.error("Invalid email or password");
      } else if (status === 401) {
        toast.error("Unauthorized – please check credentials");
      } else {
        toast.error(message);
      }

      if (err.response?.data?.field) {
        setError(err.response.data.field, {
          type: "server",
          message,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 bg-[var(--bg-section)]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-6">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[var(--primary-color)] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;