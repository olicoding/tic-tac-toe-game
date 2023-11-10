import { createContext, useEffect, useState } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    winner: null,
    draw: false,
    playerInFriendsMode: null,
    playerInAIMode: null,
    currentTurn: null,
    aiMode: false,
  });

  const calculateWinner = (squares) => {
    try {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const line of lines) {
        const [a, b, c] = line;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
      }
      return null;
    } catch (error) {
      console.error("Error in calculateWinner:", error.message);
    }
  };

  const handleUserMove = (squareNum) => {
    try {
      if (!gameState.board[squareNum] && !gameState.winner && !gameState.draw) {
        const newBoard = [...gameState.board];
        newBoard[squareNum] = gameState.currentTurn;
        const nextTurn = gameState.currentTurn === "X" ? "O" : "X";
        const newWinner = calculateWinner(newBoard);
        const isDraw = !newWinner && newBoard.every((cell) => cell !== null);

        setGameState({
          ...gameState,
          board: newBoard,
          draw: isDraw,
          winner: newWinner,
          currentTurn: newWinner || isDraw ? gameState.currentTurn : nextTurn,
          playerInFriendsMode:
            !gameState.aiMode && !newWinner
              ? nextTurn
              : gameState.playerInFriendsMode,
        });
      }
    } catch (error) {
      console.error("Error in handleUserMove:", error);
    }
  };

  useEffect(() => {
    if (!gameState.winner && !gameState.draw) {
      const newWinner = calculateWinner(gameState.board);

      if (newWinner && newWinner !== gameState.winner) {
        setGameState((prevState) => ({
          ...prevState,
          winner: newWinner,
        }));
      }
    }
  }, [gameState.board]);

  return (
    <Context.Provider
      value={{
        gameState,
        setGameState,
        handleUserMove,
        calculateWinner,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
