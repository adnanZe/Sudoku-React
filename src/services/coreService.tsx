import { makepuzzle as generateNumbers } from "sudoku";

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
  sudokuValues: string[]
): boolean[] {
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

  const isAssociatedIds: boolean[] = [];

  sudokuValues.forEach((value: string, index: number) => {
    if (listOfIds.includes(String(index))) {
      isAssociatedIds.push(true);
    } else {
      isAssociatedIds.push(false);
    }
  });

  return isAssociatedIds;
}
