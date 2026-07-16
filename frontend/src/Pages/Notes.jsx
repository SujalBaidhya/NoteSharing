import React, { useEffect, useState } from "react";
import axios from "../api/axios";
const faculties = [
    "BIT",
    "BCA",
    "CSIT",
    "BITM",
    "BBA",
    "BBS",
];

const Notes = () => {

    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
    axios
        .get("/api/notes")
        .then((res) => {
    console.log(res.data);
    setNotes(res.data);
})
        .catch((err) => {
            console.error(err);
        });
}, []);
const filteredNotes = notes.filter((note) => {
    return (
        note.faculty === selectedFaculty &&
        note.semester === selectedSemester
    );
});
return (
        <div className="min-h-screen bg-gray-50 py-12">

            <div className="max-w-6xl mx-auto px-6">

                <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
                    Browse Notes
                </h1>

                <h2 className="text-xl font-semibold mb-5 text-center" >
                    Choose Faculty
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                    {faculties.map((faculty) => (

                        <button
                            key={faculty}
                            onClick={() => setSelectedFaculty(faculty)}
                            className={`p-6 rounded-xl shadow transition font-semibold text-lg
                            ${
                                selectedFaculty === faculty
                                    ? "bg-blue-600 text-white"
                                    : "bg-white hover:bg-blue-50"
                            }`}
                        >
                            {faculty}
                        </button>

                    ))}
                    
                </div>
                 {selectedFaculty && (
    <>
        <h2 className="text-xl font-semibold mt-12 mb-5 text-center">
            Choose Semester
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[1,2,3,4,5,6,7,8].map((semester) => (

                <button
                    key={semester}
                    onClick={() => setSelectedSemester(semester)}
                    className={`p-4 rounded-lg shadow transition font-medium
                    ${
                        selectedSemester === semester
                            ? "bg-blue-600 text-white"
                            : "bg-white hover:bg-blue-50"
                    }`}
                >
                    Semester {semester}
                </button>

            ))}

        </div>
        <div className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold mb-5" >
                   Your precious Notes:
                </h2>
    {filteredNotes.map((note) => (

        <div
    key={note.id}
    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
>
    
    <div className="flex justify-between items-start">

        <div>

            <h3 className="text-2xl font-bold text-blue-600">
                {note.title}
            </h3>

            <p className="text-gray-600 mt-1">
                {note.subject}
            </p>
        
            <div className="flex gap-3 mt-3">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {note.faculty}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Semester {note.semester}
                </span>
            </div>
            <p className="text-gray-600 mt-1">
                Created By :{note.created_by}
            </p>
            {note.description && (
                <p className="mt-4 text-gray-700">
                    {note.description}
                </p>
            )}

        </div>

        </div>

        <div className="mt-6">

            <a
                href={`http://127.0.0.1:8000/storage/${note.file}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
                View PDF
            </a>

        </div>

    </div>

    ))}

</div>
    </>
)}                   
            </div>

        </div>
    );
};

export default Notes;