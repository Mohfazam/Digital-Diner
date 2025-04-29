import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-900">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-accent/30 via-primary/20 to-accent/30 opacity-50"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Glassmorphism Badge */}
          <div className="inline-block mb-4 backdrop-blur-lg bg-white/5 rounded-lg border border-white/10 py-2 px-4">
            <span className="text-white/80 text-sm">Welcome to the future of dining</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white block">Experience</span>
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent mt-2">
              Digital Dining
            </span>
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
            Where culinary excellence meets technological innovation. Order seamlessly, dine extraordinarily.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="relative overflow-hidden bg-accent text-white font-medium py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 hover:bg-accent-dark group">
              Start Your Journey
              <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            </button>
            
            <button className="bg-white/10 backdrop-blur-sm text-white font-medium py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 hover:bg-white/20 border border-white/20">
              Explore Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;