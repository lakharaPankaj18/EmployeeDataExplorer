import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import icons from the react-icons library
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "test" && password === "123456") {
      navigation("/list");
    } else {
      setError("Invalid username or password");
      setUsername("");
      setPassword("");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    // Main container with gradient background
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Login Card */}
      <div className="w-full max-w-sm p-8 space-y-6 bg-white/20 backdrop-blur-sm rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-white/80 mt-2">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <FaUser className="text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 bg-white/30 text-white placeholder-white/70 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
              <FaLock className="text-white/50" />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/30 text-white placeholder-white/70 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-yellow-300 font-medium">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-lg hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:-translate-y-0.5 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
