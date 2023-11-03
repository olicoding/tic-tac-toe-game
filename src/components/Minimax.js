import { useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";

function Minimax() {
  const { player, aiMode, board, setBoard, winner, calculateWinner } =
    useContext(Context);
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

        for (let index = 0; index < newBoard.length; index++) {
          if (!newBoard[index]) {
            newBoard[index] = computerPlayer;
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
              newBoard[index] = computerPlayer;
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
          newBoard[randomIndex] = computerPlayer;
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
