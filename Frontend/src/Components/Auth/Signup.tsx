// Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://dinerbackend.vercel.app/signup', formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#E63946] text-white p-3 rounded-lg hover:bg-[#d12836] transition-colors"
        >
          Sign Up
        </button>
      </form>
    </motion.div>
  );
};

export default Signup;