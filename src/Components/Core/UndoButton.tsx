import React from "react";

interface Undo {
  onUndo(): void;
}

function Undo(props: Undo): JSX.Element {
  const { onUndo } = props;
  return (
    <button id="undo" className="undo" onClick={onUndo}>
      <i className="fa-solid fa-rotate-left"></i>
    </button>
  );
}

export default Undo;
