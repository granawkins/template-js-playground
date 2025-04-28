const Background = () => {
  // Art Deco color palette
  const gold = '#D4AF37';
  const black = '#000000';
  const navy = '#0F2656';
  const teal = '#008080';
  const burgundy = '#800020';

  // Reusable pattern styles
  const patternStyles = {
    position: 'absolute' as const,
    pointerEvents: 'none' as const,
  };

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
        backgroundColor: '#F5F2E9', // Light cream background
        pointerEvents: 'none',
      }}
    >
      {/* Top border pattern */}
      <div
        style={{
          ...patternStyles,
          top: 0,
          left: 0,
          width: '100%',
          height: '50px',
          background: `repeating-linear-gradient(
            90deg, 
            ${gold}, 
            ${gold} 20px, 
            ${black} 20px, 
            ${black} 40px
          )`,
        }}
      />

      {/* Bottom border pattern */}
      <div
        style={{
          ...patternStyles,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50px',
          background: `repeating-linear-gradient(
            90deg, 
            ${gold}, 
            ${gold} 20px, 
            ${black} 20px, 
            ${black} 40px
          )`,
        }}
      />

      {/* Left side fan pattern */}
      <div
        style={{
          ...patternStyles,
          top: '25%',
          left: 0,
          width: '300px',
          height: '300px',
          backgroundImage: `conic-gradient(
            from 0deg at 0% 50%,
            ${gold} 0deg,
            ${gold} 10deg,
            transparent 10deg,
            transparent 20deg,
            ${navy} 20deg,
            ${navy} 30deg,
            transparent 30deg,
            transparent 40deg
          )`,
          opacity: 0.6,
        }}
      />

      {/* Right side fan pattern */}
      <div
        style={{
          ...patternStyles,
          top: '25%',
          right: 0,
          width: '300px',
          height: '300px',
          backgroundImage: `conic-gradient(
            from 180deg at 100% 50%,
            ${gold} 0deg,
            ${gold} 10deg,
            transparent 10deg,
            transparent 20deg,
            ${navy} 20deg,
            ${navy} 30deg,
            transparent 30deg,
            transparent 40deg
          )`,
          opacity: 0.6,
        }}
      />

      {/* Triangular pattern - top */}
      <div
        style={{
          ...patternStyles,
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60px',
          backgroundImage: `linear-gradient(
            -45deg, 
            transparent 25%,
            ${teal} 25%,
            ${teal} 50%,
            transparent 50%,
            transparent 75%,
            ${teal} 75%
          )`,
          backgroundSize: '40px 40px',
          opacity: 0.3,
        }}
      />

      {/* Triangular pattern - bottom */}
      <div
        style={{
          ...patternStyles,
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60px',
          backgroundImage: `linear-gradient(
            45deg, 
            transparent 25%,
            ${burgundy} 25%,
            ${burgundy} 50%,
            transparent 50%,
            transparent 75%,
            ${burgundy} 75%
          )`,
          backgroundSize: '40px 40px',
          opacity: 0.3,
        }}
      />

      {/* Center diamond pattern */}
      <div
        style={{
          ...patternStyles,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          backgroundImage: `repeating-conic-gradient(
            ${gold} 0deg 15deg,
            transparent 15deg 30deg
          )`,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          opacity: 0.15,
        }}
      />
    </div>
  );
};

export default Background;
