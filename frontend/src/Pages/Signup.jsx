import React from "react";

const Signup = () => {
    return (
        <section className="min-h-screen flex items-center justify-center">

            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10">

                <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
                    Create Account
                </h1>

                <form className="space-y-5">

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-lg p-3"
                    />

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                        Sign Up
                    </button>

                </form>

            </div>

        </section>
    );
};

export default Signup;