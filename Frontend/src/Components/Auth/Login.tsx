import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, Loader } from 'lucide-react';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://dinerbackend.vercel.app/login', credentials);
      
      // Store authentication data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      
      // Set admin flag if admin user
      if (response.data.role === 'admin') {
        localStorage.setItem('admin', 'true');
      }

      // Redirect to menu page
      navigate('/menu');
      
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-20"
    >
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center">
          <Lock className="w-12 h-12 text-amber-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Please sign in to continue</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-600 text-white py-3.5 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default Login;