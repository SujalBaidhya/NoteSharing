import React from "react";

const Hire = () => {
    return (
        <section className="min-h-screen flex items-center justify-center">

            <div className="bg-white shadow-xl rounded-3xl p-12 max-w-5xl">

                <h1 className="text-5xl font-bold text-blue-700 text-center mb-12">
                    Hire Note
                </h1>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h2 className="font-bold text-xl mb-2">
                            Local Driver
                        </h2>

                        <p className="text-gray-600">
                            Hire experienced local drivers for daily travel.
                        </p>

                        <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg">
                            Hire
                        </button>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h2 className="font-bold text-xl mb-2">
                            Outstation Driver
                        </h2>

                        <p className="text-gray-600">
                            Perfect for long-distance travel and vacations.
                        </p>

                        <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg">
                            Hire
                        </button>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-xl transition">
                        <h2 className="font-bold text-xl mb-2">
                            Personal Chauffeur
                        </h2>

                        <p className="text-gray-600">
                            Book a personal chauffeur for premium service.
                        </p>

                        <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg">
                            Hire
                        </button>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hire;