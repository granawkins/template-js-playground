import { useState, useEffect } from 'react';
import { generate } from 'sudoku-core';

type Board = (number | null)[];
type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';

const Sudoku = () => {
  const [board, setBoard] = useState<Board>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const generateNewPuzzle = (newDifficulty: Difficulty) => {
    const newBoard = generate(newDifficulty);
    setBoard(newBoard);
    setDifficulty(newDifficulty);
  };

  useEffect(() => {
    generateNewPuzzle('easy');
  }, []);

  const renderCell = (value: number | null, index: number) => {
    const row = Math.floor(index / 9);
    const col = index % 9;

    // Add borders to separate 3x3 boxes
    const baseBorder = '1px solid #ccc';
    const borderRight = col === 2 || col === 5 ? '2px solid #333' : baseBorder;
    const borderBottom = row === 2 || row === 5 ? '2px solid #333' : baseBorder;

    return (
      <div
        key={index}
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: baseBorder,
          borderLeft: baseBorder,
          borderRight,
          borderBottom,
          backgroundColor: value ? '#f9f9f9' : '#fff',
          fontSize: '18px',
          fontWeight: value ? 'bold' : 'normal',
          color: value ? '#333' : '#999',
        }}
      >
        {value || ''}
      </div>
    );
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h2>Sudoku Puzzle</h2>

      <div style={{ margin: '20px 0' }}>
        <label htmlFor="difficulty" style={{ marginRight: '10px' }}>
          Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => generateNewPuzzle(e.target.value as Difficulty)}
          style={{
            padding: '5px 10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Expert</option>
          <option value="master">Master</option>
        </select>

        <button
          onClick={() => generateNewPuzzle(difficulty)}
          style={{
            padding: '5px 15px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #007bff',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          New Puzzle
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 40px)',
          gridTemplateRows: 'repeat(9, 40px)',
          gap: '0',
          justifyContent: 'center',
          border: '2px solid #333',
          backgroundColor: '#fff',
        }}
      >
        {board.map((value, index) => renderCell(value, index))}
      </div>

      <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Current difficulty: <strong>{difficulty}</strong>
      </p>
    </div>
  );
};

export default Sudoku;
