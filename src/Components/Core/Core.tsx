import React, { useEffect, useState } from "react";
import {
  generateSudokuCellStates,
  returnIsMatchedNumber,
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
  isSelected: boolean;
  isReadOnly: boolean;
  isAssociated: boolean;
  isMatchValue: boolean;
  isWrongValue: boolean;
  associatedIds: string[];
}

function Core() {
  const [activeNotes, setActiveNotes] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState[]>(
    generateSudokuCellStates
  );
  const [memento, setMemento] = useState<GameState[]>([]);
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(true);

  useEffect(() => {
    checkGameStateAndSet();
  }, []);

  useEffect(() => {
    let interval: null | ReturnType<typeof setInterval> = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime: any) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [timerOn]);

  function handleNewGameRequest(): void {
    setGameState([...generateSudokuCellStates()]);
  }

  function handleSelectCell(id: string): void {
    gameState.forEach((cell: GameState) => {
      cell.isSelected = id == cell.id ? true : false;
    });
    checkGameStateAndSet();
  }

  function handleAddNumber(value: string): void {
    let selectedCell = gameState.find((cell) => cell.isSelected == true);
    if (!selectedCell) return;
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
    checkGameStateAndSet();
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
    if (!memento.length) return;
    const lastCell: GameState = memento[memento.length - 1];
    gameState[Number(lastCell.id)] = lastCell;
    gameState.forEach((cell: GameState) => {
      cell.isSelected = lastCell.id == cell.id ? true : false;
    });
    memento.pop();

    checkGameStateAndSet();
  }

  function handleErase(): void {
    let selectedCell = gameState.find((cell) => cell.isSelected == true);
    if (selectedCell!.isReadOnly) return;

    const mementoValue = Array.isArray(selectedCell!.value)
      ? [...selectedCell!.value]
      : selectedCell!.value;

    setMemento([...memento, { ...selectedCell!, value: mementoValue }]);

    selectedCell!.value = "";

    checkGameStateAndSet();
  }

  function handleTimer(): void {
    setTimerOn(timerOn ? false : true);
  }

  function checkGameStateAndSet(): void {
    checkAssociation();
    checkMatchNumber();
    checkWrongNumber();

    setGameState([...gameState]);
  }

  function checkAssociation(): void {
    let selectedCell = gameState.find((cell) => cell.isSelected == true);

    gameState.map((cell: GameState) => {
      if (cell.associatedIds.includes(selectedCell!.id)) {
        cell.isAssociated = true;
      } else {
        cell.isAssociated = false;
      }
    });
  }

  function checkMatchNumber(): void {
    let selectedCell = gameState.find((cell) => cell.isSelected == true);

    if (Array.isArray(selectedCell!.value)) return;

    gameState.map((cell: GameState) => {
      cell.isMatchValue = returnIsMatchedNumber(
        cell.value,
        selectedCell!.value
      );
    });
  }

  function checkWrongNumber(): void {
    gameState.forEach((cell: GameState) => {
      cell.isWrongValue = false;
      gameState.forEach((cellToCompare: GameState) => {
        if (
          cell.value == cellToCompare.value &&
          cell.value &&
          cellToCompare.value &&
          cell.id !== cellToCompare.id &&
          cellToCompare.associatedIds.includes(cell.id)
        ) {
          cell.isWrongValue = true;
        }
      });
    });
  }

  return (
    <main>
      <Grid gameState={gameState} onHandleSelectedCell={handleSelectCell} />
      <section className="action-controls">
        <NewGameButton onNewGameRequest={handleNewGameRequest} />
        <UndoButton onUndo={handleUndo} />
        <EraseButton onErase={handleErase} />
        <NotesButton onAddNotes={setActiveNotes} isActiveNotes={activeNotes} />
        <NumbersButtons onAddNumber={handleAddNumber} />
      </section>
      <Timer onStartTimer={handleTimer} time={time} timeOn={timerOn} />
    </main>
  );
}

export default Core;
