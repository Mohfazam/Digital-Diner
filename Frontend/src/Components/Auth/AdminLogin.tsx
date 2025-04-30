// AdminLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '',
    adminKey: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-backend-url/admin/login', credentials);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Admin authentication failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Portal</h2>
      <form onSubmit={handleAdminLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Admin Email"
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
        <input
          type="password"
          placeholder="Admin Secret Key"
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setCredentials({...credentials, adminKey: e.target.value})}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#2B2D42] text-white p-3 rounded-lg hover:bg-[#1a1b27] transition-colors"
        >
          Admin Login
        </button>
      </form>
    </motion.div>
  );
};

export default AdminLogin;