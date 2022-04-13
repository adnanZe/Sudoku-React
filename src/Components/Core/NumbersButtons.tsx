import React, { FC } from "react";

const numberButtons: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

interface NumbersButtonsProps {
  onAddNumber(value: string): void;
}

const NumbersButtons: FC<NumbersButtonsProps> = (props) => {
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
};

export default NumbersButtons;
