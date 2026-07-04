import React, { useState } from 'react';

const Selection = () => {
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [pickupTime, setPickupTime] = useState('10:00');
    const [dropoffTime, setDropoffTime] = useState('10:00');
    const [pickuplocation, setPickLocation] = useState('');
    const [sameLocation, setSameLocation] = useState(true);
    const [dropoffLocation, setDropoffLocation] = useState('');

    return (
        <div className="min-h-screen flex flex-col pt-16">

            <div className="absolute inset-0 z-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 to-indigo-100/70"></div>
            </div>


            <main className="flex-grow flex items-center justify-center py-8 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-white/20">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">NoteJS</h2>


                        <div className="flex items-center mb-6">
                            <div className="flex items-center mr-4">
                                <input
                                    type="checkbox"
                                    id="sameLocation"
                                    checked={sameLocation}
                                    onChange={() => setSameLocation(!sameLocation)}
                                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="sameLocation" className="ml-2 block text-sm font-medium text-gray-700">
                                    Same Drop-off Location
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pick-up Location</h3>

                                <div className="mb-4">
                                    {/* <label className="block text-gray-700 text-sm font-medium mb-2">Pick-up Location</label> */}
                                    <input
                                        type="text"
                                        value={pickuplocation}
                                        onChange={(e) => setPickLocation(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter city, airport, or address"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Pick-up Date</label>
                                    <input
                                        type="date"
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Pick-up Time</label>
                                    <select
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="06:00">6:00 AM</option>
                                        <option value="07:00">7:00 AM</option>
                                        <option value="08:00">8:00 AM</option>
                                        <option value="09:00">9:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="13:00">1:00 PM</option>
                                        <option value="14:00">2:00 PM</option>
                                        <option value="15:00">3:00 PM</option>
                                        <option value="16:00">4:00 PM</option>
                                        <option value="17:00">5:00 PM</option>
                                        <option value="18:00">6:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Drop-off Location</h3>

                                {/* <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Drop-off Location</label>
                                    <input
                                        type="text"
                                        value={sameLocation ? location : ''}
                                        readOnly={sameLocation}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={sameLocation ? "Same as pick-up" : "Enter city, airport, or address"}
                                    />
                                </div> */}

                                {!sameLocation && (
                                    <div className="mb-4">
                                        <input type="text" value={dropoffLocation}
                                            onChange={(e) => setDropoffLocation(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter city, airport, or address" />
                                    </div>
                                )
                                }

                                {sameLocation && (
                                    <div className="mb-4">
                                        <input type="text"
                                            value={pickuplocation}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter city, airport, or address" />

                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Drop-off Date</label>
                                    <input
                                        type="date"
                                        value={dropoffDate}
                                        onChange={(e) => setDropoffDate(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Drop-off Time</label>
                                    <select
                                        value={dropoffTime}
                                        onChange={(e) => setDropoffTime(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="06:00">6:00 AM</option>
                                        <option value="07:00">7:00 AM</option>
                                        <option value="08:00">8:00 AM</option>
                                        <option value="09:00">9:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="13:00">1:00 PM</option>
                                        <option value="14:00">2:00 PM</option>
                                        <option value="15:00">3:00 PM</option>
                                        <option value="16:00">4:00 PM</option>
                                        <option value="17:00">5:00 PM</option>
                                        <option value="18:00">6:00 PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
                                View Vehicles
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Selection;