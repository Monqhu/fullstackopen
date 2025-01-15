//COMPONENTES
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

//BACKEND
import noteService from './services/notes'

//OTROS RECURSOS
import './index.css'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    noteService
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  }
  
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    
    noteService
    .update(id, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response))
    })
    .catch(error => {
      setErrorMessage(`Note '${note.content}' was already removed from server`) 
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">guardar</button>
      </form>
      
      <Footer />
    </div>
  )
}

export default App 