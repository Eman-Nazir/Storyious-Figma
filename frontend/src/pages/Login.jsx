


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import writer1 from "../../src/assets/images/writer1.jpg";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/api/users/login", formData, { withCredentials: true });
//       toast.success(res.data.message);
//       navigate("/"); 
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--bg-section)] px-4">
//       <div className="flex flex-col lg:flex-row items-center max-w-5xl w-full bg-white shadow-lg rounded-xl overflow-hidden">
//         <div className="hidden lg:block w-1/2 h-full">
//           <img src={writer1} alt="Welcome Back" className="h-[300px] w-[450px] my-auto mx-8 object-cover rounded-md" />
//         </div>
//         <div className="w-full lg:w-1/2 p-8 lg:p-12">
//           <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-4">Welcome Back</h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//             <button type="submit" className="w-full bg-[var(--primary-color)] text-white py-2 rounded">Sign In</button>
//           </form>
//           <p className="text-sm text-center mt-4 text-[var(--text-muted)]">
//             Don’t have an account? <Link to="/signup" className="text-[var(--primary-color)] font-semibold hover:underline">Sign up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        formData,
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
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[var(--primary-color)] hover:bg-opacity-90 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Don’t have an account?{" "}
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
