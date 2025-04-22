import { useEffect, useState } from 'react';

const Hero = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mount
    setIsAnimated(true);
  }, []);

  return (
    <div className="hero-container">
      <div className={`hero-content ${isAnimated ? 'animated' : ''}`}>
        <h1 className="hero-title">Discover the Amazing American Bison</h1>
        <p className="hero-subtitle">Majestic creatures of the great plains</p>

        <div className="buffalo-animation-container">
          <div className="buffalo-silhouette"></div>
          <div className="grass"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
