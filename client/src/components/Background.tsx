import { useEffect, useState } from 'react';
import { BuffaloCloud, GrassTuft } from './BuffaloIcons';

const Background = () => {
  const [clouds, setClouds] = useState<
    { id: number; x: number; y: number; size: number; speed: number }[]
  >([]);

  // Generate clouds on mount
  useEffect(() => {
    const newClouds = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 30 + 5,
      size: Math.random() * 40 + 60,
      speed: Math.random() * 0.02 + 0.01,
    }));
    setClouds(newClouds);

    // Animate clouds
    const interval = setInterval(() => {
      setClouds((prevClouds) =>
        prevClouds.map((cloud) => ({
          ...cloud,
          x: ((cloud.x + cloud.speed) % 120) - 20,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const splashStyles = {
    position: 'absolute' as const,
    borderRadius: '50%',
    filter: 'blur(80px)',
  };

  // Buffalo-themed colors
  const lightBrown = 'rgba(209,167,109,0.6)';
  const darkBrown = 'rgba(139,69,19,0.3)';
  const lightGreen = 'rgba(138,198,64,0.5)';
  const darkGreen = 'rgba(56,142,60,0.3)';
  const lightBlue = 'rgba(144,202,249,0.5)';
  const darkBlue = 'rgba(2,119,189,0.2)';
  const lightYellow = 'rgba(255,213,79,0.5)';
  const darkYellow = 'rgba(245,124,0,0.3)';

  const gradient = (light: string, dark: string) =>
    `radial-gradient(circle, ${light} 0%, ${dark} 100%)`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        opacity: 0.7,
        pointerEvents: 'none',
        background: 'linear-gradient(180deg, #87CEEB 0%, #FFF8E1 100%)',
      }}
    >
      {/* Moving clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          style={{
            position: 'absolute',
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            transform: 'translateX(-50%)',
            opacity: 0.8,
            transition: 'left 0.05s linear',
          }}
        >
          <BuffaloCloud size={cloud.size} color="#FFFFFF" />
        </div>
      ))}

      {/* Ground with grass */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25%',
          background:
            'linear-gradient(180deg, rgba(138,198,64,0) 0%, rgba(138,198,64,0.4) 100%)',
        }}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              bottom: '2%',
              left: `${index * 7}%`,
              transform: `scale(${0.7 + Math.random() * 0.6})`,
              opacity: 0.8,
            }}
          >
            <GrassTuft size={30} color="#4CAF50" />
          </div>
        ))}
      </div>

      {/* Color splashes for the buffalo theme */}
      <div
        style={{
          ...splashStyles,
          width: '450px',
          height: '450px',
          background: gradient(lightBrown, darkBrown),
          top: '30%',
          left: '20%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '350px',
          height: '350px',
          background: gradient(lightGreen, darkGreen),
          top: '50%',
          right: '15%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '400px',
          height: '400px',
          background: gradient(lightBlue, darkBlue),
          bottom: '15%',
          left: '30%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '300px',
          height: '300px',
          background: gradient(lightYellow, darkYellow),
          top: '20%',
          right: '25%',
        }}
      />
    </div>
  );
};

export default Background;
