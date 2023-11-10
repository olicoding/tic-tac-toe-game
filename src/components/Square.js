import { useContext } from "react";
import { Context } from "../context/ContextProvider";

function Square(props) {
  const { playerInAIMode, playerInFriendsMode, board, winner, handleUserMove } =
    useContext(Context);

  const { squareNum } = props;

  const handleClick = () => {
    try {
      if (
        (playerInAIMode || playerInFriendsMode) &&
        !board[squareNum] &&
        !winner
      ) {
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
