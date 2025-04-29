import React from 'react';
import { Smartphone, Clock, ClipboardList } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Smartphone className="text-accent w-8 h-8" />,
      title: "Smart Ordering",
      description: "Intuitive interface with real-time menu updates and instant customization."
    },
    {
      icon: <Clock className="text-accent w-8 h-8" />,
      title: "Live Tracking",
      description: "Follow your order's journey from kitchen to pickup counter."
    },
    {
      icon: <ClipboardList className="text-accent w-8 h-8" />,
      title: "Order History",
      description: "Re-order favorites and track your dining patterns."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4 backdrop-blur-lg bg-white/5 rounded-lg border border-white/10 py-2 px-4">
            <span className="text-white/80 text-sm">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Redefining </span>
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Modern Dining
            </span>
          </h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Experience seamless integration of technology and gastronomy.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 lg:p-8 transition-all hover:border-accent/30 hover:shadow-[0_0_40px_-12px_rgba(230,57,70,0.3)]"
            >
              <div className="bg-accent/10 w-fit p-3 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;