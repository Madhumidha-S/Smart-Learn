import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosUser from "../api/axiosUser";

const Login = () => {
  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);

      const { data } = await axiosUser.get("/profile", {
        withCredentials: true,
      });

      const user = data.user;
      setUser(user);

      switch (user.role_id) {
        case 1:
          navigate("/admin");
          break;
        case 2:
          navigate("/teacher");
          break;
        case 3:
          navigate("/student");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-10 w-[400px] space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Smart Learn
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-100 py-2 rounded-md border border-red-200">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              onChange={handleChange}
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
            />
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg">
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>

        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Smart Learning Platform
        </p>
      </form>
    </div>
  );
};

export default Login;
