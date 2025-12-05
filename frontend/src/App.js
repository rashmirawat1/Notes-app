import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create a small axios instance that automatically uses the right base URL
const api = axios.create({
  // When running in production (through Nginx), use relative path
  // When running locally with `npm start`, fall back to localhost
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api'                  // ← Nginx will proxy /api → backend container
    : 'http://localhost:8000' // ← Local development
});

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes/');
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/notes/${editingId}`, { title, content });
        setEditingId(null);
      } else {
        await api.post('/notes/', { title, content });
      }

      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div>
      <h1>Notes App</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows="5"
          required
        />
        <button type="submit">
          {editingId ? 'Update Note' : 'Create Note'}
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setTitle('');
            setContent('');
            setEditingId(null);
          }}>
            Cancel
          </button>
        )}
      </form>

      <ul>
        {notes.length === 0 ? (
          <p>No notes yet. Create your first one!</p>
        ) : (
          notes.map(note => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <div>
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note.id)} style={{ backgroundColor: '#dc3545' }}>
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;