import { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

function Minimax() {
  const { player, aiMode, board, setBoard, winner, calculateWinner } =
    useContext(Context);

  const humanPlayer = player;
  const aiPlayer = humanPlayer === "X" ? "O" : "X";

  const getBestMove = (newBoard, currentPlayer) => {
    try {
      const moves = [];

      newBoard.forEach((cell, index) => {
        if (!cell) {
          const child = [...newBoard];
          child[index] = currentPlayer;
          const score = -getBestMove(child, currentPlayer === "X" ? "O" : "X");
          moves.push({ move: index, score });
        }
      });

      if (moves.length === 0) return 0;

      if (humanPlayer === "X") {
        const maxScore = Math.max(...moves.map((move) => move.score));
        return maxScore;
      } else {
        const minScore = Math.min(...moves.map((move) => move.score));
        return minScore;
      }
    } catch (error) {
      console.error("Error in getBestMove:", error.message);
    }
  };

  const makeAiMove = () => {
    try {
      if (aiMode && !winner) {
        const emptySquares = board.filter((cell) => cell === null);

        if (emptySquares.length % 2 === 0 && !winner) {
          const newBoard = [...board];

          for (let index = 0; index < newBoard.length; index++) {
            if (!newBoard[index]) {
              newBoard[index] = aiPlayer;
              if (calculateWinner(newBoard)) {
                setBoard(newBoard);
                return;
              }
              newBoard[index] = null;
            }
          }

          for (let index = 0; index < newBoard.length; index++) {
            if (!newBoard[index]) {
              newBoard[index] = player;
              if (calculateWinner(newBoard)) {
                newBoard[index] = aiPlayer;
                setBoard(newBoard);
                return;
              }
              newBoard[index] = null;
            }
          }

          const moves = [];
          for (let index = 0; index < newBoard.length; index++) {
            if (!newBoard[index]) {
              moves.push(index);
            }
          }

          if (moves.length > 0) {
            const randomIndex = moves[Math.floor(Math.random() * moves.length)];
            newBoard[randomIndex] = aiPlayer;
            setBoard(newBoard);
          }
        }
      }
    } catch (error) {
      console.error("Error in makeAiMove:", error.message);
    }
  };

  useEffect(() => {
    if (!winner) {
      makeAiMove();
    }
  }, [board]);

  return null;
}

export default Minimax;
