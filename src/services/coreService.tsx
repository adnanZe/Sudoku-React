import { makepuzzle as generateNumbers } from "sudoku";
import { GameState } from "../Components/Core/Core";
import { returnListOfIdsAssociated } from "./HelperCoreService";

export function generateValuesForSudoku(): string[] {
  const unIncrementedValues: number[] = generateNumbers();
  const incrementedValues = unIncrementedValues.map<string>((number: number) =>
    number == null ? "" : `${number + 1}`
  );

  return incrementedValues;
}

// move into generateValuesForSudoku. can also rename to generateSudokuCellStates
export function generateGameState(): GameState[] {
  const sudokuValues = generateValuesForSudoku();

  const gameState: GameState[] = [];

  let valueIndexZero: string;
  sudokuValues.forEach((value: string, index: number) => {
    if (index == 0) {
      valueIndexZero = value;
    }
    const cellProprieties = {
      value: sudokuValues[index],
      id: index.toString(),
      isReadOnly: value ? true : false,
      isAssociated: returnIsAssociated("0", index.toString()),
      isMatchNumber: extractIsMatchedNumber(value, valueIndexZero),
      isActiveNotes: false,
    };
    gameState.push(cellProprieties);
  });
  return gameState;
}

export function extractIsMatchedNumber(
  value: string | string[],
  valueSelectedCell: string
): boolean {
  let isMatchValue: boolean;
  if (Array.isArray(value)) return false;
  if (value == valueSelectedCell && valueSelectedCell && value) {
    return (isMatchValue = true);
  } else {
    return (isMatchValue = false);
  }
}

export function returnIsAssociated(
  selectedCellId: string,
  id: string
): boolean {
  const listOfIds: string[] = returnListOfIdsAssociated(selectedCellId);

  return listOfIds.includes(id) ? true : false;
}
