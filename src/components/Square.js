import { useContext } from "react";
import { Context } from "../context/ContextProvider";

function Square(props) {
  const { gameState, handleUserMove } = useContext(Context);
  const { squareNum } = props;

  const isWinningSquare = gameState.winningLine.includes(squareNum);

  const getShadowClass = () => {
    try {
      if (!isWinningSquare) return "";

      if (gameState.aiMode) {
        return gameState.winner === gameState.playerInAIMode
          ? "player-wins"
          : "ai-wins";
      } else {
        return "player-wins";
      }
    } catch (error) {
      console.error("Error in Square getShadowClass:", error.message);
      return "";
    }
  };

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

  const squareClass = `square ${getShadowClass()}`;

  return (
    <button className={squareClass} onClick={handleClick}>
      {gameState.board[squareNum]}
    </button>
  );
}

export default Square;
