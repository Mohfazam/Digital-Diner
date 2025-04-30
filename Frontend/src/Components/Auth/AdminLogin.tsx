// AdminLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '',
  });
  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.email === 'Admin@Eatoes' && credentials.password === 'Eatoes@123') {
      localStorage.setItem('admin', 'true');
      toast.success('Admin login successful!');
      navigate('/menu');
    } else {
      toast.error('Invalid admin credentials');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-20"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
      
      <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-700">
          Use these credentials for evaluation:
          <br />
          <strong>Email:</strong> Admin@Eatoes
          <br />
          <strong>Password:</strong> Eatoes@123
        </p>
      </div>

      <form onSubmit={handleAdminLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Login as Admin
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AdminLogin;