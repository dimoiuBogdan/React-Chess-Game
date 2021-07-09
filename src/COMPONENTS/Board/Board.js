import Tile from "../Tile/Tile";
import "./Board.scss";

const Board = () => {
  const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let board = [];
  let pieces = [];

  const addBackLinePiece = (x, y, image) => {
    pieces.push({
      image,
      x,
      y,
    });
  };

  const populatePieces = () => {
    // Adaugam pionii de sus
    for (let i = 0; i < 8; i++) {
      pieces.push({
        image: "PIECES_IMAGES/pawn_b.png",
        x: i,
        y: 6,
      });
    }

    // Adaugam pionii de jos
    for (let j = 0; j < 8; j++) {
      pieces.push({
        image: "PIECES_IMAGES/pawn_w.png",
        x: j,
        y: 1,
      });
    }

    const backLinePiecesPositions = [
      // Turele
      {
        x: 0,
        image: "PIECES_IMAGES/rook_b.png",
      },
      {
        x: 7,
        image: "PIECES_IMAGES/rook_b.png",
      },
      // Caii
      {
        x: 1,
        image: "PIECES_IMAGES/knight_b.png",
      },
      {
        x: 6,
        image: "PIECES_IMAGES/knight_b.png",
      },
      // Nebunii
      {
        x: 2,
        image: `PIECES_IMAGES/bishop_b.png`,
      },
      {
        x: 5,
        image: "PIECES_IMAGES/bishop_b.png",
      },
      // Regii
      {
        x: 3,
        y: 7,
        image: "PIECES_IMAGES/king_b.png",
      },
      // Reginele
      {
        x: 4,
        image: "PIECES_IMAGES/queen_b.png",
      },
    ];

    backLinePiecesPositions.forEach((piece) => {
      // Pentru a injumatati piesele, facem un for care verifica daca pozitia este 0 ( caz in care le plasam pe cele de jos ) sau 1 ( caz in care le plasam
      // pe cele de sus, respectiv de pe randul 7 )
      for (let pos = 0; pos < 2; pos++)
        addBackLinePiece(
          piece.x,
          pos === 0 ? 0 : 7,
          // daca pozitia este 0 ( suntem pe y 0 ) schimbam culoarea pieselor in alb
          pos === 0 ? piece.image.replace("_b", "_w") : piece.image
        );
    });
  };
  populatePieces();

  const createBoard = () => {
    // Cele 2 for-uri sunt inversate pentru a crea tabla de sus in jos, nu de la stanga la dreapta
    for (let j = yAxis.length - 1; j >= 0; j--)
      for (let i = 0; i < xAxis.length; i++) {
        let image;
        pieces.forEach((piece) => {
          // Verificam daca pozitiile la care am ajuns ([i][j]) sunt egale cu pozitiile unei piese, caz in care plasam imaginea piesei respective pe tabla
          if (piece.x === i && piece.y === j) image = piece.image;
        });

        board.push(
          <Tile
            key={`${xAxis[i]}${yAxis[j]}`}
            image={image}
            i={i}
            j={j}
            yAxis={yAxis}
            xAxis={xAxis}
          />
        );
      }
  };
  createBoard();

  return <div id="board">{board}</div>;
};

export default Board;
