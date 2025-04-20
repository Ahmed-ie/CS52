// src/services/auth.js
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged,
} from 'firebase/auth';
import { app } from './datastore';

const auth = getAuth(app);

// Log in an existing user
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Create a new user
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign out the current user
export const logout = () => {
  return signOut(auth);
};

// Listen for auth state changes
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
