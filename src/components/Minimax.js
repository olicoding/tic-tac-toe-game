import { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

function Minimax() {
  const { player, aiMode, board, setBoard, winner } = useContext(Context);
  const computerPlayer = player === "X" ? "O" : "X";

  const getBestMove = (newBoard, currentPlayer) => {
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

    if (player === "X") {
      const maxScore = Math.max(...moves.map((move) => move.score));
      return maxScore;
    } else {
      const minScore = Math.min(...moves.map((move) => move.score));
      return minScore;
    }
  };

  const makeComputerMove = () => {
    if (aiMode && !winner) {
      const emptySquares = board.filter((cell) => cell === null);

      if (emptySquares.length % 2 === 0 && !winner) {
        const newBoard = [...board];
        const moves = [];

        newBoard.forEach((cell, index) => {
          if (!cell) {
            const child = [...newBoard];
            child[index] = computerPlayer;
            const score = -getBestMove(child, player);
            moves.push({ move: index, score });
          }
        });

        if (moves.length === 0) return;

        const bestMove = moves.reduce(
          (best, move) => {
            if (move.score > best.score) return move;
            return best;
          },
          { move: null, score: -Infinity }
        );

        if (bestMove.move !== null) {
          newBoard[bestMove.move] = computerPlayer;

          setBoard(newBoard);
        }
      }
    }
  };

  useEffect(() => {
    if (!winner) {
      makeComputerMove();
    }
  }, [board]);

  return null;
}

export default Minimax;
