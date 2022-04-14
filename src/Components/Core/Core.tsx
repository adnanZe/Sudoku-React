import React, { useRef, useState } from "react";
import {
  returnIsAssociated,
  extractIsMatchedNumber,
  generateGameState,
} from "../../Services/CoreService";
import EraseButton from "./EraseButton";
import Grid from "./Grid";
import NewGameButton from "./NewGameButton";
import NotesButton from "./NotesButton";
import NumbersButtons from "./NumbersButtons";
import Timer from "./Timer";
import UndoButton from "./UndoButton";

export interface GameState {
  value: string | string[];
  id: string;
  isReadOnly: boolean;
  isAssociated: boolean;
  isMatchNumber: boolean;
}

function Core() {
  // todo: useState
  const selectedCellId = useRef<string>("0");
  const [activeNotes, setActiveNotes] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState[]>(generateGameState);
  const [memento, setMemento] = useState<GameState[]>([]);

  function handleNewGameRequest(): void {
    const newGameState: GameState[] = generateGameState();
    selectedCellId.current = "0";
    setGameState(newGameState);
    checkAssociation();
  }

  function handleSelectCell(id: string): void {
    selectedCellId.current = id;
    checkAssociation();

    checkMatchNumber(gameState[Number(selectedCellId.current)].value);
  }

  function handleAddNumber(value: string): void {
    let selectedCell = gameState[Number(selectedCellId.current)];

    if (selectedCell.isReadOnly) return;

    const mementoValue = Array.isArray(selectedCell.value)
      ? [...selectedCell.value]
      : selectedCell.value;

    setMemento([...memento, { ...selectedCell, value: mementoValue }]);

    if (activeNotes) {
      handleNotes(selectedCell, value);
    } else {
      selectedCell.value = value;
    }

    checkMatchNumber(selectedCell.value);
    setGameState([...gameState]);
  }

  function handleNotes(selectedCell: GameState, value: string) {
    if (Array.isArray(selectedCell.value)) {
      selectedCell.value[Number(value) - 1] = value;
    } else {
      selectedCell.value = Array(9).fill("");
      selectedCell.value[Number(value) - 1] = value;
    }
  }

  function handleUndo(): void {
    const lastCell: GameState = memento[memento.length - 1];
    gameState[Number(lastCell.id)] = lastCell;
    memento.pop();

    setGameState([...gameState]);
  }

  function checkAssociation(): void {
    gameState.forEach((cell: GameState) => {
      cell.isAssociated = returnIsAssociated(selectedCellId.current, cell.id);
    });
    setGameState([...gameState]);
  }

  function checkMatchNumber(value: string | string[]): void {
    if (Array.isArray(value)) return;
    gameState.forEach((cell: GameState) => {
      cell.isMatchNumber = extractIsMatchedNumber(cell.value, value);
    });
  }

  return (
    <main>
      <Grid
        gameState={gameState}
        onHandleSelectedCell={handleSelectCell}
        selectedCellId={selectedCellId.current}
      />
      <section className="action-controls">
        <NewGameButton onNewGameRequest={handleNewGameRequest} />
        <UndoButton onUndo={handleUndo} />
        <EraseButton />
        <NotesButton onAddNotes={setActiveNotes} isActiveNotes={activeNotes} />
        <NumbersButtons onAddNumber={handleAddNumber} />
      </section>
      <Timer />
    </main>
  );
}

export default Core;
