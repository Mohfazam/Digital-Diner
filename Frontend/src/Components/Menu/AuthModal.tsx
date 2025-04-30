import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const handleSignUp = () => {
    localStorage.setItem('Login', 'true');
    localStorage.setItem('userPhone', '1234567890');
    onClose();
  };

  const handleLogin = () => {
    localStorage.setItem('Login', 'true');
    localStorage.setItem('userPhone', '1234567890');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white p-8 rounded-xl max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-amber-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Sign In Required
        </h3>
        
        <p className="text-gray-600 mb-6">
          Please sign in or create an account to place your order.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSignUp}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Create Account
          </button>
          
          <button
            onClick={handleLogin}
            className="border border-amber-600 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors font-medium"
          >
            Sign In
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal