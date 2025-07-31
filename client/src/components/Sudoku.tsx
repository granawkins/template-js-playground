import React, { useState, useEffect } from 'react';
import { generate, solve, hint } from 'sudoku-core';

type Board = (number | null)[];
type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';

interface SudokuProps {
  difficulty?: Difficulty;
}

const Sudoku: React.FC<SudokuProps> = ({ difficulty = 'easy' }) => {
  const [board, setBoard] = useState<Board>(Array(81).fill(null));
  const [originalBoard, setOriginalBoard] = useState<Board>(
    Array(81).fill(null)
  );
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  useEffect(() => {
    const newBoard = generate(difficulty);
    setBoard([...newBoard]);
    setOriginalBoard([...newBoard]);
    setSelectedCell(null);
  }, [difficulty]);

  const generateNewPuzzle = () => {
    const newBoard = generate(difficulty);
    setBoard([...newBoard]);
    setOriginalBoard([...newBoard]);
    setSelectedCell(null);
  };

  const handleCellClick = (index: number) => {
    if (originalBoard[index] === null) {
      setSelectedCell(index);
    }
  };

  const handleNumberInput = (number: number) => {
    if (selectedCell !== null && originalBoard[selectedCell] === null) {
      const newBoard = [...board];
      newBoard[selectedCell] = number;
      setBoard(newBoard);
    }
  };

  const clearCell = () => {
    if (selectedCell !== null && originalBoard[selectedCell] === null) {
      const newBoard = [...board];
      newBoard[selectedCell] = null;
      setBoard(newBoard);
    }
  };

  const getHint = () => {
    const hintResult = hint(board);
    if (hintResult.board && hintResult.steps && hintResult.steps.length > 0) {
      setBoard([...hintResult.board]);
    }
  };

  const solvePuzzle = () => {
    const solvedResult = solve(board);
    if (solvedResult.board) {
      setBoard([...solvedResult.board]);
      setOriginalBoard([...solvedResult.board]);
    }
  };

  const getCellStyle = (index: number) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const isSelected = selectedCell === index;
    const isOriginal = originalBoard[index] !== null;

    let isInSameBox = false;
    if (selectedCell !== null) {
      const selectedRow = Math.floor(selectedCell / 9);
      const selectedCol = selectedCell % 9;
      isInSameBox =
        Math.floor(selectedRow / 3) === Math.floor(row / 3) &&
        Math.floor(selectedCol / 3) === Math.floor(col / 3);
    }

    const isInSameRowOrCol =
      selectedCell !== null &&
      (Math.floor(selectedCell / 9) === row || selectedCell % 9 === col);

    return {
      width: '40px',
      height: '40px',
      border: '1px solid #333',
      borderRight: col % 3 === 2 ? '3px solid #333' : '1px solid #333',
      borderBottom: row % 3 === 2 ? '3px solid #333' : '1px solid #333',
      borderTop: row === 0 ? '3px solid #333' : '1px solid #333',
      borderLeft: col === 0 ? '3px solid #333' : '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      fontWeight: isOriginal ? 'bold' : 'normal',
      backgroundColor: isSelected
        ? '#e3f2fd'
        : isInSameBox || isInSameRowOrCol
          ? '#f5f5f5'
          : 'white',
      color: isOriginal ? '#000' : '#666',
      cursor: isOriginal ? 'default' : 'pointer',
      userSelect: 'none',
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <h3>
          Sudoku - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </h3>
        <button onClick={generateNewPuzzle} style={{ padding: '5px 10px' }}>
          New Game
        </button>
        <button onClick={getHint} style={{ padding: '5px 10px' }}>
          Hint
        </button>
        <button onClick={solvePuzzle} style={{ padding: '5px 10px' }}>
          Solve
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 40px)',
          gridTemplateRows: 'repeat(9, 40px)',
          gap: '0',
          border: '3px solid #333',
        }}
      >
        {board.map((value, index) => (
          <div
            key={index}
            style={getCellStyle(index)}
            onClick={() => handleCellClick(index)}
          >
            {value || ''}
          </div>
        ))}
      </div>

      {selectedCell !== null && originalBoard[selectedCell] === null && (
        <div
          style={{
            display: 'flex',
            gap: '5px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              style={{
                width: '35px',
                height: '35px',
                fontSize: '16px',
                border: '1px solid #333',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              {num}
            </button>
          ))}
          <button
            onClick={clearCell}
            style={{
              width: '35px',
              height: '35px',
              fontSize: '12px',
              border: '1px solid #333',
              backgroundColor: '#f44336',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Sudoku;
