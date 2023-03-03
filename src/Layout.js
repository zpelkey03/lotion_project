import Header from './Header';
import './index.css';
import { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import Notepad from './Notepad';
import uuid from "react-uuid";

function Layout() {


    
    const [notesVisible, setNotesVisible] = useState(true);
    
    const [notes, setNotes] = useState(() => {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    });
    
    const[activeNote, setActiveNote] = useState(false);
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    }, []);
  
    useEffect(() => {
      const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      setNotes(savedNotes);
    }, []);
    


 
  


    useEffect(() => {
      // update the URL when the active note changes
      if (activeNote) {
          const url = `/notes/${activeNote.noteId}`;
          window.history.pushState({}, "", url);
      }
  }, [activeNote]);
    

    const handleMenuClick = () => {
      setNotesVisible(!notesVisible);
    };
    
    const addNote = () => {
      const newNoteId = notes.length + 1;
      const newNote = {
        noteId: newNoteId,
        id: uuid(),
        title: "Untitled",
        body: "",
        lastModified: Date.now()
      };

    setNotes([newNote, ...notes]);
    };

    const onUpdateNote = (updatedNote) => {
      const updatedNotesArray = notes.map((note) => {
        if(note.id === activeNote) {
          return updatedNote;
        }
    
        return note;
      });
    
      setNotes(updatedNotesArray);
      localStorage.setItem("notes", JSON.stringify(updatedNotesArray));
    }

    const onDeleteNote = (idToDelete) => {
      if (activeNote){
      const answer = window.confirm("Are you sure?");
    
      if (answer) {
        console.log("delete")
        console.log(idToDelete)
        setNotes(notes.filter((note) => note.id !== idToDelete));
      }
      
    }
    }

    const getActiveNote = () => {
      return activeNote ? notes.find((note) => note.id === activeNote) : null;
    }

    
    
  
      return (
        <div className="app-container">
          <Header onMenuClick={handleMenuClick} />
          <div className="main-content">
            {notesVisible && <Sidebar
               notes = {notes} 
               addNote = {addNote}
               activeNote = {activeNote}
              setActiveNote = {setActiveNote}
              setIsEditing = {setIsEditing}  />}
              <Notepad onDeleteNote={onDeleteNote}
              activeNote = {activeNote}
              setActiveNote = {setActiveNote} 
              currentNote = {getActiveNote()}
              onUpdateNote = {onUpdateNote}
              isEditing = {isEditing}
              setIsEditing = {setIsEditing}/>
          </div>
        </div>
      );
    }
  
  export default Layout;
