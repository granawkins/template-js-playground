const Background = () => {
  // Professional business background with subtle patterns and gradients
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Main gradient background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          opacity: 0.7,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(26, 58, 108, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 58, 108, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.6,
        }}
      />

      {/* Top accent area */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300px',
          background:
            'linear-gradient(180deg, rgba(26, 58, 108, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
          opacity: 0.5,
        }}
      />

      {/* Bottom accent area */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '250px',
          background:
            'linear-gradient(0deg, rgba(26, 58, 108, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
          opacity: 0.6,
        }}
      />

      {/* Abstract curved line elements - top right */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(62, 139, 201, 0.1)',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '8%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(62, 139, 201, 0.1)',
          opacity: 0.5,
        }}
      />

      {/* Abstract curved line elements - bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          border: '1px solid rgba(231, 167, 51, 0.1)',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '13%',
          left: '8%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          border: '1px solid rgba(231, 167, 51, 0.1)',
          opacity: 0.5,
        }}
      />

      {/* Accent diagonal line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, rgba(26, 58, 108, 0.03) 0%, rgba(62, 139, 201, 0.03) 50%, rgba(231, 167, 51, 0.03) 100%)',
        }}
      />
    </div>
  );
};

export default Background;
