import { createContext, useEffect, useState } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [friendsModePlayer, setFriendsModePlayer] = useState(null);
  const [aiMode, setAIMode] = useState(false);
  const [player, setPlayer] = useState(null);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
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
  };

  const handleUserMove = (squareNum) => {
    if (!board[squareNum] && !winner) {
      const newBoard = [...board];
      newBoard[squareNum] = player || friendsModePlayer;

      const newWinner = calculateWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
        setBoard(newBoard);
      } else {
        setBoard(newBoard);
      }

      if (friendsModePlayer)
        setFriendsModePlayer(friendsModePlayer === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    const newWinner = calculateWinner(board);
    if (newWinner) setWinner(newWinner);
  }, [board, winner]);

  return (
    <Context.Provider
      value={{
        player,
        setPlayer,
        board,
        setBoard,
        friendsModePlayer,
        setFriendsModePlayer,
        aiMode,
        setAIMode,
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
