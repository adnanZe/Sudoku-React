import React from "react";

interface EraseProps {
  onErase(): void;
}

function Erase(props: EraseProps): JSX.Element {
  const { onErase } = props;
  return (
    <button id="erase" className="erase" onClick={onErase}>
      <i className="fa-solid fa-eraser"></i>
    </button>
  );
}

export default Erase;
