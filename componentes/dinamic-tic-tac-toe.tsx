// TicTacToe.tsx
import React, { useState } from 'react';

const rowStyle: React.CSSProperties = {
  display: 'flex'
}

const squareStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'black',
  cursor: 'pointer'
}

const boardStyle: React.CSSProperties = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid'
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}

const instructionsStyle: React.CSSProperties = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
}

const buttonStyle: React.CSSProperties = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
}

// Componente de casilla
function Square(props: { value: string, onClick: () => void }) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={props.onClick}
      role='none'
    >
      {props.value}
    </div>
  );
}

// Componente de tablero
function Board() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (i: number) => {
    if (squares[i] !== "" || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newSquares));
  };

  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  };

  const status = winner ? `Ganador: ${winner}` : `Próximo jugador: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
  };

  const calculateWinner = (squares: string[]): string | null => {
    // Comprobando filas
    for (let i = 0; i < 3; i++) {
      if (squares[i * 3] && squares[i * 3] === squares[i * 3 + 1] && squares[i * 3] === squares[i * 3 + 2]) {
        return squares[i * 3];
      }
    }

    // Comprobando columnas
    for (let i = 0; i < 3; i++) {
      if (squares[i] && squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
        return squares[i];
      }
    }

    // Comprobando diagonales
    if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8]) {
      return squares[0];
    }
    if (squares[2] && squares[2] === squares[4] && squares[2] === squares[6]) {
      return squares[2];
    }

    return null;
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>{status}</div>
      <button style={buttonStyle} onClick={resetGame}>Reiniciar</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row" style={rowStyle}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

const TicTacToe = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default TicTacToe;
