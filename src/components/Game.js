import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import Square from "./Square";

function Game() {
  const { player, setPlayer, winner, setWinner, board, setBoard } =
    useContext(Context);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <article className="game">
      <section>
        <div className="game-info">
          <div className="status h2 text-center">Player: {player}</div>
        </div>
        <div
          className={`game-board ${
            winner ? `${winner.toLowerCase()}-wins` : ""
          }`}
        >
          <Square squareNum={0} calculateWinner={calculateWinner} />
          <Square squareNum={1} calculateWinner={calculateWinner} />
          <Square squareNum={2} calculateWinner={calculateWinner} />
          <Square squareNum={3} calculateWinner={calculateWinner} />
          <Square squareNum={4} calculateWinner={calculateWinner} />
          <Square squareNum={5} calculateWinner={calculateWinner} />
          <Square squareNum={6} calculateWinner={calculateWinner} />
          <Square squareNum={7} calculateWinner={calculateWinner} />
          <Square squareNum={8} calculateWinner={calculateWinner} />
        </div>
        {winner || board.every((square) => square) ? (
          <div className="game-result">
            <h2 className="h2 winner">{`${
              winner === null ? "draw" : winner + " wins 🎉"
            }`}</h2>

            <p className="restart" onClick={handleReset}>
              Restart
            </p>
          </div>
        ) : null}
      </section>
    </article>
  );
}

export default Game;
