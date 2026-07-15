import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
export default function MyNotes() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    useEffect(() => {
        axios.get("/notes/my-notes")
            .then(res => {console.log("Response:", res);
            console.log("Data:", res.data);setNotes(res.data)})
            .catch(err => {
            console.log("Status:", err.response?.status);
            console.log("Data:", err.response?.data);
        })
            .finally(() => setLoading(false));
    }, []);
    console.log(notes);
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this note? This can't be undone.")) return;

        setDeletingId(id);
        try {
            await axios.delete(`/notes/${id}`);
            setNotes(prev => prev.filter(note => note.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete note.");
        } finally {
            setDeletingId(null);
        }
    };
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
    );
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading your notes...</p>
            </div>
        );
    }
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-5">

        <h1 className="text-4xl font-bold text-gray-800">
          My Notes
        </h1>

        <p className="text-gray-500 mt-2 mb-6">
          Manage all the notes you've uploaded.
        </p>

        <input
          type="text"
          placeholder="Search notes..."
          className="w-full p-3 rounded-lg border border-gray-300 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid gap-6">

          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >

              <h2 className="text-2xl font-semibold text-gray-800">
                {note.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {note.faculty}  Semester {note.semester}
              </p>

              <p className="mt-2">
                <span className="font-semibold">Subject:</span>{" "}
                {note.subject}
              </p>

              <p className="text-gray-600 mt-3">
                {note.description}
              </p>

              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                📄 {note.file}
              </div>

              <div className="flex gap-3 mt-6">
                <div className="flex gap-3 mt-6">

                    {note.file_url && (
                            <a href={note.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Download
                        </a>
                    )}
                    <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600">
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(note.id)}
                        disabled={deletingId === note.id}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {deletingId === note.id ? "Deleting..." : "Delete"}
                    </button>

                </div>
        
              </div>

            </div>
          ))}

          {filteredNotes.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No notes found.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}