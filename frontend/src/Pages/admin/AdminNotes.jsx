import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";
const AdminNotes = () => {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const location = useLocation();
    const userId = location.state?.userId;
    const userName = location.state?.userName;
    useEffect(() => {
    const fetchNotes = async () => {
        try {
            let res;

            if (userId) {
                res = await axios.get(`/admin/users/${userId}/notes`);
            } else {
                res = await axios.get("/admin/notes");
            }
            setNotes(res.data);
        } 
        catch (err) {
            console.error(err);
        }
        } ;
        fetchNotes();
        }, [userId]);
    const deleteNote=async(id)=>{
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        try {
            await axios.delete(`/notes/${id}`);
            setNotes((prevNotes) =>
                prevNotes.filter((note) => note.id !== id)
            );
        } catch (err) {
            console.error(err);
            alert("Failed to delete note.");
        }
    };

    const filteredNotes = notes.filter((note) => {
        const searchText = search.toLowerCase();
        return (
            note.title?.toLowerCase().includes(searchText) ||
            note.subject?.toLowerCase().includes(searchText) ||
            note.faculty?.toLowerCase().includes(searchText) ||
            note.created_by?.toLowerCase().includes(searchText)
        );
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">
                {userName
                    ? `Notes uploaded by ${userName}`
                    : "Manage Notes"}
            </h1>

            <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-3 rounded-lg mb-6 w-full"
            />

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="text-left">Faculty</th>
                            <th className="text-left">Semester</th>
                            <th className="text-left">Subject</th>
                            <th className="text-left">Uploader</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map((note) => (
                                <tr
                                    key={note.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-4">
                                        {note.title}
                                    </td>
                                    <td>{note.faculty}</td>
                                    <td>{note.semester}</td>
                                    <td>{note.subject}</td>
                                    <td>{note.created_by}</td>
                                    <td className="text-center space-x-2">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteNote(note.id)
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No notes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-gray-600">
                Total Notes: <strong>{filteredNotes.length}</strong>
            </p>
        </div>
    );
};

export default AdminNotes;