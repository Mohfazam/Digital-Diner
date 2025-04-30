import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden isolate bg-gray-900">
      {/* Darkened background overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg" 
          alt="Restaurant background"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/60" />
      </div>

      {/* Content container */}
      <div className="container mx-auto px-6 sm:px-8 relative z-10 py-24">
        <motion.div 
          className="text-center max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Title with improved contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display drop-shadow-2xl">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Digital Diner - for Eatoes
              </span>
              <br />
              <span className="text-4xl md:text-5xl font-medium text-gray-100 mt-4 block">
                Delivered to Your Table
              </span>
            </h1>
          </motion.div>

          {/* Subtitle with better readability */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience fine dining reimagined - browse our seasonal menu, craft your perfect meal, and enjoy seamless pickup
          </motion.p>

          {/* Buttons container */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Primary CTA */}
            <motion.button 
              onClick={() => navigate('/Menu')}
              className="px-8 py-4 bg-amber-600 border-2 border-amber-500 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-amber-700 transition-all group shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Utensils size={24} className="text-white" />
              <span className="text-white text-lg">Explore Menu</span>
              <ChevronRight size={20} className="text-amber-200 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Secondary CTAs */}
            <div className="flex gap-4">
              <motion.button 
                onClick={() => navigate('/Signup')}
                className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-all shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">Sign Up</span>
              </motion.button>
              
              <motion.button 
                onClick={() => navigate('/Login')}
                className="px-6 py-3 bg-transparent border-2 border-amber-400 text-amber-100 rounded-xl font-medium flex items-center justify-center gap-2 hover:border-amber-300 hover:text-white transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">Sign In</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-200"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-amber-400 to-transparent" />
        <span className="text-sm font-medium drop-shadow">Scroll to discover</span>
      </motion.div>
    </section>
  );
};