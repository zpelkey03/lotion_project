import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Notepad({onDeleteNote, activeNote, currentNote, onUpdateNote, isEditing, setIsEditing}) {

    const [noteChanges, setNoteChanges] = useState({});

    const localDate = new Date();
    const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000)).toISOString();

    const onEditField = (fieldName, value) => {
        setNoteChanges({...noteChanges, [fieldName]: value});
    };

    const onSaveField = () => {
        onUpdateNote({
            ...currentNote,
            ...noteChanges,
            lastModified: new Date(document.getElementById('datetime-input').value),
            })
            setNoteChanges({});
            setIsEditing(false);
            const noteId = currentNote.noteId;
            const url = `/notes/${noteId}`;
            window.history.pushState({}, "", url);
        }
    
        
    const handleEditClick = () => {
        setIsEditing(true);
        setIsEditing(true);
        const noteId = currentNote.noteId;
        const url = `/notes/${noteId}/edit`;
        window.history.pushState({}, "", url);
        };

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const formatDate = (when) => {
            const formatted = new Date(when).toLocaleString("en-US", options);
            if (formatted === "Invalid Date") {
                return "";
            }
            console.log(formatted);
            return formatted;
        };
    if (!currentNote) {
        return <div className="no-active-note">
            Select a Note, or create a new one.
            </div>
      }

    if (isEditing){
        return   (
        <div className="app-main">
        <div className="app-main-edit">
            <div className = "notepad-header">
            <input
             type="text"
             id="title"
            value={noteChanges.title ?? currentNote.title}
             onChange={(e) => onEditField("title", e.target.value)}
            />
            <div className="buttons">
            <button onClick={() => onSaveField()}>Save</button>
            <button onClick={() => onDeleteNote(activeNote)}>Delete</button>
            </div>
        </div>
        <div className = "date-time">
        <input
        type="datetime-local"
        id="datetime-input"
        defaultValue={utcDate.slice(0, 16)}
        />
        </div>
        <ReactQuill
        value={noteChanges.body ?? currentNote.body}
        onChange={(value) => onEditField("body", value)}
        style={{ height: 400 }}
        />
        </div>
        </div>
        );
    }else{
        return(
      <div className="app-main">
        <div className="app-main-edit">
        <div className = "notepad-header">
        <h1>{currentNote.title}</h1>
        <div className="buttons">
            <button onClick={() => handleEditClick()}>Edit</button>
            <button onClick={() => onDeleteNote(activeNote)}>Delete</button>
        </div>
        </div>
        <div className = "date-time">{formatDate(currentNote.lastModified)}
        </div>
        <div dangerouslySetInnerHTML={{__html: currentNote.body}}></div>

      </div>
      </div>
     );
    }

    }
export default Notepad;