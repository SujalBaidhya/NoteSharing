import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-20">

            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}

                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-800">
                        About <span className="text-blue-600">NoteJS</span>
                    </h1>

                    <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
                        NoteJS is a collaborative platform that allows students
                        to upload, share, and access study materials anytime,
                        anywhere.
                    </p>
                </div>

                {/* Mission */}

                <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">

                    <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                        🎯 Our Mission
                    </h2>

                    <p className="text-gray-600 leading-8">
                        Our mission is to simplify learning by providing a
                        centralized platform where students can easily share
                        notes, assignments, and educational resources. We
                        believe knowledge grows when it is shared.
                    </p>

                </div>

                {/* Why Choose */}

                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-6">
                            ⭐ Why Choose NoteJS?
                        </h2>

                        <ul className="space-y-4 text-gray-700">

                            <li>✔ Easy note uploading</li>
                            <li>✔ Download study materials anytime</li>
                            <li>✔ Organized by subject and semester</li>
                            <li>✔ Clean and user-friendly interface</li>
                            <li>✔ Secure student accounts</li>

                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <h2 className="text-2xl font-semibold text-blue-600 mb-6">
                            👨‍🎓 Built for Students
                        </h2>

                        <p className="text-gray-600 leading-8">
                            Whether you're preparing for exams, revising lecture
                            notes, or helping classmates, NoteJS provides a
                            reliable platform to collaborate and learn together.
                            Our goal is to make educational resources more
                            accessible for everyone.
                        </p>

                    </div>

                </div>

                {/* Vision */}

                <div className="bg-blue-600 rounded-2xl text-white p-10 text-center">

                    <h2 className="text-3xl font-bold mb-4">
                        Our Vision
                    </h2>

                    <p className="text-lg leading-8 max-w-3xl mx-auto">
                        We envision a community where every student has quick
                        access to quality study materials and can contribute to
                        the success of others through knowledge sharing.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default About;