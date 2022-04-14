import { makepuzzle as generateNumbers } from "sudoku";
import { GameState } from "../Components/Core/Core";

export function generateValuesForSudoku(): string[] {
  const unIncrementedValues: number[] = generateNumbers();
  const incrementedValues = unIncrementedValues.map<string>((number: number) =>
    number == null ? "" : `${number + 1}`
  );

  return incrementedValues;
}

export function extractIds(sudokuValues: string[]): string[] {
  let ids: string[] = [];
  sudokuValues.forEach((value: string, index: number) => {
    ids.push(index.toString());
  });

  return ids;
}

export function extractIsReadOnly(sudokuValues: string[]): boolean[] {
  let isReadsOnly: boolean[] = [];
  sudokuValues.forEach((value: string) => {
    if (value) {
      isReadsOnly.push(true);
    } else {
      isReadsOnly.push(false);
    }
  });
  return isReadsOnly;
}

function returnIdsRowsColumnsSquares(): string[][][] {
  const rows: Array<string[]> = [];
  const columns: Array<string[]> = [];
  const squares: Array<string[]> = [];

  let counterColumn = -1;
  let counterSquare = 0;
  let row: string[] | null = null;
  let column: string[] | null = null;
  let square: string[] | null = null;

  for (let i = 0; i < 81; i++) {
    if (i % 9 == 0) {
      counterColumn++;
      row = [];
      column = [];
      square = [];

      rows.push(row);
      columns.push(column);
      squares.push(square);
    }

    if (i % 27 == 0) {
      counterSquare = 0;
    } else if (i % 9 == 0) {
      counterSquare -= 18;
    } else if (i % 3 == 0) {
      counterSquare += 6;
    }
    row!.push(String(i));
    column!.push(String((i % 9) * 9 + counterColumn));
    square!.push(String(i + counterSquare));
  }

  return [rows, columns, squares];
}

export function extractIsAssociated(
  selectedCellId: string,
  id: string
): boolean {
  const [
    rowsId,
    columnsId,
    squaresId,
  ]: string[][][] = returnIdsRowsColumnsSquares();

  const rowList: string[] | undefined = rowsId.find((row) =>
    row.includes(selectedCellId)
  );
  const colList: string[] | undefined = columnsId.find((col) =>
    col.includes(selectedCellId)
  );
  const sqrList: string[] | undefined = squaresId.find((sqr) =>
    sqr.includes(selectedCellId)
  );

  const listOfIds: string[] = rowList!.concat(colList!, sqrList!);

  const isAssociatedIds: boolean = listOfIds.includes(id) ? true : false;

  return isAssociatedIds;
}

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
      isAssociated: extractIsAssociated("0", index.toString()),
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
