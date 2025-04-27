const Background = () => {
  const tealBlue = '#008080'; // Classic Windows 95 teal
  const navyBlue = '#000080'; // Classic Windows 95 navy
  const gridSize = 20; // Size of grid pattern

  // Create grid pattern
  const createGridPattern = () => {
    const gridElements = [];
    const cols = Math.ceil(window.innerWidth / gridSize);
    const rows = Math.ceil(window.innerHeight / gridSize);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Only render a portion of the grid cells for performance
        if ((i + j) % 3 === 0) {
          gridElements.push(
            <div
              key={`${i}-${j}`}
              style={{
                position: 'absolute',
                width: `${gridSize - 2}px`,
                height: `${gridSize - 2}px`,
                top: `${i * gridSize}px`,
                left: `${j * gridSize}px`,
                backgroundColor: (i + j) % 2 === 0 ? navyBlue : tealBlue,
                opacity: 0.05,
              }}
            />
          );
        }
      }
    }
    return gridElements;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#008080', // Classic Windows 95 teal background
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Diagonal pattern overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 20px)',
          backgroundSize: '30px 30px',
          opacity: 0.05,
        }}
      />

      {/* Grid overlay */}
      {createGridPattern()}
    </div>
  );
};

export default Background;
