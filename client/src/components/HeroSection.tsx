import { useState, useEffect } from 'react';
import AnimatedBuffalo from './AnimatedBuffalo';

const HeroSection = () => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className={`hero-title ${bounce ? 'bounce' : ''}`}>
          Welcome to Buffalo Land!
        </h1>
        <p className="hero-subtitle">
          The fun and playful home of everything buffalo!
        </p>
      </div>
      <div className="buffalo-container">
        <AnimatedBuffalo size="large" delay={0} />
        <AnimatedBuffalo size="medium" delay={0.5} />
        <AnimatedBuffalo size="small" delay={1} />
      </div>
    </div>
  );
};

export default HeroSection;
