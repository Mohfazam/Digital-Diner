import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, LogIn, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundPosition: 'center 30%'
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>
      
      <div className="container mx-auto px-6 sm:px-8 relative z-10 py-16 md:py-24">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Savor the Flavor, Order Online with Ease
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Browse our curated menu, customize your order, and enjoy quick pickup at The Digital Diner.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
            onClick={() => navigate('/Signup')}
              className="px-8 py-3 bg-[#E63946] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#d12836] transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Utensils size={20} />
              Sign Up
            </motion.button>
            
            <motion.button 
              onClick={() => navigate('/Login')}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn size={20} />
              Sign In
            </motion.button>
            
            <motion.button 
            onClick={() => navigate('/Menu')}
              className="px-8 py-3 bg-white text-[#2B2D42] rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={20} />
              View Menu
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative curve at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }}></div>
    </section>
  );
};

