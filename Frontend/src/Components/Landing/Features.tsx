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
      className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -8 }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div 
          className="w-16 h-16 flex items-center justify-center rounded-full bg-[#E63946]/10 text-[#E63946] mb-6 group-hover:bg-[#E63946] group-hover:text-white transition-colors duration-300"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-[#2B2D42] mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Smartphone size={32} />,
      title: "Browse & Order Digitally",
      description: "Explore our menu, add items to your cart, and place orders seamlessly.",
      delay: 0.2
    },
    {
      icon: <Clock size={32} />,
      title: "Real-Time Tracking",
      description: "Get notified when your order is ready for pickup.",
      delay: 0.4
    },
    {
      icon: <ClipboardList size={32} />,
      title: "Track Your Orders",
      description: "Access past orders and reorder favorites with one click.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B2D42] mb-4">Our Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience the convenience of modern dining with our digital solutions.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      </div>
    </section>
  );
};
