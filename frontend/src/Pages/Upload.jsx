import React, { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

import LoginForm from "../Components/LoginForm";
const Upload = () => {
    
    const {user} = useAuth();
    const [errors, setErrors] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [form, setForm] = useState({
        title: "",
        faculty: "",
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
        setErrors((prev) => ({
        ...prev,
        [name]: "",
    }));
    };
    const handleFile = (e) => {
            setForm({
                ...form,
                file: e.target.files[0],
            });
            setErrors((prev) => ({
                ...prev,
                file: "",
            }));
        };
        const validateForm = () => {
            const validationRules = {
                title: "Title is required.",
                faculty: "Please select a faculty.",
                semester: "Please select a semester.",
                subject: "Subject is required.",
            };

        const newErrors = {};

        Object.entries(validationRules).forEach(([field, message]) => {
            if (!form[field] || !form[field].toString().trim()) {
                newErrors[field] = message;
            }
        });

        if (!form.file) {
            newErrors.file = "Please upload a PDF.";
        } else {
            if (form.file.type !== "application/pdf") {
                newErrors.file = "Only PDF files are allowed.";
            }

            if (form.file.size > 10 * 1024 * 1024) {
                newErrors.file = "File size cannot exceed 10 MB.";
            }
        }

        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (!user) {
        setShowLoginModal(true);
        return;
        }
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("faculty", form.faculty);
        formData.append("subject", form.subject);
        formData.append("semester", form.semester);
        formData.append("description", form.description);
        formData.append("file", form.file);

        try {
            const res = await axios.post(
                "/api/notes",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(res.data);
            alert("Uploaded successfully!");
            setForm({
                title: "",
                faculty: "",
                subject: "",
                semester: "",
                description: "",
                file: null,
            });
            setErrors({});
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
                        className={`w-full border rounded-lg p-3 border ${
                            errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>
                    )}
                    <select
                        name="faculty"
                        value={form.faculty}
                        onChange={handleChange}
                        className={`w-full rounded-lg p-3 border ${
                            errors.faculty ? "border-red-500" : "border-gray-300"
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
                    {errors.faculty && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.faculty}
                        </p>
                    )}
                    <select
                        name="semester"
                        value={form.semester}
                        onChange={handleChange}
                        className={`w-full rounded-lg p-3 border ${
                            errors.semester ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                        <option value="">Select Semester</option>
                        <option value="1">1st Semester</option>
                        <option value="2">2nd Semester</option>
                        <option value="3">3rd Semester</option>
                        <option value="4">4th Semester</option>
                        <option value="5">5th Semester</option>
                        <option value="6">6th Semester</option>
                        <option value="7">7th Semester</option>
                        <option value="8">8th Semester</option>
                    </select>
                    {errors.semester && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.semester}
                        </p>
                    )}
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`w-full rounded-lg p-3 border ${
                            errors.subject ? "border-red-500" : "border-gray-300"
                        }`}
                    />

                    {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.subject}
                        </p>
                    )}

                    <textarea
                        rows="5"
                        name="description"
                        placeholder="Description..."
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />
                    <div>
                    <label className={`cursor-pointer px-2 py-3 rounded-lg inline-block text-white ${
                        errors.file
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}>
                        📄 Choose PDF
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFile}
                        className="hidden"
                    />
                    {errors.file && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.file}
                        </p>
                    )}
                    </label>
                    {form.file && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-700 font-medium">
                                ✅ {form.file.name}
                            </p>
                        </div>
                    )}
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Upload Note
                    </button>
                    </form>

            </div>
                    {showLoginModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-96">

                                <h2 className="text-xl font-semibold mb-3">
                                    Login Required
                                </h2>

                                <p className="text-gray-600 mb-6">
                                    You must be logged in to upload notes.
                                </p>

                                <div className="flex justify-end gap-3">

                                    <LoginForm onSuccess={() => setShowLoginModal(false)} 
                                                onCancel={() => setShowLoginModal(false)}/>
                                         
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    );
};

export default Upload;