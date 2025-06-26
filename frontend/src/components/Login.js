import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from './images/logo.png';
import LoadingSpinner from './LoadSpinner';
import { motion } from 'framer-motion';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const image = logo;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = () => {
    navigate('/blogs');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
      if (response.meta.requestStatus === 'fulfilled') {
        navigate("/blogs");
      } else {
        setError("Username or password are wrong");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error("Error in Login", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4">
      <img
        src={image}
        className="absolute top-0 left-0 w-20 h-20 m-8 sm:ml-16 rounded-full transition ease-in-out delay-200 hover:animate-bounce"
        alt="logo"
        onClick={handleImage}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-white/30 shadow-lg rounded-3xl w-full max-w-md px-8 py-10"
      >
        <h2 className="text-center text-4xl font-extrabold text-slate-900 underline underline-offset-4 hover:animate-pulse mb-8">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-800 font-semibold text-lg mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-semibold text-lg mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-700 to-sky-900 hover:from-sky-800 hover:to-sky-950 text-white text-lg font-bold py-2 rounded-xl transition duration-300 hover:scale-105 hover:animate-pulse"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-slate-700">
          Not a user?{' '}
          <Link to="/register" className="text-blue-600 underline underline-offset-2 hover:text-blue-800 font-medium">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;