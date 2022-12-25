import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import Square from "./Square";

function Board() {
  const { player } = useContext(Context);
  const status = `Player: ${player}`;

  const renderSquare = (i) => {
    return <Square squareNum={i} />;
  };

  return (
    <>
      <div className=" h2 text-center text-primary">Feliz Natal Leo! 💝</div>
      <div>
        Bem simples, mas especial e de coraçāo, este joguinho pro meu sobrinho
        querido. Presente virtual do tio Rafa...espero que goste e se divirta!
        Abraços!
      </div>
      <div className="status h2 text-center">{status}</div>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
}

export default Board;
