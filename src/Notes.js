import React from 'react';

const Notes = ({ notes }) => {
  return (
    <div className='notes-container'>
      <h2>Saved Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;