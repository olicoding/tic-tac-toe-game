import { useContext } from "react";
import { Context } from "../context/ContextProvider";

function Square(props) {
  const { gameState, handleUserMove } = useContext(Context);
  const { squareNum } = props;

  const handleClick = () => {
    try {
      if (
        (gameState.playerInAIMode || gameState.playerInFriendsMode) &&
        !gameState.board[squareNum] &&
        !gameState.winner
      ) {
        handleUserMove(squareNum);
      }
    } catch (error) {
      console.error("Error in Square handleClick:", error.message);
    }
  };

  return (
    <button className="square" onClick={handleClick}>
      {gameState.board[squareNum]}
    </button>
  );
}

export default Square;
