## 🚀 Lab 3: React Notes - Submission

### 🔗 **Deployed Hosted Version**
[Live Demo on Render](https://react-notes-rsha.onrender.com)

---

### 📝 **Summary of What Worked and What Didn’t**

#### ✅ **What Worked**
- **Adding, editing, deleting, and dragging notes:** The core functionality is fully implemented.
- **Smooth drag behavior:** Implemented using **React-Draggable**.
- **Resizable notes:** Leveraging **React-Resizable** to allow dynamic resizing.

#### ❌ **What Didn’t Work / Challenges Faced**
- **Initial Dragging Sluggishness:** There were performance challenges at first when dragging notes, but CSS optimizations improved the experience.
- **Z-Index Handling:** There were some challenges ensuring the dragged note always appears on top; adjustments in the component hierarchy and inline styling were required.

---

### 🔄 **Extra Credit Attempted**
- **Improved Note Dragging Behavior:** Enhanced z-index updates to ensure the dragged note always appears at the front.
- **Styling Enhancements:** Redesigned components (Login, Notes container, and individual Note) for a modern, sleek look.
- **Firebase Authentication:** Implemented Email/Password authentication using Firebase Auth.
- **Organized Code Structure:** Separated note management into a dedicated `NotesApp` component, keeping the App component clean and focused on authentication and layout.

---

### 📚 **Citations and Resources Used**
- **Firebase Realtime Database Documentation:**  
  [Firebase Realtime Database Documentation](https://firebase.google.com/docs/database)
- **Firebase Authentication Documentation:**  
  [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- **React-Resizable:**  
  [React-Resizable on npm](https://www.npmjs.com/package/react-resizable)
- **React-Icons:**  
  [React-Icons Documentation](https://react-icons.github.io/react-icons/)


---

### 🛠 **Project Structure Overview**
