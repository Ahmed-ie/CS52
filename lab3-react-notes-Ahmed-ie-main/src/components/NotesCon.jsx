// src/components/NotesApp.jsx
import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import {
  onNotesValueChange, addNote, updateNote, deleteNote,
} from '../services/datastore';
import Note from './notes';
import './NotesCon.css';

const NotesApp = ({ user }) => {
  const [notes, setNotes] = useState({});
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    onNotesValueChange((updatedNotes) => {
      setNotes(updatedNotes);
    });
  }, []);

  const handleAddNote = () => {
    if (!noteTitle || !noteText) return;
    const id = Date.now().toString();
    const newNote = {
      title: noteTitle,
      text: noteText,
      x: 100,
      y: 100,
      zIndex: 1,
    };
    addNote(id, newNote);
    setNoteTitle('');
    setNoteText('');
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
  };

  const handleUpdateNote = (id, updatedFields) => {
    updateNote(id, updatedFields);
  };

  const handleDragNote = (id, data) => {
    const maxZIndex = Math.max(...Object.values(notes).map((n) => n.zIndex || 0), 1);
    updateNote(id, { x: data.x, y: data.y, zIndex: maxZIndex + 1 });
  };

  return (
    <div>
      {/* Add Note Form */}
      <div className="add-note-container">
        <input
          type="text"
          className="noteinput"
          placeholder="Enter Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          className="noteinput"
          placeholder="Enter Content"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button type="button" className="add-note-btn" onClick={handleAddNote}>
          <FiPlus /> Note
        </button>
      </div>

      {/* Display Notes */}
      <div className="notes-container">
        {Object.entries(notes).map(([id, note]) => (
          <Note
            key={id}
            id={id}
            note={note}
            onDelete={handleDeleteNote}
            onDrag={handleDragNote}
            onUpdate={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
