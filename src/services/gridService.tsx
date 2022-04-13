import { GameState } from "../Components/Core/Core";

export function getClassNamesForElement(
  gameState: GameState,
  index: number,
  selectedCellId: string
) {
  let className = "";
  if (gameState.isReadOnly[index]) {
    className += "generated ";
  }
  if (selectedCellId == gameState.ids[index]) {
    className += "active ";
  }

  if (gameState.isAssociated[index]) {
    className += "associated ";
  }

  return className;
}
