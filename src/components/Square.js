import { useContext } from "react";
import { Context } from "../context/ContextProvider";

function Square(props) {
  const { player, setPlayer, board, setBoard, winner, setWinner } =
    useContext(Context);

  const { squareNum, calculateWinner } = props;

  const handleClick = () => {
    if (board[squareNum] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[squareNum] = player;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  return (
    <button className="square" onClick={handleClick}>
      {board[squareNum]}
    </button>
  );
}

export default Square;
