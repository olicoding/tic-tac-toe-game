import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import Board from "./Board";

function Game() {
  const { setPlayer, winner, setWinner, setBoard } = useContext(Context);

  const handleReset = () => {
    document.querySelector(".status").style.visibility = "visible";
    document.querySelector(".winner").style.visibility = "hidden";
    const fields = document.querySelectorAll("button");
    fields.forEach((field) => (field.innerHTML = ""));
    // setWinner("");
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
  };

  return (
    <article className="game container mt-5">
      <section className="row">
        <div className="col-sm-8 game-board">
          <Board />
        </div>
        <div className="col-sm-4 game-info">
          <p className="h2 restart" onClick={handleReset}>
            restart
          </p>
          <h2 className="h2 winner">{winner && `${winner} wins 🎉`}</h2>
        </div>
      </section>
    </article>
  );
}

export default Game;
