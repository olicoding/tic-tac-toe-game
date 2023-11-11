import { useContext, useEffect, useState } from "react";
import { Context } from "../context/ContextProvider";
import GameControl from "./GameControl";
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

  const { isGameReady, gameState, setGameState, handleUserMove } =
    useContext(Context);
  const [resultMessage, setResultMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleReset = () => {
    try {
      setGameState((prevState) => ({
        ...prevState,
        board: Array(9).fill(null),
        winner: null,
        draw: false,
      }));
    } catch (error) {
      console.error("Error in handleReset:", error.message);
    }
  };

  const getBoardClass = () => {
    try {
      let classNames = "game-board";

      if (!isGameReady) {
        classNames += " faded";
      } else {
        classNames += " game-board-active ";
      }

      return classNames;
    } catch (error) {
      console.error("Error in getBoardClass:", error.message);
      return "";
    }
  };

  const getRandomMessage = (messages) => {
    try {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    } catch (error) {
      console.error("Error in getRandomMessage:", error.message);
      return "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleReset();
    }
  };

  useEffect(() => {
    const updateResultMessage = async () => {
      if (gameState.winner || gameState.draw) {
        await delay(400);

        let message = "";
        if (gameState.winner) {
          message = gameState.aiMode
            ? gameState.winner === gameState.playerInAIMode
              ? getRandomMessage(winMessages)
              : getRandomMessage(loseMessages)
            : `${gameState.winner} wins !`;
        } else if (gameState.draw) {
          message = getRandomMessage(drawMessages);
        }

        setResultMessage(message);
        setShowResult(true);
      } else {
        setResultMessage("");
        setShowResult(false);
      }
    };

    updateResultMessage();
  }, [gameState.winner, gameState.draw]);

  return (
    <article className="game">
      <GameControl />

      <section className="section-game">
        <div className={getBoardClass()}>
          {gameState?.board.map((value, index) => (
            <Square
              key={index}
              squareNum={index}
              value={value}
              onClick={handleUserMove}
            />
          ))}
        </div>

        {(gameState.winner || gameState.draw) && showResult && (
          <div className="game-result">
            <div className="winner">{resultMessage}</div>
            <p
              className="restart"
              onClick={handleReset}
              onKeyDown={(e) => handleKeyDown(e)}
              tabIndex="0"
              role="button"
            >
              RESTART
            </p>
          </div>
        )}
      </section>

      <Minimax />
    </article>
  );
}

export default Game;
