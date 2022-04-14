import React, { FC } from "react";

interface Undo {
  onUndo(): void;
}

const Undo: FC<Undo> = (props) => {
  const { onUndo } = props;
  return (
    <button id="undo" className="undo" onClick={onUndo}>
      <i className="fa-solid fa-rotate-left"></i>
    </button>
  );
};

export default Undo;
