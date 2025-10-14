import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosUser from "../api/axiosUser";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosUser.post("/signup", form, {
        withCredentials: true,
      });

      if (res.status === 201 || res.status === 200) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-10 w-[420px] space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-100 py-2 rounded-md border border-red-200">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center bg-green-100 py-2 rounded-md border border-green-200">
            {success}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg">
          Sign Up
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>

        <p className="text-center text-gray-400 text-xs mt-4">
          © {new Date().getFullYear()} Smart Learning Platform
        </p>
      </form>
    </div>
  );
};

export default Signup;
