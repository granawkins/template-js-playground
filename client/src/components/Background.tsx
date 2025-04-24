import { useEffect, useState } from 'react';

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Vibrant color palette
  const colors = {
    magenta: 'rgba(255, 0, 144, 0.85)',
    cyan: 'rgba(0, 240, 255, 0.75)',
    yellow: 'rgba(255, 220, 0, 0.8)',
    purple: 'rgba(190, 0, 255, 0.7)',
    green: 'rgba(0, 255, 100, 0.75)',
    orange: 'rgba(255, 100, 0, 0.8)',
    blue: 'rgba(0, 80, 255, 0.7)',
    pink: 'rgba(255, 100, 180, 0.75)',
  };

  // Base styles for all animated elements
  const baseShape = {
    position: 'absolute' as const,
    pointerEvents: 'none' as const,
    transition: 'transform 0.5s ease-out',
  };

  // Create gradient functions
  const gradient = (color1: string, color2: string, type = 'radial') => {
    return type === 'radial'
      ? `radial-gradient(circle, ${color1} 0%, ${color2} 80%, transparent 100%)`
      : `linear-gradient(to right, ${color1}, ${color2})`;
  };

  // Calculate subtle movement based on mouse position
  const getTransform = (factor = 1, reverse = false) => {
    const maxMove = 20 * factor;
    const xPercent = mousePosition.x / window.innerWidth;
    const yPercent = mousePosition.y / window.innerHeight;
    const xMove = (xPercent - 0.5) * maxMove * (reverse ? -1 : 1);
    const yMove = (yPercent - 0.5) * maxMove * (reverse ? -1 : 1);

    return `translate(${xMove}px, ${yMove}px)`;
  };

  return (
    <div
      className="background-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        opacity: 0.8,
      }}
    >
      {/* Animated gradient background */}
      <div
        className="gradient-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(45deg, ${colors.purple}10, ${colors.cyan}15, ${colors.magenta}10)`,
          opacity: 0.4,
        }}
      />

      {/* Large shape 1 - Animated blob */}
      <div
        className="animated-blob blob-1"
        style={{
          ...baseShape,
          width: '600px',
          height: '600px',
          borderRadius: '76% 24% 63% 37% / 42% 68% 32% 58%',
          background: gradient(colors.magenta, colors.purple),
          filter: 'blur(80px)',
          top: '5%',
          left: '15%',
          animation: 'morphBlob1 20s infinite alternate',
          transform: getTransform(0.5),
        }}
      />

      {/* Large shape 2 - Animated blob */}
      <div
        className="animated-blob blob-2"
        style={{
          ...baseShape,
          width: '550px',
          height: '550px',
          borderRadius: '37% 63% 36% 64% / 72% 28% 67% 33%',
          background: gradient(colors.cyan, colors.blue),
          filter: 'blur(70px)',
          bottom: '5%',
          right: '10%',
          animation: 'morphBlob2 25s infinite alternate',
          transform: getTransform(0.7, true),
        }}
      />

      {/* Medium shape 1 */}
      <div
        className="animated-blob blob-3"
        style={{
          ...baseShape,
          width: '400px',
          height: '400px',
          borderRadius: '64% 36% 43% 57% / 31% 65% 35% 69%',
          background: gradient(colors.yellow, colors.orange),
          filter: 'blur(60px)',
          top: '30%',
          right: '20%',
          animation: 'morphBlob3 15s infinite alternate',
          transform: getTransform(0.4),
        }}
      />

      {/* Medium shape 2 */}
      <div
        className="animated-blob blob-4"
        style={{
          ...baseShape,
          width: '450px',
          height: '450px',
          borderRadius: '53% 47% 59% 41% / 44% 35% 65% 56%',
          background: gradient(colors.green, colors.cyan),
          filter: 'blur(70px)',
          bottom: '15%',
          left: '25%',
          animation: 'morphBlob4 18s infinite alternate',
          transform: getTransform(0.6, true),
        }}
      />

      {/* Small accent shapes */}
      <div
        className="accent-shape shape-1"
        style={{
          ...baseShape,
          width: '200px',
          height: '200px',
          borderRadius: '30% 70% 40% 60% / 60% 30% 70% 40%',
          background: gradient(colors.pink, colors.purple),
          filter: 'blur(40px)',
          top: '15%',
          right: '35%',
          animation: 'floatUpDown 8s ease-in-out infinite',
          transform: getTransform(1.2),
        }}
      />

      <div
        className="accent-shape shape-2"
        style={{
          ...baseShape,
          width: '150px',
          height: '150px',
          borderRadius: '60% 40% 30% 70% / 60% 40% 30% 70%',
          background: gradient(colors.orange, colors.yellow),
          filter: 'blur(30px)',
          bottom: '25%',
          right: '45%',
          animation: 'floatUpDown 7s ease-in-out infinite reverse',
          transform: getTransform(1.5, true),
        }}
      />

      {/* Floating particles */}
      <div
        className="particles-group"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.7,
        }}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className={`particle particle-${index}`}
            style={{
              ...baseShape,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              borderRadius: '50%',
              background:
                Object.values(colors)[index % Object.values(colors).length],
              filter: 'blur(1px)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 10 + 15}s linear infinite`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;
