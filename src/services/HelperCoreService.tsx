// generate only once, set it somewhere and reuse it
// change return type

interface returnRowsColumnsSquaresObj<T = Array<string[]>> {
  rows: T;
  columns: T;
  squares: T;
}

type rowColumnSquare = string[] | null;

function returnIdsRowsColumnsSquares() {
  const returnObject: returnRowsColumnsSquaresObj = {
    rows: [],
    columns: [],
    squares: [],
  };

  let counterColumn = -1;
  let counterSquare = 0;
  let row: rowColumnSquare = null;
  let column: rowColumnSquare = null;
  let square: rowColumnSquare = null;

  for (let i = 0; i < 81; i++) {
    if (i % 9 == 0) {
      counterColumn++;
      row = [];
      column = [];
      square = [];

      returnObject.rows.push(row);
      returnObject.columns.push(column);
      returnObject.squares.push(square);
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

  return returnObject;
}

const idsRowsColumnsSquares = returnIdsRowsColumnsSquares();

export function returnListOfIdsAssociated(selectedCellId: string): string[] {
  const { rows, columns, squares } = idsRowsColumnsSquares;

  const rowList: string[] | undefined = rows.find((row) =>
    row.includes(selectedCellId)
  );
  const colList: string[] | undefined = columns.find((col) =>
    col.includes(selectedCellId)
  );
  const sqrList: string[] | undefined = squares.find((sqr) =>
    sqr.includes(selectedCellId)
  );

  return rowList!.concat(colList!, sqrList!);
}
