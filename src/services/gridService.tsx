import { GameState } from "../Components/Core/Core";

export function getClassNamesForElement(cell: GameState) {
  let className = "";

  if (cell.isReadOnly) {
    className += "generated ";
  }
  if (cell.isSelected) {
    className += "active ";
  }

  if (cell.isAssociated) {
    className += "associated ";
  }
  if (cell.isMatchValue) {
    className += "match-number ";
  }
  if (Array.isArray(cell.value)) {
    className += "display-notes ";
  }

  if (cell.isWrongValue) {
    className += "wrong ";
  }

  return className;
}
