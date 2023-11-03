import { useContext } from "react";
import { Context } from "../context/ContextProvider";

function Square(props) {
  const { player, friendsModePlayer, board, winner, handleUserMove } =
    useContext(Context);

  const { squareNum } = props;

  const handleClick = () => {
    try {
      if ((player || friendsModePlayer) && !board[squareNum] && !winner) {
        handleUserMove(squareNum);
      }
    } catch (_) {
      return;
    }
  };

  return (
    <button className="square" onClick={handleClick}>
      {board[squareNum]}
    </button>
  );
}

export default Square;
