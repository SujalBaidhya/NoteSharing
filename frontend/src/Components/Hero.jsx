import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center">

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Left Side */}
                <div>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        📚 Welcome to NoteJS
                    </span>

                    <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                        Share Notes.
                        <br />
                        Learn Together.
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 leading-8">
                        NoteJS is a platform where students can upload,
                        browse, and download study materials for different
                        subjects and semesters.
                    </p>

                    <div className="mt-8 flex gap-4">

                        <Link
                            to="/notes"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition"
                        >
                            Browse Notes
                        </Link>

                        <Link
                            to="/upload"
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg transition"
                        >
                            Upload Notes
                        </Link>

                    </div>

                </div>

                {/* Right Side */}

                <div className="flex justify-center">

                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700"
                        alt="Students studying"
                        className="rounded-3xl shadow-2xl"
                    />

                </div>

            </div>

        </section>
    );
};

export default Hero;