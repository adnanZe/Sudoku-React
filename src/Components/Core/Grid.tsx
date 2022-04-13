import React, { FC } from "react";
import { getClassNamesForElement } from "../../services/gridService";
import { GameState } from "./Core";

interface GridProps {
  gameState: GameState[];
  onHandleSelectedCell(id: string): void;
  selectedCellId: string;
}

const Grid: FC<GridProps> = (props) => {
  const {
    gameState,
    onHandleSelectedCell: handleSelectedCell,
    selectedCellId,
  } = props;

  console.log(gameState);

  return (
    <section className="sudoku">
      {gameState.map((cell: GameState, index: number) => {
        let generateCellForNotes;
        if (cell.isActiveNotes && Array.isArray(cell.value)) {
          generateCellForNotes = cell.value.map((value: string) => (
            <span>{value}</span>
          ));
        }
        console.log(generateCellForNotes);

        return (
          <div
            key={index}
            id={cell.id}
            className={getClassNamesForElement(cell, selectedCellId)}
            onClick={() => handleSelectedCell(index.toString())}
          >
            {generateCellForNotes || cell.value}
          </div>
        );
      })}
    </section>
  );
};

export default Grid;
