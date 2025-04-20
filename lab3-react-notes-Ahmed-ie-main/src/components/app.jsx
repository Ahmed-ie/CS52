import React, { useState, useEffect } from 'react';
import Login from './login';
import NotesApp from './NotesCon';
import { subscribeToAuthChanges, logout } from '../services/auth';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <header>
        <h1>React Notes App</h1>
        <button type="button" onClick={logout}>Logout</button>
      </header>
      {/* Let NotesApp handle note management */}
      <NotesApp user={user} />
    </div>
  );
};

export default App;
