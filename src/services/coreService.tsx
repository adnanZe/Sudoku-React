import { makepuzzle as generateNumbers } from "sudoku";
import { GameState } from "../Components/Core/Core";
import { getListOfIdsAssociated } from "./HelperCoreService";

// Math.floor(index / 3) +
// 1 +
// (index / 9 >= 1
//   ? index / 18 >= 1 // 9
//     ? index / 36 >= 1 // 18
//       ? index / 45 >= 1 // 9
//         ? index / 63 >= 1 // 18
//           ? index / 72 >= 1 // 9
//             ? -18
//             : -15
//           : -12
//         : -9
//       : -6
//     : -3
//   : 0)

function three(index: number) {
  // return 0;
  return Math.floor(index / 27) * 3;
}

function two(index: number) {
  return Math.floor(index / 9) * 3;
}

function one(index: number) {
  return Math.floor(index / 3);
}

function test2(index: number, row: number) {
  // return one(index) - two(index) + three(index) + 1;
  return (
    Math.floor(index / 3) -
    Math.floor(index / 9) * 3 +
    Math.floor(index / 27) * 3 +
    1
  );
}

export function generateSudokuCellStates(): GameState[] {
  const unIncrementedValues: number[] = generateNumbers();

  const test = unIncrementedValues.map((number, index) => {
    let row = Math.floor(index / 9) + 1;

    return test2(index, row);
  });

  console.log(test);

  let valueIndexZero: string;

  const gameState = unIncrementedValues.map((number: number, index: number) => {
    let value = number == null ? "" : `${number + 1}`;

    if (index == 0) {
      valueIndexZero = value;
    }

    return {
      value: value,
      id: index.toString(),
      isSelected: index == 0 ? true : false,
      isReadOnly: value ? true : false,
      isAssociated: index == 0 ? true : false,
      isMatchValue: getIsMatchedNumber(value, valueIndexZero),
      isWrongValue: false,
      associatedIds: getListOfIdsAssociated(index.toString()),
    };
  });

  return gameState;
}

export function getIsMatchedNumber(
  value: string | string[],
  valueSelectedCell: string | string[] | undefined
): boolean {
  if (Array.isArray(value)) return false;

  if (value == valueSelectedCell && value) {
    return true;
  } else {
    return false;
  }
}
