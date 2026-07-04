import React from "react";

const Contact = () => {
    return (
        <section className="min-h-screen flex justify-center items-center">

            <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-10">

                <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
                    Contact Us
                </h1>

                <form className="space-y-5">

                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    ></textarea>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg w-full">
                        Send Message
                    </button>

                </form>

            </div>

        </section>
    );
};

export default Contact;