import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import ContextProvider from "./context/ContextProvider";
import Background from "./components/Background";
import Game from "./components/Game";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ContextProvider>
    <Background />
    <Game />
    <Analytics />
  </ContextProvider>
);
