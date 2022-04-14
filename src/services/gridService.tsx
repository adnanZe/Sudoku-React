import { GameState } from '../Components/Core/Core';

export function getClassNamesForElement(
  cell: GameState,
  selectedCellId: string
) {
  let className = '';

  if (cell.isReadOnly) {
    className += 'generated ';
  }
  if (selectedCellId == cell.id) {
    className += 'active ';
  }

  if (cell.isAssociated) {
    className += 'associated ';
  }
  if (Array.isArray(cell.value)) {
    return (className += 'display-notes');
  }

  if (cell.isMatchNumber) {
    className += 'match-number ';
  }

  if (className.includes('match-number') && className.includes('associated')) {
    className += 'wrong ';
  }

  return className;
}
