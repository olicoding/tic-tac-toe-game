import { useContext, useEffect, useState } from "react";
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

  const { gameState, setGameState, handleUserMove } = useContext(Context);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [resultMessage, setResultMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handlePlayerSelection = (selectedPlayer) => {
    try {
      handleReset();
      setGameState((prevState) => ({
        ...prevState,
        currentTurn: selectedPlayer,
        playerInAIMode: prevState.aiMode ? selectedPlayer : null,
        playerInFriendsMode: !prevState.aiMode ? selectedPlayer : null,
      }));
    } catch (error) {
      console.error("Error in handlePlayerSelection:", error.message);
    }
  };

  const handleGameMode = () => {
    try {
      handleReset();
      setGameState((prevState) => ({
        ...prevState,
        currentTurn: null,
        playerInAIMode: null,
        playerInFriendsMode: null,
        aiMode: !prevState.aiMode,
      }));
    } catch (error) {
      console.error("Error in handleGameMode:", error.message);
    }
  };

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

  const getGameInfo = () => {
    try {
      if (gameState.winner || gameState.draw) return "";

      return gameState.playerInFriendsMode || gameState.playerInAIMode
        ? ""
        : "Choose a player";
    } catch (error) {
      console.error("Error in getGameInfo:", error.message);
      return "";
    }
  };

  const getBtnClass = (player) => {
    try {
      const isSelected =
        (gameState.aiMode && gameState.playerInAIMode === player) ||
        (!gameState.winner &&
          (gameState.playerInAIMode || gameState.playerInFriendsMode) ===
            player);
      const isUnselected =
        !gameState.playerInAIMode &&
        !gameState.playerInFriendsMode &&
        !gameState.winner;
      return `player-button ${
        isSelected ? "selected" : isUnselected ? "" : "unselected"
      }`;
    } catch (error) {
      console.error("Error in getBtnClass:", error.message);
      return "";
    }
  };

  const getBoardClass = () => {
    try {
      let classNames = "game-board";

      if (gameState.winner || gameState.draw) {
        classNames += " game-board-faded";
      } else if (gameState.playerInAIMode || gameState.playerInFriendsMode) {
        classNames += " game-board-active";
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
      <section className="section-header">
        <div className="game-mode">
          <div className="select-options-container">
            <p className="mode-options-title"> Play against:</p>
            <label>
              <input
                type="radio"
                name="gameMode"
                value="Friends"
                checked={!gameState.aiMode}
                onChange={handleGameMode}
              />
              Friend
            </label>
            <label>
              <input
                type="radio"
                name="gameMode"
                value="AI"
                checked={gameState.aiMode}
                onChange={handleGameMode}
              />
              AI
            </label>
          </div>
        </div>

        <div className="game-info">
          <div className="game-info-title">{getGameInfo()}</div>
          <div className="player-selection">
            <button
              className={getBtnClass("X")}
              onClick={() => handlePlayerSelection("X")}
            >
              X
            </button>
            <button
              className={getBtnClass("O")}
              onClick={() => handlePlayerSelection("O")}
            >
              O
            </button>
          </div>
        </div>
      </section>

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
            <p className="restart" onClick={handleReset}>
              Restart
            </p>
          </div>
        )}
      </section>

      <Minimax />
    </article>
  );
}

export default Game;
