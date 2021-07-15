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
  // Cazurile in care pionul poate avansa 2 patratele
  const firstPawnRow = team === "our" ? 1 : 6;

  const pawnDirection = team === "our" ? 1 : -1;

  if (tileIsEmpty(newX, newY, board) && prevX === newX) {
    // Programarea miscarilor
    if (prevY !== firstPawnRow) {
      // Daca nu este pe rand special, poate avansa doar 1
      if (newY - prevY === pawnDirection) return true;
      // Pe rand special, poate avansa 2
    } else if (
      newY - prevY === 2 * pawnDirection &&
      tileIsEmpty(newX, newY - pawnDirection, board)
    )
      return true;
    else if (newY - prevY === pawnDirection) return true;
  } /*Programarea atacului*/ else if (
    newX - prevX === -1 &&
    newY - prevY === pawnDirection
  )
    // Sus sau jos, stanga
    return opponentOnTile(newX, newY, board, team);
  else if (newX - prevX === 1 && newY - prevY === pawnDirection)
    // Sus sau jos, dreapta
    return opponentOnTile(newX, newY, board, team);
  return false;
};

const tileIsEmpty = (tileX, tileY, board) => {
  // Verificam daca exista o piesa cu aceleasi coordonate ca cele ale patratului(tileX,tileY)
  const pieceOnTile = board.find(
    (piece) => piece.x === tileX && piece.y === tileY
  );
  return pieceOnTile ? false : true;
};

const opponentOnTile = (tileX, tileY, board, team) => {
  // Verificam daca exista deja o piesa pe patratul unde vrem sa mergem si daca este in echipa opusa
  const enemy = board.find(
    (piece) => piece.x === tileX && piece.y === tileY && piece.team !== team
  );
  return enemy ? true : false;
};
