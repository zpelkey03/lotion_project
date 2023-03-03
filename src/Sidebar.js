
import './index.css';
import { Link } from 'react-router-dom';

function Sidebar ({notes, addNote, activeNote, setActiveNote, setIsEditing}) {
    

    return (<div className="notes-container">
                <div className="notes-header">
                    <h3>Notes</h3>
                    <button className="add-note-btn" onClick={addNote} style={{ fontSize: "48px" }}>+</button>
                </div>
                <div className='app-sidebar-notes'>
                {notes.map((note) => (
                    <Link to={`/notes/${note.noteId}`} key={note.id}>
                <div className= {note.id === activeNote ? "app-sidebar-note active" : "app-sidebar-note"} onClick = {() => setActiveNote(note.id) + setIsEditing(false)}>
                <div className= "sidebar-note-title">
                    <strong>{note.title}</strong><br></br>
                    <small className = "note-meta">{" "}
                    {new Date(note.lastModified).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })};

                    
                    </small><br></br>
                </div>
                <p>{note.body && note.body.replace(/<[^>]+>/g, '').substr(0,100) + "..."}</p>   
            </div>
            </Link>
            ))}
                </div>
            </div>
            );

}

export default Sidebar;