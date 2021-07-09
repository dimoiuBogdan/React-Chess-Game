import Tile from "../Tile/Tile";
import "./Board.scss";

const Board = () => {
  const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let board = [];

  const createBoard = () => {
    // Cele 2 for-uri sunt inversate pentru a crea tabla de sus in jos, nu de la stanga la dreapta
    for (let j = yAxis.length - 1; j >= 0; j--)
      for (let i = 0; i < xAxis.length; i++)
        board.push(<Tile i={i} j={j} xAxis={xAxis} yAxis={yAxis} />);
  };
  createBoard();

  return <div id="board">{board}</div>;
};

export default Board;
