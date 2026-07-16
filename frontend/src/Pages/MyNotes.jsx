import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
export default function MyNotes() {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [editingNote, setEditingNote] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "",
        faculty: "",
        subject: "",
        semester: "",
        description: "",
        file: null,
    });
    const [editErrors, setEditErrors] = useState({});
    const [savingEdit, setSavingEdit] = useState(false);
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
        ||note.subject.toLowerCase().includes(search.toLowerCase())
    );
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading your notes...</p>
            </div>
        );
    }
    const openEditModal = (note) => {
    setEditingNote(note);
    setEditForm({
        title: note.title || "",
        faculty: note.faculty || "",
        subject: note.subject || "",
        semester: note.semester || "",
        description: note.description || "",
        file: null,
    });
    setEditErrors({});
};

const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    setEditErrors(prev => ({ ...prev, [name]: "" }));
};

const handleEditFile = (e) => {
    setEditForm(prev => ({ ...prev, file: e.target.files[0] }));
    setEditErrors(prev => ({ ...prev, file: "" }));
};

const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSavingEdit(true);
    setEditErrors({});

    const data = new FormData();
    data.append("title", editForm.title);
    data.append("faculty", editForm.faculty);
    data.append("subject", editForm.subject);
    data.append("semester", editForm.semester);
    data.append("description", editForm.description);
    if (editForm.file) {
        data.append("file", editForm.file);
    }

    try {
        const res = await axios.post(`/notes/${editingNote.id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setNotes(prev =>
            prev.map(n => (n.id === editingNote.id ? res.data.note : n))
        );
        setEditingNote(null);

    } catch (err) {
        console.error(err);
        if (err.response?.data?.errors) {
            const errs = {};
            Object.keys(err.response.data.errors).forEach(key => {
                errs[key] = err.response.data.errors[key][0];
            });
            setEditErrors(errs);
        } else {
            alert("Failed to update note.");
        }
    } finally {
        setSavingEdit(false);
    }
};
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
          placeholder="Search by title or subject"
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

              {/* <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                📄 {note.file}
              </div> */}

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
                    <button onClick={() => openEditModal(note)} className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600">
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
          ))}

          {filteredNotes.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No notes found.
            </div>
          )}

        </div>
        {editingNote && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>

                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Note Title"
                                value={editForm.title}
                                onChange={handleEditChange}
                                className={`w-full border rounded-lg p-3 ${
                                    editErrors.title ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {editErrors.title && <p className="text-red-500 text-sm mt-1">{editErrors.title}</p>}
                        </div>

                        <div>
                            <select
                                name="faculty"
                                value={editForm.faculty}
                                onChange={handleEditChange}
                                className={`w-full rounded-lg p-3 border ${
                                    editErrors.faculty ? "border-red-500" : "border-gray-300"
                                }`}
                            >
                                <option value="">Select Faculty</option>
                                <option value="BIT">BIT</option>
                                <option value="BCA">BCA</option>
                                <option value="CSIT">CSIT</option>
                                <option value="BITM">BITM</option>
                                <option value="BBA">BBA</option>
                                <option value="BBS">BBS</option>
                            </select>
                            {editErrors.faculty && <p className="text-red-500 text-sm mt-1">{editErrors.faculty}</p>}
                        </div>

                        <div>
                            <select
                                name="semester"
                                value={editForm.semester}
                                onChange={handleEditChange}
                                className={`w-full rounded-lg p-3 border ${
                                    editErrors.semester ? "border-red-500" : "border-gray-300"
                                }`}
                            >
                                <option value="">Select Semester</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                    <option key={s} value={s}>{s} Semester</option>
                                ))}
                            </select>
                            {editErrors.semester && <p className="text-red-500 text-sm mt-1">{editErrors.semester}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={editForm.subject}
                                onChange={handleEditChange}
                                className={`w-full rounded-lg p-3 border ${
                                    editErrors.subject ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {editErrors.subject && <p className="text-red-500 text-sm mt-1">{editErrors.subject}</p>}
                        </div>

                        <textarea
                            rows="4"
                            name="description"
                            placeholder="Description..."
                            value={editForm.description}
                            onChange={handleEditChange}
                            className="w-full border rounded-lg p-3 border-gray-300"
                        />

                        <div>
                            <label className="cursor-pointer px-4 py-2 rounded-lg inline-block text-white bg-blue-600 hover:bg-blue-700">
                                📄 Replace PDF
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleEditFile}
                                    className="hidden"
                                />
                            </label>
                            {editForm.file && (
                                <p className="text-green-700 mt-2 text-sm">✅ {editForm.file.name}</p>
                            )}
                            {editErrors.file && <p className="text-red-500 text-sm mt-1">{editErrors.file}</p>}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={savingEdit}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg flex-1"
                            >
                                {savingEdit ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingNote(null)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}