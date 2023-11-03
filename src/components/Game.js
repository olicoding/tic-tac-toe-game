import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import Square from "./Square";
import Minimax from "./Minimax";

function Game() {
  const {
    player,
    setPlayer,
    friendsModePlayer,
    setFriendsModePlayer,
    setWinner,
    aiMode,
    setAIMode,
    board,
    setBoard,
    handleUserMove,
    winner,
  } = useContext(Context);

  const handleGameModeChange = () => {
    setAIMode(!aiMode);
    handleReset();
  };

  const handlePlayerSelection = (selectedPlayer) => {
    if (aiMode && player === null) {
      setPlayer(selectedPlayer);
    }

    if (!aiMode && friendsModePlayer === null)
      setFriendsModePlayer(selectedPlayer);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setFriendsModePlayer(null);
    setPlayer(null);
    setWinner(null);
  };

  return (
    <article className="game">
      <section className="section-header">
        <div className="game-mode">
          <div className="select-options-container">
            Play against:
            <label>
              <input
                type="radio"
                name="gameMode"
                value="Friend"
                checked={!aiMode}
                onChange={handleGameModeChange}
              />
              Person
            </label>
            <label>
              <input
                type="radio"
                name="gameMode"
                value="AI"
                checked={aiMode}
                onChange={handleGameModeChange}
              />
              AI
            </label>
          </div>
        </div>

        <div className="game-info">
          {!winner && (
            <div className="status">
              {player || friendsModePlayer
                ? `Player turn: ${player || friendsModePlayer}`
                : "Play as:"}
            </div>
          )}
          {!player && !friendsModePlayer && (
            <div className="player-selection">
              <button onClick={() => handlePlayerSelection("X")}>X</button>
              <button onClick={() => handlePlayerSelection("O")}>O</button>
            </div>
          )}
        </div>
      </section>

      <section className="section-game">
        <div
          className={`game-board ${
            winner ? `${winner.toLowerCase()}-wins` : ""
          }`}
        >
          {board.map((value, index) => (
            <Square
              key={index}
              squareNum={index}
              value={value}
              onClick={handleUserMove}
            />
          ))}
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

      <Minimax />
    </article>
  );
}

export default Game;
