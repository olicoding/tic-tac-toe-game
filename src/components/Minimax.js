import { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

function Minimax() {
  const {
    playerInAIMode,
    currentTurn,
    setCurrentTurn,
    aiMode,
    board,
    setBoard,
    winner,
    calculateWinner,
  } = useContext(Context);

  const aiPlayer = playerInAIMode === "X" ? "O" : "X";

  const evaluateBoard = (newBoard) => {
    const winner = calculateWinner(newBoard);
    if (winner === aiPlayer) return 10;
    if (winner === playerInAIMode) return -10;
    return 0;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
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
          newBoard[index] = playerInAIMode;
          bestVal = Math.min(bestVal, minimax(newBoard, depth + 1, true));
          newBoard[index] = null;
        }
      });
      return bestVal;
    }
  };

  const getBestMove = (newBoard) => {
    let bestVal = -Infinity;
    let bestMove = -1;
    newBoard.forEach((cell, index) => {
      if (cell === null) {
        newBoard[index] = aiPlayer;
        let moveVal = minimax(newBoard, 0, false);
        newBoard[index] = null;
        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = index;
        }
      }
    });
    return bestMove;
  };

  const makeAiMove = () => {
    if (aiMode && !winner && currentTurn === aiPlayer) {
      const bestMove = getBestMove(board);
      if (bestMove !== -1) {
        const newBoard = [...board];
        newBoard[bestMove] = aiPlayer;
        setBoard(newBoard);
        setCurrentTurn(playerInAIMode);
      }
    }
  };

  useEffect(() => {
    if (aiMode && !winner && currentTurn === aiPlayer) {
      const timer = setTimeout(() => {
        makeAiMove();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [board, aiMode, winner, currentTurn]);

  return null;
}

export default Minimax;
