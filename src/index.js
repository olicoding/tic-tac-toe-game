import React from "react";
import ReactDOM from "react-dom";
import ContextProvider from "./context/ContextProvider";
import Game from "./components/Game";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ContextProvider>
    <Game />
  </ContextProvider>
);
