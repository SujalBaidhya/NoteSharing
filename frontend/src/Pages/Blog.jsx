import React from "react";

const Blog = () => {
    return (
        <section className="min-h-screen py-16">
            <h1 className="text-5xl font-bold text-center text-blue-700 mb-12">
                Latest Blogs
            </h1>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">
                    <h2 className="text-xl font-bold mb-3">
                        Safe Driving Tips
                    </h2>

                    <p className="text-gray-600">
                        Learn how professional drivers keep passengers safe.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">
                    <h2 className="text-xl font-bold mb-3">
                        Road Trip Guide
                    </h2>

                    <p className="text-gray-600">
                        Everything you need before your next adventure.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition">
                    <h2 className="text-xl font-bold mb-3">
                        Car Maintenance
                    </h2>

                    <p className="text-gray-600">
                        Keep your vehicle healthy with these easy tips.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Blog;