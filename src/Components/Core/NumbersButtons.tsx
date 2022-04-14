import React from "react";

const numberButtons: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

interface NumbersButtonsProps {
  onAddNumber(value: string): void;
}

function NumbersButtons(props: NumbersButtonsProps) {
  return (
    <>
      {numberButtons.map((value: string) => (
        <button
          className="number"
          key={value}
          onClick={() => props.onAddNumber(value)}
        >
          {value}
        </button>
      ))}
    </>
  );
}

export default NumbersButtons;
