import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import Square from "./Square";
import Minimax from "./Minimax";

function Game() {
  const winMessages = [
    "you rock! 💪",
    "amazing win! 🚀",
    "victory is yours! 🏆",
    "Unstoppable! 🏅",
    "You're on fire! 🔥",
    "Legendary victory! 🌟",
    "Majestic win! 🏆",
    "Absolute domination! 💥",
    "A triumph of excellence! 🎉",
  ];
  const loseMessages = [
    "AI wins 🙄",
    "Let's try that again 😕",
    "AI is victorious 🤖",
    "AI supremacy! 🤖",
    "A formidable opponent! 🧠",
    "AI's tactical brilliance! 🌐",
    "AI's strategic mastery! 📈",
    "AI's victory is undeniable! 🤯",
  ];
  const drawMessages = [
    "It's a draw! 😐",
    "A tie game! 👔",
    "No one wins this time! 😅",
    "Stalemate reached! ♻️",
    "A deadlock! 🔒",
    "Balance is maintained! ⚖️",
    "No clear winner! 🤝",
    "A tie for the ages! 👔",
    "Two forces in equilibrium! ⚖️",
  ];
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
    setFriendsModePlayer(null);
    setPlayer(null);
    handleReset();
  };

  const handlePlayerSelection = (selectedPlayer) => {
    try {
      handleReset();

      if (aiMode) {
        setPlayer(selectedPlayer);
      } else {
        setFriendsModePlayer(selectedPlayer);
      }
    } catch (error) {
      console.error("Error in handlePlayerSelection:", error.message);
    }
  };

  const handleReset = () => {
    try {
      setBoard(Array(9).fill(null));
      setWinner(null);
    } catch (error) {
      console.error("Error in handleReset:", error.message);
    }
  };

  const getRandomMessage = (messages) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
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
              Friend
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
          {winner
            ? ""
            : friendsModePlayer || player
            ? "Player turn:"
            : "Choose your player"}
          <div className="player-selection">
            <button
              className={`player-button ${
                aiMode && player === "X"
                  ? "selected"
                  : (!winner && (player || friendsModePlayer)) === "X"
                  ? "selected"
                  : !player && !friendsModePlayer && !winner
                  ? ""
                  : "unselected"
              }`}
              onClick={() => handlePlayerSelection("X")}
            >
              X
            </button>
            <button
              className={`player-button ${
                aiMode && player === "O"
                  ? "selected"
                  : (!winner && (player || friendsModePlayer)) === "O"
                  ? "selected"
                  : !player && !friendsModePlayer && !winner
                  ? ""
                  : "unselected"
              }`}
              onClick={() => handlePlayerSelection("O")}
            >
              O
            </button>
          </div>
        </div>
      </section>

      <section className="section-game">
        <div
          className={`game-board ${
            winner ? `${winner.toLowerCase()}-wins` : ""
          } ${player || friendsModePlayer ? "" : "no-player"}`}
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
            <div className="winner">
              {`${
                winner === null
                  ? !aiMode
                    ? "draw"
                    : getRandomMessage(drawMessages)
                  : !aiMode
                  ? winner + " wins 🎉"
                  : winner === player
                  ? getRandomMessage(winMessages)
                  : getRandomMessage(loseMessages)
              }`}
            </div>

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
