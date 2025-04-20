// import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, set, onValue, remove, update,
} from 'firebase/database';

// Firebase config (your credentials)
const firebaseConfig = {
  apiKey: 'AIzaSyAz5h6YnYmyi9Mp43212LFwVfmLTUpnzDs',
  authDomain: 'firenotes-b8c47.firebaseapp.com',
  databaseURL: 'https://firenotes-b8c47-default-rtdb.firebaseio.com',
  projectId: 'firenotes-b8c47',
  storageBucket: 'firenotes-b8c47.firebasestorage.app',
  messagingSenderId: '927169467534',
  appId: '1:927169467534:web:28c7f9b33942446bb5e5df',
  measurementId: 'G-8SDR1683S5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
/**
 * Subscribe to Firebase changes (Real-time sync)
 */
export function onNotesValueChange(callback) {
  const notesRef = ref(db, 'notes'); // Reference to 'notes' in Firebase
  onValue(notesRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {}); // Ensure state is not undefined
  });
}

/**
 * Add a new note to Firebase
 */
export function addNote(id, note) {
  set(ref(db, `notes/${id}`), note);
}

/**
 * Update an existing note in Firebase
 */
export function updateNote(id, updatedFields) {
  console.log(`Updating note ${id}:`, updatedFields); // ✅ Debugging log
  update(ref(db, `notes/${id}`), updatedFields);
}

/**
 * Delete a note from Firebase
 */
export function deleteNote(id) {
  remove(ref(db, `notes/${id}`));
}
