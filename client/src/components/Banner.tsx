const Banner = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '120px',
        background:
          'linear-gradient(135deg, rgba(64,223,255,1) 0%, rgba(0,21,199,0.8) 35%, rgba(255,0,228,0.9) 70%, rgba(154,0,255,0.7) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      {/* Animated gradient overlay for extra visual interest */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      <div
        style={{
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          zIndex: 2,
          position: 'relative',
        }}
      >
        🚀 Welcome to Your JavaScript Playground
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Banner;
