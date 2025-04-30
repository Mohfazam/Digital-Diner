import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-24 bg-[#2B2D42] text-white">
      <div className="container mx-auto px-6 sm:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Ready to Taste the Future of Dining?
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 mb-10 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Join hundreds of satisfied customers today.
          </motion.p>
          
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <motion.button 
              className="px-8 py-3 bg-[#E63946] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#d12836] transition-colors shadow-lg w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
            
            <div className="mt-6 text-gray-300 flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Already have an account? Sign In
              </motion.a>
              
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                Explore the Menu <ArrowRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="mt-20 border-t border-gray-700 pt-8 text-center">
          <div className="text-sm text-gray-400">
            <p>© 2025 The Digital Diner. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
