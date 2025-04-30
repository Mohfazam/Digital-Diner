import React from 'react';
import {Hero} from './Hero';
import {Features} from './Features';
import { CallToAction } from './CallToAction';

export const Landing: React.FC = () => {
  // Update document title
  React.useEffect(() => {
    document.title = 'The Digital Diner - Order Online';
    
    // Restore original title when component unmounts
    const defaultTitle = document.querySelector('[data-default]')?.textContent || 'Vite + React + TS';
    return () => {
      document.title = defaultTitle;
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
};

