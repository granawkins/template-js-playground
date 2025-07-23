import { useState, useEffect } from 'react';
import * as sudoku from 'sudoku-core';

const Sudoku: React.FC = () => {
  const [puzzle, setPuzzle] = useState<(number | null)[]>([]);
  const [userSolution, setUserSolution] = useState<(number | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const generateNewPuzzle = () => {
    const newPuzzle = sudoku.generate('easy');
    setPuzzle(newPuzzle);
    setUserSolution([...newPuzzle]);
    setIsComplete(false);
  };

  useEffect(() => {
    generateNewPuzzle();
  }, []);

  const handleCellChange = (index: number, value: string) => {
    const numValue = value === '' ? null : parseInt(value);
    if (
      numValue !== null &&
      (!Number.isInteger(numValue) || numValue < 1 || numValue > 9)
    )
      return;

    const newSolution = [...userSolution];
    newSolution[index] = numValue;
    setUserSolution(newSolution);
    setIsComplete(false); // Reset completion status when user makes changes

    // Check if puzzle is complete
    if (newSolution.every((cell) => cell !== null)) {
      const solveResult = sudoku.solve([...newSolution]);
      if (
        solveResult.solved &&
        JSON.stringify(solveResult.board) === JSON.stringify(newSolution)
      ) {
        setIsComplete(true);
      }
    }
  };

  const getCellValue = (index: number): string => {
    const value = userSolution[index];
    return value === null || value === undefined ? '' : value.toString();
  };

  const isCellReadOnly = (index: number): boolean => {
    return puzzle[index] !== null && puzzle[index] !== undefined;
  };

  const solvePuzzle = () => {
    const solveResult = sudoku.solve([...userSolution]);
    if (solveResult.solved && solveResult.board) {
      setUserSolution(solveResult.board);
      setIsComplete(true);
    }
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 40px)',
    gridTemplateRows: 'repeat(9, 40px)',
    gap: '1px',
    border: '2px solid #333',
    backgroundColor: '#333',
    margin: '20px auto',
    width: 'fit-content',
  };

  const cellStyle = (index: number): React.CSSProperties => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const isReadOnly = isCellReadOnly(index);

    return {
      width: '40px',
      height: '40px',
      border: 'none',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      backgroundColor: isReadOnly ? '#f0f0f0' : '#fff',
      color: isReadOnly ? '#666' : '#000',
      borderRight:
        col % 3 === 2 && col !== 8 ? '2px solid #333' : '1px solid #ddd',
      borderBottom:
        row % 3 === 2 && row !== 8 ? '2px solid #333' : '1px solid #ddd',
    };
  };

  const buttonStyle: React.CSSProperties = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h2>Sudoku Puzzle</h2>
      {isComplete && (
        <div style={{ color: 'green', fontSize: '18px', margin: '10px' }}>
          🎉 Congratulations! Puzzle solved! 🎉
        </div>
      )}
      <div style={gridStyle}>
        {Array.from({ length: 81 }, (_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={getCellValue(index)}
            onChange={(e) => handleCellChange(index, e.target.value)}
            readOnly={isCellReadOnly(index)}
            style={cellStyle(index)}
          />
        ))}
      </div>
      <div>
        <button style={buttonStyle} onClick={generateNewPuzzle}>
          New Puzzle
        </button>
        <button style={buttonStyle} onClick={solvePuzzle}>
          Solve
        </button>
      </div>
    </div>
  );
};

export default Sudoku;
