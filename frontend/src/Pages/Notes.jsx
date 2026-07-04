import React,{ useState, useEffect }from "react";
import axios from "axios";
const Notes = () => {
    const [notes,setNotes]=useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/notes')
            .then((res)=>{
                setNotes(res.data);
            })
            .catch((err)=>console.log(err));
    },[])
    return (
        <div className="min-h-screen bg-gray-50 py-14">

            <div className="max-w-7xl mx-auto px-6">

                <h1 className="text-5xl font-bold text-center text-gray-800">
                    Browse Notes
                </h1>

                <p className="text-center text-gray-500 mt-3 mb-12">
                    Share Whatever you can Suiiiiiii
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {notes.map((note, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                        >

                            <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full mb-4">
                                {note.subject}
                            </span>

                            <h2 className="text-2xl font-bold text-gray-800">
                                {note.title}
                            </h2>

                            <p className="text-gray-500 mt-3">
                                Uploaded by <strong>{note.subject}</strong>
                            </p>

                            <a
                                href={`http://127.0.0.1:8000/storage/${note.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 block text-center bg-blue-600 text-white py-3 rounded-lg"
                                >
                                    View Note
                            </a>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Notes;