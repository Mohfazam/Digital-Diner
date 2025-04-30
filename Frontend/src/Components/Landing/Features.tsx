import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Clock, ClipboardList } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="relative overflow-hidden bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all group border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -12, scale: 1.02 }}
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/20 transition-all duration-300 pointer-events-none" />
      
      <div className="relative flex flex-col items-center text-center space-y-6">
        <motion.div 
          className="w-20 h-20 flex items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg group-hover:shadow-xl transition-all"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          {/* @ts-ignore */}
          {React.cloneElement(icon as React.ReactElement, { size: 36 })}
        </motion.div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text">
            {title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Smartphone />,
      title: "Digital Menu & Ordering",
      description: "Explore our interactive menu with high-res visuals and instant ordering",
      delay: 0.2
    },
    {
      icon: <Clock />,
      title: "Real-Time Updates",
      description: "Live order tracking with smart notifications at every preparation stage",
      delay: 0.4
    },
    {
      icon: <ClipboardList />,
      title: "Order History & Favorites",
      description: "Personalized experience with saved preferences and quick reordering",
      delay: 0.6
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-amber-50/30 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      
      <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Revolutionizing Your
            <span className="block bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              Dining Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seamless technology meets culinary excellence for unforgettable moments
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-1/4 left-10 w-48 h-48 bg-amber-200/10 rounded-full blur-3xl -z-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl -z-10"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </section>
  );
};