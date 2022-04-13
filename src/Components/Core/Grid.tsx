import React, { FC } from "react";
import { getClassNamesForElement } from "../../services/gridService";
import { GameState } from "./Core";

interface GridProps {
  gameState: GameState;
  onHandleSelectedCell(id: string): void;
  selectedCellId: string;
}

const Grid: FC<GridProps> = (props) => {
  const {
    gameState,
    onHandleSelectedCell: handleSelectedCell,
    selectedCellId,
  } = props;
  return (
    <section className="sudoku">
      {gameState.values.map((value: string, index: number) => (
        <div
          key={index}
          id={gameState.ids[index]}
          className={getClassNamesForElement(gameState, index, selectedCellId)}
          onClick={() => handleSelectedCell(index.toString())}
        >
          {value}
        </div>
      ))}
    </section>
  );
};

export default Grid;
