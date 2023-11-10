import { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

function Minimax() {
  const { gameState, setGameState, calculateWinner } = useContext(Context);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const aiPlayer = gameState.playerInAIMode === "X" ? "O" : "X";

  const evaluateBoard = (newBoard) => {
    try {
      const winner = calculateWinner(newBoard);
      if (winner === aiPlayer) return 10;
      if (winner === gameState.playerInAIMode) return -10;
      return 0;
    } catch (error) {
      console.error("Error in evaluateBoard:", error.message);
      return 0;
    }
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    try {
      let score = evaluateBoard(newBoard);

      if (score === 10) return score - depth;
      if (score === -10) return score + depth;
      if (newBoard.every((cell) => cell !== null)) return 0;

      if (isMaximizing) {
        let bestVal = -Infinity;
        newBoard.forEach((cell, index) => {
          if (cell === null) {
            newBoard[index] = aiPlayer;
            bestVal = Math.max(bestVal, minimax(newBoard, depth + 1, false));
            newBoard[index] = null;
          }
        });
        return bestVal;
      } else {
        let bestVal = Infinity;
        newBoard.forEach((cell, index) => {
          if (cell === null) {
            newBoard[index] = gameState.playerInAIMode;
            bestVal = Math.min(bestVal, minimax(newBoard, depth + 1, true));
            newBoard[index] = null;
          }
        });
        return bestVal;
      }
    } catch (error) {
      console.error("Error in minimax:", error.message);
      return isMaximizing ? -Infinity : Infinity;
    }
  };

  const getBestMove = (newBoard) => {
    try {
      let bestVal = -Infinity;
      let bestMoves = [];

      newBoard.forEach((cell, index) => {
        if (cell === null) {
          newBoard[index] = aiPlayer;
          let moveVal = minimax(newBoard, 0, false);
          newBoard[index] = null;
          if (moveVal > bestVal) {
            bestVal = moveVal;
            bestMoves = [index];
          } else if (moveVal === bestVal) {
            bestMoves.push(index);
          }
        }
      });
      return bestMoves[Math.floor(Math.random() * bestMoves.length)];
    } catch (error) {
      console.error("Error in getBestMove:", error.message);
      return null;
    }
  };

  const makeAiMove = async () => {
    try {
      if (
        gameState.aiMode &&
        !gameState.winner &&
        gameState.currentTurn === aiPlayer
      ) {
        await delay(500);
        const bestMove = getBestMove(gameState.board);
        if (bestMove !== -1) {
          const newBoard = [...gameState.board];
          newBoard[bestMove] = aiPlayer;
          setGameState((prevState) => ({
            ...prevState,
            board: newBoard,
            currentTurn: gameState.playerInAIMode,
          }));
        }
      }
    } catch (error) {
      console.error("Error in makeAiMove:", error.message);
    }
  };

  useEffect(() => {
    if (
      gameState.aiMode &&
      !gameState.winner &&
      !gameState.draw &&
      gameState.currentTurn === aiPlayer
    ) {
      makeAiMove();
    }
  }, [gameState.currentTurn]);

  return null;
}

export default Minimax;
