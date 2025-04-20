import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import {
  FaTrash, FaEdit, FaSave, FaTimes,
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import 'react-resizable/css/styles.css';

const Note = ({
  id, note, onDelete, onDrag, onUpdate,
}) => {
  if (!note) return null;

  const nodeRef = useRef(null);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [tempTitle, setTempTitle] = useState(note.title);
  const [tempContent, setTempContent] = useState(note.text);

  const startEditing = () => {
    setIsBeingEdited(true);
  };

  const discardChanges = () => {
    setTempTitle(note.title);
    setTempContent(note.text);
    setIsBeingEdited(false);
  };

  const handleSaveEdit = () => {
    onUpdate(id, { title: tempTitle, text: tempContent });
    setIsBeingEdited(false);
  };

  const handleResize = (event, { size }) => {
    console.log('✅ Resizing Stopped. New Size:', size);

    const updatedNote = {
      ...note,
      title: note.title ?? 'Untitled',
      text: note.text ?? '',
      width: size.width,
      height: size.height,
    };

    console.log('🛠 Before Update:', updatedNote);

    onUpdate(id, updatedNote);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".note-handle"
      defaultPosition={{ x: note.x, y: note.y }}
      onStop={(e, data) => onDrag(id, data)}
    >
      <div
        ref={nodeRef}
        className="note"
        data-testid="note"
        style={{ zIndex: note.zIndex }}
      >
        <ResizableBox
          width={note.width || 150}
          height={note.height || 150}
          minConstraints={[100, 100]}
          maxConstraints={[400, 400]}
          onResizeStop={handleResize}
          className="resizable-note"
        >
          <div className="note-content">
            <div className="note-handle"> ⚪ Drag</div>
            {isBeingEdited ? (
              <div>
                <input
                  type="text"
                  className="noteinput"
                  data-testid="edit-title"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                />
                <textarea
                  className="noteinput"
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                />
                <div>
                  <button className="edit-btn" type="button" onClick={handleSaveEdit} aria-label="done-editing">
                    <FaSave /> Save
                  </button>
                  <button type="button" onClick={discardChanges} aria-label="cancel-editing">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1>{note.title}</h1>
                <ReactMarkdown>{note.text || ''}</ReactMarkdown>
                <div>
                  <button className="edit-btn" type="button" onClick={startEditing} aria-label="edit">
                    <FaEdit /> Edit
                  </button>
                  <button type="button" onClick={() => onDelete(id)} aria-label="delete">
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </ResizableBox>
      </div>
    </Draggable>

  );
};

export default Note;
