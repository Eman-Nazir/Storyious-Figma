
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/userSchemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {

     const res =  await axios.post("http://localhost:8000/api/users/signup", {
  username, email, password, role: "user" 
}, { withCredentials: true });

      toast.success(res.data.message);
      navigate("/login"); 
    } catch (err) {
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

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full border px-4 py-3 rounded-lg"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            className="w-full border px-4 py-3 rounded-lg"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border px-4 py-3 rounded-lg"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full border px-4 py-3 rounded-lg"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

          <button
            type="submit"
            className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--primary-color)] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
