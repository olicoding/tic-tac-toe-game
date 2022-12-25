import React from "react";
import ReactDOM from "react-dom/client";
import ContextProvider from "./context/ContextProvider";
import Game from "./components/Game";

import "./styles/index.css";
import "./sass/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Game />
  </ContextProvider>
);
