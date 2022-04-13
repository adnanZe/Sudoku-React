import React, { useEffect, useRef, useState } from "react";
import {
  extractIds,
  extractIsAssociated,
  extractIsReadOnly,
  generateValuesForSudoku,
} from "../../services/coreService";
import EraseButton from "./EraseButton";
import Grid from "./Grid";
import NewGameButton from "./NewGameButton";
import NotesButton from "./NotesButton";
import NumbersButtons from "./NumbersButtons";
import Timer from "./Timer";
import UndoButton from "./UndoButton";

export interface GameState {
  values: string[];
  ids: string[];
  isReadOnly: boolean[];
  isAssociated: boolean[];
}

function generateGameState(): GameState {
  const sudokuValues = generateValuesForSudoku();
  return {
    values: sudokuValues,
    ids: extractIds(sudokuValues),
    isReadOnly: extractIsReadOnly(sudokuValues),
    isAssociated: extractIsAssociated("0", sudokuValues),
  };
}

const Core = () => {
  const selectedCellId = useRef<string>("0");

  const [gameState, setGameState] = useState<GameState>(generateGameState);

  function handleNewGameOnDemand(): void {
    const newGameState = generateGameState();
    setGameState(newGameState);
    selectedCellId.current = "0";
    handleAssociation();
  }

  function handleSelectCell(id: string): void {
    selectedCellId.current = id;
    handleAssociation();
  }

  function handleAssociation(): void {
    gameState.isAssociated = extractIsAssociated(
      selectedCellId.current,
      gameState.values
    );
    const copyGameState = { ...gameState };
    setGameState(copyGameState);
  }

  function handleAddNumber(value: string): void {
    gameState.values[Number(selectedCellId.current)] = value;
    const copyGameState = { ...gameState };
    setGameState(copyGameState);
  }

  return (
    <main>
      <Grid
        gameState={gameState}
        onHandleSelectedCell={handleSelectCell}
        selectedCellId={selectedCellId.current}
      />
      <section className="action-controls">
        <NewGameButton onNewGameRequest={handleNewGameOnDemand} />
        <UndoButton />
        <EraseButton />
        <NotesButton />
        <NumbersButtons onAddNumber={handleAddNumber} />
      </section>
      <Timer />
    </main>
  );
};

export default Core;
