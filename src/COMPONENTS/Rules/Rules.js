export const isValidMove = (
  prevX,
  prevY,
  newX,
  newY,
  pieceType,
  team,
  board,
  currentTeam
) => {
  if (team === currentTeam) {
    if (pieceType === "pawn")
      return pawnRules(prevX, prevY, newX, newY, pieceType, team, board);
  }
};

const pawnRules = (prevX, prevY, newX, newY, pieceType, team, board) => {
  const firstPawnRow = team === "our" ? 1 : 6;
  const pawnDirection = team === "our" ? 1 : -1;

  if (tileIsEmpty(newX, newY, board) && prevX === newX) {
    // Programarea miscarilor
    if (prevY !== firstPawnRow) {
      if (newY - prevY === pawnDirection) return true;
    } else if (newY - prevY === 2 * pawnDirection) {
      if (tileIsEmpty(newX, newY - pawnDirection, board)) return true;
    } else if (newY - prevY === pawnDirection) return true;
  } /*Programarea atacului*/ else if (
    newX - prevX === -1 &&
    newY - prevY === pawnDirection
  ) {
    // Sus sau jos, stanga
    return opponentOnTile(newX, newY, board, team);
  } else if (newX - prevX === 1 && newY - prevY === pawnDirection) {
    // Sus sau jos, dreapta
    return opponentOnTile(newX, newY, board, team);
  }
  return false;
};

const tileIsEmpty = (tileX, tileY, board) => {
  const pieceOnTile = board.find(
    (piece) => piece.x === tileX && piece.y === tileY
  );
  return pieceOnTile ? false : true;
};

const opponentOnTile = (tileX, tileY, board, team) => {
  const enemy = board.find(
    (piece) => piece.x === tileX && piece.y === tileY && piece.team !== team
  );
  return enemy ? true : false;
};
