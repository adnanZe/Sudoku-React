import React from "react";
import { getClassNamesForElement } from "../../Services/GridService";
import { GameState } from "./Core";

interface GridProps {
  gameState: GameState[];
  onHandleSelectedCell(id: string): void;
}

function Grid(props: GridProps): JSX.Element {
  const { gameState, onHandleSelectedCell } = props;

  return (
    <section className="sudoku">
      {gameState.map((cell: GameState, indexCell: number) => {
        let generateCellForNotes;
        if (Array.isArray(cell.value)) {
          generateCellForNotes = cell.value.map(
            (value: string, indexSpan: number) => (
              <span key={`${indexCell}_${indexSpan}`}>{value}</span>
            )
          );
        }

        return (
          <div
            key={indexCell}
            id={cell.id}
            className={getClassNamesForElement(cell)}
            onClick={() => onHandleSelectedCell(indexCell.toString())}
          >
            {generateCellForNotes || cell.value}
          </div>
        );
      })}
    </section>
  );
}

export default Grid;
