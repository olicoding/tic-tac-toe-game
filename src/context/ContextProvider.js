import { createContext, useState } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState({
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

  return (
    <Context.Provider
      value={{ player, setPlayer, board, setBoard, winner, setWinner }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
