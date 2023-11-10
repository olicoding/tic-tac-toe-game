import { createContext, useEffect, useState } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerInFriendsMode, setPlayerInFriendsMode] = useState(null);
  const [playerInAIMode, setPlayerInAIMode] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [aiMode, setAIMode] = useState(false);
  const [winner, setWinner] = useState(null);

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
      if (!board[squareNum] && !winner) {
        const newBoard = [...board];
        newBoard[squareNum] = playerInAIMode || playerInFriendsMode;

        const newWinner = calculateWinner(newBoard);
        if (newWinner) {
          setWinner(newWinner);
          setBoard(newBoard);
        } else {
          setBoard(newBoard);
        }

        if (aiMode) {
          const nextTurn = currentTurn === "X" ? "O" : "X";
          setCurrentTurn(nextTurn);
        } else if (playerInFriendsMode) {
          setPlayerInFriendsMode(playerInFriendsMode === "X" ? "O" : "X");
        }
      }
    } catch (error) {
      console.error("Error in handleUserMove:", error);
    }
  };

  useEffect(() => {
    const newWinner = calculateWinner(board);
    if (newWinner) setWinner(newWinner);
  }, [board, playerInAIMode, currentTurn]);

  return (
    <Context.Provider
      value={{
        playerInAIMode,
        setPlayerInAIMode,
        board,
        setBoard,
        playerInFriendsMode,
        setPlayerInFriendsMode,
        aiMode,
        setAIMode,
        currentTurn,
        setCurrentTurn,
        winner,
        setWinner,
        handleUserMove,
        calculateWinner,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
