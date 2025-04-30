// AuthModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Mail, Phone, Loader } from 'lucide-react';
import axios from 'axios';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = isLoginView 
        ? 'https://dinerbackend.vercel.app/login' 
        : 'https://dinerbackend.vercel.app/signup';

      const data = isLoginView 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(url, data);

      localStorage.setItem('Login', 'true');
      localStorage.setItem('userPhone', response.data.phoneNumber);
      onClose();
      if(onLoginSuccess) onLoginSuccess();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Authentication failed. Please try again.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-8 text-center relative">
              <div className="absolute inset-0 bg-noise opacity-10" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block bg-amber-100/20 p-4 rounded-2xl backdrop-blur-sm mb-6"
              >
                <Lock className="w-8 h-8 text-amber-100" />
              </motion.div>
              <h3 className="text-2xl font-bold text-amber-50 mb-2">
                {isLoginView ? 'Welcome Back!' : 'Join Us!'}
              </h3>
              <p className="text-amber-100/80 text-sm">
                {isLoginView 
                  ? 'Sign in to continue your culinary journey'
                  : 'Create an account to get started'}
              </p>
            </div>

            <div className="p-6">
              <div className="flex justify-center gap-2 mb-8">
                <button
                  onClick={() => setIsLoginView(true)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    isLoginView 
                      ? 'bg-amber-100 text-amber-700 shadow-inner' 
                      : 'text-gray-500 hover:bg-amber-50'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLoginView(false)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    !isLoginView 
                      ? 'bg-amber-100 text-amber-700 shadow-inner' 
                      : 'text-gray-500 hover:bg-amber-50'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleAuthAction} className="space-y-4">
                {!isLoginView && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50/50 transition-all"
                      required
                    />
                  </motion.div>
                )}

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50/50 transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50/50 transition-all"
                    required
                  />
                </div>

                {!isLoginView && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50/50 transition-all"
                      required
                    />
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-br from-amber-600 to-amber-700 text-white py-3.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    isLoginView ? 'Sign In' : 'Create Account'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;