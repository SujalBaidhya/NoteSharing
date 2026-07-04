import React, { useState } from "react";
import axios from "axios";
const Upload = () => {

    const [form, setForm] = useState({
        title: "",
        subject: "",
        semester: "",
        description: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleFile = (e) => {
        setForm({
            ...form,
            file: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("subject", form.subject);
        formData.append("semester", form.semester);
        formData.append("description", form.description);
        formData.append("file", form.file);

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/notes",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(res.data);
            alert("Uploaded successfully!");

        } catch (err) {
            console.error("UPLOAD ERROR FULL:", err);

            if (err.response) {
                console.log("STATUS:", err.response.status);
                console.log("DATA:", err.response.data);
                console.log("HEADERS:", err.response.headers);
            } else if (err.request) {
                console.log("NO RESPONSE FROM SERVER");
            } else {
                console.log("ERROR:", err.message);
            }

            alert("Upload failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">

            <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                    Upload Notes
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <input
                        type="text"
                        name="title"
                        placeholder="Note Title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <select
                        name="semester"
                        value={form.semester}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="">Select Semester</option>
                        <option>1st Semester</option>
                        <option>2nd Semester</option>
                        <option>3rd Semester</option>
                        <option>4th Semester</option>
                        <option>5th Semester</option>
                        <option>6th Semester</option>
                        <option>7th Semester</option>
                        <option>8th Semester</option>
                    </select>

                    <textarea
                        rows="5"
                        name="description"
                        placeholder="Description..."
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <label className="cursor-pointer bg-blue-600 text-white px-2 py-3 rounded-lg hover:bg-blue-700 inline-block">
                📄 Choose PDF
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFile}
                        className="hidden"
                    />
</label>

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Upload Note
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Upload;