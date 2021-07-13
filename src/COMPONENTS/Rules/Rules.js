export const isValidMove = (
  prevX,
  prevY,
  newX,
  newY,
  pieceType,
  team,
  board
) => {
  // Reguli pentru pion
  if (pieceType === "pawn" && tileIsEmpty(newX, newY, board))
    if (team === "our") {
      // Poate urca 2 la prima miscare
      if (prevY === 1) {
        if (prevX === newX && newY - prevY <= 2) return true;
      } /* Apoi poate urca doar cate 1 */ else if (
        prevX === newX &&
        newY - prevY === 1
      )
        return true;
    } else if (prevY === 6) {
      if (prevX === newX && newY - prevY >= -2) return true;
    } else if (prevX === newX && newY - prevY === -1) return true;
};

const tileIsEmpty = (tileX, tileY, board) => {
  const pieceOnTile = board.find(
    (piece) => piece.x === tileX && piece.y === tileY
  );
  return pieceOnTile ? false : true;
};
