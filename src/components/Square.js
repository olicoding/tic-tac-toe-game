import { useRef, useContext, useCallback } from "react";
import { Context } from "../context/ContextProvider";

function Square(props) {
  const { player, setPlayer, board, setBoard, setWinner } = useContext(Context);
  const squareRef = useRef();

  const checkForWin = useCallback(
    (board) => {
      if (
        (board[0] && board[0] === board[1] && board[0] === board[2]) ||
        (board[3] && board[3] === board[4] && board[3] === board[5]) ||
        (board[6] && board[6] === board[7] && board[6] === board[8]) ||
        (board[0] && board[0] === board[3] && board[0] === board[6]) ||
        (board[1] && board[1] === board[4] && board[1] === board[7]) ||
        (board[2] && board[2] === board[5] && board[2] === board[8]) ||
        (board[0] && board[0] === board[4] && board[0] === board[8]) ||
        (board[2] && board[2] === board[4] && board[2] === board[6])
      ) {
        document.querySelector(".status").style.visibility = "hidden";
        document.querySelector(".winner").style.visibility = "visible";

        setWinner(player);

        setPlayer("X");
        setBoard({
          0: "",
          1: "",
          2: "",
          3: "",
          4: "",
          5: "",
          6: "",
          7: "",
          8: "",
        });
      } else if (
        board[0] &&
        board[1] &&
        board[2] &&
        board[3] &&
        board[4] &&
        board[5] &&
        board[6] &&
        board[7] &&
        board[8]
      ) {
        setWinner("nobody ");
        document.querySelector(".winner").style.visibility = "visible";
      }
    },
    [board]
  );

  const handleClick = (e) => {
    if (squareRef.current.innerHTML !== "") return;
    squareRef.current.innerHTML = `${player}`;
    if (player === "X") setPlayer("O");
    if (player === "O") setPlayer("X");
    setBoard((prev) => {
      const newBoard = { ...prev, [props.squareNum]: player };
      checkForWin(newBoard);
      return newBoard;
    });
  };

  return (
    <button className="square" onClick={handleClick} ref={squareRef}></button>
  );
}

export default Square;
