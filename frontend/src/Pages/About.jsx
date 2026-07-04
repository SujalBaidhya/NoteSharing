import React from "react";

const About = () => {
    return (
        <section className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-3xl p-12 max-w-3xl text-center">
                <h1 className="text-5xl font-bold text-blue-700 mb-6">
                    About Us
                </h1>

                <p className="text-gray-600 text-lg leading-8">
                    We connect drivers with people who need safe, reliable,
                    and affordable transportation. Our goal is to make
                    booking professional drivers simple and stress-free.
                </p>
            </div>
        </section>
    );
};

export default About;