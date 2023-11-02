import { createContext, useState } from "react";

export const Context = createContext();

function ContextProvider({ children }) {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));

  return (
    <Context.Provider
      value={{ player, setPlayer, board, setBoard, winner, setWinner }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
