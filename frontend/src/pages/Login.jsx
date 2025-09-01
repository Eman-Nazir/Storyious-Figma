


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/users/login",
//         formData,
//         { withCredentials: true }
//       );
//       toast.success(res.data.message);
//       navigate("/");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[90vh] px-4 bg-[var(--bg-section)]">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
//         {/* Title */}
//         <h2 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-6">
//           Welcome Back
//         </h2>

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
//           />
//           <button
//             type="submit"
//             className="w-full bg-[var(--primary-color)] hover:bg-opacity-90 text-white py-3 rounded-lg font-semibold shadow-md transition"
//           >
//             Sign In
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-center mt-5 text-gray-600">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-[var(--primary-color)] font-semibold hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/userSchemas";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        data,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 bg-[var(--bg-section)]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-6">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
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

          <button
            type="submit"
            className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[var(--primary-color)] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
