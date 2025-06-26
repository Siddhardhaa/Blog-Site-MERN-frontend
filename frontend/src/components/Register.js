import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { registerUser } from '../reducers/authSlice';
import { useNavigate } from "react-router-dom";
import logo from './images/logo.png';
import LoadingSpinner from './LoadSpinner';
import { motion } from 'framer-motion';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const image = logo;

  const handleImage = () => {
    navigate('/blogs');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 5 || password.length < 8) {
      alert("Username must contain at least 5 characters and password 8");
      return;
    }
    setLoading(true);
    try {
      const response = await dispatch(registerUser({ username, email, password }));
      setUsername('');
      setEmail('');
      setPassword('');
      if (response.meta.requestStatus === 'fulfilled') {
        alert("User Registered Successfully");
        navigate('/login');
      } else {
        alert('Username must be unique!!');
      }
    } catch (err) {
      alert('Registration failed.');
      console.error(err);
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
        animate={{ opacity: 5, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-md px-8 py-10"
      >
        <h2 className="text-center text-4xl font-extrabold text-slate-900 underline underline-offset-4 hover:animate-pulse mb-8">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-800 font-semibold text-lg mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter valid email"
            />
          </div>

          <div>
            <label className="block text-slate-800 font-semibold text-lg mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Min length 5"
            />
          </div>

          <div className="relative">
            <label className="block text-slate-800 font-semibold text-lg mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Min length 8"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-sm justify-center text-blue-500 hover:text-blue-700"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-700 to-sky-900 hover:from-sky-800 hover:to-sky-950 text-white text-lg font-bold py-2 rounded-xl transition duration-300 hover:scale-105 hover:animate-pulse"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
