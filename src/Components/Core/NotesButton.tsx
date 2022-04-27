import React from "react";

interface NotesProps {
  isActiveNotes: boolean;
  onAddNotes: React.Dispatch<React.SetStateAction<boolean>>;
}

function Notes(props: NotesProps): JSX.Element {
  const { onAddNotes, isActiveNotes } = props;
  return (
    <button
      className={`notes ${isActiveNotes ? "on" : ""}`}
      id="notes"
      onClick={() => onAddNotes(isActiveNotes ? false : true)}
    >
      <i className="fa-solid fa-pencil"></i>
    </button>
  );
}

export default Notes;
