const Background = () => {
  const splashStyles = {
    position: 'absolute' as const,
    borderRadius: '50%',
    filter: 'blur(80px)',
  };

  // Earthy color palette
  const lightBrown = 'rgba(210,180,140,0.8)'; // Tan
  const darkBrown = 'rgba(139,69,19,0.6)'; // Saddle brown
  const lightGreen = 'rgba(107,142,35,0.7)'; // Olive drab
  const darkGreen = 'rgba(85,107,47,0.6)'; // Dark olive green
  const lightBeige = 'rgba(245,222,179,0.8)'; // Wheat
  const darkBeige = 'rgba(210,180,140,0.6)'; // Tan (darker)
  const lightSienna = 'rgba(160,82,45,0.7)'; // Sienna
  const darkSienna = 'rgba(139,69,19,0.5)'; // Saddle brown (darker)
  const lightSage = 'rgba(143,188,143,0.6)'; // Dark sea green
  const darkSage = 'rgba(85,107,47,0.4)'; // Dark olive green (darker)

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
        opacity: 0.3,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          ...splashStyles,
          width: '450px',
          height: '450px',
          background: gradient(lightBrown, darkBrown),
          top: '10%',
          left: '20%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '350px',
          height: '350px',
          background: gradient(lightGreen, darkGreen),
          top: '40%',
          right: '15%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '400px',
          height: '400px',
          background: gradient(lightBeige, darkBeige),
          bottom: '5%',
          left: '30%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '300px',
          height: '300px',
          background: gradient(lightSienna, darkSienna),
          top: '20%',
          right: '25%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '380px',
          height: '380px',
          background: gradient(lightSage, darkSage),
          bottom: '15%',
          left: '10%',
        }}
      />
    </div>
  );
};

export default Background;
