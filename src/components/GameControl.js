import { useContext } from "react";
import { Context } from "../context/ContextProvider";

function GameControl() {
  const {
    gameState,
    setIsGameReady,
    handleGameMode,
    handlePlayerSelection,
    handleLevelChange,
  } = useContext(Context);

  const levelButtonsVisible = gameState.aiMode;
  const playerButtonsVisible =
    (gameState.aiMode && gameState.level) || gameState.aiMode === false;

  const handleGameModeSelection = (mode) => {
    handleGameMode(mode === "AI");
    handleLevelChange(null);
    handlePlayerSelection(null);
    setIsGameReady(false);
  };

  const handleLevelSelection = (level) => {
    handleLevelChange(level);
    handlePlayerSelection(null);
    setIsGameReady(false);
  };

  const handlePlayerChoice = (player) => {
    if (gameState.aiMode && gameState.level === null) {
      return;
    }

    handlePlayerSelection(player);
    setIsGameReady(true);
  };

  const getBtnClass = (type, value) => {
    try {
      let classes = "button ";
      switch (type) {
        case "mode":
          if (gameState.aiMode === (value === "AI")) {
            classes += "selected ";
          } else if (gameState.aiMode !== null) {
            classes += "faded ";
          }
          break;
        case "level":
          if (gameState.level === value && gameState.aiMode) {
            classes += "selected ";
          } else if (gameState.aiMode && gameState.level !== null) {
            classes += "faded ";
          } else if (!gameState.aiMode) {
            classes += "faded ";
          }
          break;
        case "player":
          if (
            gameState.currentTurn === value &&
            (!gameState.aiMode || (gameState.aiMode && gameState.level))
          ) {
            classes += "selected ";
          } else if (
            (!gameState.aiMode || (gameState.aiMode && gameState.level)) &&
            gameState.currentTurn !== null
          ) {
            classes += "faded ";
          } else if (gameState.aiMode && gameState.level === null) {
            classes += "faded ";
          }
          break;
        default:
          break;
      }
      return classes;
    } catch (error) {
      console.error("Error in getBtnClass:", error.message);
      return "";
    }
  };

  return (
    <section className="game-control">
      <div className="game-mode">
        <button
          className={getBtnClass("mode", "AI")}
          onClick={() => handleGameModeSelection("AI")}
        >
          AI
        </button>
        <button
          className={getBtnClass("mode", "Friend")}
          onClick={() => handleGameModeSelection("Friend")}
        >
          FRIEND
        </button>
      </div>

      <div
        className={`collapsible-container ${
          levelButtonsVisible ? "expanded" : ""
        }`}
      >
        <div
          className={`level-selection ${
            levelButtonsVisible ? "visible" : "transition-opacity"
          }`}
        >
          <button
            className={getBtnClass("level", "easy")}
            onClick={() => handleLevelSelection("easy")}
          >
            Newby 🌱
          </button>
          <button
            className={getBtnClass("level", "medium")}
            onClick={() => handleLevelSelection("medium")}
          >
            Thinker 🧠
          </button>
          <button
            className={getBtnClass("level", "hard")}
            onClick={() => handleLevelSelection("hard")}
          >
            Expert ⚔️
          </button>
        </div>
      </div>

      <div
        className={`player-selection ${
          playerButtonsVisible ? "visible" : "transition-opacity"
        }`}
      >
        <button
          className={getBtnClass("player", "X")}
          onClick={() => handlePlayerChoice("X")}
        >
          X
        </button>
        <button
          className={getBtnClass("player", "O")}
          onClick={() => handlePlayerChoice("O")}
        >
          O
        </button>
      </div>
    </section>
  );
}

export default GameControl;
