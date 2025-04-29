import Hero from './Hero';
import Features from './Features';
import CallToAction from './CallToAction';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-900 antialiased">
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Landing;