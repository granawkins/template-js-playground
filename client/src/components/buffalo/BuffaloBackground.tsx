// Buffalo-themed background with earthy, natural tones
const BuffaloBackground = () => {
  const splashStyles = {
    position: 'absolute' as const,
    borderRadius: '50%',
    filter: 'blur(80px)',
  };

  // Earthy, natural color palette for buffalo theme
  const lightBrown = 'rgba(210,180,140,0.8)';
  const darkBrown = 'rgba(101,67,33,0.6)';
  const lightGreen = 'rgba(76,154,42,0.5)';
  const darkGreen = 'rgba(27,94,32,0.4)';
  const lightOrange = 'rgba(229,115,15,0.5)';
  const darkOrange = 'rgba(181,71,10,0.4)';
  const lightBeige = 'rgba(245,222,179,0.6)';
  const darkBeige = 'rgba(210,180,140,0.4)';
  const lightSienna = 'rgba(160,82,45,0.6)';
  const darkSienna = 'rgba(89,39,19,0.4)';

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
        opacity: 0.6,
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
          background: gradient(lightOrange, darkOrange),
          bottom: '5%',
          left: '30%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '300px',
          height: '300px',
          background: gradient(lightBeige, darkBeige),
          top: '20%',
          right: '25%',
        }}
      />
      <div
        style={{
          ...splashStyles,
          width: '380px',
          height: '380px',
          background: gradient(lightSienna, darkSienna),
          bottom: '15%',
          left: '10%',
        }}
      />
    </div>
  );
};

export default BuffaloBackground;
