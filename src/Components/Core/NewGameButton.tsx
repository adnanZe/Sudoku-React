import React, { FC } from "react";

interface NewGameProps {
  onNewGameRequest(): void;
}

const NewGameButton: FC<NewGameProps> = (props) => {
  return (
    <button id="new-game" className="new-game" onClick={props.onNewGameRequest}>
      New Game
    </button>
  );
};

export default NewGameButton;
