import { useEffect, useRef, useState } from "react";
import { isValidMove } from "../Rules/Rules";
import Tile from "../Tile/Tile";
import "./Board.scss";

export const Board = () => {
  const initialBoard = [];
  const board = [];
  const yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
  const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const [pieces, setPieces] = useState([]);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [grabbedPiece, setGrabbedPiece] = useState(null);
  const boardRef = useRef(null);

  useEffect(() => {
    populatePieces();
    setPieces(initialBoard);
  }, []);

  const addPiece = (x, y, image, team) => {
    initialBoard.push({
      image,
      x,
      y,
      team,
    });
  };

  const populatePieces = () => {
    // Adaugam pionii de sus
    for (let i = 0; i < 8; i++)
      addPiece(i, 6, "PIECES_IMAGES/pawn_b.png", "opponent");

    // Adaugam pionii de jos
    for (let j = 0; j < 8; j++)
      addPiece(j, 1, "PIECES_IMAGES/pawn_w.png", "our");

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
      for (let pos = 0; pos < 2; pos++) {
        // daca pozitia este 0 ( suntem pe y 0 ) inseamna ca piesele albe sunt ale noastre
        const team = pos === 0 ? "opponent" : "our";
        addPiece(
          piece.x,
          team === "our" ? 0 : 7,
          team === "our" ? piece.image.replace("_b", "_w") : piece.image,
          team
        );
      }
    });
  };

  const returnGridValues = (e) => {
    const gridXValue = Math.floor(
      (e.clientX - boardRef.current.offsetLeft) / 100
    );
    const gridYValue = Math.abs(
      Math.ceil((e.clientY - boardRef.current.offsetTop - 800) / 100)
    );
    return [gridXValue, gridYValue];
  };

  const createBoard = () => {
    // Cele 2 for-uri sunt inversate pentru a crea tabla de sus in jos, nu de la stanga la dreapta
    for (let j = yAxis.length - 1; j >= 0; j--)
      for (let i = 0; i < xAxis.length; i++) {
        let image = null;
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

  const getPieceToCursor = (element, e) => {
    const pieceOffset = 20;
    // Partea stanga a tablei
    const minX = boardRef.current.offsetLeft - pieceOffset;
    // Partea de sus a tablei
    const minY = boardRef.current.offsetTop - pieceOffset;
    // Partea dreapta a tablei
    const maxX =
      boardRef.current.offsetLeft +
      boardRef.current.clientWidth -
      3 * pieceOffset;
    // Partea de jos a tablei
    const maxY =
      boardRef.current.offsetTop +
      boardRef.current.clientHeight -
      3 * pieceOffset;
    const mouseX = e.clientX - 2 * pieceOffset;
    const mouseY = e.clientY - 2 * pieceOffset;
    element.style.position = "absolute";

    mouseX < minX
      ? (element.style.left = `${minX}px`)
      : mouseX > maxX
      ? (element.style.left = `${maxX}px`)
      : (element.style.left = `${mouseX}px`);
    mouseY < minY
      ? (element.style.top = `${minY}px`)
      : mouseY > maxY
      ? (element.style.top = `${maxY}px`)
      : (element.style.top = `${mouseY}px`);
  };

  const grabPiece = (e) => {
    const clickedElement = e.target;
    if (clickedElement.classList.contains("piece") && boardRef.current) {
      let [grabbedPieceX, grabbedPieceY] = returnGridValues(e);
      setGridX(grabbedPieceX);
      setGridY(grabbedPieceY);
      getPieceToCursor(clickedElement, e);
      setGrabbedPiece(clickedElement);
    }
  };

  const movePiece = (e) => {
    if (grabbedPiece) {
      getPieceToCursor(grabbedPiece, e);
    }
  };

  const getPieceTypeFromImage = (piece) => {
    const firstSlash = piece.image.indexOf("/");
    const lastLowBar = piece.image.lastIndexOf("_");
    const type = piece.image.substring(firstSlash + 1, lastLowBar);
    return type;
  };

  const dropPiece = (e) => {
    if (grabbedPiece) {
      let [pieceNewX, pieceNewY] = returnGridValues(e);

      setPieces((boardState) => {
        const pieces = boardState.map((piece) => {
          if (piece.x === gridX && piece.y === gridY) {
            const validMove = isValidMove(
              gridX,
              gridY,
              pieceNewX,
              pieceNewY,
              getPieceTypeFromImage(piece),
              piece.team,
              boardState
            );
            validMove
              ? ([piece.x, piece.y] = [pieceNewX, pieceNewY])
              : (grabbedPiece.style.position = "initial");
          }
          return piece;
        });
        return pieces;
      });

      setGrabbedPiece(null);
    }
  };

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="board"
      ref={boardRef}
    >
      {board}
    </div>
  );
};

export default Board;
