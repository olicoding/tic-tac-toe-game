import { createContext, useEffect, useState } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  const [isGameReady, setIsGameReady] = useState(false);
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    winner: null,
    draw: false,
    playerInFriendsMode: null,
    playerInAIMode: null,
    currentTurn: null,
    aiMode: null,
    level: null,
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

  const handleLevelChange = (difficulty) => {
    setGameState((prevState) => ({
      ...prevState,
      level: difficulty,
      board: Array(9).fill(null),
      winner: null,
      draw: false,
    }));
    if (gameState.aiMode) {
      setIsGameReady(true);
    }
  };

  const handleGameMode = (mode) => {
    try {
      handleReset();
      setIsGameReady(false);
      setGameState((prevState) => ({
        ...prevState,
        aiMode: mode,
        level: null,
        currentTurn: null,
        playerInAIMode: null,
        playerInFriendsMode: null,
      }));
    } catch (error) {
      console.error("Error in handleGameMode:", error.message);
    }
  };

  const handlePlayerSelection = (selectedPlayer) => {
    try {
      handleReset();
      setGameState((prevState) => ({
        ...prevState,
        currentTurn: selectedPlayer,
        playerInAIMode: prevState.aiMode ? selectedPlayer : null,
        playerInFriendsMode: !prevState.aiMode ? selectedPlayer : null,
      }));

      if ((gameState.aiMode && gameState.level) || !gameState.aiMode) {
        setIsGameReady(true);
      } else {
        setIsGameReady(false);
      }
    } catch (error) {
      console.error("Error in handlePlayerSelection:", error.message);
    }
  };

  const handleReset = () => {
    try {
      setGameState((prevState) => ({
        ...prevState,
        board: Array(9).fill(null),
        winner: null,
        draw: false,
      }));
    } catch (error) {
      console.error("Error in handleReset:", error.message);
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
        isGameReady,
        setIsGameReady,
        gameState,
        setGameState,
        handleGameMode,
        handleUserMove,
        calculateWinner,
        handleLevelChange,
        handlePlayerSelection,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
