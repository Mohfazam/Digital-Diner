// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dinerbackend.vercel.app/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/menu');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#2B2D42] text-white p-3 rounded-lg hover:bg-[#1a1b27] transition-colors"
        >
          Login
        </button>
      </form>
    </motion.div>
  );
};

export default Login;