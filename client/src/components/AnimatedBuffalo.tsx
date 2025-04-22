import { useEffect, useState } from 'react';

interface AnimatedBuffaloProps {
  size: 'small' | 'medium' | 'large';
  delay: number;
}

const AnimatedBuffalo = ({ size, delay }: AnimatedBuffaloProps) => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    // Add delay before starting animation
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setPosition((prev) => {
          // Random small movement to create natural effect
          const newPos = prev + direction * (Math.random() * 0.5 + 0.5);

          // Change direction if reached boundaries
          if (newPos > 20 || newPos < -20) {
            setDirection((d) => -d);
          }

          return newPos;
        });
      }, 100);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay, direction]);

  // Determine size dimensions
  const dimensions = {
    small: { width: 60, height: 40 },
    medium: { width: 90, height: 60 },
    large: { width: 120, height: 80 },
  };

  // Buffalo colors based on size
  const colors = {
    small: '#8B4513', // Brown
    medium: '#654321', // Darker brown
    large: '#5D4037', // Deep brown
  };

  return (
    <div
      className={`animated-buffalo ${size}`}
      style={{
        transform: `translateX(${position}px)`,
        transition: 'transform 0.1s ease-in-out',
      }}
    >
      {/* Buffalo Head */}
      <div
        className="buffalo-head"
        style={{
          width: dimensions[size].width * 0.4,
          height: dimensions[size].height * 0.5,
          backgroundColor: colors[size],
          borderRadius: '50% 50% 50% 50%',
          position: 'relative',
        }}
      >
        {/* Buffalo Eyes */}
        <div
          className="buffalo-eye"
          style={{
            width: dimensions[size].width * 0.08,
            height: dimensions[size].width * 0.08,
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '30%',
            left: '20%',
          }}
        >
          <div
            style={{
              width: '50%',
              height: '50%',
              backgroundColor: 'black',
              borderRadius: '50%',
              position: 'absolute',
              top: '25%',
              left: '25%',
            }}
          />
        </div>
        <div
          className="buffalo-eye"
          style={{
            width: dimensions[size].width * 0.08,
            height: dimensions[size].width * 0.08,
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '30%',
            right: '20%',
          }}
        >
          <div
            style={{
              width: '50%',
              height: '50%',
              backgroundColor: 'black',
              borderRadius: '50%',
              position: 'absolute',
              top: '25%',
              left: '25%',
            }}
          />
        </div>

        {/* Buffalo Horns */}
        <div
          className="buffalo-horn"
          style={{
            width: dimensions[size].width * 0.25,
            height: dimensions[size].height * 0.2,
            backgroundColor: '#4E342E',
            borderRadius: '50% 50% 0 50%',
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            transform: 'rotate(-30deg)',
          }}
        />
        <div
          className="buffalo-horn"
          style={{
            width: dimensions[size].width * 0.25,
            height: dimensions[size].height * 0.2,
            backgroundColor: '#4E342E',
            borderRadius: '50% 50% 50% 0',
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            transform: 'rotate(30deg)',
          }}
        />

        {/* Buffalo Mouth */}
        <div
          className="buffalo-mouth"
          style={{
            width: dimensions[size].width * 0.2,
            height: dimensions[size].height * 0.1,
            backgroundColor: '#5D4037',
            borderRadius: '0 0 50% 50%',
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Buffalo Body */}
      <div
        className="buffalo-body"
        style={{
          width: dimensions[size].width,
          height: dimensions[size].height * 0.6,
          backgroundColor: colors[size],
          borderRadius: '30% 40% 40% 30%',
          marginTop: `-${dimensions[size].height * 0.1}px`,
          position: 'relative',
        }}
      >
        {/* Buffalo Legs */}
        <div
          className="buffalo-leg"
          style={{
            width: dimensions[size].width * 0.1,
            height: dimensions[size].height * 0.4,
            backgroundColor: colors[size],
            borderRadius: '10px',
            position: 'absolute',
            bottom: `-${dimensions[size].height * 0.35}px`,
            left: '20%',
          }}
        />
        <div
          className="buffalo-leg"
          style={{
            width: dimensions[size].width * 0.1,
            height: dimensions[size].height * 0.4,
            backgroundColor: colors[size],
            borderRadius: '10px',
            position: 'absolute',
            bottom: `-${dimensions[size].height * 0.35}px`,
            left: '40%',
          }}
        />
        <div
          className="buffalo-leg"
          style={{
            width: dimensions[size].width * 0.1,
            height: dimensions[size].height * 0.4,
            backgroundColor: colors[size],
            borderRadius: '10px',
            position: 'absolute',
            bottom: `-${dimensions[size].height * 0.35}px`,
            right: '40%',
          }}
        />
        <div
          className="buffalo-leg"
          style={{
            width: dimensions[size].width * 0.1,
            height: dimensions[size].height * 0.4,
            backgroundColor: colors[size],
            borderRadius: '10px',
            position: 'absolute',
            bottom: `-${dimensions[size].height * 0.35}px`,
            right: '20%',
          }}
        />

        {/* Buffalo Tail */}
        <div
          className="buffalo-tail"
          style={{
            width: dimensions[size].width * 0.1,
            height: dimensions[size].height * 0.3,
            backgroundColor: colors[size],
            borderRadius: '5px',
            position: 'absolute',
            bottom: '40%',
            right: '-5%',
            transform: 'rotate(30deg)',
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBuffalo;
