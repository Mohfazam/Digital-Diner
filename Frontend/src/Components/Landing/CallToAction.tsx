import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-neutral-900 overflow-hidden">
      {/* Animated Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30 opacity-50"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-4 backdrop-blur-lg bg-white/5 rounded-lg border border-white/10 py-2 px-4">
            <span className="text-white/80 text-sm">Get Started Today</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Ready to </span>
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Transform Your Experience?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join our community of food enthusiasts and tech-savvy diners.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="relative overflow-hidden bg-accent text-white font-medium py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 hover:bg-accent-dark group w-full sm:w-auto">
              Start Your Journey
              <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </button>
            
            <button className="bg-white/10 backdrop-blur-sm text-white font-medium py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 hover:bg-white/20 border border-white/20 w-full sm:w-auto">
              View Sample Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;